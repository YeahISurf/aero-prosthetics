"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define TypeScript interfaces for the testimonial data
interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  profession: string;
  product: string;
  yearsSince: number;
  rating: number;
  mobilityImprovement: string;
  qualityOfLife: string;
}

interface Metrics {
  productSatisfaction: { value: string; label: string };
  hospitalsClinics: { value: string; label: string };
  patientsServed: { value: string; label: string };
  industryExperience: { value: string; label: string };
}


export default function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Get testimonials from localization files
  const testimonials = t.raw('items') as Testimonial[];
  const metrics = t.raw('metrics') as Metrics;

  // Auto-rotation for testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const setTestimonialIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section relative overflow-hidden py-24">
      {/* Clean light background with minimal pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-3 z-0"></div>
      
      {/* Subtle accent elements */}
      <div className="absolute left-0 top-40 w-32 h-32 rounded-full bg-blue-100/20 z-0"></div>
      <div className="absolute right-0 bottom-40 w-48 h-48 rounded-full bg-blue-100/15 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Enhanced premium section header */}
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4">
            {t('sectionTagline')}
          </span>
          <h2 className="section-title text-gray-900 mb-4">{t('title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="mt-12 relative" 
             onMouseEnter={() => setIsPaused(true)} 
             onMouseLeave={() => setIsPaused(false)}>
          <div className="max-w-5xl mx-auto">
            {/* Large decorative quotation mark */}
            <div className="absolute -top-10 left-10 text-primary-200 opacity-50 z-0">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50">
              {/* Light premium card accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"></div>
              
              {testimonials.map((testimonial: Testimonial, index: number) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ease-in-out ${
                    index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  <div className="flex flex-col md:flex-row p-8 md:p-12">
                    {/* Left column with avatar and personal details */}
                    <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-100 to-white shadow-lg ring-4 ring-white mx-auto overflow-hidden relative">
                        {/* Placeholder for avatar - would be replaced with actual images */}
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-blue-600 font-medium">{testimonial.profession}</p>
                        <p className="text-gray-500 text-sm mt-1">{testimonial.location}</p>
                        
                        <div className="flex justify-center mt-3">
                          {[...Array(testimonial.rating)].map((_: unknown, i: number) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-amber-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Additional premium details */}
                        <div className="mt-5 pt-5 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            <p className="mb-1"><span className="font-medium text-gray-700">Solution:</span> {testimonial.product}</p>
                            <p><span className="font-medium text-gray-700">Client since:</span> {new Date().getFullYear() - testimonial.yearsSince}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right column with quote */}
                    <div className="md:w-2/3 flex flex-col justify-center">
                      <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed mb-6 relative">
                        <span className="text-primary-300">&ldquo;</span>{testimonial.quote}<span className="text-primary-300">&rdquo;</span>
                        
                        {/* Subtle watermark */}
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 100 100">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
                          </svg>
                        </div>
                      </blockquote>
                      
                      {/* Additional premium content - success metrics */}
                      <div className="mt-auto">
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                          <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-xs text-green-700 uppercase font-bold mb-1">Mobility Improvement</p>
                                <div className="flex items-center">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: testimonial.mobilityImprovement }}></div>
                                  </div>
                                  <span className="ml-2 text-green-700 font-bold">{testimonial.mobilityImprovement}</span>
                                </div>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-xs text-blue-700 uppercase font-bold mb-1">Quality of Life</p>
                                <div className="flex items-center">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: testimonial.qualityOfLife }}></div>
                                  </div>
                                  <span className="ml-2 text-blue-700 font-bold">{testimonial.qualityOfLife}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Premium navigation controls */}
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-lg text-primary-600 hover:text-primary-700 focus:outline-none hover:shadow-xl transition-all mr-4 border border-gray-100"
                aria-label="Previous testimonial"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_: unknown, index: number) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-primary-600 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-lg text-primary-600 hover:text-primary-700 focus:outline-none hover:shadow-xl transition-all ml-4 border border-gray-100"
                aria-label="Next testimonial"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Satisfaction metrics - clean light style */}
        <div className="mt-20 bg-gradient-to-b from-white via-blue-50/10 to-white rounded-xl shadow-lg p-8 border border-gray-50">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Overall Client Satisfaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-primary-100/70 text-primary-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">{metrics.productSatisfaction.value}</h4>
              <p className="text-gray-600">{metrics.productSatisfaction.label}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-amber-100/70 text-amber-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">{metrics.hospitalsClinics.value}</h4>
              <p className="text-gray-600">{metrics.hospitalsClinics.label}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100/70 text-green-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">{metrics.patientsServed.value}</h4>
              <p className="text-gray-600">{metrics.patientsServed.label}</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100/70 text-blue-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-900">{metrics.industryExperience.value}</h4>
              <p className="text-gray-600">{metrics.industryExperience.label}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href={`/${locale}/resources#testimonials`}
            className="btn-secondary bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg transition-all px-8 py-3 rounded-lg border-0"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
