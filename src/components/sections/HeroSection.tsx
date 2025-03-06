"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { throttle } from '@/lib/utils';

// Custom hook for detecting client-side hydration
function useClientHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isHydrated = useClientHydration();
  
  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Define handleScroll with useCallback to prevent recreation on each render
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setScrollY(window.scrollY);
    }
  }, []);
  
  // Use throttled scroll handler for better performance
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;
    
    // Throttle scroll event to improve performance
    const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
    
    // Initialize on mount
    handleScroll();
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll, prefersReducedMotion]);

  // Testimonial rotation from localization files
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = t.raw('testimonials') as Array<{ quote: string; name: string }>;
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials, testimonials.length, prefersReducedMotion]); // Updated dependency array
  
  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.3;

  // Helper function for animation delay styles
  const getAnimationStyle = (delay: number) => {
    // Only apply animation styles on client-side to prevent layout shifts
    if (!isHydrated || prefersReducedMotion) return {};
    return { animationDelay: `${delay}s`, animationFillMode: 'both' };
  };

  // Helper for dynamic class names
  const getAnimationClass = (baseClass: string, animationClass: string) => {
    if (!isHydrated || prefersReducedMotion) return baseClass;
    return `${baseClass} ${animationClass}`;
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden">
      {/* Premium accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
      
      <div className="absolute inset-0 z-0 opacity-15">
        {/* Enhanced background pattern with subtle animation */}
        <div 
          className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
          style={isHydrated ? { transform: `translateY(${parallaxOffset}px)` } : {}}
          aria-hidden="true"
          role="presentation"
        ></div>
      </div>
      
      {/* Subtle particle effect overlay with improved aesthetics */}
      <div 
        className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"
        aria-hidden="true"
      ></div>
      
      {/* Modern dual-tone gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"
        aria-hidden="true"
      ></div>
      
      <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={getAnimationClass("space-y-8", "animate-fadeIn")}
            style={getAnimationStyle(0.2)}
          >
            <div 
              className={getAnimationClass("inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-2", "animate-slideInRight")}
              style={getAnimationStyle(0.4)}
            >
              {t('badge')}
            </div>
            
            <h1 
              className={getAnimationClass("text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight", "animate-slideInUp")}
              style={getAnimationStyle(0.5)}
            >
              {t('title')}
            </h1>
            
            <p 
              className={getAnimationClass("text-xl md:text-2xl text-white/95 leading-relaxed", "animate-slideInUp")}
              style={getAnimationStyle(0.6)}
            >
              {t('subtitle')}
            </p>
            
            {/* Animated testimonial quote - improved with ARIA attributes */}
            <div 
              className="relative h-20 mt-6"
              role="region"
              aria-label={t('testimonialSectionLabel') || "Client testimonials"}
              aria-roledescription="carousel"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="absolute transition-all duration-700 ease-in-out w-full"
                  style={{ 
                    opacity: index === currentTestimonial ? 1 : 0,
                    transform: isHydrated && !prefersReducedMotion ? `translateY(${index === currentTestimonial ? 0 : 20}px)` : 'none',
                    zIndex: index === currentTestimonial ? 1 : 0
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                  aria-hidden={index !== currentTestimonial}
                >
                  <blockquote>
                    <p className="font-light italic text-white/90 border-l-4 border-primary-300 pl-4">
                      {testimonial.quote}
                    </p>
                    <footer className="text-primary-100 font-medium text-sm mt-1 pl-4">
                      — <cite>{testimonial.name}</cite>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
            
            <div 
              className={getAnimationClass("flex flex-col sm:flex-row gap-4 pt-4", "animate-fadeIn")}
              style={getAnimationStyle(0.8)}
            >
              <Link 
                href={`/${locale}/services`}
                className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t('cta')}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100"
              >
                {useTranslations('cta')('contactUs')}
              </Link>
            </div>
          </div>
          
          <div className={getAnimationClass("relative", "animate-fadeIn")} style={getAnimationStyle(0.9)}>
            {/* Premium hero image with improved shadow and parallax */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/30"
              style={isHydrated && !prefersReducedMotion ? { 
                transform: `translateY(${-parallaxOffset * 0.1}px)`,
                transition: 'transform 0.3s ease-out'
              } : {}}
            >
              <div className="aspect-[4/3] relative">
                {/* Hero image */}
                <Image 
                  src="/uploads/hero/why-carbon-fiber-is-the-preferred-material-for-prosthetic-devices-large.jpg"
                  alt={t('imageAlt') || "Advanced carbon fiber prosthetic technology showcasing lightweight and durable design for improved mobility and comfort"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                
                {/* Premium corner accent with improved gradient */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-300/80 via-secondary-teal-500/40 to-transparent"></div>
                
                {/* Image caption with improved readability */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                  <p className="text-white text-sm font-light">
                    {t('imageCaption')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Trust badges with improved design */}
            <div className={getAnimationClass("absolute -bottom-10 -right-10 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary-100/30 hidden md:block", "animate-scaleIn")} style={getAnimationStyle(1.2)}>
              <p className="text-primary-700 font-semibold text-xs mb-3">
                {t('trustBadge')}
              </p>
              <div className="flex items-center justify-between space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15V17M12 7V13M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5L14.3 9.5L19.5 10.2L15.8 14L16.9 19.4L12 16.9L7.1 19.4L8.2 14L4.5 10.2L9.7 9.5L12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced subtle gradient transition to next section - only visible on mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent lg:hidden"></div>
    </section>
  );
}
