# XML Sitemap Guidelines

## Overview

This document provides guidelines for maintaining the XML sitemap for the AERO Prosthetics website. The sitemap helps search engines discover and index your website's pages efficiently, which can improve your SEO performance.

## Current Implementation

The sitemap is implemented using a custom API route with XSL styling for better visual presentation:

- **Main File:** `src/app/api/sitemap/route.ts`
- **XSL Stylesheet:** `public/sitemap.xsl`
- **Config:** Rewrite in `next.config.js` to make it accessible at the standard path
- **URL:** `https://aeroprosthetics.com/sitemap.xml`

## Visual Enhancement

The sitemap has been enhanced with an XSL stylesheet that transforms the XML data into a visually appealing HTML page when viewed in a browser. This provides:

1. **Better User Experience** - When someone visits your sitemap URL directly, they'll see a well-formatted HTML page instead of raw XML.
2. **Visual Organization** - URLs are organized in a table with proper styling.
3. **Responsive Design** - The page is fully responsive and works well on all device sizes.
4. **Branding** - Includes AERO Prosthetics branding and styling.
5. **Statistics** - Shows helpful information like the number of URLs and generation date.

## Testing in Development Environment

The sitemap implementation automatically detects the environment and uses the appropriate base URL:

- In production: `https://aeroprosthetics.com`
- In development: `http://localhost:3000`

To test the sitemap in a development environment:

1. Run your Next.js development server: `npm run dev`
2. Visit one of these URLs in your browser:
   - `http://localhost:3000/sitemap.xml` (via rewrite)
   - `http://localhost:3000/api/sitemap` (direct API route)
3. You should see a properly formatted sitemap with local URLs
4. Verify that the XSL styling is applied correctly
5. Check that URLs are correctly formatted with `http://localhost:3000` base

## Sitemap Configuration

The sitemap includes:

1. **Main Pages** - Homepage, About, Services, Team, etc.
2. **Service Detail Pages** - Individual service pages
3. **Team Member Pages** - Individual team member profiles
4. **Resource Pages** - Blog, guides, FAQs, etc.
5. **Legal Pages** - Privacy policy, terms of service, etc.

All pages include:
- URL
- Last modified date
- Change frequency
- Priority
- Alternate language versions (hreflang for multilingual support)

## Maintaining the Sitemap

### When to Update

Update the sitemap route file when:

1. **Adding new pages** - Add new routes to the appropriate array
2. **Removing pages** - Remove entries for pages that no longer exist
3. **Changing URL structure** - Update the URL patterns
4. **Adding new languages** - Add new locales to the locales array

### How to Update

1. Edit `src/app/api/sitemap/route.ts`
2. Add new routes to the appropriate array:
   - Main routes: Add to the `routes` array
   - Service pages: Add to the `services` array
   - Team members: Add to the `teamMembers` array
   - Resource content: Add to the `resources` array

### Priority Guidelines

Set priorities based on page importance:
- **1.0** - Homepage
- **0.9** - Main category pages (About, Services, Solutions)
- **0.9** - Conversion pages (Book Demo)
- **0.8** - Other main pages
- **0.7** - Secondary pages (Service details, Resource pages)
- **0.6** - Team member pages and other detail pages

### Change Frequency Guidelines

- **daily** - For pages that change very frequently (news, blog)
- **weekly** - For pages that change frequently (resource pages)
- **monthly** - For most standard pages
- **yearly** - For pages that rarely change (legal pages)

## Submitting to Search Engines

### Automatic Submission

The `scripts/submit-sitemap.js` script will automatically notify search engines about your sitemap:

```bash
node scripts/submit-sitemap.js
```

### Manual Submission

1. **Google Search Console**
   - Login to [Google Search Console](https://search.google.com/search-console)
   - Select your property
   - Navigate to Sitemaps
   - Enter `sitemap.xml` and submit

2. **Bing Webmaster Tools**
   - Login to [Bing Webmaster Tools](https://www.bing.com/webmasters)
   - Select your site
   - Navigate to Sitemaps
   - Enter the full URL of your sitemap and submit

## Customizing the Sitemap Appearance

If you wish to customize how the sitemap looks when viewed in a browser:

1. **Edit the XSL Stylesheet** - Modify `public/sitemap.xsl` to change colors, layout, or add additional information
2. **Update Content** - You can change headers, descriptions, and footer content
3. **Modify Styling** - The CSS is contained within the XSL file and can be modified to match your brand

## Best Practices

1. **Keep it updated** - Ensure the sitemap reflects the current state of your website
2. **Include only indexable pages** - Don't include pages with noindex or disallowed in robots.txt
3. **Use absolute URLs** - All URLs should be absolute with the full domain
4. **Include lastmod dates** - Update the lastModified date when content changes
5. **Include hreflang** - For multilingual sites, include language alternatives
6. **Stay under limits** - Each sitemap should have less than 50,000 URLs or 50MB
7. **Validate regularly** - Periodically check for errors using online validators

## Monitoring

Regularly check the sitemap's performance in:

1. **Google Search Console** - Check the Index > Sitemaps section
2. **Bing Webmaster Tools** - Check the Sitemaps section

Look for any errors, warnings, or excluded URLs and fix issues as needed.

## Resources

- [Google Sitemap Documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Sitemaps.org Protocol](https://www.sitemaps.org/protocol.html)
- [XSL Transformations (XSLT)](https://developer.mozilla.org/en-US/docs/Web/XSLT) 