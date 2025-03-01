import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import HeroSection from "@/components/sections/HeroSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationsSection from "@/components/sections/LocationsSection";
import CTASection from "@/components/sections/CTASection";

// Updated Props type to be compatible with Next.js 15
type Params = { locale: string };

type Props = {
  params: Params;
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Home({ params: { locale } }: Props) {
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
