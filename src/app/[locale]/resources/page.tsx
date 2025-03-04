import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['resources', 'education', 'FAQ', 'testimonials', 'prosthetics', 'orthotics'],
  });
}

// Mock data for FAQs - in a real implementation, this would come from the CMS
const faqs = [
  {
    question: 'What should I expect during my first appointment?',
    answer: 'During your first appointment, our team will conduct a comprehensive evaluation of your needs. This includes discussing your medical history, assessing your current condition, and understanding your goals and lifestyle. We will explain the available options and work with you to develop a personalized treatment plan.',
  },
  {
    question: 'Does insurance cover prosthetic and orthotic devices?',
    answer: 'Many insurance plans provide coverage for prosthetic and orthotic devices. The extent of coverage varies depending on your specific plan. Our team works with most major insurance providers and can help verify your coverage and navigate the insurance process.',
  },
  {
    question: 'How long does it take to receive a prosthetic device?',
    answer: 'The timeline for receiving a prosthetic device varies depending on several factors, including the type of device, customization requirements, and insurance approval process. Typically, the process takes 2-4 weeks from initial consultation to final fitting, but we will provide you with a more specific timeline based on your individual situation.',
  },
  {
    question: 'How often should I have my prosthetic or orthotic device adjusted?',
    answer: 'Regular adjustments are important to ensure optimal fit and function of your device. For new prosthetic users, more frequent adjustments may be needed initially. Generally, we recommend check-ups every 6-12 months, but this can vary based on your specific needs, activity level, and any changes in your condition.',
  },
  {
    question: 'How do I care for my prosthetic or orthotic device?',
    answer: 'Proper care is essential for maintaining the function and longevity of your device. We provide detailed care instructions specific to your device, but general guidelines include regular cleaning, avoiding extreme temperatures, checking for signs of wear, and scheduling regular maintenance appointments.',
  },
  {
    question: 'Can I participate in sports and physical activities with a prosthetic device?',
    answer: 'Absolutely! Many of our patients lead active lifestyles and participate in various sports and physical activities. Depending on your interests and goals, we can design specialized prosthetic solutions that accommodate specific activities, from swimming and running to cycling and more.',
  },
];

// Mock data for testimonials - in a real implementation, this would come from the CMS
const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    location: 'Anaheim, CA',
    quote: 'The team at Aero Prosthetics changed my life. Their personalized approach and cutting-edge technology gave me back my mobility and confidence.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    location: 'Victorville, CA',
    quote: 'After struggling with ill-fitting prosthetics for years, I finally found Aero Prosthetics. Their custom solutions and ongoing support have made all the difference.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 3,
    name: 'David Martinez',
    location: 'Los Angeles, CA',
    quote: 'The pediatric team at Aero Prosthetics has been amazing with my son. They understand children\'s unique needs and have helped him thrive.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 4,
    name: 'Jennifer Lee',
    location: 'San Bernardino, CA',
    quote: 'I appreciate the comprehensive care I receive at Aero Prosthetics. From initial consultation to ongoing adjustments, they have been there every step of the way.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 5,
    name: 'Robert Thompson',
    location: 'Orange County, CA',
    quote: 'The custom orthotic solutions provided by Aero Prosthetics have significantly reduced my pain and improved my mobility. I am grateful for their expertise and care.',
    image: '/placeholder-avatar.jpg',
  },
  {
    id: 6,
    name: 'Maria Garcia',
    location: 'Riverside, CA',
    quote: 'As someone who speaks primarily Spanish, I appreciate that Aero Prosthetics offers bilingual services. It made the entire process much more comfortable and clear.',
    image: '/placeholder-avatar.jpg',
  },
];

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'resources' });
  const cta = await getTranslations({ locale, namespace: 'cta' });

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

      {/* Educational Materials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('education.title')}</h2>
          <p className="section-subtitle">{t('education.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Educational Resource 1 */}
            <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for resource image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Resource Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Understanding Prosthetic Components</h3>
                <p className="text-gray-700 mb-4">
                  Learn about the different components of prosthetic devices and how they work together to provide optimal function.
                </p>
                <a 
                  href="#" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  Download PDF
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Educational Resource 2 */}
            <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for resource image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Resource Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Caring for Your Orthotic Device</h3>
                <p className="text-gray-700 mb-4">
                  Essential tips and guidelines for maintaining and caring for your orthotic device to ensure longevity and optimal function.
                </p>
                <a 
                  href="#" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  Download PDF
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Educational Resource 3 */}
            <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {/* Placeholder for resource image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Resource Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Adapting to Your New Prosthetic</h3>
                <p className="text-gray-700 mb-4">
                  Practical advice and exercises to help you adapt to your new prosthetic device and regain confidence in your daily activities.
                </p>
                <a 
                  href="#" 
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center"
                >
                  Download PDF
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('faq.title')}</h2>
          <p className="section-subtitle">{t('faq.description')}</p>
          
          <div className="max-w-3xl mx-auto mt-12">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary-600">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Information Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">{t('insurance.title')}</h2>
          <p className="section-subtitle">{t('insurance.description')}</p>
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-6">Accepted Insurance Plans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Medicare</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Medicaid</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Blue Cross Blue Shield</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Aetna</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Cigna</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">UnitedHealthcare</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Humana</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">Kaiser Permanente</span>
                </div>
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary-500 mr-2" 
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
                  <span className="text-gray-700">And many more...</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  Please contact us to verify your specific insurance coverage. Our team is experienced in working with insurance providers and can help navigate the process to maximize your benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have Questions About Our Services?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us today to speak with one of our specialists and learn how we can help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                {cta('contactUs')}
              </Link>
              <Link href="/services" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                {cta('learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
