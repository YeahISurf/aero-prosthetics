import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Placeholder for background pattern or image */}
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/en/services" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {t('cta')}
              </Link>
              <Link href="/en/contact" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                {useTranslations('cta')('contactUs')}
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Placeholder for hero image */}
            <div className="relative w-full aspect-square rounded-lg bg-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-lg">
                Hero Image Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
