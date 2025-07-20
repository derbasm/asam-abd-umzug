#!/bin/bash

echo "🚀 Umzug App Setup wird gestartet..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker ist nicht installiert. Bitte installieren Sie Docker zuerst."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose ist nicht installiert. Bitte installieren Sie Docker Compose zuerst."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Erstelle .env Datei..."
    cp .env.example .env
    echo "✅ .env Datei erstellt. Bitte passen Sie die Konfiguration an."
fi

# Install dependencies
echo "📦 Installiere NPM Dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generiere Prisma Client..."
npx prisma generate

# Start PostgreSQL with Docker Compose
echo "🐘 Starte PostgreSQL Container..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Warte auf PostgreSQL..."
sleep 10

# Run database migrations
echo "🗃️ Führe Datenbank-Migrationen aus..."
npx prisma db push

# Create admin user
echo "👤 Erstelle Admin Benutzer..."
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin Benutzer existiert bereits');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin user
    await prisma.adminUser.create({
      data: {
        username,
        passwordHash: hashedPassword
      }
    });
    
    console.log('✅ Admin Benutzer erstellt:');
    console.log('   Benutzername:', username);
    console.log('   Passwort:', password);
    console.log('   ⚠️  Bitte ändern Sie das Passwort in der Produktion!');
    
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Admin Benutzers:', error);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
"

echo ""
echo "🎉 Setup abgeschlossen!"
echo ""
echo "📋 Nächste Schritte:"
echo "   1. Starten Sie die Anwendung: npm run dev"
echo "   2. Öffnen Sie http://localhost:3000"
echo "   3. Admin-Login: http://localhost:3000/admin/login"
echo ""
echo "🔐 Standard Admin-Anmeldedaten:"
echo "   Benutzername: admin"
echo "   Passwort: admin123"
echo "   ⚠️  Bitte ändern Sie diese in der Produktion!"
echo ""
echo "🐘 PostgreSQL läuft in Docker auf Port 5432"
echo "   Datenbank: umzug_db"
echo "   Benutzer: umzug_user"
echo ""
