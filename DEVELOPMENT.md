# 🚀 Asam Abd Umzugsservice - Entwicklung

## Schnellstart

```bash
# Alles automatisch einrichten
yarn dev:setup

# Development Server starten
yarn dev
```

## 🔧 Manuelle Einrichtung

### 1. Dependencies installieren
```bash
yarn install
```

### 2. Environment Variables
Kopieren Sie `.env.example` zu `.env` und passen Sie die Werte an:
```bash
cp .env.example .env
```

### 3. Datenbank starten
```bash
# PostgreSQL mit Docker
docker compose up postgres -d

# Schema pushen
yarn db:push

# Admin User erstellen
node create-admin.js
```

### 4. Development Server
```bash
yarn dev
```

## 🏥 Health Checks

- **Application**: http://localhost:3000/api/health
- **Database**: `docker compose logs postgres`

## 👤 Admin Zugang

- **URL**: http://localhost:3000/admin/login
- **Username**: ABO_FADI
- **Password**: Ma9495232ma+

## 🛠️ Verfügbare Scripts

```bash
# Development
yarn dev                    # Next.js dev server
yarn dev:setup            # Automatisches Setup

# Building
yarn build                 # Production build
yarn start                 # Production server

# Database
yarn db:push              # Schema zu DB pushen
yarn db:generate          # Prisma Client generieren
yarn db:migrate           # Migration ausführen
yarn db:studio            # Prisma Studio öffnen

# Code Quality
yarn lint                  # ESLint ausführen
yarn lint:fix             # ESLint auto-fix
yarn type-check           # TypeScript prüfen

# Security & Analysis
yarn security:audit       # Sicherheits-Audit
yarn analyze              # Bundle Analyzer
yarn deps:update          # Dependencies aktualisieren

# Docker
yarn docker:build         # Docker Image bauen
yarn docker:run           # Docker Container starten
yarn docker:stop          # Docker Container stoppen
yarn docker:logs          # Docker Logs anzeigen
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Container neu starten
docker compose down
docker compose up postgres -d

# Schema neu pushen
yarn db:push
```

### Build Errors
```bash
# Dependencies neu installieren
rm -rf node_modules yarn.lock
yarn install

# TypeScript Cache löschen
rm -rf .next
yarn build
```

### Port Already in Use
```bash
# Prozess auf Port 3000 finden und beenden
lsof -ti:3000 | xargs kill -9

# Oder anderen Port verwenden
PORT=3001 yarn dev
```

## 📊 Performance Monitoring

Das Projekt enthält Performance-Monitoring für:
- Core Web Vitals (LCP, FID, CLS)
- Page Load Times
- Bundle Size Analysis

```bash
# Bundle Analyse
yarn analyze

# Performance in Browser DevTools überprüfen
# Lighthouse für SEO & Performance
```

## 🔒 Sicherheit

- Alle kritischen Next.js Sicherheitsupdates installiert
- HTTPS-only in Produktion
- Sichere Headers konfiguriert
- Input Validation mit Zod
- SQL Injection Schutz durch Prisma

## 🌍 Deployment

### Vercel (Empfohlen)
```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel --prod
```

### Docker
```bash
# Production Build
yarn docker:build

# Container starten
yarn docker:run
```
