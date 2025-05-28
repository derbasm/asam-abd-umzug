import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Email-Konfiguration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    // Validierung
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle erforderlichen Felder aus.' },
        { status: 400 }
      );
    }

    // E-Mail-Text erstellen
    const emailText = `
      Neue Kontaktanfrage:
      
      Name: ${name}
      E-Mail: ${email}
      Telefon: ${phone || 'Nicht angegeben'}
      Gewünschter Service: ${service}
      
      Nachricht:
      ${message}
    `;

    // E-Mail senden
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@modern-umzug.de',
      to: process.env.CONTACT_EMAIL || 'info@modern-umzug.de',
      subject: `Neue Anfrage: ${service}`,
      text: emailText,
    });

    return NextResponse.json(
      { message: 'Ihre Nachricht wurde erfolgreich gesendet.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return NextResponse.json(
      { error: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
} 