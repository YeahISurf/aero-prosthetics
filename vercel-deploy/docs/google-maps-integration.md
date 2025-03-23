# Google Maps Integration

This document provides information about the Google Maps integration on the locations pages.

## Overview

The locations pages use the Google Maps JavaScript API to display interactive maps of our clinic locations. The implementation uses `@react-google-maps/api` package with Next.js.

## Key Components

The integration consists of these main components:

1. **GoogleMapsProvider**: A client-side wrapper that loads the Google Maps API
2. **LocationMap**: A reusable component that displays the map with customized markers and info windows
3. **ClientMapsWrapper**: A client component wrapper that safely uses dynamic imports for server components

## Setup Requirements

To use the Google Maps integration:

1. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Add the API key to the `.env.local` file:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

## Features

The current implementation includes:

- Interactive maps showing clinic locations
- Custom styled map to match the application design
- Click-to-open info windows with location details
- Get directions link integration
- Responsive design for all screen sizes

## Implementation Details

The maps are implemented using a client component wrapper to safely use them in server components:

```jsx
// In Server Component (app/[locale]/locations/page.tsx)
import ClientMapsWrapper from '@/components/maps/ClientMapsWrapper';

// ...

<ClientMapsWrapper 
  locations={locationData}
  zoom={15}
  height="400px"
/>
```

The ClientMapsWrapper handles the dynamic imports with `ssr: false` option:

```jsx
// src/components/maps/ClientMapsWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const GoogleMapsProvider = dynamic(() => import('@/components/maps/GoogleMapsProvider'), { ssr: false });
const LocationMap = dynamic(() => import('@/components/maps/LocationMap'), { ssr: false });

// ...component implementation
```

## Location Data Structure

Location data is passed to the maps components in the following format:

```typescript
interface Location {
  name: string;
  position: { lat: number; lng: number };
  address: string;
  city: string;
  phone: string;
  phoneFormatted?: string;
  badge?: string;
}
```

This data is derived from the existing location schema information defined in `src/lib/seo/schema.ts`.

## Customization

The maps can be customized by:

1. Modifying the map styles in `LocationMap.tsx`
2. Updating the marker icon at `public/images/map-marker.svg`
3. Adjusting the info window content and styling in `LocationMap.tsx`

## Future Enhancements

Potential future enhancements could include:

- Directions API integration for turn-by-turn directions
- Location search functionality
- Distance calculation between user location and clinics
- More detailed info windows with additional location information 