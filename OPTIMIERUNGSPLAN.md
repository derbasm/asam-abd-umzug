# Optimierungsplan 2026 – Asam Abd Umzug

## Zielbild

Die Seite wird zu einer schnellen, vertrauenswürdigen und messbar konvertierenden lokalen
Lead-Website. Jeder Pull Request wird automatisch geprüft; `main` erzeugt ein signiertes,
unveränderliches Container-Image und stellt exakt dieses Image auf dem Produktionsserver
bereit. Datenbank, Zugangsdaten und Kundendaten bleiben ausschließlich auf dem Server.

## Ist-Analyse (19. Juli 2026)

| Bereich | Beobachtung | Priorität |
| --- | --- | --- |
| Laufzeit | Next.js 14.2.30, React 18 und Node 18 im Image; Node 18 ist seit März 2025 EOL. | P0 |
| Paketverwaltung | `yarn.lock`, Yarn-Skripte und ein Docker-Fallback für drei Paketmanager. Builds sind nicht eindeutig reproduzierbar. | P0 |
| CI/CD | Keine GitHub Actions. Der aktuelle `deploy.sh` stoppt erst die gesamte Anwendung, baut auf dem Server und nutzt `prisma db push`. | P0 |
| Datenbank | Eine Migration existiert, aber Produktion nutzt `db push` statt versionierter `prisma migrate deploy`. | P0 |
| Security | Headers vorhanden; kein CSP, In-Memory-Rate-Limit nicht instanzübergreifend, PostgreSQL ist nach außen veröffentlicht. | P0 |
| Qualität | `next build` ignoriert ESLint; keine Tests, keine Accessibility- oder Security-Gates. | P1 |
| SEO | Gute Metadaten/Schema-Basis, aber statische Sitemap mit zukünftig falschem Datum, redundante JSON-LD-Ausgabe und keine dedizierten Leistungs-/Ortsseiten. | P1 |
| UX/Content | Eine lange One-Page; Anfragepfad und Vertrauensbeweise können klarer und messbar verbessert werden. | P1 |
| Observability | Health-Endpunkt vorhanden, aber keine Fehlerüberwachung, Uptime-Monitoring, Backups oder Release-/Conversion-Metriken. | P1 |

## Reihenfolge und Abnahmekriterien

### Phase 0 – Risiken eliminieren (Woche 1)

1. **Keine Zugangsdaten im Repository oder in CI.** `.env` nur auf dem Server; GitHub erhält ausschließlich SSH-Schlüssel, Host, Port, Benutzer und einen auf `read:packages` begrenzten GHCR-Token.
2. **Datenbank absichern.** Postgres-Port aus der öffentlichen Compose-Datei entfernen, Firewall auf 80/443/SSH mit IP-Allowlist beschränken, tägliche verschlüsselte Dumps off-server speichern und eine Restore-Übung dokumentieren.
3. **Migrationspolitik festlegen.** Jede Schemaänderung erhält lokal eine Prisma-Migration; Produktion verwendet nur `prisma migrate deploy`. `db push`, automatische Admin-Passwörter und `docker compose down` werden aus dem Produktionsweg entfernt.
4. **Branch Protection.** `main`: Pull Request erforderlich, mindestens ein Review, keine Force-Pushes, die CI-Checks `quality` und `container` verpflichtend, GitHub-Environment `production` mit Freigabe.

Abnahme: Restore eines anonymisierten Backups gelingt; ein fehlgeschlagenes Deployment lässt die laufende Version verfügbar; keine Datenbank ist aus dem Internet erreichbar.

### Phase 1 – Reproduzierbare Toolchain (Woche 1–2)

