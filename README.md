# Aero Prosthetics Website

A bilingual (English/Spanish) website for Aero Prosthetics, a division of Aero Mobility Inc., specializing in prosthetic and orthotic solutions.

## Project Status

### Completed Components
- ✅ Project structure and architecture
- ✅ Multilingual support (English/Spanish)
- ✅ Core pages (Home, About, Services, Team, Locations, Contact, Resources)
- ✅ Legal pages (Privacy Policy, Terms of Service, Accessibility Statement, Medical Disclaimer)
- ✅ SEO implementation (metadata, structured data, sitemap, robots.txt)
- ✅ Accessibility enhancements (skip-to-content, ARIA attributes, semantic HTML)
- ✅ HIPAA compliance for contact forms
- ✅ Google IDX configuration

### In Progress / To Do
- 🔄 CMS integration with Contentful (client setup needed)
- ✅ Testing implementation (Jest and React Testing Library)
- ✅ Performance optimization (Core Web Vitals improvements)
- 🔄 Actual content population (currently using placeholder content)

## Features

- Bilingual support (English/Spanish) using next-intl
- Responsive design with Tailwind CSS
- SEO optimized with structured data
- Accessibility compliant (WCAG 2.1 AA)
- Interactive components (forms, carousels, maps)
- Headless CMS integration (Contentful)

## Tech Stack

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Form Handling:** React Hook Form with Yup validation
- **CMS:** Contentful (headless CMS)

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # Language-specific routes
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About section
│   │   ├── services/       # Services section
│   │   ├── team/           # Team section
│   │   ├── locations/      # Locations section
│   │   ├── contact/        # Contact section
│   │   └── resources/      # Patient resources
├── components/             # Reusable React components
│   ├── layout/             # Layout components
│   ├── ui/                 # UI components
│   ├── sections/           # Page sections
│   └── forms/              # Form components
├── lib/                    # Utility functions
│   ├── i18n/               # Internationalization setup
│   ├── seo/                # SEO utilities
│   └── validation/         # Form validation schemas
├── public/                 # Static assets
├── locales/                # Translation files
│   ├── en.json             # English translations
│   └── es.json             # Spanish translations
├── middleware.ts           # Next.js middleware for i18n
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build for production:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

### Deployment

The site can be deployed to Vercel or Google Cloud.

## Internationalization

The site supports English and Spanish languages. Translations are managed through JSON files in the `locales` directory.

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
