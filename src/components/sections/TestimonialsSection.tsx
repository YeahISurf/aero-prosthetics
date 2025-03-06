"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('right');
  
  // Get testimonials from localization files
  const testimonials = t.raw('items') as Testimonial[];
  const metrics = t.raw('metrics') as Metrics;

  const nextTestimonial = useCallback(() => {
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);
  
  // Auto-rotation for testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, nextTestimonial]);
  
  // Define function with explicit type annotation to avoid circular reference
  const setTestimonialIndex = useCallback((index: number) => {
    // Set direction based on current index vs new index
    if (index > activeIndex) {
      setDirection('right');
    } else if (index < activeIndex) {
      setDirection('left');
    }
    setActiveIndex(index);
  }, [activeIndex]);

  // Function to get animation classes and styles based on index, active index, and direction
  const getAnimationClassesAndStyles = useCallback((index: number) => {
    const isActive = index === activeIndex;
    
    // Base and inactive positioning classes
    const baseClasses = "transition-all duration-700";
    const inactiveClasses = "opacity-0 absolute inset-0";
    
    // For inactive testimonials, just handle positioning based on direction
    if (!isActive) {
      // For inactive slides, consider the direction
      if (
        (direction === 'right' && index < activeIndex) || 
        (direction === 'left' && index > activeIndex)
      ) {
        return {
          className: `${baseClasses} ${inactiveClasses}`,
          style: { transform: 'translateX(-100%)' }
        };
      } else {
        return {
          className: `${baseClasses} ${inactiveClasses}`,
          style: { transform: 'translateX(100%)' }
        };
      }
    }
    
    // For active testimonial, use simpler slide animation
    return {
      className: `backface-hidden`,
      style: {
        animation: `fadeSlideIn 0.8s forwards`,
        '--slide-start': direction === 'right' ? '50px' : '-50px',
        '--scale-start': '1',
        animationDuration: '0.8s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'ease-out'
      } as React.CSSProperties
    };
  }, [activeIndex, direction]);

  // Memory optimization: memoize the animation styles for each testimonial  
  const getAnimationStyleForIndex = useCallback((index: number) => {
    return getAnimationClassesAndStyles(index);
  }, [getAnimationClassesAndStyles]);
  
  return (
    <section className="section relative overflow-hidden py-24">
      {/* Enhanced background with subtle gradient pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-40 w-48 h-48 rounded-full bg-blue-100/20 blur-2xl z-0"></div>
      <div className="absolute right-10 bottom-40 w-64 h-64 rounded-full bg-blue-100/15 blur-3xl z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          {/* Enhanced premium section header */}
          <span className="inline-block px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {t('sectionTagline')}
          </span>
          <h2 className="section-title text-gray-900 mb-4 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            {t('title')}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 mx-auto mb-6 animate-scaleIn" style={{ animationDelay: '0.4s' }}></div>
          <p className="text-lg text-gray-700 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            {t('subtitle')}
          </p>
        </div>
        
        {/* Company metrics showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          {Object.entries(metrics).map(([key, item]) => (
            <div key={key} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{item.value}</p>
              <p className="text-gray-600 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 relative" 
             onMouseEnter={() => setIsPaused(true)} 
             onMouseLeave={() => setIsPaused(false)}>
          <div className="max-w-5xl mx-auto">
            {/* Large decorative quotation mark */}
            <div className="absolute -top-10 left-10 text-primary-200 opacity-50 z-0 animate-float">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50 animate-scaleIn perspective" style={{ animationDelay: '0.7s' }}>
              {/* Enhanced premium card accent with gradient */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"></div>
              
              {testimonials.map((testimonial: Testimonial, index: number) => (
                <div
                  key={testimonial.id}
                  className={getAnimationStyleForIndex(index).className}
                  style={getAnimationStyleForIndex(index).style}
                >
                  <div className="flex flex-col md:flex-row p-8 md:p-12">
                    {/* Left column with enhanced avatar and personal details */}
                    <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-50 to-white shadow-xl ring-4 ring-white mx-auto overflow-hidden relative transition-all duration-300 hover:scale-105">
                        {/* Animated avatar with glowing effect */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 text-3xl font-bold">
                          <span className="relative z-10">{testimonial.name.charAt(0)}</span>
                          <div className="absolute inset-0 bg-blue-300 opacity-20 mix-blend-overlay"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/40 to-transparent"></div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-5">
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-blue-600 font-medium">{testimonial.profession}</p>
                        <p className="text-gray-500 text-sm mt-1">{testimonial.location}</p>
                        
                        <div className="flex justify-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Enhanced premium details card */}
                        <div className="mt-5 pt-5 border-t border-gray-100">
                          <div className="text-sm bg-blue-50 rounded-lg p-4 shadow-inner border border-blue-100">
                            <p className="mb-2"><span className="font-medium text-gray-700">Solution:</span> <span className="text-blue-700">{testimonial.product}</span></p>
                            <p><span className="font-medium text-gray-700">Client since:</span> <span className="text-blue-700">{new Date().getFullYear() - testimonial.yearsSince}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right column with enhanced quote design */}
                    <div className="md:w-2/3 flex flex-col justify-center">
                      <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed mb-6 relative">
                        <span className="text-blue-300 text-opacity-60">&ldquo;</span>
                        <span className="relative">{testimonial.quote}</span>
                        <span className="text-blue-300 text-opacity-60">&rdquo;</span>
                        
                        {/* Enhanced subtle watermark */}
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 100 100">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
                          </svg>
                        </div>
                      </blockquote>
                      
                      {/* Enhanced success metrics cards with animated progress bars */}
                      <div className="mt-auto">
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                          <div className="bg-gradient-to-br from-green-50 to-green-100/70 rounded-lg p-4 shadow-sm border border-green-100 transition-all duration-300 hover:shadow-md">
                            <p className="text-xs text-green-800 uppercase font-bold mb-2 flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 7L18 12M18 12L13 17M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Mobility Improvement
                            </p>
                            <div className="flex items-center">
                              <div className="flex-1 bg-white rounded-full h-2.5 shadow-inner overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full" 
                                  style={{ 
                                    animation: index === activeIndex 
                                      ? 'progressGrow 1.2s ease-out forwards'
                                      : 'none',
                                    animationDelay: index === activeIndex ? '0.3s' : '0s',
                                    '--progress-width': testimonial.mobilityImprovement
                                  } as React.CSSProperties}
                                ></div>
                              </div>
                              <span className="ml-3 text-green-800 font-bold">{testimonial.mobilityImprovement}</span>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 rounded-lg p-4 shadow-sm border border-blue-100 transition-all duration-300 hover:shadow-md">
                            <p className="text-xs text-blue-800 uppercase font-bold mb-2 flex items-center">
                              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V16M8 12H16M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Quality of Life
                            </p>
                            <div className="flex items-center">
                              <div className="flex-1 bg-white rounded-full h-2.5 shadow-inner overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" 
                                  style={{ 
                                    animation: index === activeIndex 
                                      ? 'progressGrow 1.2s ease-out forwards'
                                      : 'none',
                                    animationDelay: index === activeIndex ? '0.5s' : '0s',
                                    '--progress-width': testimonial.qualityOfLife
                                  } as React.CSSProperties}
                                ></div>
                              </div>
                              <span className="ml-3 text-blue-800 font-bold">{testimonial.qualityOfLife}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced premium navigation controls */}
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-lg text-blue-600 hover:text-blue-700 focus:outline-none hover:shadow-xl transition-all mr-4 border border-gray-100 hover:scale-110 active:scale-95"
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
              
              {/* Enhanced dots indicator with improved accessibility */}
              <div className="flex space-x-4">
                {testimonials.map((_: unknown, index: number) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-12 h-12 flex items-center justify-center p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative group`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span 
                      className={`block rounded-full transition-all duration-500 ${
                        index === activeIndex 
                          ? 'bg-blue-600 w-8 h-4 shadow-md scale-100'
                          : 'bg-gray-300 group-hover:bg-gray-400 w-4 h-4 group-hover:scale-110'
                      }`}
                    ></span>
                    {index === activeIndex && (
                      <span className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30 w-4 h-4 mx-auto my-auto"></span>
                    )}
                  </button>
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-lg text-blue-600 hover:text-blue-700 focus:outline-none hover:shadow-xl transition-all ml-4 border border-gray-100 hover:scale-110 active:scale-95"
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
      </div>
    </section>
  );
}
