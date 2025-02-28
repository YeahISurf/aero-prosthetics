import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return constructMetadata({
    title: t('mission.title'),
    description: t('mission.description'),
    keywords: ['about', 'mission', 'values', 'team', 'prosthetics', 'orthotics'],
  });
}

export default function AboutPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const t = useTranslations('about');
  const values = t.raw('values.items') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* Mission Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('mission.title')}</h1>
            <p className="text-xl leading-relaxed">{t('mission.description')}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('values.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary-600">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('team.title')}</h2>
          <p className="section-subtitle">{t('team.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Robert Chen</h3>
                <p className="text-primary-600 mb-4">Chief Prosthetist</p>
                <p className="text-gray-700 mb-4">
                  With over 15 years of experience, Dr. Chen specializes in advanced lower limb prosthetics and leads our clinical team.
                </p>
                <Link 
                  href="/team/robert-chen" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  View Profile
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
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Maria Rodriguez</h3>
                <p className="text-primary-600 mb-4">Lead Orthotist</p>
                <p className="text-gray-700 mb-4">
                  Dr. Rodriguez specializes in pediatric orthotics and has pioneered several innovative treatment approaches.
                </p>
                <Link 
                  href="/team/maria-rodriguez" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  View Profile
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
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Team Member Photo
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">James Wilson</h3>
                <p className="text-primary-600 mb-4">Clinical Director</p>
                <p className="text-gray-700 mb-4">
                  James oversees our clinical operations and ensures every patient receives personalized, comprehensive care.
                </p>
                <Link 
                  href="/team/james-wilson" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  View Profile
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
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/team" className="btn-primary">
              {t('team.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('history.title')}</h2>
              <p className="text-lg text-gray-700 mb-6">{t('history.description')}</p>
              <p className="text-lg text-gray-700">
                Founded in 2010 by Dr. Robert Chen and Dr. Maria Rodriguez, Aero Prosthetics has grown from a small clinic to a leading provider of prosthetic and orthotic solutions in Southern California. Our commitment to innovation, personalized care, and patient education has established us as a trusted partner in the healthcare community.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              {/* Placeholder for company history image */}
              <div className="text-gray-500">Company History Image</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
