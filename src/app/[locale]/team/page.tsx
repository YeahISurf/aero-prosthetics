import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['team', 'specialists', 'prosthetists', 'orthotists', 'practitioners'],
  });
}

// Mock data for team members - in a real implementation, this would come from the CMS
const teamMembers = [
  {
    id: 'robert-chen',
    name: 'Dr. Robert Chen',
    title: 'Chief Prosthetist',
    bio: 'With over 15 years of experience, Dr. Chen specializes in advanced lower limb prosthetics and leads our clinical team. He holds a Doctorate in Prosthetics and Orthotics from Northwestern University and is certified by the American Board for Certification in Orthotics, Prosthetics & Pedorthics.',
    image: '/placeholder-team.svg',
    specialties: ['Lower Limb Prosthetics', 'Microprocessor Knees', 'Sports Prosthetics'],
    education: ['Doctorate in Prosthetics and Orthotics, Northwestern University', 'BS in Biomedical Engineering, UC Berkeley'],
    certifications: ['ABC Certified Prosthetist Orthotist', 'Licensed Prosthetist Orthotist - California'],
  },
  {
    id: 'maria-rodriguez',
    name: 'Dr. Maria Rodriguez',
    title: 'Lead Orthotist',
    bio: 'Dr. Rodriguez specializes in pediatric orthotics and has pioneered several innovative treatment approaches. With a background in physical therapy and biomechanics, she brings a comprehensive approach to orthotic interventions.',
    image: '/placeholder-team.svg',
    specialties: ['Pediatric Orthotics', 'Scoliosis Bracing', 'Cranial Remolding'],
    education: ['Doctorate in Orthotics and Prosthetics, University of Washington', 'MS in Physical Therapy, UCLA'],
    certifications: ['ABC Certified Orthotist', 'Licensed Orthotist - California', 'Pediatric Specialist Certification'],
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    title: 'Clinical Director',
    bio: 'James oversees our clinical operations and ensures every patient receives personalized, comprehensive care. With a background in healthcare administration and prosthetics, he bridges the gap between clinical excellence and operational efficiency.',
    image: '/placeholder-team.svg',
    specialties: ['Clinical Management', 'Patient Care Coordination', 'Insurance Navigation'],
    education: ['MS in Healthcare Administration, USC', 'BS in Prosthetics and Orthotics, Cal State Dominguez Hills'],
    certifications: ['ABC Certified Prosthetist', 'Healthcare Management Certification'],
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'Upper Limb Specialist',
    bio: 'Sarah specializes in upper limb prosthetics, with particular expertise in myoelectric devices and activity-specific adaptations. She works closely with occupational therapists to ensure optimal functional outcomes for patients.',
    image: '/placeholder-team.svg',
    specialties: ['Upper Limb Prosthetics', 'Myoelectric Devices', 'Activity-Specific Adaptations'],
    education: ['MS in Prosthetics and Orthotics, Georgia Tech', 'BS in Kinesiology, University of Michigan'],
    certifications: ['ABC Certified Prosthetist', 'Upper Limb Prosthetics Specialist'],
  },
  {
    id: 'michael-thompson',
    name: 'Michael Thompson',
    title: 'Pediatric Specialist',
    bio: 'Michael specializes in pediatric prosthetics and orthotics, working with children from infancy through adolescence. His patient and compassionate approach helps children and their families navigate the unique challenges of pediatric prosthetic and orthotic care.',
    image: '/placeholder-team.svg',
    specialties: ['Pediatric Prosthetics', 'Pediatric Orthotics', 'Developmental Adaptations'],
    education: ['MS in Prosthetics and Orthotics, Northwestern University', 'BS in Child Development, Stanford University'],
    certifications: ['ABC Certified Prosthetist Orthotist', 'Pediatric Specialist Certification'],
  },
  {
    id: 'jennifer-garcia',
    name: 'Jennifer Garcia',
    title: 'Patient Care Coordinator',
    bio: 'Jennifer coordinates patient care across our clinical team, ensuring seamless communication and continuity of care. With a background in nursing and healthcare administration, she advocates for patients throughout their treatment journey.',
    image: '/placeholder-team.svg',
    specialties: ['Patient Advocacy', 'Care Coordination', 'Bilingual Services (English/Spanish)'],
    education: ['BSN, Nursing, UCLA', 'Healthcare Administration Certificate, UCI'],
    certifications: ['Registered Nurse', 'Certified Patient Advocate'],
  },
];

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'team' });
  const ctaT = await getTranslations({ locale, namespace: 'cta' });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('title')}</h1>
            <p className="text-xl leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="h-64 bg-gray-200 relative">
                  {/* Placeholder for team member image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Team Member Photo
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 mb-4">{member.title}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <Link 
                    href={`/team/${member.id}`}
                    className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                  >
                    {t('viewProfile')}
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
        </div>
      </section>

      {/* Team Values Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('values.title')}</h2>
          <p className="section-subtitle">{t('values.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Value 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.items.0.title')}</h3>
              <p className="text-gray-700">{t('values.items.0.description')}</p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.items.1.title')}</h3>
              <p className="text-gray-700">{t('values.items.1.description')}</p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.items.2.title')}</h3>
              <p className="text-gray-700">{t('values.items.2.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-primary-50 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-600">{t('careers.title')}</h2>
              <p className="text-lg text-gray-700 mb-8">{t('careers.description')}</p>
              <Link href="/contact" className="btn-primary">
                {t('careers.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Meet Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule a consultation to meet with our specialists and learn how we can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {ctaT('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
