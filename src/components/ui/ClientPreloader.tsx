'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Preloader with SSR disabled
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });

export default function ClientPreloader() {
  return <Preloader />;
}
