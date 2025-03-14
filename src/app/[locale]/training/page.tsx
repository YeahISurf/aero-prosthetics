import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { ANIMATION_DELAYS } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

// Define proper types for the training programs
type TrainingProgram = {
  id: string;
  title: string;
  description: string;
  iconType: 'usage' | 'mobility' | 'care';
  duration: string;
  format: string;
  popular?: boolean;
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  return constructMetadata({
    title: 'Training',
    description: 'Comprehensive training programs for prosthetic and orthotic devices',
    keywords: ['prosthetics', 'orthotics', 'training', 'education', 'learning'],
  });
}

// Mock data for training programs
const trainingPrograms: TrainingProgram[] = [
  {
    id: 'device-usage',
    title: 'Device Usage Training',
    description: 'Learn how to use your prosthetic or orthotic device effectively for daily activities',
    iconType: 'usage',
    duration: '4 weeks',
    format: 'In-person',
    popular: true
  },
  {
    id: 'advanced-mobility',
    title: 'Advanced Mobility',
    description: 'Specialized training for athletic and advanced mobility activities',
    iconType: 'mobility',
    duration: '6 weeks',
    format: 'Hybrid'
  },
  {
    id: 'care-maintenance',
    title: 'Care & Maintenance',
    description: 'Proper techniques for maintaining and caring for your device',
    iconType: 'care',
    duration: '2 weeks',
    format: 'Virtual'
  },
];

// Testimonial data
const testimonials = [
  {
    quote: "The training program has completely transformed my daily life. I feel confident and independent with my prosthetic device now.",
    author: "Sarah Johnson",
    role: "Device Usage Training Graduate"
  }
];