1. **Auf pnpm umstellen.** `corepack` aktivieren, `packageManager: "pnpm@<fixierte Version>"` ergänzen, mit `pnpm import` aus `yarn.lock` eine `pnpm-lock.yaml` erzeugen, `yarn.lock` erst nach einem sauberen Vergleich entfernen.
2. **Einheitliche Befehle.** `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm build`, `pnpm audit --audit-level=high`. Alte Yarn-Skripte entfernen.
3. **Node aktualisieren.** Docker und CI zunächst auf Node 22 LTS (breit kompatibler Übergang); anschließend nach erfolgreichem Upgrade Node 24 LTS. Node 18 nicht weiter verwenden.
4. **Framework gestuft aktualisieren.** Zuerst Next 14 aktuell patchen und Warnungen lösen, dann getrennte PR für Next 16 + React 19. Dabei `next lint` durch ESLint-CLI ersetzen, `middleware.ts` zu `proxy.ts` migrieren und `images.domains` zu engen `remotePatterns` umstellen. Keine Major-Version ohne Lighthouse-, Formular-, Login- und Admin-Regressionstest.
5. **Docker vereinfachen.** Nur pnpm im Dockerfile, Cache-Mount für pnpm, festes Node-Alpine-Digest, Build als non-root und nur Next-Standalone plus Prisma-Artefakte im Runtime-Image.

Abnahme: Frischer Checkout baut lokal und in CI byte-/versionsgleich aus Lockfile; Build beendet sich bei TypeScript-, ESLint- oder Prisma-Fehlern.

### Phase 2 – Qualität, Security und Datenschutz (Woche 2–3)

