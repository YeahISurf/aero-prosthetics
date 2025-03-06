"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import FooterLanguageToggle from './FooterLanguageToggle';
import { throttle } from '@/lib/utils';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  
  // Client-side only effect for parallax
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setScrollY(window.scrollY);
    }
  }, []);
  
  useEffect(() => {
    // Initialize on mount with the current scroll position
    if (typeof window !== 'undefined') {
      handleScroll();
      
      // Throttle scroll event to improve performance
      const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
      
      window.addEventListener('scroll', throttledHandleScroll, { passive: true });
      return () => window.removeEventListener('scroll', throttledHandleScroll);
    }
  }, [handleScroll]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setIsSubmitting(true);
    setSubscriptionError('');
    
    try {
      // Simulate API call - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this to your API
      console.log('Subscribing email:', email);
      
      // Success
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      // Handle error
      console.error('Subscription error:', error);
      setSubscriptionError(t('subscriptionError') || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parallaxOffset = scrollY * 0.2;

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative" aria-labelledby="footer-heading" itemScope itemType="http://schema.org/WPFooter">
      {/* Simple premium separator line with subtle animation */}
      <div className="h-0.5 bg-gradient-to-r from-[#025DBE40] via-[#4F9EE0] to-[#025DBE40] animate-pulse"></div>
      
      {/* Main footer with diagonal gradient */}
      <div 
        className="relative text-white overflow-hidden"
        style={{
          background: 'linear-gradient(to top right, #025DBE, #4F9EE0)'
        }}
      >
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Simple background pattern with subtle animation */}
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          ></div>
        </div>
        
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="container-custom relative z-10 py-10 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-5">{t('company.title')}</h3>
              <p className="text-white/90 mb-5">{t('company.description')}</p>
              <div className="flex space-x-5 mb-6">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              {/* Simple premium newsletter subscription */}
              <div>
                <h4 className="text-lg font-medium text-white mb-3">{t('social.title') || 'Stay Updated'}</h4>
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                    <label htmlFor="email-subscribe" className="sr-only">Email address</label>
                    <div className="relative">
                      <input
                        id="email-subscribe"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Your email address"
                        className="px-3 py-2 w-full bg-white/10 text-white placeholder-white/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/40 border-0"
                        aria-label="Email address for newsletter"
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        className={`mt-2 w-full md:w-auto px-4 py-2 bg-white text-[#025DBE] font-medium rounded-sm transition-all duration-200 hover:bg-opacity-90 hover:shadow-md ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#025DBE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Subscribing...
                          </span>
                        ) : (
                          'Subscribe'
                        )}
                      </button>
                    </div>
                    {subscriptionError && (
                      <div className="py-2 px-3 bg-red-900/20 text-red-200 rounded-sm border-l-2 border-red-400/50 text-sm mt-2">
                        {subscriptionError}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="py-2 px-3 bg-white/10 text-white rounded-sm border-l-2 border-white/30 animate-fadeIn">
                    Thanks for subscribing!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-5">{t('quickLinks.title')}</h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  <li>
                    <Link href={`/${locale}`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('home')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/about`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('about')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/services`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('services')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/team`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('team')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('contact')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/resources`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                      <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {nav('resources')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Locations */}
            <div className="transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-5">{t('locations.title')}</h3>
              <div className="space-y-6">
                <address className="not-italic" itemScope itemType="http://schema.org/MedicalClinic">
                  <h4 className="font-semibold text-white mb-2">{t('locations.anaheim')}</h4>
                  <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <p className="text-white/80" itemProp="streetAddress">1001 N Weir Canyon Road</p>
                    <p className="text-white/80">
                      <span itemProp="addressLocality">Anaheim Hills</span>, 
                      <span itemProp="addressRegion">CA</span> 
                      <span itemProp="postalCode">92807</span>
                    </p>
                  </div>
                  <a href="tel:7143851000" className="text-white/80 hover:text-white transition-colors duration-200 mt-1 flex items-center group" itemProp="telephone">
                    <svg className="h-4 w-4 mr-1 text-white/60 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Tel: 714-385-1000
                  </a>
                </address>
                <address className="not-italic" itemScope itemType="http://schema.org/MedicalClinic">
                  <h4 className="font-semibold text-white mb-2">{t('locations.victorville')}</h4>
                  <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <p className="text-white/80" itemProp="streetAddress">17189 Yuma Street</p>
                    <p className="text-white/80">
                      <span itemProp="addressLocality">Victorville</span>, 
                      <span itemProp="addressRegion">CA</span> 
                      <span itemProp="postalCode">92395</span>
                    </p>
                  </div>
                  <a href="tel:7602451000" className="text-white/80 hover:text-white transition-colors duration-200 mt-1 flex items-center group" itemProp="telephone">
                    <svg className="h-4 w-4 mr-1 text-white/60 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Tel: 760-245-1000
                  </a>
                </address>
              </div>
            </div>

            {/* Language & Legal */}
            <div className="transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-5">{t('language')}</h3>
              <div className="mb-8">
                <FooterLanguageToggle />
              </div>
              <h3 className="text-xl font-bold text-white mb-5">Legal</h3>
              <nav aria-label="Legal navigation">
                <div className="space-y-3">
                  <Link href={`/${locale}/legal/privacy`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                    <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {useTranslations('legal.privacy')('title')}
                  </Link>
                  <Link href={`/${locale}/legal/terms`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                    <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {useTranslations('legal.terms')('title')}
                  </Link>
                  <Link href={`/${locale}/legal/accessibility`} className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group">
                    <svg className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {useTranslations('legal.accessibility')('title')}
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          <div className="mt-10 md:mt-14 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-center md:text-left mb-4 md:mb-0">
              © {currentYear} {t('company.title')}. {t('copyright').replace(/© \d{4}/g, '')}
            </p>
            <button 
              onClick={scrollToTop}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-sm flex items-center transition-all duration-200 border-0 hover:shadow-glow"
              aria-label="Scroll to top"
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        .hover-shadow-glow:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </footer>
  );
}
