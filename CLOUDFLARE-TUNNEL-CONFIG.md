# Cloudflare Tunnel Konfiguration

## Aktualisierte Konfiguration (26. Juli 2025)

### Domain-Zuordnungen:
- **adam-umzug.de** & **www.adam-umzug.de** → Port 3000
## 🌐 Domain Routing

- **asamabd-umzug.de** & **www.asamabd-umzug.de** → Port 5000 ✨ NEU
- **mouhanad.derbas.de** → Port 4000

### Tunnel Details:
- **Tunnel ID:** ed530991-1668-4995-ae09-98f94c68d435
- **Konfigurationsdatei:** /etc/cloudflared/config.yml
- **Service Status:** Aktiv und läuft

### Neue Domain hinzugefügt:
- Domain: `asamabd-umzug.de`
- Service: Asam Abd Umzugsservice
- Port: 5000 (Docker Container)
- Subdomain: www.asamabd-umzug.de ebenfalls unterstützt

### Validierung:
✅ Tunnel-Konfiguration validiert
✅ Service erfolgreich neu gestartet
✅ Ingress Rules funktionieren
✅ Docker Container läuft auf Port 5000

### Nächste Schritte:
1. DNS-Einträge für asamabd-umzug.de in Cloudflare konfigurieren
2. CNAME-Record für www.asamabd-umzug.de hinzufügen  
3. SSL/TLS-Zertifikate werden automatisch von Cloudflare verwaltet

### ✨ SEO-Optimierung implementiert:
- **Erweiterte Metadata**: Lokale Keywords, Open Graph, Twitter Cards
- **Strukturierte Daten**: LocalBusiness, FAQ, Breadcrumb Schema
- **Sitemap.xml**: Vollständige Seitenstruktur für Suchmaschinen
- **Robots.txt**: Optimierte Crawler-Anweisungen
- **Manifest.json**: PWA-optimiert mit Shortcuts und Screenshots
- **Geo-Targeting**: Hamm, NRW, Deutschland spezifische Keywords

### Backup:
- Backup der alten Konfiguration: /etc/cloudflared/config.yml.backup
