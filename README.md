# Aero Prosthetics Website

A bilingual (English/Spanish) website for Aero Prosthetics, a division of Aero Mobility Inc., specializing in prosthetic and orthotic solutions.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/YeahISurf/aero-prosthetics)

## Website Overview

The Aero Prosthetics website is a comprehensive, bilingual platform designed to provide detailed information about prosthetic and orthotic services, showcase the company's expertise, and facilitate patient engagement. The website features a modern, accessible design optimized for both desktop and mobile devices.

### Page Structure

The website includes the following key pages, each with specific content sections:

#### Home Page (`/`)
- **Hero Section**: Features a prominent headline, subtitle, call-to-action button, and background image
- **Differentiators Section**: Highlights key advantages of Aero Prosthetics (Technology, Care, Support, Team)
- **Services Overview**: Showcases the range of prosthetic and orthotic services with brief descriptions
- **Testimonials Section**: Displays patient success stories with ratings and improvement metrics
- **Locations Section**: Presents the two facility locations (Anaheim Hills and Victorville)
- **CTA Section**: Contains a prominent call-to-action with contact information

#### About Page (`/about`)
- **Mission Section**: States the company's core mission and purpose
- **Values Section**: Outlines the four core values (Patient-Centered Care, Innovation, Compassion, Excellence)
- **Team Section**: Introduces key team members with photos and brief biographies
- **History Section**: Details the company's founding and development

#### Services Page (`/services`)
- **Services Grid**: Displays all eight service categories with descriptions and icons
- **Process Timeline**: Illustrates the five-step process from consultation to support
- **CTA Section**: Encourages visitors to contact for consultations

#### Team Page (`/team`)
- **Team Members**: Showcases all practitioners, technicians, and support staff
- **Team Values**: Describes the principles guiding the team's approach
- **Careers Section**: Provides information about career opportunities

#### Locations Page (`/locations`)
- **Location Details**: Comprehensive information about both facilities
- **Maps**: Interactive maps for each location
- **Hours**: Operating hours and contact information
- **Virtual Consultation**: Information about remote consultation options

#### Contact Page (`/contact`)
- **Contact Form**: HIPAA-compliant form for patient inquiries
- **Contact Information**: Phone numbers, email addresses
- **Insurance Information**: Details about accepted insurance plans

#### Resources Page (`/resources`)
- **Educational Materials**: Resources for patients
- **Insurance Information**: Coverage details
- **FAQs**: Common questions and answers
- **Care Guides**: Instructions for device maintenance

#### Legal Pages
- **Privacy Policy** (`/legal/privacy`)
- **Terms of Service** (`/legal/terms`)
- **Accessibility Statement** (`/legal/accessibility`)
- **Medical Disclaimer** (`/legal/disclaimer`)

### Content Features

- **Bilingual Support**: All content is available in both English and Spanish
- **Structured Data**: Rich metadata for SEO optimization
- **Responsive Design**: Optimized for all device sizes
- **Interactive Elements**: Dynamic forms, maps, and carousels
- **Accessibility Features**: ARIA attributes, keyboard navigation, and screen reader support

### Visual Demonstration

The repository includes visual references:
- `homepage.png`: Screenshot of the complete homepage design
- `screenshot.png`: General website visualization

## Project Status

### Completed Components
- ✅ Image organization and asset management
- ✅ Project structure and architecture
- ✅ Multilingual support (English/Spanish)
- ✅ Core pages (Home, About, Services, Team, Locations, Contact, Resources)
- ✅ Legal pages (Privacy Policy, Terms of Service, Accessibility Statement, Medical Disclaimer)
- ✅ SEO implementation (metadata, structured data, sitemap, robots.txt)
- ✅ Accessibility enhancements (skip-to-content, ARIA attributes, semantic HTML)
- ✅ HIPAA compliance for contact forms
- ✅ Google IDX configuration
- ✅ Testing implementation (Jest and React Testing Library)
- ✅ Performance optimization (Core Web Vitals improvements)
- ✅ Vercel deployment synchronization system

### In Progress / To Do
- 🔄 CMS integration with Contentful
  - Backend configuration completed
  - Content models defined for all page types
  - Integration with Next.js configured
  - Awaiting client setup of Contentful space and initial content population
- 🔄 Actual content population
  - Placeholder content currently in use throughout the site
  - Awaiting final content and images from client
  - Translation workflow established for new content

## Vercel Deployment Process

This project uses a special deployment process for Vercel that requires keeping files in sync between your local development environment and the Vercel-specific files.

### Understanding the Deployment Setup

The project has two sets of files:
1. **Source files** (`src/` directory) - Used during local development
2. **Vercel-specific files** (`vercel-deploy/` directory) - Used during Vercel deployment

When you run `npm run dev` locally, you're using the files in the `src/` directory. However, when deploying to Vercel, a prebuild script (`scripts/prepare-vercel-build.cjs`) replaces certain files with versions from the `vercel-deploy/` directory.

This approach helps maintain ESLint compliance during the Vercel build process while allowing for more flexible development locally.