// Function to get appropriate icon based on type
const getTrainingIcon = (iconType: TrainingProgram['iconType']) => {
  switch (iconType) {
    case 'usage':
      return (
        <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      );
    case 'mobility':
      return (
        <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'care':
      return (
        <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    default:
      return (
        <svg className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
  }
};

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  
  const c = await getTranslations({ locale, namespace: 'cta' });
  
  return (
    <main>
      {/* Hero Section with blue banner header */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100" aria-hidden="true"></div>
        
        <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
          {/* Enhanced background pattern */}
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            aria-hidden="true"
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
          <div className="max-w-3xl mx-auto text-center animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.QUICK}s`, animationFillMode: 'both' }}>
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-6">
              Professional Training Programs
            </div>
            <h1 id="training-title" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Training & Education
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              Comprehensive training programs to help you maximize the benefits of your prosthetic or orthotic device
            </p>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="section relative overflow-hidden bg-gray-50/70" aria-labelledby="training-programs">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-5" aria-hidden="true">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden md:block absolute -top-10 left-0 w-24 h-24 rounded-full bg-primary-50/30 -z-10" aria-hidden="true"></div>
        <div className="hidden md:block absolute bottom-12 right-12 w-16 h-16 rounded-full bg-primary-50/30 -z-10" aria-hidden="true"></div>
        <div className="hidden md:block absolute top-1/4 right-0 w-32 h-32 rounded-full bg-secondary-teal-50/20 -z-10" aria-hidden="true"></div>
        
        <div className="container-custom relative z-10 py-12 md:py-20">
          {/* Programs section */}
          <div>
            <h2 id="training-programs" className="sr-only">Available Training Programs</h2>
            
            {/* Subtle connecting line for visual flow */}
            <div className="absolute left-1/2 top-40 bottom-40 w-0.5 bg-gradient-to-b from-transparent via-primary-200/30 to-transparent z-0 hidden lg:block" aria-hidden="true"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {trainingPrograms.map((program, index) => (
                <Card 
                  key={program.id} 
                  variant="elevated" 
                  hover="scale" 
                  className="overflow-hidden animate-fadeIn backdrop-blur-sm border border-gray-100 group relative h-full"
                  style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.MEDIUM, 0.1)}s`, animationFillMode: 'both' }}
                >
                  {program.popular && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs py-1 px-3 rounded-full shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex justify-center mb-5">
                      <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                        {getTrainingIcon(program.iconType)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-primary-700 transition-colors duration-300">{program.title}</h3>
                    <p className="text-gray-700 mb-5 text-center">{program.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-5 p-3 rounded-lg bg-gray-50/80">
                      <span className="font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {program.duration}
                      </span>
                      <span className="font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {program.format}
                      </span>
                    </div>
                    <div className="text-center mt-auto">
                      <Link 
                        href={`/${locale}/training/${program.id}`} 
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-all duration-200 hover:translate-x-0.5"
                        aria-label={`Learn more about ${program.title}`}
                      >
                        {c('learnMore')}
                        <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Testimonial section */}
          <section aria-labelledby="testimonial-heading" className="mb-16">
            <h2 id="testimonial-heading" className="sr-only">What Our Students Say</h2>
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-primary-100 bg-gradient-to-br from-white to-primary-50/30 p-8 md:p-10 animate-fadeIn backdrop-blur-sm" style={{ animationDelay: `${ANIMATION_DELAYS.MEDIUM}s`, animationFillMode: 'both' }}>
              {/* Quote decoration */}
              <svg className="absolute top-6 left-6 w-16 h-16 text-primary-200 opacity-30 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <blockquote>
                  <p className="text-xl md:text-2xl font-medium text-gray-900 italic leading-relaxed mb-6">
                    "{testimonials[0].quote}"
                  </p>
                  <footer className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg mb-3 md:mb-0 md:mr-4">
                      {testimonials[0].author.split(' ')[0][0]}{testimonials[0].author.split(' ')[1][0]}
                    </div>
                    <div>
                      <cite className="text-gray-900 font-semibold not-italic">{testimonials[0].author}</cite>
                      <p className="text-sm text-gray-600">{testimonials[0].role}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>
          
          {/* Our Approach section */}
          <section aria-labelledby="approach-heading" className="mb-16">
            <div className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-gray-100 bg-gradient-to-br from-white to-gray-50/80 p-8 md:p-12 animate-fadeIn backdrop-blur-sm" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              {/* Premium corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent" aria-hidden="true"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary-100/30 to-transparent" aria-hidden="true"></div>
              
              <div className="max-w-3xl mx-auto">
                <h2 id="approach-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Our Training Approach</h2>
                <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                  At Aero Prosthetics, we believe that proper training is essential for maximizing the benefits of your prosthetic or orthotic device. Our comprehensive training programs are designed to help you gain confidence and independence in using your device for daily activities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card variant="default" hover={true} className="p-6 md:p-8 animate-fadeIn hover:border-primary-200 transition-colors duration-300" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_SM}s`, animationFillMode: 'both' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Personalized Approach</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Our training programs are tailored to your specific needs, goals, and the type of device you use. We work closely with you to develop a personalized training plan.
                    </p>
                    
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Individual assessment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Custom progress tracking</span>
                      </li>
                    </ul>
                  </Card>
                  
                  <Card variant="default" hover={true} className="p-6 md:p-8 animate-fadeIn hover:border-primary-200 transition-colors duration-300" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_MD}s`, animationFillMode: 'both' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6.001 6.001 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Expert Instructors</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      All of our training programs are led by certified professionals with extensive experience in prosthetic and orthotic rehabilitation.
                    </p>
                    
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Certified specialists</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Ongoing support</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA section */}
          <section aria-labelledby="cta-heading">
            <div className="max-w-3xl mx-auto text-center animate-fadeIn bg-gradient-to-br from-primary-50/50 to-white/80 rounded-2xl p-8 md:p-10 shadow-sm border border-primary-100/30 backdrop-blur-sm" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" aria-hidden="true"></div>
              
              <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl mx-auto">
                Contact us today to learn more about our training programs and how they can help you achieve your mobility goals.
              </p>
              
              <Link 
                href={`/${locale}/contact`} 
                className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Contact us to get started with training"
              >
                {c('contactUs')}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <p className="text-sm text-gray-600 mt-6">
                No commitment required. Our team will help you find the right program.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
} 