1. **Tests.** Vitest für Validation/Auth/Metadata/API, Playwright für Anfrage (inkl. Honeypot), Login/Logout und die wichtigsten DE/EN-Seiten. Testdatenbank als CI-Service verwenden.
2. **Gates.** ESLint mit Fehlern statt Warnungen für neue Dateien, Typecheck, Unit/E2E, Build, Trivy-Image-Scan, `pnpm audit`, Dependabot (Actions, npm, Docker) und Secret-Scanning aktivieren.
3. **HTTP-Schutz.** Strikte CSP zunächst im `Report-Only`-Modus messen und danach erzwingen: keine unsicheren Inline-Skripte; Nonce für unvermeidbare JSON-LD-/Analytics-Skripte. Zusätzlich HSTS (erst nach bestätigtem HTTPS), `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` und `frame-ancestors 'none'`.
4. **Auth und API.** Cookie `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, kurze JWT-Lebensdauer plus sichere Logout-Invalidierung; Login-Rate-Limit getrennt und restriktiver. IP nur hinter einem vertrauenswürdigen Reverse Proxy aus dessen Header beziehen.
5. **Rate-Limits/Spam.** In-Memory-Maps durch Redis/Upstash oder Rate-Limit am Reverse Proxy ersetzen; pro Route Limits, Body-Größenlimits und hCaptcha/Turnstile für das Kontaktformular. Keine Roh-IP länger speichern als für den klar dokumentierten Zweck nötig; Anonymisierung und Löschfristen umsetzen.
6. **Datenzugriff.** Admin-Routen neben Middleware in jeder Route serverseitig autorisieren, Least-Privilege-DB-User nutzen, SMTP-Credentials rotieren und Security-/Datenschutztexte rechtlich prüfen lassen.

Abnahme: OWASP-Basischeck ohne kritische Befunde; Kontaktformular widersteht Spam-Test; kein Tracking/Analytics vor wirksamer Einwilligung.

### Phase 3 – Conversion, UX und Inhalt (Woche 3–5)

1. **Angebotspfad.** Hero mit Ort, Leistung, klarer Antwortzeit und einem primären CTA „Kostenloses Angebot anfordern“; sekundär „Jetzt anrufen“. Auf Mobilgeräten feste, gut erreichbare Call-/Anfrage-Leiste.
2. **Formular.** Drei kurze Schritte: Umzugsart → Eckdaten (Datum, von/nach, Wohnfläche/Etage/Aufzug) → Kontakt. Fortschritt, sofort verständliche Feldfehler, Rückrufzeit und erwartete Antwortzeit anzeigen. Telefonlink und WhatsApp nur nach Einwilligungs-/Datenschutzprüfung.
3. **Vertrauen.** Echte, überprüfbare Bewertungen mit Quelle/Datum, Versicherung/Qualifikation nur falls belegbar, Team-/Fahrzeugbilder, klarer Ablauf („Anfrage → Besichtigung → Festpreis → Umzug“), transparente Preislogik statt pauschaler Lockpreise.
4. **Informationsarchitektur.** One-Page als Einstieg behalten, aber indexierbare Seiten für Privatumzug, Firmenumzug, Entrümpelung, Möbelmontage und seriöse Orts-/Einzugsgebiete erstellen. Jede Seite benötigt einzigartigen Nutzen, reale lokale Referenzen/FAQ und interne Links – keine austauschbaren Stadtseiten.
5. **Accessibility.** Semantische Überschriftenhierarchie, sichtbarer Tastaturfokus, Skip-Link, Dialog-Fokusfalle, Alternativtexte, Kontrast AA, `prefers-reduced-motion`, Formularlabels und Fehlerzusammenfassung. Automatisch mit axe prüfen, manuell mit Tastatur/Screenreader testen.
6. **Messung.** Matomo oder GA4 erst nach Consent; Events für Telefonklick, Form-Start, Schrittwechsel, erfolgreiche Anfrage und Sprachwechsel. Monatlich Conversion-Rate nach Kanal/Gerät auswerten; A/B-Tests nur bei ausreichendem Traffic.

Abnahme: Anfrage ist mobil in unter zwei Minuten ausfüllbar; Lighthouse Accessibility mindestens 95; Conversion-Funnel liefert datenschutzkonforme Daten.

### Phase 4 – Performance und SEO (Woche 4–6)

1. **Messbare Budgets.** Mobil p75: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1; JS der Startseite begrenzen und mit Bundle-Analyzer je Release vergleichen. Real User Monitoring und Search Console als Quelle für Felddaten.
2. **Rendering.** Komponenten nur dann clientseitig laden, wenn Interaktion nötig ist. Derzeit erzeugen viele dynamisch importierte, oberhalb/nahe dem Fold liegende Sektionen leere Skeletons; Server Rendering und gezieltes Lazy-Loading für Galerie/Charts einsetzen. Chart.js ausschließlich fürs Admin-Dashboard laden.
3. **Medien.** Echte Hero-/OG-Bilder im passenden Seitenverhältnis, AVIF/WebP, feste `width`/`height`, responsive `sizes`, LCP-Hero mit `priority`; Bilder vor Commit prüfen (Größe, Dateiname, Alt-Text). Caching für versionierte Assets ein Jahr, HTML kurz.
4. **SEO-Technik.** `metadataBase` zentral setzen; `app/robots.ts` und `app/sitemap.ts` dynamisch generieren statt handgepflegter XML. In jeder URL vollständige gegenseitige `hreflang`-Links inklusive `x-default`, kanonische URLs und korrekte HTTP-301-Weiterleitungen `/` → bevorzugte Sprachroute. Keine `Crawl-delay`-Anweisung nötig.
5. **Strukturierte Daten.** Pro Seite genau passendes, valides JSON-LD: `LocalBusiness`/`MovingCompany`, `WebSite`, Breadcrumbs und FAQ nur bei sichtbaren Fragen. Doppelte Ausgabe im Root-Layout und den Seiten entfernen. Mit Rich Results Test prüfen.
6. **Local SEO.** Google Business Profile vollständig und konsistent halten (Name/Adresse/Telefon/Öffnungszeiten/Leistungen), echte Bewertungsroutine aufbauen, lokale Erwähnungen/Backlinks und monatliche Search-Console-Checks auf Indexierung, Queries, 404 und Core Web Vitals.

Abnahme: keine Sitemap- oder hreflang-Fehler; mobile Felddaten erfüllen die Budgets; organische Landingpages haben eindeutige Intention und keine Content-Duplikate.

### Phase 5 – Betrieb und Delivery (fortlaufend)

1. GitHub Actions in `.github/workflows/pipeline.yml` liefert CI für PRs und einen Produktions-Release bei Push nach `main`.
2. Das veröffentlichte Image erhält SHA- und `main`-Tags, SBOM/Provenance sowie einen Vulnerability-Scan. Der Server zieht nur den SHA-Tag.
3. Produktionsdeployment läuft im GitHub-Environment `production` auf dem Self-hosted Runner des Produktionsservers, ist über `concurrency` serialisiert, führt zuerst `prisma migrate deploy` aus, startet dann den neuen Container und prüft `/api/health`.
4. Der Server enthält einmalig `docker-compose.production.yml`, eine nur dort gespeicherte `.env.production` und einen dedizierten Deploy-Nutzer. Ein Rollback ist `APP_IMAGE=ghcr.io/...:<vorheriger-sha> docker compose -f docker-compose.production.yml up -d`.
5. Monitoring: externer HTTPS-Uptime-Check, Error-Tracking (z. B. Sentry), tägliches DB-Backup mit Alarm, Logrotation, monatlicher Patch- und Restore-Tag.

## CI/CD-Ablauf

```text
Pull Request ──> install aus Lockfile ──> lint + typecheck + Tests ──> Build ──> Container-Scan
                                                                                   │
