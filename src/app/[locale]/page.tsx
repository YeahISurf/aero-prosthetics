import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import HeroSection from "@/components/sections/HeroSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationsSection from "@/components/sections/LocationsSection";
import CTASection from "@/components/sections/CTASection";

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: Promise<{ locale: string }>;
};

// Define site base URL (can be moved to a config file later)
const siteBaseUrl = "https://aeroprosthetics.com"; 
const locales = ['en', 'es']; // Define supported locales here

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale || 'en'; // Ensure locale is defined
  const t = await getTranslations({ locale: currentLocale, namespace: "meta" });
  
  // Removed header-based pathname and canonicalUrl derivation
  // const headersList = headers();
  // const pathname = headersList.get('x-next-pathname') || '';
  // const canonicalUrl = `${siteBaseUrl}${pathname}`;

  // Derive relative paths from locale
  const canonicalRelativePath = `/${currentLocale}`;
  const languageAlternates: { [key: string]: string } = {};
  locales.forEach(loc => {
    languageAlternates[loc] = `/${loc}`;
  });

  const pageTitle = t("title");
  const pageDescription = t("description");

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalRelativePath, // Use relative canonical path
      languages: languageAlternates,    // Use relative language paths
    },
    openGraph: {
      title: pageTitle, 
      description: pageDescription, 
      url: `${siteBaseUrl}${canonicalRelativePath}`, // Use absolute URL for OG
      // ... existing OG images etc. ...
    },
    twitter: {
      title: pageTitle, // Use page title
      description: pageDescription, // Use page description
      // Add specific Twitter image for homepage if available
      // images: [
      //   {
      //     url: '/twitter-homepage-image.png',
      //     alt: pageTitle,
      //   }
      // ],
    },
  };
}

export default async function Home({ params }: Props) {
  // Get the locale from Promise
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <DifferentiatorsSection />
      <ServicesOverview />
      <TestimonialsSection />
      <LocationsSection />
      <CTASection />
    </>
  );
}
