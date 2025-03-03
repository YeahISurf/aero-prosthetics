import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Mock data for services - in a real implementation, this would come from the CMS
const services = [
  {
    id: 'lower-limb-prosthetics',
    title: 'Lower Limb Prosthetics',
    description: 'Custom-designed prosthetic solutions for below-knee, above-knee, and partial foot amputations',
    icon: '🦿',
  },
  {
    id: 'upper-limb-prosthetics',
    title: 'Upper Limb Prosthetics',
    description: 'Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations',
    icon: '💪',
  },
  {
    id: 'pediatric-prosthetics',
    title: 'Pediatric Prosthetics',
    description: 'Specialized prosthetic solutions designed for children\'s unique needs and growth',
    icon: '👶',
  },
  {
    id: 'orthotics',
    title: 'Orthotics',
    description: 'Custom bracing solutions for spine, lower limb, and upper limb conditions',
    icon: '🦵',
  },
  {
    id: 'compression-garments',
    title: 'Compression Garments',
    description: 'Medical-grade compression solutions for various conditions',
    icon: '🧦',
  },
  {
    id: 'mastectomy-products',
    title: 'Mastectomy Products',
    description: 'Specialized breast forms and post-mastectomy products',
    icon: '👚',
  },
];

export default function ServicesOverview() {
  const t = useTranslations('home.services');
  const ctaT = useTranslations('cta');
  const learnMoreText = ctaT('learnMore');

  return (
    <section className="section">
      <div className="container-custom">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle">{t('description')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.slice(0, 6).map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <Link 
                  href={`/en/services/${service.id}`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  {learnMoreText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/en/services" className="btn-primary">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
