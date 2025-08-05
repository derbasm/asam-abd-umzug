import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - Asam Abd Umzug',
  description: 'Impressum und Kontaktdaten von Asam Abd Umzug - Ihr Umzugsunternehmen in Hamm',
  robots: 'index, follow'
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Angaben gemäß § 5 TMG</h2>
              <div className="text-gray-600">
                <p><strong>Asam Abd</strong></p>
                <p>Fangstraße 72</p>
                <p>59077 Hamm</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Kontakt</h2>
              <div className="text-gray-600">
                <p><strong>Telefon:</strong> +49 176 80248293</p>
                <p><strong>E-Mail:</strong> asamabdumzug@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-gray-600">
                <p>Asam Abd</p>
                <p>Fangstraße 72</p>
                <p>59077 Hamm</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Urheberrecht</h2>
              <p className="text-gray-600">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors 
                bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
