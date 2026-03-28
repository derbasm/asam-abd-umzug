import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendCustomerConfirmation, sendCompanyNotification } from '@/lib/email';
import prisma from '@/lib/db';
import { logger } from '@/lib/logger';
import { contactRequestSchema, formatZodError } from '@/lib/validation';

const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX = 5;

const contactRateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

function isContactRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = contactRateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    contactRateLimitStore.set(ip, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= CONTACT_RATE_LIMIT_MAX) {
    return true;
  }

  existing.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  if (isContactRateLimited(clientIP)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut.' },
      { status: 429 }
    );
  }

  try {
    const rawData = await request.json();
    const parsed = contactRequestSchema.safeParse(rawData);

    if (!parsed.success) {
      return NextResponse.json(
        { error: formatZodError(parsed.error) },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message, website } = parsed.data;

    // Honeypot anti-spam: bots often fill hidden fields.
    if (website) {
      return NextResponse.json(
        { message: 'Ihre Anfrage wurde erfolgreich empfangen.' },
        { status: 200 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: 'Telefonnummer ist erforderlich.' },
        { status: 400 }
      );
    }

    // Save lead first so no request is lost if email provider has temporary issues.
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        service: service || '',
        message: message || ''
      }
    });

    const [customerEmailResult, companyEmailResult] = await Promise.allSettled([
      sendCustomerConfirmation({
        name,
        email,
      }),
      sendCompanyNotification({
        name,
        email,
        phone,
        message,
      }),
    ]);

    if (customerEmailResult.status === 'rejected') {
      logger.warn('Customer confirmation email failed', {
        contactId: contact.id,
        reason: customerEmailResult.reason instanceof Error
          ? customerEmailResult.reason.message
          : String(customerEmailResult.reason),
      });
    }

    if (companyEmailResult.status === 'rejected') {
      logger.error('Company notification email failed', {
        contactId: contact.id,
        reason: companyEmailResult.reason instanceof Error
          ? companyEmailResult.reason.message
          : String(companyEmailResult.reason),
      });
    }

    const allEmailsSent =
      customerEmailResult.status === 'fulfilled' &&
      companyEmailResult.status === 'fulfilled';

    if (allEmailsSent) {
      return NextResponse.json(
        {
          message: 'Ihre Anfrage wurde erfolgreich versendet. Sie erhalten in Kürze eine Bestätigung per E-Mail.',
          contactId: contact.id
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: 'Ihre Anfrage wurde gespeichert. Falls Sie keine E-Mail erhalten, kontaktieren Sie uns bitte direkt telefonisch.',
        contactId: contact.id,
      },
      { status: 202 }
    );

  } catch (error) {
    logger.error('Contact form error', {
      message: error instanceof Error ? error.message : 'unknown',
      clientIP,
    });

    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      return NextResponse.json(
        { error: 'Unsere Anfrageverarbeitung ist aktuell kurzzeitig nicht erreichbar. Bitte versuchen Sie es in wenigen Minuten erneut.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}