"use client";

import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Card, CardContent } from './Card';
import OptimizedImage from './OptimizedImage';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
  imageSrc?: string;
  variant?: 'default' | 'highlight' | 'minimal';
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  rating,
  imageSrc,
  variant = 'default',
  className = '',
}: TestimonialCardProps) {
  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="w-4 h-4 fill-warning-500 text-warning-500" />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="w-4 h-4 fill-warning-500 text-warning-500" />
      );
    }

    // Add empty stars to make 5 total
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // Determine card variant styles
  const cardVariant = variant === 'highlight' ? 'highlight' : 'default';
  const cardHover = variant === 'minimal' ? undefined : 'lift';

  return (
    <Card 
      variant={cardVariant} 
      hover={cardHover}
      className={`${className} transition-all duration-300`}
    >
      <CardContent className="flex flex-col gap-4">
        {/* Quote marks */}
        <div className="text-4xl text-primary-200 font-serif leading-none mb-2">&quot;</div>
        
        {/* Rating stars if provided */}
        {rating && (
          <div className="flex items-center mb-2">
            {renderStars(rating)}
            <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Testimonial text */}
        <p className="text-gray-700 italic mb-4">{quote}</p>
        
        {/* Author info */}
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          {imageSrc && (
            <div className="mr-3 flex-shrink-0">
              <OptimizedImage
                src={imageSrc}
                alt={author}
                width={40}
                height={40}
                rounded="full"
                className="border border-gray-200"
              />
            </div>
          )}
          
          <div>
            <div className="font-medium text-gray-900">{author}</div>
            {(role || company) && (
              <div className="text-sm text-gray-500">
                {role}{role && company && ', '}{company}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 