'use client';

import { ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface GoogleMapsProviderProps {
  children: ReactNode;
}

// Libraries to load with Google Maps
const libraries = ['places'];

export default function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  // Get Google Maps API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: libraries as any,
  });

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-xl p-4">
        <p className="text-red-500">Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading maps...</p>
      </div>
    );
  }

  return <>{children}</>;
} 