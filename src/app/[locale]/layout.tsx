import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchemaScript from "@/components/ui/SchemaScript";
import SkipToContent from "@/components/ui/SkipToContent";
import { generateMedicalOrganizationSchema, organizationData } from "@/lib/seo/schema";

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
  } catch {
    notFound();
  }

  // Generate organization schema
  const organizationSchema = generateMedicalOrganizationSchema(organizationData);

  return (
    <>
      <SchemaScript schema={organizationSchema} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}
