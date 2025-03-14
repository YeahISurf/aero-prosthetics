"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import FooterLanguageToggle from './FooterLanguageToggle';
import { throttle, isValidEmail } from '@/lib/utils';
import { ChevronUp, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

// Social media link component
interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  srText: string;
  icon: React.ReactNode;
}

// Helper function with enhanced debugging for translation issues
const getSafeTranslation = (t: any, key: string, defaultValue: string): string => {
  try {
    // Check if the translation function exists
    if (!t || typeof t.raw !== 'function') {
      return defaultValue;
    }

    // Attempt to get the translation
    const translation = t.raw(key);
    
    // If translation is empty or undefined, return default
    if (!translation) {
      return defaultValue;
    }
    
    return translation;
  } catch (e) {
    // If translation lookup fails, return the default value
    return defaultValue;
  }
};

// Helper for navigation translations with enhanced debugging
const getSafeNavTranslation = (nav: any, key: string, defaultValue: string): string => {
  try {
    // Check if the translation function exists
    if (!nav || typeof nav.raw !== 'function') {
      return defaultValue;
    }

    // Attempt to get the translation
    const translation = nav.raw(key);
    
    // If translation is empty or undefined, return default
    if (!translation) {
      return defaultValue;
    }
    
    return translation;
  } catch (e) {
    // If translation lookup fails, return the default value
    return defaultValue;
  }
};

const SocialLink = ({ href, ariaLabel, srText, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full p-1"
    aria-label={ariaLabel}
  >
    <span className="sr-only">{srText}</span>
    {icon}
  </a>
);

// Extracted FooterLink component for consistent styling and behavior
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link 
    href={href} 
    className="flex items-center text-white/80 hover:text-white transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-1 focus:ring-offset-[#025DBE] rounded px-2 py-1"
  >
    <ChevronRight 
      size={16} 
      className="h-3 w-3 mr-2 text-white/0 group-hover:text-white transition-colors duration-200" 
      aria-hidden="true" 
    />
    {children}
  </Link>
);

