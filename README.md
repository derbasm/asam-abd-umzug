# Modern Umzug Website

Eine moderne Website für Umzugsunternehmen mit PostgreSQL-Backend, Admin-Dashboard und Besuchertracking.

## Features

- **Moderne Website** mit responsivem Design
- **Kontaktformular** mit PostgreSQL-Speicherung
- **Admin-Dashboard** mit Statistiken und Diagrammen
- **Besuchertracking** und Analytik
- **Basic Authentication** für Admin-Bereiche
- **Docker-Setup** mit PostgreSQL
- **Zeitdiagramme** (Tage/Monate/Jahre)

## Technologien

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Datenbank**: PostgreSQL
- **Charts**: Chart.js mit react-chartjs-2
- **Container**: Docker & Docker Compose
- **Authentication**: Custom JWT-basiert

## Quick Start

### 1. Repository klonen
```bash
git clone <repository-url>
cd asam-abd-umzug
```

### 2. Automatisches Setup
```bash
./setup.sh
```

Das Setup-Script:
- Installiert alle Dependencies
- Startet PostgreSQL in Docker
- Erstellt die Datenbank und Tabellen
- Generiert einen Admin-Benutzer
- Konfiguriert die Umgebung

### 3. Anwendung starten
```bash
npm run dev
```

Die Website ist unter http://localhost:3000 verfügbar.

## Admin-Zugang

- **URL**: http://localhost:3000/admin/login
- **Standard-Anmeldedaten**:
  - Benutzername: `admin`
  - Passwort: `admin123`

**⚠️ WICHTIG**: Ändern Sie diese Anmeldedaten in der Produktion!

## Manual Setup (falls ./setup.sh nicht funktioniert)

### 1. Dependencies installieren
```bash
npm install
```

### 2. Umgebungsvariablen
```bash
cp .env.example .env
# Bearbeiten Sie .env nach Ihren Bedürfnissen
```

### 3. PostgreSQL starten
```bash
docker-compose up -d postgres
```

### 4. Datenbank-Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Admin-Benutzer erstellen
```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      passwordHash: hashedPassword
    }
  });
  
  console.log('Admin user created');
  await prisma.\$disconnect();
}

createAdmin();
"
```

## Datenbank-Schema

### Tabellen:
- **contacts**: Kontaktanfragen von der Website
- **visitors**: Besuchertracking mit IP und Metadaten
- **visitor_pages**: Besuchte Seiten pro Besucher
- **admin_users**: Admin-Benutzer für das Dashboard

## API-Endpunkte

### Öffentlich:
- `POST /api/contact` - Kontaktformular absenden

### Admin (Auth erforderlich):
- `POST /api/admin/login` - Admin-Anmeldung
- `POST /api/admin/logout` - Admin-Abmeldung
- `GET /api/admin/contacts` - Kontakte abrufen/verwalten
- `PUT /api/admin/contacts` - Kontakt-Status aktualisieren
- `GET /api/admin/stats` - Dashboard-Statistiken
- `GET /api/admin/visitors` - Besucherstatistiken

## Admin-Dashboard Features

### Statistik-Karten:
- Gesamte Kontakte
- Gesamte Besucher
- Neue Kontakte heute
- Neue Besucher heute

### Diagramme:
- **Kontaktanfragen über Zeit** (Liniendiagramm)
- **Besucherstatistiken über Zeit** (Liniendiagramm)
- **Kontakt-Status Verteilung** (Doughnut-Chart)

### Zeiträume:
- Tagesansicht (letzte 30 Tage)
- Monatsansicht (letzte 12 Monate)
- Jahresansicht (letzte 5 Jahre)

### Verwaltung:
- **Kontakte verwalten**: Status ändern (Neu → In Bearbeitung → Abgeschlossen)
- **Besucherübersicht**: IP, Standort, Browser, Besuchszahlen

## Docker-Services

### PostgreSQL:
- **Port**: 5432
- **Database**: umzug_db
- **User**: umzug_user
- **Password**: umzug_password

### App:
- **Port**: 3000
- **Abhängigkeiten**: PostgreSQL

## Entwicklung

### Neue Features hinzufügen:
```bash
# Datenbank-Schema ändern
vim prisma/schema.prisma
npx prisma db push

# API-Endpunkt hinzufügen
mkdir -p src/app/api/new-endpoint
touch src/app/api/new-endpoint/route.ts
```

### Logs anzeigen:
```bash
# App-Logs
docker-compose logs -f app

# PostgreSQL-Logs
docker-compose logs -f postgres
```

### Datenbank verwalten:
```bash
# Prisma Studio öffnen
npm run db:studio

# Direkter PostgreSQL-Zugang
docker-compose exec postgres psql -U umzug_user -d umzug_db
```

## Produktion

### 1. Umgebungsvariablen anpassen:
```env
DATABASE_URL="postgresql://user:pass@your-postgres-host:5432/db"
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
```

### 2. Build und Deploy:
```bash
npm run build
docker-compose up -d
```

### 3. Sicherheit:
- Ändern Sie alle Standard-Passwörter
- Verwenden Sie HTTPS in der Produktion
- Konfigurieren Sie Firewall-Regeln
- Aktivieren Sie PostgreSQL-Backups

## Troubleshooting

### PostgreSQL-Verbindung:
```bash
# Container prüfen
docker-compose ps

# Verbindung testen
docker-compose exec postgres pg_isready -U umzug_user
```

### Prisma-Probleme:
```bash
# Client neu generieren
npx prisma generate

# Schema synchronisieren
npx prisma db push --force-reset
```

### Dependencies-Probleme:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Support

Bei Fragen oder Problemen:
1. Prüfen Sie die Logs: `docker-compose logs`
2. Überprüfen Sie die Umgebungsvariablen in `.env`
3. Stellen Sie sicher, dass PostgreSQL läuft
4. Prüfen Sie die Netzwerkverbindung
