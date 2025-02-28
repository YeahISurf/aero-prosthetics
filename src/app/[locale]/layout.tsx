import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaScript from "@/components/ui/SchemaScript";
import SkipToContent from "@/components/ui/SkipToContent";
import { generateMedicalOrganizationSchema, organizationData } from "@/lib/seo/schema";
import "../../app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    themeColor: '#0055B8', // Primary blue
    colorScheme: 'light',
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Validate locale
  const isValidLocale = ["en", "es"].includes(locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch {
    notFound();
  }

  // Generate organization schema
  const organizationSchema = generateMedicalOrganizationSchema(organizationData);

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <SchemaScript schema={organizationSchema} />
      </head>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipToContent />
          <Header />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}