main (nur grün) ───────────────────────────────────────────────────────────────────┘
       │
       ├─> Image nach ghcr.io/<owner>/asam-abd-umzug:<commit-sha>
       ├─> Production-Freigabe
       └─> SSH: pull → migrate deploy → start exakt dieses Image → Healthcheck
```

### Einmalige Produktionsvorbereitung

1. Repository-Container-Package auf **privat** oder bewusst öffentlich setzen. Bei privatem Package einen GitHub Classic PAT mit ausschließlich `read:packages` auf dem Server anlegen.
2. Den Self-hosted Runner als eingeschränkten Benutzer `deploy` betreiben und ihm ausschließlich Zugriff auf das Verzeichnis, z. B. `/srv/asam-abd-umzug`, sowie die Docker-Gruppe geben.
3. Dort diese Repository-Datei `docker-compose.production.yml` sowie die nicht versionierte Datei `.env.production` ablegen. In `.env.production`: `DATABASE_URL=postgresql://…@postgres:5432/…`, Datenbank- und SMTP-Werte, lange zufällige Auth-Secrets und `GHCR_USERNAME`/`GHCR_TOKEN`. `APP_IMAGE` wird bewusst nur vom Workflow gesetzt.
4. In GitHub unter **Settings → Environments → production** Schutzregel (Reviewer) und diese Secrets anlegen: `DEPLOY_PATH`, `GHCR_USERNAME`, `GHCR_READ_TOKEN`.
5. Anschließend den Workflow einmal manuell per `workflow_dispatch` testen.

> Die gelieferte Pipeline ist absichtlich nicht „blind“ aktivierbar: Ohne diese Secrets und die einmalige Servervorbereitung kann und soll kein Deployment stattfinden.

## Kennzahlen und Rhythmus

| Rhythmus | Verantwortliche Kontrolle |
| --- | --- |
| Jede PR | CI, Review, Security-Scan, Preview/Lighthouse |
| Wöchentlich | Abhängigkeiten, Uptime, fehlgeschlagene Formular-E-Mails |
| Monatlich | Search Console, Core Web Vitals, Leads/Conversion, Backups-Restore-Stichprobe |
| Quartalsweise | Berechtigungen/Secrets, Datenschutz-Löschlauf, Pentest-Light, Framework-Upgrades |

## Quellen zur Aktualität

Next.js 16 setzt Node 20.9+ voraus und ersetzt u. a. `next lint`; die Migration ist daher
bewusst als eigener, testbarer Schritt geplant. [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
empfehlen das Upgrade per Codemod. Node 22 und 24 sind LTS, Node 18 ist EOL.
[Node.js Release Schedule](https://nodejs.org/en/about/previous-releases). Das Image-Pattern
orientiert sich an der offiziellen [GitHub-Dokumentation zum Veröffentlichen von Docker-Images](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images).