### Synchronization Commands

To ensure changes made to source files are properly reflected in the Vercel deployment, we've created synchronization scripts:

- `npm run sync-vercel` - Updates files in `vercel-deploy/` with your latest changes from `src/`
- `npm run check-sync` - Checks which files need to be synchronized without making changes

### Development Workflow

Follow this workflow to ensure your changes appear properly on both local development and Vercel deployment:

1. Make changes to files in the `src/` directory as normal
2. Test locally with `npm run dev`
3. Before committing/deploying, run `npm run sync-vercel` to update the Vercel-specific files
4. Commit all changes (both in `src/` and `vercel-deploy/`)
5. Push to deploy on Vercel

### Automated Checks

The system includes automated checks to help prevent deployment issues:

1. A Git pre-push hook (when implemented) checks if files are in sync before pushing
2. A GitHub workflow verifies synchronization during pull requests

For more detailed information about this system, see [VERCEL-SYNC.md](./VERCEL-SYNC.md).

## Image Management

The project includes an organized structure for managing image assets in the `/public/uploads/` directory:

- **`/uploads/hero/`** - Hero section images (homepage banners, page headers)
- **`/uploads/testimonials/`** - Testimonial user avatars and related images
- **`/uploads/services/`** - Service-specific images, icons, and illustrations
- **`/uploads/locations/`** - Location photos, facility images, maps
- **`/uploads/team/`** - Team member portraits and photos
- **`/uploads/gallery/`** - Miscellaneous gallery images and general purpose photos

For detailed usage instructions and naming conventions, see the [Image Uploads README](/public/uploads/README.md).

## Localization Best Practices

The website is fully internationalized with support for English and Spanish. Follow these guidelines when adding new content to ensure proper localization.

### Localization Structure

- **File Organization**: Translations are stored in JSON files in the `/locales` directory:
  - `en.json` - English translations
  - `es.json` - Spanish translations

- **JSON Structure**: Translation files follow a nested object structure that mirrors the site organization:
  ```json
  {
    "meta": { /* SEO metadata */ },
    "navigation": { /* Navigation labels */ },
    "home": {
      "hero": { /* Hero section content */ },
      "services": { /* Services section content */ },
      /* Other homepage sections */
    },
    /* Other page namespaces */
  }
  ```

- **Maintaining Parallel Structure**: When adding new content, ensure both language files have identical object structures with keys matching exactly.

### Adding New Content

1. **Always Add to Both Language Files**: When adding new content, update both `en.json` and `es.json` files with parallel structures.

2. **For Simple Text Content**:
   ```json
   // en.json
   "buttonLabel": "Contact Us"
   
   // es.json
   "buttonLabel": "Contáctenos"
   ```

3. **For Structured Content** (arrays, objects):
   ```json
   // en.json
   "items": [
     {
       "id": 1,
       "title": "Our Services",
       "description": "Learn about our services"
     }
   ]
   
   // es.json
   "items": [
     {
       "id": 1,
       "title": "Nuestros Servicios",
       "description": "Conozca nuestros servicios"
     }
   ]
   ```

4. **TypeScript Interfaces**: Define interfaces for structured content to ensure type safety:
   ```typescript
   interface ServiceItem {
     id: number;
     title: string;
     description: string;
   }
   ```

### Component Implementation

1. **Basic Translation Usage**:
   ```tsx
   import { useTranslations } from 'next-intl';
   
   export default function MyComponent() {
     const t = useTranslations('namespace');
     
     return <h1>{t('title')}</h1>;
   }
   ```

2. **Accessing Structured Data**:
   ```tsx
   // For arrays or objects, use t.raw() with proper type casting
   const items = t.raw('items') as ServiceItem[];
   
   // Always include fallbacks for optional properties
   <span>{item.rating || 5}/5</span>
   ```

3. **Type Safety with TypeScript**:
   ```tsx
   // Define interfaces for complex data structures
   interface LocationDetails {
     title: string;
     address: string;
     // ... other properties
   }
   
   // Use type assertion for raw data
   const location = t.raw('location') as unknown as LocationDetails;
   ```

4. **Avoiding Hard-Coded Strings**: Never include hard-coded text directly in components. Always use the translation system:
   ```tsx
   // Wrong
   <button>Submit</button>
   
   // Right
   <button>{t('submit')}</button>
   ```

### Testing and Maintenance

1. **Verify Completeness**: Regularly compare language files to ensure all keys present in one are also present in the other.

2. **Test Both Languages**: When adding new features, always test the application in both English and Spanish.

3. **Language Toggle Testing**: Test the language toggle functionality to ensure content updates correctly when switching languages.

4. **Key Naming Conventions**: Use descriptive, hierarchical key names that reflect the content's location and purpose:
   ```
   home.services.title
   about.team.description
   contact.form.submitButton
   ```

## Features

- Bilingual support (English/Spanish) using next-intl
- Responsive design with Tailwind CSS
- SEO optimized with structured data
- Accessibility compliant (WCAG 2.1 AA)
- Interactive components (forms, carousels, maps)
- Headless CMS integration (Contentful)

