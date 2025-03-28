import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientPreloader from "@/components/ui/ClientPreloader";
import ClientFontsStylesheet from "@/components/ui/ClientFontsStylesheet";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ThemeProvider from "@/components/ui/ThemeProvider";
import Script from 'next/script';
import ClientSchemaWrapper from "@/components/ui/ClientSchemaWrapper";
import AxeDevTools from "@/components/dev/AxeDevTools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0055B8', // Primary blue
  colorScheme: 'light',
};

const locales = ['en', 'es'];
const siteBaseUrl = "https://aeroprosthetics.com";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';

  return {
    metadataBase: new URL(siteBaseUrl),
    title: {
      default: "Aero Prosthetics | Advanced Prosthetic Solutions",
      template: "%s | Aero Prosthetics"
    },
    description: "Advanced prosthetic solutions with personalized care for improved mobility and quality of life",
    keywords: ["prosthetics", "orthotics", "medical devices", "mobility solutions", "healthcare"],
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    applicationName: "Aero Prosthetics",
    authors: [{ name: "Aero Prosthetics Team" }],
    creator: "Aero Prosthetics",
    publisher: "Aero Prosthetics",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
        { url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' },
        { url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [
        { url: '/apple-icon.png' },
        { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      type: "website",
      title: "Aero Prosthetics | Advanced Prosthetic Solutions",
      description: "Advanced prosthetic solutions with personalized care for improved mobility and quality of life",
      siteName: "Aero Prosthetics",
      url: siteBaseUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Aero Prosthetics - Advanced Prosthetic Solutions',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Aero Prosthetics | Advanced Prosthetic Solutions",
      description: "Advanced prosthetic solutions with personalized care for improved mobility and quality of life",
      site: '@YourTwitterHandle', 
      creator: '@CreatorTwitterHandle', 
      images: [
        { 
          url: '/twitter-image.png',
          alt: 'Aero Prosthetics - Advanced Prosthetic Solutions',
        }
      ],
    },
    verification: {
      // google: "verification-code",
      // yandex: "verification-code",
    },
  };
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params?.locale || 'en';

  return (
    // suppressHydrationWarning is necessary here because next-themes modifies
    // the className and potentially style attributes on the html tag client-side
    // after initial server render, causing a hydration mismatch.
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ClientFontsStylesheet geistSans={geistSans} geistMono={geistMono} />
        
        <ClientSchemaWrapper />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <ErrorBoundary>
          <ThemeProvider>
            <ClientPreloader />
            <div>{children}</div>
          </ThemeProvider>
        </ErrorBoundary>

        <Script
          strategy="lazyOnload"
          id="accessibility-script"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const clickableElements = document.querySelectorAll('.btn, .card-interactive, [role="button"]');
                clickableElements.forEach(element => {
                  if (!element.getAttribute('tabindex')) element.setAttribute('tabindex', '0');
                });
              });
            `
          }}
        />
        {process.env.NODE_ENV === 'development' && <AxeDevTools />}
      </body>
    </html>
  );
}
