# Implementation Plan

Dieses Dokument hält den aktuellen Sprint-Plan für die Conversion-, UI-, SEO- und Code-Optimierung fest, damit die Arbeit auf einem anderen PC direkt fortgesetzt werden kann.

## Ziel

In 1-2 Wochen messbar mehr qualifizierte Anfragen über Telefon, WhatsApp und Kontaktformular erzeugen.

## Sprint-Fokus

- Conversion zuerst: Hero, CTA, Trust, Kontaktformular
- SEO-Basis reparieren: robots, sitemap, metadata, Schema, hreflang
- Code-Risiken schließen: Consent, Auth, Validierung, sichere Secrets
- Deutsch und Englisch sauber vorbereiten

## Aktueller Status

### Bereits umgesetzt

- Mobile Floating CTA für Telefon und WhatsApp ist eingebunden.
- FAQ-Komponente ist auf der Startseite vorhanden.
- Kontaktformular wurde erweitert um Umzugsdatum sowie Von-/Nach-Ort.
- Strukturierte Daten werden auf der Startseite eingebunden.
- Produktionsdomain wird im Schema bereits verwendet.

### Noch offen

- GA4 und Conversion-Tracking fehlen noch.
- Consent/DSGVO-Trackingsteuerung fehlt noch.
- robots.txt blockiert weiter wichtige indexierbare Seiten.
- sitemap.xml enthält weiterhin nur die Startseite.
- Verification-Codes in Metadata sind weiterhin Platzhalter.
- DE/EN URL-Struktur mit echten Routen fehlt.
- hreflang/canonical sind nicht mit realen Sprachrouten synchronisiert.
- Hero nutzt noch das Logo statt eines echten Umzugs-/Team-Bildes.
- Reviews sind noch nicht auf glaubwürdige externe Social-Proof-Signale umgestellt.
- Dashboard-Stats-API ist noch nicht konsistent abgesichert.
- JWT nutzt noch ein unsicheres Fallback-Secret.
- API-Validierung und Lead-Verarbeitung sind noch nicht robust genug.

## Umsetzungsreihenfolge

### Phase 1: Baseline und Tracking

1. GA4 integrieren.
2. Events definieren und senden:
   - `phone_click`
   - `whatsapp_click`
   - `contact_submit`
   - `hero_cta_click`
   - `form_error`
3. Search Console verknüpfen.

### Phase 2: Kritische SEO-Fixes

1. `public/robots.txt` bereinigen:
   - Impressum, Datenschutz, AGB indexierbar lassen
   - `admin`, `api`, `_next` weiter sperren
2. `public/sitemap.xml` erweitern:
   - `/`
   - `/impressum`
   - `/datenschutz`
   - `/agb`
3. Verification-Tags mit echten Werten befüllen.
4. Metadata und Canonicals auf reale Routen abstimmen.

### Phase 3: Conversion-UI Quick Wins

1. Hero modernisieren:
   - echtes Team-/Fahrzeug-/Umzugsbild
   - stärkere Trust-Leiste
   - klare Reaktionszeitbotschaft
2. CTA-Tracking auf Hero und Floating CTA ergänzen.
3. Kontaktformular verbessern:
   - klarere Hilfetexte
   - bessere Success- und Error-Messages
   - Antwortzeit prominent darstellen
4. Reviews glaubwürdiger machen:
   - externe Plattform referenzieren
   - Datum / Verifikation ergänzen

### Phase 4: Sprach-SEO-Struktur

1. URL-basierte Sprachstruktur einführen:
   - `/de`
   - `/en`
2. `lang`, `canonical` und `hreflang` korrekt ausgeben.
3. Clientseitige Sprachlogik an URL-Routing anpassen.

### Phase 5: Reliability und Compliance

1. Tracking nur nach Einwilligung erlauben.
2. Consent-Banner oder Consent-Manager einführen.
3. Dashboard-Stats-API absichern.
4. JWT-Fallback-Secret entfernen.
5. Serverseitige Validierung für Kontakt- und Admin-APIs vereinheitlichen.
6. Kontakt-Mailfluss robuster machen.

### Phase 6: Content-Hebel

1. FAQ-Seite als eigene Route veröffentlichen.
2. Eine Umzugscheckliste veröffentlichen.
3. Einen lokalen Ratgeber veröffentlichen, z. B. `Umzug in Dortmund`.

## Betroffene Dateien

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/Hero.tsx`
- `src/components/FloatingCTA.tsx`
- `src/components/Contact.tsx`
- `src/components/Reviews.tsx`
- `src/components/FAQ.tsx`
- `src/hooks/useVisitorTracking.ts`
- `src/app/api/track-visitor/route.ts`
- `src/app/api/admin/dashboard-stats/route.ts`
- `src/app/api/contact/route.ts`
- `src/lib/metadata.ts`
- `src/lib/schema.ts`
- `src/lib/auth.ts`
- `src/contexts/LanguageContext.tsx`
- `public/robots.txt`
- `public/sitemap.xml`

## Definition of Done

- Lighthouse Mobile und Desktop verbessert.
- Rich Results Test für LocalBusiness und FAQ ohne Fehler.
- Search Console indexiert alle wichtigen Seiten.
- CTA-Events sind in GA4 sichtbar.
- Tracking ohne Consent ist blockiert.
- Admin-Stats ohne Auth nicht erreichbar.
- DE- und EN-Routen funktionieren mit korrektem `lang` und `hreflang`.

## Empfohlene nächste Umsetzung

1. SEO-Basis fixen.
2. Consent + Auth absichern.
3. DE/EN Routing sauber aufbauen.
4. Hero und Reviews auf echten Conversion-Standard bringen.