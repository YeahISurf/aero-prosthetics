# Aero Prosthetics Website

A bilingual (English/Spanish) website for Aero Prosthetics, a division of Aero Mobility Inc., specializing in prosthetic and orthotic solutions.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/YeahISurf/aero-prosthetics)

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

#### Vercel Deployment

To deploy this project to Vercel:

1. Connect your GitHub repository to Vercel
2. The project includes a `vercel.json` configuration file that sets up:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`

No additional configuration is needed as the `vercel.json` file handles the build settings automatically.

> **Note:** The `--legacy-peer-deps` flag is required due to dependency conflicts between React 19 and some testing libraries that expect React 18.

#### Forcing Vercel to Deploy Latest Changes

If Vercel is not deploying the latest commit, you can use the included script to force a new deployment:

```bash
./force-vercel-deploy.sh
```

This script creates a small change that triggers a new commit and push, forcing Vercel to recognize and deploy the latest version of your code.

#### Troubleshooting Deployment Issues

If you encounter dependency conflicts during deployment, try one of these solutions:

1. Use the `--legacy-peer-deps` flag in your install command
2. Ensure type definitions (`@types/react` and `@types/react-dom`) are compatible with your testing libraries
3. For local development, you can use `npm install --force` to bypass peer dependency checks

#### ESLint Errors During Deployment

The project includes a solution for handling ESLint errors related to unused variables during Vercel deployment:

1. Deployment-specific versions of files with ESLint errors are stored in the `vercel-deploy` directory
2. A prebuild script (`scripts/prepare-vercel-build.cjs`) copies these files to the correct locations before the build process starts
3. The original files are kept in the repository for future development but are ignored during deployment using `.vercelignore`

For more details, see the README in the `vercel-deploy` directory.

#### TypeScript Errors in Next.js 15

Next.js 15 introduced a breaking change where `params` and `searchParams` are now Promises rather than synchronous objects. This affects pages that use these properties, particularly in the `generateMetadata` function and page components.

The deployment-specific version of the about page (`src/app/[locale]/about/page.tsx`) has been updated to handle this change by:

1. Updating the `Props` type to use Promise for params:
   ```typescript
   type Props = {
     params: Promise<{ locale: string }>;
   };
   ```

2. Using `await` to access the params values:
   ```typescript
   const { locale } = await params;
   ```

3. Using `getTranslations` instead of `useTranslations` for async server components.

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

## Contributing

Contributions to improve the Aero Prosthetics website are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.
