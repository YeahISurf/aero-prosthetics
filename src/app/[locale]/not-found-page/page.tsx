import NotFound from '../not-found';
import { unstable_setRequestLocale } from 'next-intl/server';

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NotFoundTestPage({ params }: Props) {
  // Get the locale from Promise
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // This page directly renders the NotFound component
  return <NotFound />;
} 