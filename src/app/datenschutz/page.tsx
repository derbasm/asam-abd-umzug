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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Datenerfassung auf unserer Website</h2>
              
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
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Ihre Rechte</h2>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Kontakt</h2>
              <p className="text-gray-600">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
                E-Mail: asamabdumzug@gmail.com<br />
                Telefon: +49 176 80248293
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
