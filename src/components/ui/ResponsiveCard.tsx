import React from 'react';
import Image from 'next/image';

interface ResponsiveCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  children?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export default function ResponsiveCard({ 
  title, 
  description, 
  imageUrl, 
  children,
  actionText = `Learn more about ${title}`,
  onAction
}: ResponsiveCardProps) {
  return (
    <div className="@container relative rounded-lg border bg-white transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col @md:flex-row overflow-hidden">
        {imageUrl && (
          <div className="@md:w-1/3 @lg:w-2/5 overflow-hidden relative h-48 @md:h-auto">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        )}
        
        <div className={`flex-1 p-4 @md:p-6 ${!imageUrl ? 'w-full' : ''}`}>
          <h3 className="mb-2 text-lg font-semibold @lg:text-xl">{title}</h3>
          <p className="mb-4 text-sm text-gray-600 @md:text-base">{description}</p>
          
          {/* Content area that changes layout based on container width */}
          <div className="@sm:flex @sm:flex-wrap @lg:flex-nowrap gap-3">
            {children}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              className="rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white transition hover:bg-primary-700 @md:px-4 @md:py-2"
              aria-expanded="false"
              onClick={onAction}
            >
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 