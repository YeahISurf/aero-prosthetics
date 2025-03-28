import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { ANIMATION_DELAYS } from '@/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return constructMetadata({
    title: t('mission.title'),
    description: t('mission.description'),
    keywords: ['about', 'mission', 'values', 'team', 'prosthetics', 'orthotics'],
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'about' });
  const values = t.raw('values.items') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* Enhanced Mission Section with gradient and background patterns */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Modern dual-tone gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-3 animate-fadeIn">
              Our Purpose
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-white animate-slideInUp">{t('mission.title')}</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white mb-8 animate-fadeIn">{t('mission.description')}</p>
          </div>
        </div>
        
        {/* Enhanced subtle gradient transition to next section - positioned lower */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      </section>

      {/* Values Section - Redesigned with premium styling */}
      <section className="section relative overflow-hidden py-20 bg-gradient-to-br from-white via-blue-50/30 to-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
        
        {/* Decorative floating elements */}
        <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-primary-100/30 blur-3xl z-0 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -right-20 bottom-40 w-96 rounded-full bg-primary-100/20 blur-3xl z-0 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute left-1/4 bottom-20 w-64 h-64 rounded-full bg-primary-100/10 blur-2xl z-0 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary-100 text-primary-700 rounded-full mb-5 shadow-sm animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 relative animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {t('values.title')}
            </h2>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed animate-fadeIn max-w-2xl mx-auto" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              We're guided by these principles in everything we do, from patient care to innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group animate-fadeIn"
                style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}
              >
                {/* Enhanced corner accent with gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-200/30 to-transparent rounded-bl-[100px]"></div>
                
                {/* Card pattern overlay with improved subtle texture */}
                <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Enhanced icon container with gradient */}
                <div className={`w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 border border-white/80`}>
                  <div className="transform transition-transform duration-500 group-hover:scale-110">
                    <svg className="w-8 h-8 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-700 group-hover:text-gray-600 transition-colors duration-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
          
          {/* Trust indicators section */}
          <div className="mt-16 pt-8 border-t border-gray-100 max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Patient-First Approach</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Continuous Innovation</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Inclusive Care</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced with premium styling */}
      <section className="section relative overflow-hidden py-24 bg-gradient-to-br from-white via-gray-50/30 to-white">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 top-40 w-72 h-72 rounded-full bg-primary-100/20 blur-3xl z-0 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -left-32 bottom-40 w-80 h-80 rounded-full bg-primary-100/15 blur-3xl z-0 animate-float" style={{ animationDelay: '1.2s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary-100 text-primary-700 rounded-full mb-5 shadow-sm animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Expert Specialists
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 relative animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {t('team.title').replace("'", "&apos;")}
            </h2>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed animate-fadeIn max-w-2xl mx-auto" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              {t('team.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-700">
                  Team Member Photo
                </div>
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent"></div>
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                {/* Specialist badge */}
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2">
                  Specialist
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-700 transition-colors duration-300">Dr. Robert Chen</h3>
                <p className="text-primary-600 mb-4">Chief Prosthetist</p>
                <p className="text-gray-700 mb-4">
                  With over 15 years of experience, Dr. Chen specializes in advanced lower limb prosthetics and leads our clinical team with compassion and innovation.
                </p>
                <Link 
                  href={`/${locale}/team/robert-chen`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT + 0.1}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-700">
                  Team Member Photo
                </div>
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent"></div>
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                {/* Specialist badge */}
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2">
                  Specialist
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-700 transition-colors duration-300">Dr. Maria Rodriguez</h3>
                <p className="text-primary-600 mb-4">Lead Orthotist</p>
                <p className="text-gray-700 mb-4">
                  Dr. Rodriguez specializes in pediatric orthotics and has pioneered several innovative treatment approaches that have improved outcomes for hundreds of young patients.
                </p>
                <Link 
                  href={`/${locale}/team/maria-rodriguez`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT + 0.2}s`, animationFillMode: 'both' }}>
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-105 transition-transform duration-700">
                  Team Member Photo
                </div>
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent"></div>
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                {/* Specialist badge */}
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full mb-2">
                  Leadership
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-700 transition-colors duration-300">James Wilson</h3>
                <p className="text-primary-600 mb-4">Clinical Director</p>
                <p className="text-gray-700 mb-4">
                  James oversees our clinical operations and ensures every patient receives personalized, comprehensive care tailored to their unique mobility goals and lifestyle needs.
                </p>
                <Link 
                  href={`/${locale}/team/james-wilson`}
                  className="text-primary-500 font-medium hover:text-primary-600 inline-flex items-center group"
                >
                  View Profile
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
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
          
          <div className="mt-16 text-center animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
            <Link 
              href={`/${locale}/team`} 
              className="btn-primary bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="View all team members"
            >
              {t('team.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* History Section - Enhanced with premium styling */}
      <section className="section relative overflow-hidden py-24 bg-gradient-to-br from-white via-primary-50/20 to-white">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute left-20 top-32 w-64 h-64 rounded-full bg-primary-100/15 blur-3xl z-0 animate-float" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute right-10 bottom-20 w-48 h-48 rounded-full bg-primary-100/10 blur-2xl z-0 animate-float" style={{ animationDelay: '1.8s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-5 shadow-sm">
                Our Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{t('history.title')}</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('history.description')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2010 by Dr. Robert Chen and Dr. Maria Rodriguez, Aero Prosthetics has grown from a small clinic to a leading provider of prosthetic and orthotic solutions across the region. Our commitment to innovation, personalized care, and patient education has established us as a trusted partner in the healthcare community.
              </p>
              
              {/* Timeline section */}
              <div className="mt-10 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold">2010</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Founded in San Francisco</h3>
                    <p className="text-gray-700">Opened our first clinic focused on advanced prosthetic solutions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold">2015</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Expanded Services</h3>
                    <p className="text-gray-700">Added pediatric specialty and orthotics department</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold">2023</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Innovation Center</h3>
                    <p className="text-gray-700">Launched our dedicated R&D facility for prosthetic innovation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 relative animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_SM}s`, animationFillMode: 'both' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <div className="aspect-[16/9] relative bg-gray-200">
                  {/* Placeholder for company history image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Company History Image
                  </div>
                  
                  {/* Premium corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-300/40 via-secondary-teal-500/20 to-transparent"></div>
                  
                  {/* Bottom fade gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
              
              {/* Trust badge */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-5 shadow-xl border border-primary-100 max-w-xs animate-fadeIn transform hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_MD}s`, animationFillMode: 'both' }}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-primary-700 font-semibold mb-1">
                      Serving patients since 2010
                    </p>
                    <p className="text-sm text-gray-600">
                      Over a decade of improving lives through innovative prosthetic solutions
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats pill */}
              <div className="absolute top-8 -left-6 bg-white/90 backdrop-blur-sm rounded-full py-2 px-4 shadow-lg border border-primary-100 flex items-center space-x-2 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_XS}s`, animationFillMode: 'both' }}>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900">5,000+ Patients Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Awards & Recognition Section - Enhanced with premium styling */}
      <section className="section relative overflow-hidden py-24 bg-gradient-to-br from-white via-gray-50/50 to-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute right-20 top-32 w-64 h-64 rounded-full bg-primary-100/20 blur-3xl z-0 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute left-10 bottom-20 w-48 h-48 rounded-full bg-primary-100/10 blur-2xl z-0 animate-float" style={{ animationDelay: '1.3s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-primary-100 text-primary-700 rounded-full mb-5 shadow-sm animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              Recognition
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 relative animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              Awards & Achievements
            </h2>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed animate-fadeIn max-w-2xl mx-auto" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Our commitment to excellence has been recognized by industry leaders and healthcare organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-12">
            {/* Award 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s`, animationFillMode: 'both' }}>
              <div className="relative">
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-white rounded-full z-0"></div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg group-hover:scale-105 transition-transform duration-500 border border-white">
                  <svg className="w-12 h-12 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15V17M12 7V13M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Healthcare Innovation Award</h3>
              <p className="text-primary-600 font-medium text-sm mb-4">2023</p>
              <p className="text-gray-700 text-sm">Recognized for our breakthrough advancements in myoelectric prosthetic limb technology</p>
            </div>
            
            {/* Award 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT + 0.1}s`, animationFillMode: 'both' }}>
              <div className="relative">
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-white rounded-full z-0"></div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg group-hover:scale-105 transition-transform duration-500 border border-white">
                  <svg className="w-12 h-12 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5L14.3 9.5L19.5 10.2L15.8 14L16.9 19.4L12 16.9L7.1 19.4L8.2 14L4.5 10.2L9.7 9.5L12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Patient Care Excellence</h3>
              <p className="text-primary-600 font-medium text-sm mb-4">2022</p>
              <p className="text-gray-700 text-sm">Awarded for our outstanding patient satisfaction scores and personalized care approach</p>
            </div>
            
            {/* Award 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT + 0.2}s`, animationFillMode: 'both' }}>
              <div className="relative">
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-white rounded-full z-0"></div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg group-hover:scale-105 transition-transform duration-500 border border-white">
                  <svg className="w-12 h-12 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Research Recognition</h3>
              <p className="text-primary-600 font-medium text-sm mb-4">2021</p>
              <p className="text-gray-700 text-sm">Honored for our contributions to prosthetic research and published findings in medical journals</p>
            </div>
            
            {/* Award 4 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 animate-fadeIn" 
                 style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT + 0.3}s`, animationFillMode: 'both' }}>
              <div className="relative">
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-50 to-white rounded-full z-0"></div>
                
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg group-hover:scale-105 transition-transform duration-500 border border-white">
                  <svg className="w-12 h-12 text-primary-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-700 transition-colors duration-300">Community Impact</h3>
              <p className="text-primary-600 font-medium text-sm mb-4">2020</p>
              <p className="text-gray-700 text-sm">Recognized for our charitable initiatives providing prosthetic care to underserved communities</p>
            </div>
          </div>
          
          {/* Certification showcase */}
          <div className="mt-20 bg-gradient-to-r from-primary-50/80 to-white rounded-3xl p-8 md:p-12 border border-primary-100/50 shadow-lg animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.STAGGER_LG}s`, animationFillMode: 'both' }}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Certifications</h3>
                <p className="text-gray-700">
                  Our facility and practitioners maintain the highest levels of certification in the industry, ensuring quality care for every patient.
                </p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-100">
                  <svg className="w-10 h-10 text-primary-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900">ABC Certified</h4>
                    <p className="text-xs text-gray-600">Since 2010</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-100">
                  <svg className="w-10 h-10 text-primary-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900">FDA Registered</h4>
                    <p className="text-xs text-gray-600">All Devices</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-100">
                  <svg className="w-10 h-10 text-primary-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900">Board Certified</h4>
                    <p className="text-xs text-gray-600">All Specialists</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-100">
                  <svg className="w-10 h-10 text-primary-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2v2m0 4v2m0 4v2m-6-4h12M6 16h12" />
                  </svg>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-gray-900">ISO 13485</h4>
                    <p className="text-xs text-gray-600">Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced with premium styling */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 z-0"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute -left-20 top-20 w-80 h-80 rounded-full bg-white/5 blur-3xl z-0"></div>
        <div className="absolute -right-20 bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl z-0"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-2xl border border-white/20">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-white/20 text-white rounded-full mb-5 backdrop-blur-sm border border-white/30 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                  Get Started Today
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Ready to Transform Your Mobility?</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                  Contact us today to schedule a consultation with our expert team and discover how we can help improve your quality of life with personalized prosthetic solutions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                  <Link 
                    href={`/${locale}/contact`}
                    className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule a Consultation
                  </Link>
                  <Link 
                    href={`/${locale}/locations`}
                    className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100 px-8 py-4 rounded-xl font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Find a Location
                  </Link>
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-14 pt-8 border-t border-white/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                    <p className="text-white/80 text-sm mb-1">Customer Satisfaction</p>
                    <p className="text-white font-bold text-2xl">98%</p>
                  </div>
                  <div className="animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                    <p className="text-white/80 text-sm mb-1">Insurance Accepted</p>
                    <p className="text-white font-bold text-2xl">50+</p>
                  </div>
                  <div className="animate-fadeIn" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
                    <p className="text-white/80 text-sm mb-1">Years Experience</p>
                    <p className="text-white font-bold text-2xl">13+</p>
                  </div>
                  <div className="animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                    <p className="text-white/80 text-sm mb-1">Certified Specialists</p>
                    <p className="text-white font-bold text-2xl">20+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
