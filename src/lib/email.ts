import nodemailer from 'nodemailer';

// Email Templates
export const getCustomerEmailTemplate = (data: {
  name: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bestätigung Ihrer Umzugsanfrage</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .footer { margin-top: 20px; padding: 20px; background: #374151; color: white; text-align: center; border-radius: 8px; }
        .highlight { color: #1e40af; font-weight: bold; }
        .contact-info { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Vielen Dank für Ihre Anfrage!</h1>
        <p>Asam Abd - Ihr Partner für stressfreie Umzüge</p>
    </div>
    
    <div class="content">
        <p>Liebe/r <span class="highlight">${data.name}</span>,</p>
        
        <p>vielen Dank für Ihr Vertrauen! Wir haben Ihre Umzugsanfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
        
        <h3>Ihre Anfrage im Überblick:</h3>
        <div class="contact-info">
            <p><strong>Name:</strong> ${data.name}</p>
        </div>        <p>Unser erfahrenes Team wird Ihre Anfrage bearbeiten und Ihnen innerhalb von 24 Stunden ein unverbindliches Angebot zusenden.</p>
        
        <div class="contact-info">
            <h4>Bei Rückfragen erreichen Sie uns:</h4>
            <p><strong>Telefon:</strong> +49 176 80248293</p>
            <p><strong>E-Mail:</strong> ma9495232@gmail.com</p>
            <p><strong>Adresse:</strong> Fangstraße 72, 59077 Hamm</p>
            <p><strong>Öffnungszeiten:</strong> Mo-Fr: 08:00 - 18:00 Uhr</p>
        </div>
        
        <p>Wir freuen uns darauf, Ihren Umzug zu einem stressfreien Erlebnis zu machen!</p>
    </div>
    
    <div class="footer">
        <p>Mit freundlichen Grüßen<br><strong>Ihr Asam Abd Team</strong></p>
        <p style="font-size: 12px; margin-top: 15px;">
            © 2025 Asam Abd. Alle Rechte vorbehalten.<br>
            Fangstraße 72, 59077 Hamm, Deutschland
        </p>
    </div>
</body>
</html>
`;
};

export const getCompanyEmailTemplate = (data: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neue Umzugsanfrage</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .customer-info { background: white; padding: 20px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #1e40af; }
        .urgent { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .highlight { color: #dc2626; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚚 Neue Umzugsanfrage</h1>
        <p>Asam Abd - Interne Benachrichtigung</p>
    </div>
    
    <div class="content">
        <div class="urgent">
            <p><strong>⚡ Neue Kundenanfrage eingegangen!</strong></p>
            <p>Eine neue Umzugsanfrage ist über die Website eingegangen und wartet auf Bearbeitung.</p>
        </div>
        
        <div class="customer-info">
            <h3>Kundendaten:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>E-Mail:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
        </div>
        
        <div class="customer-info">
            <h3>Umzugsdetails:</h3>
            ${data.message ? `<p><strong>Nachricht:</strong><br>${data.message}</p>` : '<p><em>Keine zusätzliche Nachricht</em></p>'}
        </div>
        
        <div class="urgent">
            <h4>📋 Nächste Schritte:</h4>
            <ol>
                <li>Kunden innerhalb von 24h kontaktieren</li>
                <li>Besichtigungstermin vereinbaren</li>
                <li>Kostenloses Angebot erstellen</li>
                <li>Follow-up nach 2-3 Tagen</li>
            </ol>
        </div>
        
        <p><strong>Zeitpunkt der Anfrage:</strong> ${new Date().toLocaleString('de-DE')}</p>
    </div>
</body>
</html>
`;
};

// Email Transporter Setup
export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
    },
  });
};

export const sendCustomerConfirmation = async (customerData: {
  name: string;
  email: string;
}) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: customerData.email,
    subject: 'Bestätigung Ihrer Umzugsanfrage - Asam Abd',
    html: getCustomerEmailTemplate(customerData),
  };

  return await transporter.sendMail(mailOptions);
};

export const sendCompanyNotification = async (formData: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'ma9495232@gmail.com', // Company email
    subject: `🚚 Neue Umzugsanfrage von ${formData.name}`,
    html: getCompanyEmailTemplate(formData),
  };

  return await transporter.sendMail(mailOptions);
};
