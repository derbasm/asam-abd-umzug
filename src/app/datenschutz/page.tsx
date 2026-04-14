import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Asam Abd Umzug',
  description: 'Datenschutzerklärung von Asam Abd Umzug - Informationen zum Umgang mit Ihren Daten',
  robots: 'index, follow'
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2">Allgemeine Hinweise</h3>
              <p className="text-gray-600 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Datenerfassung auf unserer Website</h3>
              <p className="text-gray-600 mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>
              
              <p className="text-gray-600 mb-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Verantwortlicher</h2>
              <div className="text-gray-600">
                <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist:</p>
                <p className="mt-2">
                  <strong>Asam Abd</strong><br />
                  Fangstraße 72<br />
                  59077 Hamm<br />
                  Deutschland<br />
                  Telefon: +49 176 80248293<br />
                  E-Mail: asamabdumzug@gmail.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Rechtsgrundlagen der Verarbeitung</h2>
              <p className="text-gray-600 mb-4">
                Wir verarbeiten Ihre personenbezogenen Daten auf Grundlage folgender Rechtsgrundlagen:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</strong> – z.B. bei der Nutzung von Analyse-Cookies nach Ihrer Zustimmung.</li>
                <li><strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)</strong> – wenn die Verarbeitung zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen (z.B. Kontaktanfrage) erforderlich ist.</li>
                <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)</strong> – z.B. für die Sicherheit unserer Website, die Analyse anonymer Nutzungsstatistiken und die Spam-Prävention.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Datenerfassung auf unserer Website</h2>
              
              <h3 className="text-lg font-medium text-gray-700 mb-2">Server-Log-Dateien</h3>
              <p className="text-gray-600 mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Kontaktformular</h3>
              <p className="text-gray-600 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Datenempfänger</h3>
              <p className="text-gray-600 mb-4">
                Ihre über das Kontaktformular übermittelten Daten werden auf unserem Server gespeichert und per E-Mail 
                an uns weitergeleitet. Darüber hinaus können folgende Empfänger Zugriff auf Ihre Daten haben:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li><strong>Hosting-Provider:</strong> Unsere Website wird auf Servern gehostet, die personenbezogene Daten in unserem Auftrag verarbeiten (Auftragsverarbeitung gem. Art. 28 DSGVO).</li>
                <li><strong>E-Mail-Provider:</strong> Für den Versand von Bestätigungs-E-Mails nutzen wir einen externen E-Mail-Dienst.</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Speicherdauer</h3>
              <p className="text-gray-600 mb-4">
                Ihre Kontaktformulardaten werden für die Dauer der Bearbeitung Ihrer Anfrage und darüber hinaus für 
                den Fall von Anschlussfragen gespeichert. Spätestens nach 12 Monaten ohne weitere Kommunikation werden 
                die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                Server-Log-Dateien werden nach 14 Tagen automatisch gelöscht.
                Besucher-Statistiken (anonymisiert) werden für 12 Monate gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Cookies und Analyse-Tools</h2>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Cookies</h3>
              <p className="text-gray-600 mb-4">
                Unsere Website verwendet technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. 
                Darüber hinaus setzen wir Analyse-Cookies nur ein, wenn Sie dem über unseren Cookie-Banner ausdrücklich 
                zugestimmt haben (Opt-in).
              </p>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Google Analytics</h3>
              <p className="text-gray-600 mb-4">
                Mit Ihrer Einwilligung nutzen wir Google Analytics 4 (GA4), einen Webanalysedienst der Google Ireland 
                Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies, die eine 
                Analyse der Benutzung der Website ermöglichen. Die durch den Cookie erzeugten Informationen werden in 
                der Regel an einen Server von Google übertragen und dort gespeichert. Die IP-Anonymisierung ist aktiviert. 
                Sie können Ihre Einwilligung jederzeit über den Cookie-Banner auf unserer Website widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Ihre Rechte</h2>
              <div className="text-gray-600">
                <p className="mb-4">Sie haben folgende Rechte:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Recht auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
                  <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
                  <li>Recht auf Löschung Ihrer bei uns gespeicherten Daten</li>
                  <li>Recht auf Einschränkung der Datenverarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Widerspruchsrecht gegen die Verarbeitung Ihrer Daten</li>
                  <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Aufsichtsbehörde</h2>
              <p className="text-gray-600 mb-4">
                Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:
              </p>
              <div className="text-gray-600 mb-4">
                <p><strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong></p>
                <p>Postfach 20 04 44</p>
                <p>40102 Düsseldorf</p>
                <p>Telefon: +49 211 38424-0</p>
                <p>E-Mail: poststelle@ldi.nrw.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Kontakt</h2>
              <p className="text-gray-600">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
                E-Mail: asamabdumzug@gmail.com<br />
                Telefon: +49 176 80248293
              </p>
            </section>

            <section className="border-t pt-4">
              <p className="text-sm text-gray-500">
                Stand: April 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
