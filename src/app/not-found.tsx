import { redirect } from 'next/navigation';

export default function GlobalNotFound() {
  // Redirect to the default locale's 404 page
  redirect('/en/not-found-page');
} 