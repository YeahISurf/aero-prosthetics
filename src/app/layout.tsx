import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientPreloader from "@/components/ui/ClientPreloader";
import ClientFontsStylesheet from "@/components/ui/ClientFontsStylesheet";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ThemeProvider from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aero Prosthetics",
  description: "Advanced prosthetic solutions with personalized care",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: '/favicon.ico',
    // Only reference assets that exist
    // apple: '/apple-icon.png', // This was causing a 404 if the file doesn't exist
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
      <head>
        <ClientFontsStylesheet geistSans={geistSans} geistMono={geistMono} />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <ClientPreloader />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
