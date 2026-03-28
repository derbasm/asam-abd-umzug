import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to German version as default language
  redirect('/de');
}
