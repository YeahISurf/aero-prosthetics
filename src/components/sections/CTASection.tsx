import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const ctaSection = t.raw('section') as {
    badge: string;
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    testimonial: { quote: string; author: string };
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Light premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-200 to-blue-400 z-0"></div>
      
      {/* Decorative background elements - more subtle */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')] bg-repeat z-0"></div>
      
      {/* Subtle blue accent elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 to-blue-200 z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 to-blue-100 z-0"></div>
      <div className="absolute top-10 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-transparent z-0 blur-2xl"></div>
      <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-gradient-to-tl from-blue-200/20 to-transparent z-0 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Clean, light card design */}
          <div className="bg-gradient-to-br from-white/80 to-white/70 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-blue-100 shadow-xl">
            {/* Premium headline with subtle accent */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-200/30">
                {ctaSection.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {ctaSection.title}
              </h2>
              
              {/* Blue accent line */}
              <div className="w-32 h-1 bg-gradient-to-r from-blue-300 to-blue-400 mx-auto mb-8"></div>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                {ctaSection.description}
              </p>
            </div>
            
            {/* Premium quality indicators - lighter style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {ctaSection.stats.map((stat, index) => (
                <div key={index} className="bg-blue-50/70 rounded-lg p-4 backdrop-blur-sm border border-blue-100/50 text-center">
                  <div className="text-blue-600 font-bold text-2xl md:text-3xl mb-1">{stat.value}</div>
                  <div className="text-gray-700 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Premium CTA buttons - lighter, cleaner style */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href={`/${locale}/contact`}
                className="btn px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-300 text-white hover:shadow-lg hover:from-blue-300 hover:to-blue-200 transition-all duration-300 rounded-full font-semibold text-lg shadow-md border border-blue-200/50 hover:scale-105"
              >
                {t('contactUs')}
              </Link>
              <Link 
                href={`/${locale}/services`}
                className="btn px-8 py-4 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50/50 transition-all duration-300 rounded-full font-semibold text-lg"
              >
                {t('learnMore')}
              </Link>
            </div>
            
            {/* Premium testimonial snippet - cleaner style */}
            <div className="mt-12 pt-6 border-t border-blue-100 text-center">
              <p className="text-gray-700 italic">
                &ldquo;{ctaSection.testimonial.quote}&rdquo;
              </p>
              <p className="text-blue-600 text-sm mt-2">— {ctaSection.testimonial.author}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
