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
      {/* Hero Section - matched with homepage style */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        <div className="absolute inset-0 z-0 opacity-15">
          {/* Enhanced background pattern */}
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
            role="presentation"
          ></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"
          aria-hidden="true"
        ></div>
        
        {/* Modern dual-tone gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"
          aria-hidden="true"
        ></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-6">
              {t('badge') || 'Patient-Focused Resources'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('title')}</h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </section>

      {/* Educational Materials Section */}
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('education.title')}</h2>
            <p className="section-subtitle">{t('education.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Educational Resource 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-primary-100">
              <div className="h-48 bg-primary-50 relative">
                {/* Resource image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-primary-300">
                  <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14L11.2929 14.7071L12 15.4142L12.7071 14.7071L12 14ZM5 5H4V6H5V5ZM19 5V6H20V5H19ZM11.2929 14.7071L15.2929 10.7071L14.7071 10.1213L10.7071 14.1213L11.2929 14.7071ZM12.7071 14.7071L16.7071 10.7071L16.1213 10.1213L12.1213 14.1213L12.7071 14.7071ZM5 6H19V4H5V6ZM19 19H5V21H19V19ZM5 19C4.44772 19 4 18.5523 4 18H2C2 19.6569 3.34315 21 5 21V19ZM20 18C20 18.5523 19.5523 19 19 19V21C20.6569 21 22 19.6569 22 18H20ZM19 6C19.5523 6 20 6.44772 20 7H22C22 5.34315 20.6569 4 19 4V6ZM5 4C3.34315 4 2 5.34315 2 7H4C4 6.44772 4.44772 6 5 6V4ZM4 18V7H2V18H4ZM22 7V18H20V7H22ZM7 15L9.5 12L7 9H9L11.5 12L9 15H7ZM15 15L17.5 12L15 9H17L19.5 12L17 15H15Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Understanding Prosthetic Components</h3>
                <p className="text-gray-700 mb-4">
                  Learn about the different components of prosthetic devices and how they work together to provide optimal function and comfort for daily activities.
                </p>
                <a 
                  href="#" 
                  className="btn-primary inline-flex items-center text-sm"
                >
                  Download Guide
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
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-primary-100">
              <div className="h-48 bg-primary-50 relative">
                {/* Resource image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-primary-300">
                  <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 9L12 4M12 4L17 9M12 4V16M21 11V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V11C3 8.79086 4.79086 7 7 7H8M16 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Caring for Your Orthotic Device</h3>
                <p className="text-gray-700 mb-4">
                  Essential tips and guidelines for maintaining and caring for your orthotic device to ensure longevity, comfort, and optimal function every day.
                </p>
                <a 
                  href="#" 
                  className="btn-primary inline-flex items-center text-sm"
                >
                  Download Guide
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
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-primary-100">
              <div className="h-48 bg-primary-50 relative">
                {/* Resource image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-primary-300">
                  <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14.5V16.5M7 10.5H17M7 7.5H17M8 19.5H16C17.1046 19.5 18 18.6046 18 17.5V6.5C18 5.39543 17.1046 4.5 16 4.5H8C6.89543 4.5 6 5.39543 6 6.5V17.5C6 18.6046 6.89543 19.5 8 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Adapting to Your New Device</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive guide for new users on adapting to prosthetic and orthotic devices, including tips for daily activities and overcoming common challenges.
                </p>
                <a 
                  href="#" 
                  className="btn-primary inline-flex items-center text-sm"
                >
                  Download Guide
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
          
          <div className="text-center mt-16">
            <Link 
              href={`/${locale}/contact`} 
              className="btn-secondary"
            >
              {t('education.requestMaterials') || 'Request Custom Materials'}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('faq.title') || 'Frequently Asked Questions'}</h2>
            <p className="section-subtitle">{t('faq.description') || 'Find answers to common questions about prosthetic and orthotic care, insurance coverage, and more.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-primary-50 p-8 rounded-xl border border-primary-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('faq.moreQuestions') || 'Have More Questions?'}</h3>
                <p className="text-gray-700">{t('faq.contactPrompt') || 'Our team is here to help with any questions you may have about our services.'}</p>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="btn-primary whitespace-nowrap"
              >
                {cta('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section - With improved styling */}
      <section className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('testimonials.title') || 'Patient Success Stories'}</h2>
            <p className="section-subtitle">{t('testimonials.description') || 'Hear from our patients about their experiences with Aero Prosthetics and how our services have improved their lives.'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</blockquote>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary"
            >
              {t('testimonials.shareStory') || 'Share Your Story'}
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Video Section (New Section) */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">{t('videos.title') || 'Educational Videos'}</h2>
            <p className="section-subtitle">{t('videos.description') || 'Watch our educational videos to learn more about prosthetic and orthotic care, adapting to new devices, and more.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-500 opacity-75" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('videos.video1Title') || 'Getting Started with Your Prosthetic'}</h3>
                <p className="text-gray-700">{t('videos.video1Description') || 'A comprehensive guide to help new users adapt to their prosthetic device.'}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-500 opacity-75" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('videos.video2Title') || 'Maintenance Tips for Orthotics'}</h3>
                <p className="text-gray-700">{t('videos.video2Description') || 'Learn how to properly maintain and care for your orthotic device for optimal function and longevity.'}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="btn-primary">
              {t('videos.viewLibrary') || 'View Full Video Library'}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{cta('title')}</h2>
            <p className="text-xl text-white/90 mb-8">{cta('subtitle')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105"
              >
                {cta('contactUs')}
              </Link>
              <Link
                href={`/${locale}/locations`}
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200"
              >
                {cta('findLocation')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
