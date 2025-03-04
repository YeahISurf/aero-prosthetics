"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const [scrollY, setScrollY] = useState(0);
  
  // Client-side only effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Initialize on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial rotation
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    { quote: "\"The prosthetic has changed my life. I can now run again.\"", name: "Michael S." },
    { quote: "\"Exceptional quality and care. Worth every penny.\"", name: "Sarah T." },
    { quote: "\"Their advanced technology made all the difference.\"", name: "James R." }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const parallaxOffset = scrollY * 0.3;

  return (
    <section className="relative bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 text-white overflow-hidden">
      {/* Premium blue accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100"></div>
      
      <div className="absolute inset-0 z-0 opacity-15">
        {/* Enhanced background pattern with subtle animation */}
        <div 
          className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        ></div>
      </div>
      
      {/* Subtle particle effect overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
      
      <div className="container-custom relative z-10 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-2">
              Premium Prosthetic Solutions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {t('subtitle')}
            </p>
            
            {/* Animated testimonial quote */}
            <div className="relative h-20 mt-4 overflow-hidden">
              <div className="absolute transition-all duration-700 ease-in-out w-full"
                   style={{ opacity: 1, transform: `translateY(0)` }}>
                <p className="font-light italic text-white/80 border-l-4 border-blue-300 pl-4">
                  {testimonials[currentTestimonial].quote}
                </p>
                <p className="text-blue-200 font-medium text-sm mt-1 pl-4">
                  — {testimonials[currentTestimonial].name}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/en/services" 
                className="btn bg-white text-blue-600 hover:bg-blue-50 border border-white/80 shadow-lg transition-all hover:scale-105"
              >
                {t('cta')}
              </Link>
              <Link 
                href="/en/contact" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all hover:border-blue-200 hover:text-blue-100"
              >
                {useTranslations('cta')('contactUs')}
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            {/* Premium hero image with subtle parallax */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-2xl border border-white/20"
              style={{ 
                transform: `translateY(${-parallaxOffset * 0.1}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="aspect-[4/3] relative">
                {/* This would be replaced with your actual hero image */}
                <Image 
                  src="/placeholder-team.jpg"
                  alt="Advanced prosthetic technology"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                
                {/* Premium blue corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-300 to-transparent opacity-70"></div>
                
                {/* Image caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-light">Advanced materials for maximum comfort and performance</p>
                </div>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs">
              <p className="text-blue-700 font-semibold text-xs mb-2">TRUSTED BY LEADING INSTITUTIONS</p>
              <div className="flex items-center justify-between space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced subtle gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
    </section>
  );
}
