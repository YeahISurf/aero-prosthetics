import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientPreloader from "@/components/ui/ClientPreloader";
import ClientFontsStylesheet from "@/components/ui/ClientFontsStylesheet";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ThemeProvider from "@/components/ui/ThemeProvider";
import Script from 'next/script';
import ClientSchemaWrapper from "@/components/ui/ClientSchemaWrapper";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://aeroprosthetics.com"),
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
    icon: '/favicon.ico',
    // Only reference assets that exist
    // apple: '/apple-icon.png', // This was causing a 404 if the file doesn't exist
  },
  openGraph: {
    type: "website",
    title: "Aero Prosthetics | Advanced Prosthetic Solutions",
    description: "Advanced prosthetic solutions with personalized care for improved mobility and quality of life",
    siteName: "Aero Prosthetics",
    url: "https://aeroprosthetics.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aero Prosthetics | Advanced Prosthetic Solutions",
    description: "Advanced prosthetic solutions with personalized care for improved mobility and quality of life",
  },
  verification: {
    // google: "verification-code", // Add when available
    // yandex: "verification-code", // Add when available
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0055B8', // Primary blue
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <ClientFontsStylesheet geistSans={geistSans} geistMono={geistMono} />
        
        {/* Use client wrapper for schema.org script */}
        <ClientSchemaWrapper />
        
        {/* Add hydration error debugging - will help identify the problem */}
        <Script
          id="hydration-debug"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Log detailed hydration errors
              const originalConsoleError = console.error;
              console.error = function() {
                if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Hydration failed')) {
                  console.log('[HYDRATION DEBUG]', arguments[0]);
                  const stack = new Error().stack || '';
                  console.log('[HYDRATION STACK]', stack);
                  
                  // Try to extract node info
                  try {
                    const nodeInfo = arguments[1] && arguments[1].parentNode ? {
                      nodeType: arguments[1].nodeType,
                      nodeName: arguments[1].nodeName,
                      id: arguments[1].id,
                      className: arguments[1].className,
                      childNodes: arguments[1].childNodes.length
                    } : 'No node info';
                    console.log('[HYDRATION NODE]', nodeInfo);
                  } catch (e) {
                    console.log('[HYDRATION NODE] Error getting node info:', e);
                  }
                }
                return originalConsoleError.apply(console, arguments);
              };
            `
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-gray-900" suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            {/* Use a client-only wrapper for the preloader */}
            <ClientPreloader />
            {/* Wrap children in div with suppressHydrationWarning */}
            <div suppressHydrationWarning>{children}</div>
          </ThemeProvider>
        </ErrorBoundary>

        {/* Move accessibility script to lazyOnload */}
        <Script
          strategy="lazyOnload"
          id="accessibility-script"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                if (!document.querySelector('main')) {
                  const mainContent = document.querySelector('#main-content');
                  if (mainContent) mainContent.setAttribute('role', 'main');
                }
                
                const clickableElements = document.querySelectorAll('.btn, .card-interactive, [role="button"]');
                clickableElements.forEach(element => {
                  if (!element.getAttribute('tabindex')) element.setAttribute('tabindex', '0');
                });
              });
            `
          }}
        />
      </body>
    </html>
  );
}
