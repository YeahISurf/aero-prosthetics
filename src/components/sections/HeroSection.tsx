"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

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
  // Initialize with 0 on both server and client to prevent hydration mismatch
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
  
  // Replace throttle with requestAnimationFrame for better performance
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;
    
    let ticking = false;
    const handleScrollOptimized = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initialize scroll position
    setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScrollOptimized, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollOptimized);
  }, [prefersReducedMotion]);

  // Testimonial rotation from localization files
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // Add fallback for missing translations
  const testimonials = (t.raw('testimonials') as Array<{ quote: string; name: string }>) || [];
  
  // Store the length in a ref to avoid dependency issues
  const testimonialsLengthRef = useRef(testimonials.length);
  
  // Update the ref if length changes
  useEffect(() => {
    testimonialsLengthRef.current = testimonials.length;
  }, [testimonials.length]);
  
  useEffect(() => {
    if (prefersReducedMotion || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % Math.max(1, testimonialsLengthRef.current));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion, testimonials.length]); // Added testimonials.length to dependencies
  
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
      
      <div className="container-custom relative z-10 py-12 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div 
            className={getAnimationClass("space-y-4 sm:space-y-6 md:space-y-8", "animate-fadeIn")}
            style={getAnimationStyle(0.2)}
          >
            <div 
              className={getAnimationClass("inline-block px-2 py-0.5 sm:px-4 sm:py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium -mb-1 sm:mb-0", "animate-slideInRight")}
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
            
            {/* Flex container for mobile reordering */}
            <div className="flex flex-col space-y-4 sm:space-y-6">
              {/* CTA Buttons */}
              <div 
                className={getAnimationClass("flex flex-col sm:flex-row gap-3 order-1 sm:order-2 mt-2 sm:mt-4 pb-0 mb-8 sm:mb-0", "animate-fadeIn")}
                style={getAnimationStyle(0.7)}
              >
                <Link 
                  href={`/${locale}/services`}
                  className="btn bg-white text-primary-600 hover:bg-primary-50 border border-white/80 shadow-lg transition-all duration-300 hover:scale-105 px-4 sm:px-5 py-2.5 sm:py-3 text-base font-semibold w-full sm:w-auto justify-center"
                  aria-label={t('cta')}
                >
                  {t('cta')}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/15 transition-all duration-300 hover:border-primary-200 hover:text-primary-100 px-4 sm:px-5 py-2.5 sm:py-3 text-base font-semibold w-full sm:w-auto justify-center"
                  aria-label={useTranslations('cta')('contactUs')}
                >
                  {useTranslations('cta')('contactUs')}
                </Link>
              </div>
              
              {/* Animated testimonial quote */}
              <div 
                className={getAnimationClass("relative h-16 sm:h-20 order-2 sm:order-1", "animate-fadeIn")}
                role="region"
                aria-label={t('testimonialSectionLabel') || "Client testimonials"}
                aria-roledescription="carousel"
                style={getAnimationStyle(0.8)}
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
                      <p className="font-light italic text-white/90 border-l-4 border-primary-300 pl-3 sm:pl-4 text-sm sm:text-base">
                        {testimonial.quote}
                      </p>
                      <footer className="text-primary-100 font-medium text-xs sm:text-sm mt-1 pl-3 sm:pl-4">
                        — <cite>{testimonial.name}</cite>
                      </footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={getAnimationClass("relative mt-6 sm:mt-0", "animate-fadeIn")} style={getAnimationStyle(0.9)}>
            {/* Premium hero image with improved shadow and parallax */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/30"
              style={isHydrated && !prefersReducedMotion ? { 
                transform: `translateY(${-parallaxOffset * 0.1}px)`,
                transition: 'transform 0.3s ease-out'
              } : {}}
            >
              <div className="aspect-[4/3] relative">
                {/* Hero image - optimized for performance */}
                <Image 
                  src="/uploads/hero/carbon-fiber-prosthetic-optimized.webp"
                  alt={t('imageAlt') || "Advanced carbon fiber prosthetic technology showcasing lightweight and durable design for improved mobility and comfort"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABLAGQDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAUDBAYCAQf/xAAtEAACAQMDAgQGAgMAAAAAAAABAgMABBEFEiExQQYTIlEyYXGBkaEUwSNS0f/EABkBAAIDAQAAAAAAAAAAAAAAAAIDAQQFAP/EACARAAICAgIDAQEAAAAAAAAAAAABAhEDIQQSMUFRYRP/2gAMAwEAAhEDEQA/ANYnWuqQKcdaflA2yKakaluTH1qIUEDFQ3t3DZ2z3M8gjjQZJP8Aw1UqxkTdGYzTDPtIgZDkZ5rC61rmrajbm0uLqRLYjEkUR2hiO2R0+1NtQ8SyWukW1/JGJJNw82NRkMhGSvbGRnjigU3Gmaum3Xx/R+teYpPo2q2mpW3m28mSpAkjbh0P9jqPlT0dKUVYSZLRRRRggKi//evrU1LeprDihkPRZaVJJOcdhXl7O1rYTXbRoFijLHjGaXwai1ldXE8Xrtb1BKTnblWB4OfkQRUaF5L1U1BLlmimGYcnj5g+/wCqzyxzkqiN7P2HqyJ4l0GC8aGIyMSkgYM0ZABz2JHY1bbXtIQkNqFquD/ubP6pB4tjhk0FZn9MsE6yRsOo2kHj7ZrHeVMhC+TIAMcgmnYMUsii12QucejcD4jY9NEv3bn9GrK67rY/+W1X/k/+Vl/LmPeEfgVPbW8wf/IsR9AKY+NFCfMk/Rbk1rWbjK3EyQ91iAQj64GT96U/xi5LSfzJO5aR+v3NaC1s9L5aCHOMckdaZw6ZZuMNEoxRPkRXhDVjNEiujK6hkYEMrDII7Gvos1jFPAYZ19SHHrkEZB7EUq1nwU1xK91pEqpK/LwS/Cx/0boD8jVbQvEF/pG630k74H4WeJsSwnuR7j5itPhZ3NdZbZFjepzovEUUvg1S3upgqAgYBJXHBoorQKhlreiQapEGO6KeM5jlT4lPy9x8qSaroWnQac91BIzn+PJJGWPJJGQD7HIop1qrYs3orI67Nti3fPtU6MvYNtclkTh4owYTAIHqB5zj/nOKZ3FpBd27wTxK8bgqVYdDRRQ0I7Mlrem3dhO8MsbLg4BxwR7g96X7W/3FFFK0xji0yt+AaKKKmxB//9k="
                  onError={(e) => {
                    // Fallback to non-webp if WebP fails
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('.webp')) {
                      target.src = "/uploads/hero/carbon-fiber-prosthetic-optimized.jpg";
                      console.error('WebP image failed to load, falling back to JPG');
                    }
                  }}
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
