import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the English version of the homepage
  redirect('/en');
}
