import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB - Asam Abd Umzug',
  description: 'Allgemeine Geschäftsbedingungen von Asam Abd Umzug - Umzugsdienstleistungen in Hamm',
  robots: 'index, follow'
};

export default function AGB() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Geltungsbereich</h2>
              <p className="text-gray-600 mb-4">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Asam Abd 
                (nachfolgend "Auftragnehmer") und dem Kunden über Umzugsdienstleistungen. Abweichende 
                Bedingungen des Kunden werden nur wirksam, wenn sie vom Auftragnehmer schriftlich bestätigt werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Vertragsabschluss</h2>
              <p className="text-gray-600 mb-4">
                Der Vertrag kommt durch die Auftragsbestätigung des Auftragnehmers zustande. Kostenvoranschläge 
                sind unverbindlich, sofern nicht ausdrücklich als verbindlich bezeichnet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Leistungsumfang</h2>
              <p className="text-gray-600 mb-4">
                Der Umfang der zu erbringenden Leistungen ergibt sich aus der Auftragsbestätigung. 
                Zusätzliche Leistungen werden gesondert berechnet.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Transport von Möbeln und Hausrat</li>
                <li>Ein- und Auspackservice (auf Wunsch)</li>
                <li>Montage und Demontage von Möbeln</li>
                <li>Verpackungsmaterial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Preise und Zahlungsbedingungen</h2>
              <p className="text-gray-600 mb-4">
                Es gelten die zum Zeitpunkt der Auftragserteilung gültigen Preise. Die Zahlung erfolgt 
                nach Abschluss der Arbeiten. Bei größeren Aufträgen kann eine Anzahlung vereinbart werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Mitwirkungspflichten des Kunden</h2>
              <p className="text-gray-600 mb-4">Der Kunde ist verpflichtet:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Alle notwendigen Genehmigungen (Halteverbot, etc.) zu besorgen</li>
                <li>Wertsachen und wichtige Dokumente selbst zu transportieren</li>
                <li>Zerbrechliche Gegenstände entsprechend zu kennzeichnen</li>
                <li>Den Auftragnehmer über besondere Umstände zu informieren</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Haftung und Versicherung</h2>
              <p className="text-gray-600 mb-4">
                Der Auftragnehmer haftet für Schäden an Transportgut gemäß den gesetzlichen Bestimmungen 
                (§§ 451 ff. HGB). Die Haftung ist auf den vertraglich vereinbarten Umfang begrenzt. 
                Der Auftragnehmer verfügt über eine Betriebshaftpflichtversicherung, die Schäden am 
                Transportgut abdeckt.
              </p>
              <p className="text-gray-600 mb-4">
                Von der Haftung ausgeschlossen sind Schäden an Gegenständen, die der Kunde trotz 
                ausdrücklicher Empfehlung selbst verpackt hat, sowie Schäden durch höhere Gewalt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Schadensmeldung und Mängelrüge</h2>
              <p className="text-gray-600 mb-4">
                Schäden am Transportgut sind unverzüglich, spätestens jedoch innerhalb von 3 Werktagen nach 
                Abschluss des Umzugs, schriftlich beim Auftragnehmer anzuzeigen. Äußerlich erkennbare 
                Schäden sind bei der Anlieferung sofort zu reklamieren und im Lieferschein zu vermerken.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Zahlungsmodalitäten</h2>
              <p className="text-gray-600 mb-4">
                Die Zahlung erfolgt grundsätzlich nach Abschluss der vereinbarten Leistungen in bar oder 
                per Überweisung. Bei Aufträgen über 500 € kann eine Anzahlung von bis zu 30 % des 
                Auftragswertes vereinbart werden. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung 
                ohne Abzug zahlbar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Kündigung und Stornierung</h2>
              <p className="text-gray-600 mb-4">
                Eine Stornierung ist bis 48 Stunden vor dem vereinbarten Termin kostenfrei möglich. 
                Bei kurzfristigerer Stornierung können Kosten in Höhe von 50% der vereinbarten Vergütung anfallen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Salvatorische Klausel</h2>
              <p className="text-gray-600 mb-4">
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der 
                übrigen Bestimmungen unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Anwendbares Recht</h2>
              <p className="text-gray-600 mb-4">
                Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Hamm.
              </p>
            </section>

            <section className="border-t pt-4">
              <p className="text-sm text-gray-500">
                Stand: April 2026<br />
                Asam Abd, Fangstraße 72, 59077 Hamm
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
