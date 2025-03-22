import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ThemeProvider from "@/components/ui/ThemeProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";
import PullToRefresh from "@/components/ui/PullToRefresh";
import SchemaScript from "@/components/ui/SchemaScript";
import SkipToContent from "@/components/ui/SkipToContent";
import { generateMedicalOrganizationSchema, organizationData } from "@/lib/seo/schema";
import TranslationErrorHandler from "@/components/layout/TranslationErrorHandler";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  // Await the params object
  const { locale } = await params;
  
  // Validate locale
  const isValidLocale = ["en", "es"].includes(locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    
    // Attempt to fall back to English if another locale fails
    if (locale !== 'en') {
      try {
        messages = (await import(`../../../locales/en.json`)).default;
        console.info(`Falling back to 'en' locale for missing locale: ${locale}`);
      } catch {
        notFound();
      }
    } else {
      notFound();
    }
  }

  // Generate organization schema
  const organizationSchema = generateMedicalOrganizationSchema(organizationData);

  return (
    <>
      <ErrorBoundary>
        <SchemaScript schema={organizationSchema} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <TranslationErrorHandler>
              <SkipToContent />
              <Header />
              <PullToRefresh>
                <main id="main-content" className="flex-grow pb-16 md:pb-0">{children}</main>
              </PullToRefresh>
              <Footer />
              <MobileNavBar />
            </TranslationErrorHandler>
          </ThemeProvider>
        </NextIntlClientProvider>
      </ErrorBoundary>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}
