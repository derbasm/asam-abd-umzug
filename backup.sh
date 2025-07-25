#!/bin/bash

# PostgreSQL Backup Script für Production
# Führt automatische Backups durch und speichert sie mit Timestamp

set -e

# Konfiguration
DB_NAME="umzug_db"
DB_USER="umzug_user" 
DB_HOST="localhost"
DB_PORT="5432"
BACKUP_DIR="./backups"
RETENTION_DAYS=30

# Erstelle Backup Directory falls es nicht existiert
mkdir -p "$BACKUP_DIR"

# Timestamp für Backup-Datei
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/umzug_backup_$TIMESTAMP.sql"

echo "🚀 Starte PostgreSQL Backup..."
echo "📅 Timestamp: $TIMESTAMP"
echo "📁 Backup-Datei: $BACKUP_FILE"

# Führe Backup durch
if docker compose exec -T postgres pg_dump -U "$DB_USER" -h localhost -p 5432 "$DB_NAME" > "$BACKUP_FILE"; then
    echo "✅ Backup erfolgreich erstellt: $BACKUP_FILE"
    
    # Komprimiere Backup
    gzip "$BACKUP_FILE"
    echo "🗜️  Backup komprimiert: $BACKUP_FILE.gz"
    
    # Lösche alte Backups (älter als RETENTION_DAYS)
    find "$BACKUP_DIR" -name "umzug_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    echo "🧹 Alte Backups gelöscht (älter als $RETENTION_DAYS Tage)"
    
    # Zeige verfügbare Backups
    echo "📋 Verfügbare Backups:"
    ls -lh "$BACKUP_DIR"/umzug_backup_*.sql.gz 2>/dev/null || echo "   Keine Backups gefunden"
    
else
    echo "❌ Backup fehlgeschlagen!"
    exit 1
fi

echo "✨ Backup-Prozess abgeschlossen!"
