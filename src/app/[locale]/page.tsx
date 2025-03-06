import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import HeroSection from "@/components/sections/HeroSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationsSection from "@/components/sections/LocationsSection";
import CTASection from "@/components/sections/CTASection";

// Define type for params to match Next.js 15 with React 19 requirements
type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  // Get the locale directly
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  // Get the locale directly
  const { locale } = params;
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
