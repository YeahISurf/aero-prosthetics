import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/ui/SchemaScript';
import { 
  generateMedicalSpecialtySchema, 
  generateBreadcrumbListSchema,
} from '@/lib/seo/schema';

type Props = {
  params: Promise<{ locale: string; service: string }>;
};

// Mock data for services - in a real implementation, this would come from the CMS
const services = [
  {
    id: 'lower-limb-prosthetics',
    title: 'Lower Limb Prosthetics',
    description: 'Custom-designed prosthetic solutions for below-knee, above-knee, and partial foot amputations',
    icon: '🦿',
    longDescription: 'Our lower limb prosthetic solutions are custom-designed to meet the unique needs of each patient. We offer a range of options for below-knee, above-knee, and partial foot amputations, utilizing the latest technology and materials to ensure optimal fit, function, and comfort.',
    benefits: [
      'Improved mobility and independence',
      'Custom-designed for optimal fit and comfort',
      'Advanced materials for durability and natural movement',
      'Ongoing adjustments and support',
      'Comprehensive training and rehabilitation',
    ],
    options: [
      'Microprocessor-controlled knees',
      'Energy-storing feet',
      'Waterproof options for active lifestyles',
      'Cosmetic covers for natural appearance',
    ],
  },
  {
    id: 'upper-limb-prosthetics',
    title: 'Upper Limb Prosthetics',
    description: 'Advanced prosthetic options for hand, wrist, elbow, and shoulder amputations',
    icon: '💪',
    longDescription: 'We provide advanced upper limb prosthetic solutions for hand, wrist, elbow, and shoulder amputations. Our team works closely with each patient to determine the most appropriate prosthetic option based on their specific needs, lifestyle, and goals.',
    benefits: [
      'Restored hand function for daily activities',
      'Customized solutions for specific needs',
      'Multiple control options (body-powered, myoelectric)',
      'Ongoing support and adjustments',
      'Training for optimal use and function',
    ],
    options: [
      'Body-powered prosthetics',
      'Myoelectric prosthetics',
      'Activity-specific terminal devices',
      'Cosmetic options for natural appearance',
    ],
  },
  {
    id: 'pediatric-prosthetics',
    title: 'Pediatric Prosthetics',
    description: 'Specialized prosthetic solutions designed for children\'s unique needs and growth',
    icon: '👶',
    longDescription: 'Our pediatric prosthetic solutions are specifically designed to address the unique needs of children, taking into account their growth and development. We work closely with pediatric patients and their families to create prosthetic devices that support their active lifestyles and developmental milestones.',
    benefits: [
      'Designed to accommodate growth and development',
      'Lightweight materials for ease of use',
      'Durable construction for active children',
      'Regular adjustments to maintain proper fit',
      'Family education and support',
    ],
    options: [
      'Growth adjustment features',
      'Activity-specific designs for sports and play',
      'Colorful and personalized options',
      'Waterproof solutions for swimming',
    ],
  },
  {
    id: 'orthotics',
    title: 'Orthotics',
    description: 'Custom bracing solutions for spine, lower limb, and upper limb conditions',
    icon: '🦵',
    longDescription: 'We offer custom orthotic solutions for a wide range of conditions affecting the spine, lower limbs, and upper limbs. Our orthotic devices are designed to provide support, improve function, and alleviate pain, helping patients achieve greater mobility and independence.',
    benefits: [
      'Pain reduction and improved function',
      'Custom-designed for optimal fit and comfort',
      'Support for proper alignment and stability',
      'Prevention of further injury or deformity',
      'Enhanced mobility and independence',
    ],
    options: [
      'Ankle-foot orthoses (AFOs)',
      'Knee-ankle-foot orthoses (KAFOs)',
      'Spinal orthoses',
      'Upper extremity orthoses',
    ],
  },
  {
    id: 'compression-garments',
    title: 'Compression Garments',
    description: 'Medical-grade compression solutions for various conditions',
    icon: '🧦',
    longDescription: 'Our medical-grade compression garments are designed to address a variety of conditions, including lymphedema, venous insufficiency, and post-surgical recovery. We offer custom-fitted garments that provide the appropriate level of compression for each patient\'s specific needs.',
    benefits: [
      'Reduced swelling and improved circulation',
      'Custom-fitted for optimal comfort and effectiveness',
      'Various compression levels for different needs',
      'Durable materials for long-term use',
      'Professional fitting and ongoing support',
    ],
    options: [
      'Upper extremity garments',
      'Lower extremity garments',
      'Full-body garments',
      'Various compression levels',
    ],
  },
  {
    id: 'mastectomy-products',
    title: 'Mastectomy Products',
    description: 'Specialized breast forms and post-mastectomy products',
    icon: '👚',
    longDescription: 'We provide a range of specialized breast forms and post-mastectomy products designed to help patients feel comfortable and confident after breast surgery. Our team offers compassionate, personalized fittings and guidance to help patients select the most appropriate products for their needs.',
    benefits: [
      'Restored natural appearance and symmetry',
      'Improved confidence and body image',
      'Comfortable, lightweight options',
      'Custom-fitted for optimal comfort',
      'Professional, compassionate fittings',
    ],
    options: [
      'Silicone breast forms',
      'Lightweight foam forms',
      'Partial breast forms',
      'Post-mastectomy bras and swimwear',
    ],
  },
  {
    id: 'cranial-helmets',
    title: 'Cranial Helmets',
    description: 'Custom-designed helmets for treating plagiocephaly in infants',
    icon: '👶',
    longDescription: 'Our custom-designed cranial helmets are used to treat plagiocephaly (flat head syndrome) in infants. These helmets are precisely fitted to guide the natural growth of the baby\'s skull, helping to correct the shape over time.',
    benefits: [
      'Correction of skull shape abnormalities',
      'Custom-designed for each infant',
      'Lightweight and comfortable',
      'Regular adjustments to accommodate growth',
      'Comprehensive family education and support',
    ],
    options: [
      'Various designs and colors',
      'Adjustable features for growth',
      'Ventilation for comfort',
      'Hypoallergenic materials',
    ],
  },
  {
    id: 'custom-bracing',
    title: 'Custom Bracing',
    description: 'Personalized bracing solutions for scoliosis, cervical conditions, and knee injuries',
    icon: '🦴',
    longDescription: 'We offer personalized bracing solutions for a variety of conditions, including scoliosis, cervical conditions, and knee injuries. Our custom braces are designed to provide optimal support and function, helping patients manage their conditions and improve their quality of life.',
    benefits: [
      'Pain reduction and improved function',
      'Custom-designed for optimal fit and comfort',
      'Support for proper alignment and stability',
      'Prevention of further injury or progression',
      'Enhanced mobility and independence',
    ],
    options: [
      'Scoliosis braces',
      'Cervical collars',
      'Knee braces',
      'Custom-designed solutions for unique needs',
    ],
  },
];