export default function Footer() {
  const locale = useLocale();
  
  // Add state to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  
  // Setup translation hooks with safe defaults using null as initial value
  let footerTranslations = null;
  let navTranslations = null;
  
  try {
    footerTranslations = useTranslations('footer');
  } catch (e) {
    // Fallback
  }

  try {
    navTranslations = useTranslations('navigation');
  } catch (e) {
    // Fallback
  }
  
  // Create safe versions that won't throw errors
  const t = footerTranslations || { raw: (key: string) => '' };
  const nav = navTranslations || { raw: (key: string) => '' };
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Set isMounted to true after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Helper function to create locale-aware URLs
  const localizedUrl = useCallback((path: string): string => {
    // If path already has locale, don't add it again
    if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
      return path;
    }
    
    // Handle root path specially
    if (path === '/') {
      return `/${locale}`;
    }
    
    // Make sure path doesn't start with a slash when concatenating
    const pathWithoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
    return `/${locale}/${pathWithoutLeadingSlash}`;
  }, [locale]);
  
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
  
  // Client-side only effect for parallax and back-to-top button
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowBackToTop(currentScrollY > 300);
    }
  }, []);
  
  useEffect(() => {
    // Initialize on mount with the current scroll position
    if (typeof window !== 'undefined' && !prefersReducedMotion) {
      handleScroll();
      
      // Throttle scroll event to improve performance
      const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
      
      window.addEventListener('scroll', throttledHandleScroll, { passive: true });
      return () => window.removeEventListener('scroll', throttledHandleScroll);
    }
  }, [handleScroll, prefersReducedMotion]);

  // Calculate parallax offset with useMemo to prevent unnecessary calculations
  const parallaxOffset = useMemo(() => {
    return prefersReducedMotion ? 0 : scrollY * 0.2;
  }, [scrollY, prefersReducedMotion]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setIsSubmitting(true);
    setSubscriptionError('');
    
    // Email validation using utility function
    if (!isValidEmail(email)) {
      setSubscriptionError(getSafeTranslation(t, 'subscriptionErrorInvalidEmail', 'Please enter a valid email address.'));
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Simulate API call - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this to your API
      // API call would go here instead of console.log
      
      // Success
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      // Handle error with more specific messages
      console.error('Subscription error:', error);
      
      // Check for specific error types and provide more helpful messages
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          setSubscriptionError(getSafeTranslation(t, 'subscriptionErrorNetwork', 'Network error. Please check your connection and try again.'));
        } else if (error.message.includes('already subscribed')) {
          setSubscriptionError(getSafeTranslation(t, 'subscriptionErrorDuplicate', 'This email is already subscribed to our newsletter.'));
        } else {
          setSubscriptionError(getSafeTranslation(t, 'subscriptionError', 'Failed to subscribe. Please try again.'));
        }
      } else {
        setSubscriptionError(getSafeTranslation(t, 'subscriptionError', 'Failed to subscribe. Please try again.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // If not mounted yet, return a simplified footer to prevent hydration errors
  if (!isMounted) {
    return (
      <footer aria-labelledby="footer-heading" className="relative bg-primary-600 text-white">
        <div className="container-custom py-10">
          <p className="text-center">Loading footer content...</p>
        </div>
      </footer>
    );
  }

  // Return the full footer when mounted (client-side)
  return (
    <footer className="relative" aria-labelledby="footer-heading" itemScope itemType="http://schema.org/WPFooter">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop} 
        aria-label="Back to top"
        className={`fixed right-6 z-50 p-3 rounded-full bg-primary-600 text-white shadow-lg transition-all duration-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } md:bottom-6 bottom-24`}
        tabIndex={showBackToTop ? 0 : -1}
        style={{
          // Use transform for better performance
          transform: `translate3d(0, ${showBackToTop ? '0' : '40px'}, 0)`,
          willChange: 'transform, opacity',
          // Skip animations for users who prefer reduced motion
          transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out, opacity 300ms ease-out'
        }}
      >
        <ChevronUp size={20} aria-hidden="true" />
      </button>
      
      {/* Premium separator line with subtle animation */}
      <div className="h-0.5 bg-gradient-to-r from-[#025DBE40] via-[#4F9EE0] to-[#025DBE40] animate-pulse"></div>
      
      {/* Main footer with diagonal gradient */}
      <div 
        className="relative text-white overflow-hidden"
        style={{
          background: 'linear-gradient(to top right, #025DBE, #4F9EE0)'
        }}
      >
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Background pattern with subtle animation */}
          <div 
            className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          ></div>
        </div>
        
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="container-custom relative z-10 py-10 sm:py-14 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8">
            {/* Company Info */}
            <div className="lg:col-span-3 sm:col-span-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">{getSafeTranslation(t, 'company.title', 'Company')}</h3>
              <p className="text-white/90 mb-4 max-w-sm">{getSafeTranslation(t, 'company.description', 'Aero Prosthetics is a leading provider of innovative prosthetic solutions that combine advanced technology with personalized care.')}</p>
              <div className="flex space-x-4 mb-6">
                <SocialLink 
                  href={getSafeTranslation(t, 'social.facebookUrl', 'https://facebook.com')}
                  ariaLabel={getSafeTranslation(t, 'social.facebook', 'Facebook')}
                  srText={getSafeTranslation(t, 'social.facebook', 'Facebook')}
                  icon={
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <SocialLink 
                  href={getSafeTranslation(t, 'social.instagramUrl', 'https://instagram.com')}
                  ariaLabel={getSafeTranslation(t, 'social.instagram', 'Instagram')}
                  srText={getSafeTranslation(t, 'social.instagram', 'Instagram')}
                  icon={
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <SocialLink 
                  href={getSafeTranslation(t, 'social.linkedinUrl', 'https://linkedin.com')}
                  ariaLabel={getSafeTranslation(t, 'social.linkedin', 'LinkedIn')}
                  srText={getSafeTranslation(t, 'social.linkedin', 'LinkedIn')}
                  icon={
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  }
                />
                <SocialLink 
                  href={getSafeTranslation(t, 'social.youtubeUrl', 'https://youtube.com')}
                  ariaLabel={getSafeTranslation(t, 'social.youtube', 'YouTube')}
                  srText={getSafeTranslation(t, 'social.youtube', 'YouTube')}
                  icon={
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Quick Links & Legal combined for better layout */}
            <div className="lg:col-span-3 sm:col-span-2 transition-all duration-300">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{getSafeTranslation(t, 'quickLinks.title', 'Quick Links')}</h3>
                <nav aria-label="Footer navigation">
                  <ul className="space-y-2.5">
                    <li>
                      <FooterLink href={localizedUrl('')}>
                        {getSafeNavTranslation(nav, 'home', 'Home')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('about')}>
                        {getSafeNavTranslation(nav, 'about', 'About')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('solutions')}>
                        {getSafeNavTranslation(nav, 'solutions', 'Solutions')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('training')}>
                        {getSafeNavTranslation(nav, 'training', 'Training')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('contact')}>
                        {getSafeNavTranslation(nav, 'contact', 'Contact')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('book-demo')}>
                        {getSafeNavTranslation(nav, 'book_demo', 'Book a Demo')}
                      </FooterLink>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Legal Navigation */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-5">{getSafeTranslation(t, 'legal.title', 'Legal')}</h3>
                <nav aria-label="Legal navigation">
                  <ul className="space-y-2.5">
                    <li>
                      <FooterLink href={localizedUrl('legal/privacy')}>
                        {getSafeTranslation(t, 'legal.privacy', 'Privacy Policy')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('legal/terms')}>
                        {getSafeTranslation(t, 'legal.terms', 'Terms of Service')}
                      </FooterLink>
                    </li>
                    <li>
                      <FooterLink href={localizedUrl('legal/accessibility')}>
                        {getSafeTranslation(t, 'legal.accessibility', 'Accessibility')}
                      </FooterLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Locations Section */}
            <div className="lg:col-span-3 sm:col-span-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">{getSafeTranslation(t, 'locations.title', 'Locations')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-white/80 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-white">{getSafeTranslation(t, 'locations.anaheim', 'Anaheim Hills')}</h4>
                    <address className="not-italic text-white/80 text-sm">
                      {getSafeTranslation(t, 'locations.anaheiml1', '5775 E Santa Ana Canyon Rd')}<br />
                      {getSafeTranslation(t, 'locations.anaheiml2', 'Suite 110')}<br />
                      {getSafeTranslation(t, 'locations.anaheiml3', 'Anaheim Hills, CA 92807')}
                    </address>
                    <a href={`tel:${getSafeTranslation(t, 'locations.anaheimPhone', '+17147714233')}`} className="text-white/80 hover:text-white text-sm mt-1 flex items-center">
                      <Phone className="h-3 w-3 mr-1" aria-hidden="true" /> 
                      {getSafeTranslation(t, 'locations.anaheimPhoneFormatted', '(714) 771-4233')}
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-white/80 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="font-medium text-white">{getSafeTranslation(t, 'locations.victorville', 'Victorville')}</h4>
                    <address className="not-italic text-white/80 text-sm">
                      {getSafeTranslation(t, 'locations.victorvillel1', '16534 Victor St')}<br />
                      {getSafeTranslation(t, 'locations.victorvillel2', 'Suite 300')}<br />
                      {getSafeTranslation(t, 'locations.victorvillel3', 'Victorville, CA 92395')}
                    </address>
                    <a href={`tel:${getSafeTranslation(t, 'locations.victorvillePhone', '+17607801061')}`} className="text-white/80 hover:text-white text-sm mt-1 flex items-center">
                      <Phone className="h-3 w-3 mr-1" aria-hidden="true" />
                      {getSafeTranslation(t, 'locations.victorvillePhoneFormatted', '(760) 780-1061')}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="lg:col-span-3 sm:col-span-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">{getSafeTranslation(t, 'social.title', 'Social')}</h3>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3" aria-labelledby="newsletter-heading">
                  <p id="newsletter-heading" className="text-white/80 text-sm">
                    {getSafeTranslation(t, 'newsletter.description', 'Stay up to date with the latest news and updates from Aero Prosthetics.')}
                  </p>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email-subscribe" className="text-sm text-white/90">
                      {getSafeTranslation(t, 'newsletter.emailLabel', 'Email Address')}
                    </label>
                    <input
                      id="email-subscribe"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={getSafeTranslation(t, 'newsletter.emailPlaceholder', 'Your email address')}
                      className="px-3 py-2 w-full bg-white/10 text-white placeholder-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40 border-0"
                      aria-label="Email address for newsletter"
                      aria-describedby={subscriptionError ? "email-error" : undefined}
                      aria-invalid={!!subscriptionError}
                      disabled={isSubmitting}
                    />
                    {subscriptionError && (
                      <div id="email-error" className="py-2 px-3 bg-red-900/20 text-red-200 rounded-md border-l-2 border-red-400/50 text-sm mt-2" role="alert">
                        {subscriptionError}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`w-full px-4 py-2 bg-white text-[#025DBE] font-medium rounded-md transition-all duration-200 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#025DBE] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#025DBE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {getSafeTranslation(t, 'newsletter.subscribing', 'Subscribing...')}
                      </span>
                    ) : (
                      getSafeTranslation(t, 'newsletter.subscribe', 'Subscribe')
                    )}
                  </button>
                </form>
              ) : (
                <div 
                  className="py-4 px-3 bg-white/10 text-white rounded-md border-l-2 border-white/30 animate-fadeIn"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-lg font-medium">{getSafeTranslation(t, 'newsletter.thankYou', 'Thank you for subscribing!')}</p>
                  <p className="text-white/80 text-sm mt-1">{getSafeTranslation(t, 'newsletter.confirmation', 'You\'ll receive our latest updates in your inbox.')}</p>
                </div>
              )}
              
              {/* Language Toggle */}
              <div className="mt-6">
                <p className="text-sm text-white/80 mb-2">{getSafeTranslation(t, 'language', 'Language')}</p>
                <FooterLanguageToggle />
              </div>
            </div>
          </div>
          
          {/* Copyright & Credits Section */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70 text-sm text-center md:text-left">
                {getSafeTranslation(t, 'copyright', '© 2023 Aero Prosthetics. All rights reserved.').replace('2023', currentYear.toString())}
              </p>
              <div className="mt-4 md:mt-0 text-white text-sm flex flex-wrap justify-center md:justify-end items-center gap-y-2">
                <a 
                  href={`mailto:${getSafeTranslation(t, 'contact.email', 'info@aeroprosthetics.com')}`} 
                  className="flex items-center text-white hover:text-white/80 mr-6 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-[#025DBE] rounded px-2 py-1"
                >
                  <Mail size={16} className="mr-1" aria-hidden="true" />
                  {getSafeTranslation(t, 'contact.email', 'info@aeroprosthetics.com')}
                </a>
                <a 
                  href={`tel:${getSafeTranslation(t, 'contact.phone', '+17147714233')}`} 
                  className="flex items-center text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-[#025DBE] rounded px-2 py-1"
                >
                  <Phone size={16} className="mr-1" aria-hidden="true" />
                  {getSafeTranslation(t, 'contact.phoneFormatted', '(714) 771-4233')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