## Browser Compatibility

The website is tested and optimized for the following browsers:

- **Chrome**: Version 120+
- **Firefox**: Version 120+
- **Safari**: Version 16+
- **Edge**: Version 120+
- **iOS Safari**: Version 16+
- **Android Chrome**: Version 120+

Progressive enhancement techniques ensure core functionality works across all modern browsers, with enhanced features available in newer browser versions.

## Accessibility Compliance

The website is designed to meet WCAG 2.1 AA standards with the following implementations:

- **Semantic HTML**: Proper document structure with appropriate heading levels
- **ARIA Attributes**: Enhanced accessibility for custom components
- **Color Contrast**: All text meets minimum contrast requirements
- **Keyboard Navigation**: Full keyboard accessibility with visible focus states
- **Screen Reader Support**: Proper alt text, aria-labels, and screen reader announcements
- **Skip-to-Content**: Links for bypassing navigation menus
- **Form Labels**: All form fields have associated labels
- **Focus Management**: Proper focus management for modals and dynamic content

## Performance Optimization

The website implements several performance optimizations:

- **Core Web Vitals**: Optimized for all Core Web Vitals metrics
- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Automatic code splitting for smaller initial load
- **Lazy Loading**: Components and images loaded only when needed
- **Caching Strategy**: Appropriate cache headers for static assets
- **Font Loading**: Optimized font loading with font display swap
- **Minification**: All production code is minified and compressed

## Deployment

The website is deployed on Vercel with the following configuration:

- **Production Environment**: Automatically deployed from the `main` branch
- **Preview Environments**: Created for pull requests and branches
- **Custom Domain**: Configured with custom domain and SSL
- **Environment Variables**: Set up for API keys and configuration
- **Build Cache**: Enabled for faster deployments
- **Edge Functions**: Used for internationalization middleware

### Deployment Scripts

The project includes scripts to facilitate deployment:

```bash
# Prepare files for Vercel deployment
npm run prebuild

# Update the Vercel deployment directory
npm run update-vercel-deploy

# Force a new Vercel deployment
./force-vercel-deploy.sh
```

### Monitoring

Vercel Analytics and Google Analytics are integrated to monitor:
- Page load performance
- User engagement
- Error tracking
- Usage patterns

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl v3
- **Form Handling:** React Hook Form with Yup validation
- **CMS:** Contentful (headless CMS)
- **Animation:** Framer Motion
- **Maps Integration:** @react-google-maps/api
- **Testing:** Jest with React Testing Library

## Project Structure

```
/
├── src/                    # Source code directory
│   ├── app/                # Next.js App Router pages
│   │   ├── [locale]/       # Language-specific routes
│   │   │   ├── page.tsx    # Home page
│   │   │   ├── about/      # About section
│   │   │   ├── services/   # Services section
│   │   │   ├── team/       # Team section
│   │   │   ├── locations/  # Locations section
│   │   │   ├── contact/    # Contact section
│   │   │   ├── resources/  # Patient resources
│   │   │   └── legal/      # Legal pages
│   │   │   └── [locale]/   # Language-specific routes
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── locales/                # Translation files
│   ├── en.json             # English translations
│   ├── es.json             # Spanish translations
│   └── team.json           # Team-specific translations
├── scripts/                # Build and utility scripts
├── middleware.ts           # Next.js middleware for i18n
```

## Development

### Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/YeahISurf/aero-prosthetics.git
   cd aero-prosthetics
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```
npm run build
npm run start
```

### Deploying to Vercel

When deploying to Vercel, make sure to synchronize your local changes with the Vercel-specific files:

```
npm run sync-vercel
git add .
git commit -m "Update Vercel deployment files"
git push
```

This ensures that the changes you've made locally will be properly reflected in the Vercel deployment. For more details, see the [Vercel Deployment Process](#vercel-deployment-process) section.

## Internationalization (i18n)

The website supports English and Spanish languages using next-intl v3. Translations are stored in JSON files in the `locales` directory:
- `locales/en.json` - English translations
- `locales/es.json` - Spanish translations
- `locales/team.json` - Team-specific translations

### Language Structure
The translations follow a hierarchical structure based on page sections and components. Each language file contains identical key structures to ensure consistency across languages.

## SEO

The site implements various SEO optimizations:

- Server-side rendering for critical pages
- Static generation for content-heavy pages
- Proper metadata for all pages
- Structured data (Schema.org)
- XML sitemap
- Hreflang tags for language variants

## Accessibility

The site is designed to be WCAG 2.1 AA compliant:

- Semantic HTML
- Proper ARIA attributes
- Keyboard navigation
- Sufficient color contrast
- Screen reader compatibility

## Contributing

Contributions to improve the Aero Prosthetics website are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

This project uses Husky for Git hooks to ensure code quality:
- Pre-commit hooks run linting and type checking
- Commit messages should follow conventional commit format

Please ensure your code follows the project's coding standards and includes appropriate tests.
