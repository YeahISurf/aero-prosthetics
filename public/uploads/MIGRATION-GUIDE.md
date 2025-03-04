# Placeholder Images Migration Guide

This guide identifies all placeholders currently used in the codebase and provides instructions for replacing them with real images.

## Current Placeholders by Component

### HeroSection.tsx
```tsx
<Image 
  src="/placeholder-team.jpg"
  alt="Advanced prosthetic technology"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  priority
/>
```
**Migration:** Replace with `/uploads/hero/main-hero.jpg`

### TestimonialsSection.tsx
The testimonials component uses placeholder avatars with hardcoded initials as fallbacks:
```tsx
// Placeholder for avatar - would be replaced with actual images
<div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
  {testimonial.name.charAt(0)}
</div>
```
**Migration:** Add real avatars to `/uploads/testimonials/` folder with names like:
- `/uploads/testimonials/michael-johnson.jpg` 
- `/uploads/testimonials/sarah-williams.jpg`
- `/uploads/testimonials/david-martinez.jpg`
- `/uploads/testimonials/jennifer-lee.jpg`

### ServicesOverview.tsx
The services section has a "Technology Showcase Image" text placeholder:
```tsx
<div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden relative">
  {/* This would be replaced with an actual technology showcase image */}
  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
    Technology Showcase Image
  </div>
</div>
```
**Migration:** Replace with `/uploads/services/technology-showcase.jpg`

### LocationsSection.tsx
The locations section uses stylized SVG maps rather than actual images:
```tsx
{/* Stylized Map Background */}
<div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 to-blue-100/50">
  {/* Map Road Elements */}
  <div className="absolute inset-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- SVG Map Elements -->
    </svg>
  </div>
</div>
```
**Migration:** Consider replacing with actual location photos in `/uploads/locations/anaheim.jpg` and `/uploads/locations/victorville.jpg`

## Additional Placeholder Files

- `/prosthetic-hand.jpg` - Available in the public directory
  **Migration:** Move to `/uploads/gallery/prosthetic-hand.jpg`

- `/placeholder-team.svg` - Available in the public directory  
  **Migration:** Replace with actual team photos in `/uploads/team/` directory

- `/pattern.svg` - Used as a background pattern
  **Migration:** Keep as is or replace with enhanced pattern in `/uploads/gallery/patterns/`

## Migration Checklist

1. ⬜ Gather all needed replacement images
2. ⬜ Optimize images for web (compress, resize)
3. ⬜ Upload images to appropriate folders
4. ⬜ Update component image paths
5. ⬜ Test on development environment
6. ⬜ Deploy changes to production
