'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  height?: number;
  className?: string;
  companyName: string;
  tagline: string;
}

export default function Logo({ height, className, companyName, tagline }: LogoProps) {
  // When height is provided, use it; otherwise use a reasonable default
  const logoHeight = height || 150;
  
  // For display inside the header, we want to ensure the icon is prominent
  // Calculate width based on the height to maintain proper aspect ratio
  const logoWidth = Math.round(logoHeight * 1.5);
  
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="flex-shrink-0 pr-4">
        <Image 
          src="/images/logo.svg"
          alt="Aero Prosthetics Logo"
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
          priority={true}
          style={{ height: 'auto' }}
        />
      </div>
      <div>
        <h1 className="md:text-xl text-lg font-bold text-primary-600 leading-none">{companyName}</h1>
        <p className="md:text-xs text-[10px] text-gray-500 md:block leading-tight mt-0.5">{tagline}</p>
      </div>
    </div>
  );
}
