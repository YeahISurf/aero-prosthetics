"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

// Mock data for testimonials - in a real implementation, this would come from the CMS
const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    location: 'Anaheim, CA',
    quote: 'The team at Aero Prosthetics changed my life. Their personalized approach and cutting-edge technology gave me back my mobility and confidence.',
    image: '/placeholder-avatar.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    location: 'Victorville, CA',
    quote: 'After struggling with ill-fitting prosthetics for years, I finally found Aero Prosthetics. Their custom solutions and ongoing support have made all the difference.',
    image: '/placeholder-avatar.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Martinez',
    location: 'Los Angeles, CA',
    quote: 'The pediatric team at Aero Prosthetics has been amazing with my son. They understand children\'s unique needs and have helped him thrive.',
    image: '/placeholder-avatar.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jennifer Lee',
    location: 'San Bernardino, CA',
    quote: 'I appreciate the comprehensive care I receive at Aero Prosthetics. From initial consultation to ongoing adjustments, they\'ve been there every step of the way.',
    image: '/placeholder-avatar.jpg',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-primary-50">
      <div className="container-custom">
        <h2 className="section-title">{t('title')}</h2>
        
        <div className="mt-12 relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        {/* Placeholder for avatar */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-xl italic text-gray-700 mb-6">&quot;{testimonial.quote}&quot;</blockquote>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-primary-500 hover:text-primary-600 focus:outline-none"
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
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md text-primary-500 hover:text-primary-600 focus:outline-none"
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
        
        <div className="mt-12 text-center">
          <Link href="/resources#testimonials" className="btn-secondary">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
