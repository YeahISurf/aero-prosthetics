"use client";

import Image from 'next/image';

type BlogImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function BlogImage({ 
  src, 
  alt, 
  width = 800, 
  height = 450, 
  className = '', 
  priority = false 
}: BlogImageProps) {
  // Helper to handle different types of images (remote, local, etc.)
  const isRemoteImage = src.startsWith('http');
  
  // Use a placeholder in dev mode if the image doesn't exist
  const imageSrc = src || '/images/blog/blog-image.jpg';
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-cover"
        unoptimized={isRemoteImage}
      />
    </div>
  );
} 