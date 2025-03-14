'use client';

import { useEffect, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';

interface ClientFontsStylesheetProps {
  geistSans: { style: { fontFamily: string } };
  geistMono: { style: { fontFamily: string } };
}

export default function ClientFontsStylesheet({ 
  geistSans, 
  geistMono 
}: ClientFontsStylesheetProps) {
  // Use server-inserted HTML to ensure consistent rendering on both server and client
  useServerInsertedHTML(() => {
    return (
      <style 
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-geist-sans: ${geistSans.style.fontFamily};
              --font-geist-mono: ${geistMono.style.fontFamily};
            }
          `
        }}
      />
    );
  });
  
  // Also apply styles on the client side to ensure they're available
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return null as we're inserting the styles via useServerInsertedHTML
  return null;
}
