'use client';

interface ClientFontsStylesheetProps {
  geistSans: { style: { fontFamily: string } };
  geistMono: { style: { fontFamily: string } };
}

export default function ClientFontsStylesheet({ 
  geistSans, 
  geistMono 
}: ClientFontsStylesheetProps) {
  return (
    <style jsx global>{`
      :root {
        --font-geist-sans: ${geistSans.style.fontFamily};
        --font-geist-mono: ${geistMono.style.fontFamily};
      }
    `}</style>
  );
}
