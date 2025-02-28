import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

import HeroSection from "@/components/sections/HeroSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationsSection from "@/components/sections/LocationsSection";
import CTASection from "@/components/sections/CTASection";

type Props = {
  params: { locale: string };
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
