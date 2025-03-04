# Image Uploads Directory

This directory contains organized folders for all uploaded images used on the Aero Prosthetics website.

## Directory Structure

- **`/uploads/hero/`** - Hero section images (homepage banner, page headers)
- **`/uploads/testimonials/`** - Testimonial user avatars and related images
- **`/uploads/services/`** - Service-specific images, icons, and illustrations
- **`/uploads/locations/`** - Location photos, facility images, maps
- **`/uploads/team/`** - Team member portraits and photos
- **`/uploads/gallery/`** - Miscellaneous gallery images and general purpose photos

## Usage Guidelines

### 1. Using with Next.js Image component

```tsx
import Image from 'next/image';

// Example usage
<Image 
  src="/uploads/team/john-smith.jpg"
  alt="John Smith, Prosthetics Specialist"
  width={400}
  height={300}
  priority={false}
/>
```

### 2. Using with OptimizedImage component

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage';

// Example usage
<OptimizedImage
  src="/uploads/services/lower-limb.jpg"
  alt="Lower Limb Prosthetics"
  width={800}
  height={600}
  importance="medium"
  quality={85}
/>
```

## Image Naming Conventions

- Use descriptive, kebab-case names (e.g., `team-meeting.jpg`, `lower-limb-prosthetic.png`)
- Include dimensions in filename for images with specific size requirements (e.g., `hero-banner-1920x1080.jpg`)
- Optimize images before uploading to reduce file size

## Image Formats

- **JPG/JPEG** - For photographs and complex images with many colors
- **PNG** - For images requiring transparency
- **SVG** - For logos, icons, and simple illustrations
- **WebP** - For optimized web delivery (when supported)

## Current Placeholder Images

The following placeholder images are currently used in the codebase:

1. `/placeholder-team.jpg` - Used in HeroSection.tsx
2. `/placeholder-avatar.jpg` - Used in TestimonialsSection.tsx
3. `/prosthetic-hand.jpg` - Available in public directory
4. `/placeholder-team.svg` - Available in public directory
5. `/pattern.svg` - Used as background pattern
