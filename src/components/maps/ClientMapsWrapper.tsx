'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map components with client-side rendering
const GoogleMapsProvider = dynamic(() => import('@/components/maps/GoogleMapsProvider'), { ssr: false });
const LocationMap = dynamic(() => import('@/components/maps/LocationMap'), { ssr: false });

interface Location {
  name: string;
  position: { lat: number; lng: number };
  address: string;
  city: string;
  phone: string;
  phoneFormatted?: string;
  badge?: string;
}

interface ClientMapsWrapperProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

export default function ClientMapsWrapper({ 
  locations, 
  center, 
  zoom, 
  height = '500px' 
}: ClientMapsWrapperProps) {
  return (
    <GoogleMapsProvider>
      <LocationMap 
        locations={locations} 
        center={center}
        zoom={zoom}
        height={height}
      />
    </GoogleMapsProvider>
  );
} 