export async function generateMetadata({ params }: Props) {
  const { locale, service } = await params;
  const serviceData = services.find((s) => s.id === service);
  if (!serviceData) return {};

  // NOTE: Translation variable removed for deployment - will be added back in future development
  const t = await getTranslations({ locale, namespace: 'services' });

  return constructMetadata({
    title: serviceData.title,
    description: serviceData.description,
    keywords: ['prosthetics', 'orthotics', service, 'medical devices'],
    path: `/${locale}/services/${service}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, service } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  const serviceData = services.find((s) => s.id === service);
  if (!serviceData) notFound();
  
  // Get translations for CTA section
  const ctaT = await getTranslations({ locale, namespace: 'cta' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  // Generate Schemas
  const serviceSchema = generateMedicalSpecialtySchema({
    name: serviceData.title,
    description: serviceData.description,
    url: `https://aeroprosthetics.com/${locale}/services/${service}`,
    medicalSpecialty: serviceData.id,
  });

  const breadcrumbItems = [
    { name: commonT('breadcrumbHome') || 'Home', item: `https://aeroprosthetics.com/${locale}` },
    { name: commonT('breadcrumbServices') || 'Services', item: `https://aeroprosthetics.com/${locale}/services` },
    { name: serviceData.title, item: `https://aeroprosthetics.com/${locale}/services/${service}` },
  ];
  const breadcrumbSchema = generateBreadcrumbListSchema(breadcrumbItems, `https://aeroprosthetics.com/${locale}/services/${service}`);

  return (
    <>
      {/* Inject Schemas */}
      <SchemaScript schema={serviceSchema} />
      <SchemaScript schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href={`/${locale}`} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary-600">
                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    {ctaT('home')}
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <Link href={`/${locale}/services`} className="ml-1 text-sm font-medium text-gray-600 hover:text-primary-600 md:ml-2">
                      {commonT('breadcrumbServices') || 'Services'}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {serviceData.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{serviceData.title}</h1>
            <p className="text-xl leading-relaxed">{serviceData.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Benefits</h2>
              <ul className="space-y-4">
                {serviceData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Options</h2>
              <ul className="space-y-4">
                {serviceData.options.map((option, index) => (
                  <li key={index} className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-primary-500 mr-2 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span className="text-gray-700">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section - Placeholder */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-gray-500">Image {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in {serviceData.title}?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to schedule a consultation and learn how our personalized solutions can help you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 my-10">
              <Link 
                href={`/${locale}/contact`} 
                className="btn-primary"
              >
                {ctaT('contactCta')}
              </Link>
              
              <Link 
                href={`/${locale}/services`} 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10"
              >
                {ctaT('backToServices')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return services.map((service) => ({
    service: service.id,
  }));
}
