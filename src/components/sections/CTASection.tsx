import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="section bg-primary-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Aero Prosthetics Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today to schedule a consultation and learn how our personalized prosthetic solutions can enhance your mobility and quality of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/en/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              {t('contactUs')}
            </Link>
            <Link href="/en/services" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
