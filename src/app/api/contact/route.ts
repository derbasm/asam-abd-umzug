import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendCustomerConfirmation, sendCompanyNotification } from '@/lib/email';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    // Validierung
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle erforderlichen Felder aus.' },
        { status: 400 }
      );
    }

    // Email-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    try {
      // Kontakt in der Datenbank speichern
      const contact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          service: service || '',
          message: message || ''
        }
      });

      // Bestätigungsmail an Kunden senden
      await sendCustomerConfirmation({
        name,
        email,
      });

      // Benachrichtigung an Unternehmen senden
      await sendCompanyNotification({
        name,
        email,
        phone,
        message,
      });

      return NextResponse.json(
        { 
          message: 'Ihre Anfrage wurde erfolgreich versendet. Sie erhalten in Kürze eine Bestätigung per E-Mail.',
          contactId: contact.id
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json(
        { error: 'Es gab ein Problem beim Versenden der E-Mail. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}