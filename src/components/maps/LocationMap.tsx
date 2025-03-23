'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface Location {
  name: string;
  position: { lat: number; lng: number };
  address: string;
  city: string;
  phone: string;
  phoneFormatted?: string;
  badge?: string;
}

interface LocationMapProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Map styles to match the premium look
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }]
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6c6c6c' }]
    }
  ]
};

export default function LocationMap({ locations, center, zoom = 10, height = '500px' }: LocationMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const locale = useLocale();
  
  // Debug logging
  useEffect(() => {
    console.log('LocationMap mounted with locations:', locations);
    console.log('Map center:', center);
    console.log('Map zoom:', zoom);
  }, [locations, center, zoom]);

  // Calculate center if not provided
  const mapCenter = center || (() => {
    if (locations.length === 1) return locations[0].position;
    
    // For multiple locations, find the average lat/lng
    const avgLat = locations.reduce((sum, loc) => sum + loc.position.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.position.lng, 0) / locations.length;
    return { lat: avgLat, lng: avgLng };
  })();

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded successfully');
    setMap(map);
    
    // If we have multiple locations, fit the map to show all markers
    if (locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach(location => {
        console.log('Adding location to bounds:', location.name, location.position);
        bounds.extend(location.position);
      });
      
      // Add some padding to the bounds
      map.fitBounds(bounds, 50);
      console.log('Map bounds set');
    }
  }, [locations]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div style={{ height }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {locations.map((location, index) => {
          console.log('Rendering marker for location:', location.name, location.position);
          return (
            <Marker
              key={index}
              position={location.position}
              onClick={() => {
                console.log('Marker clicked:', location.name);
                setSelectedLocation(location);
              }}
              // Use a standard Google Maps marker with label
              label={{
                text: (index + 1).toString(),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
              animation={google.maps.Animation.DROP}
            />
          );
        })}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2 max-w-xs">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-primary-600">{selectedLocation.name}</h3>
                {selectedLocation.badge && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full ml-2">
                    {selectedLocation.badge}
                  </span>
                )}
              </div>
              
              <address className="not-italic mb-2 text-sm text-gray-700">
                <p>{selectedLocation.address}</p>
                <p>{selectedLocation.city}</p>
              </address>
              
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-primary-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${selectedLocation.phone}`} className="text-sm font-medium text-primary-600 hover:underline">
                  {selectedLocation.phoneFormatted || selectedLocation.phone}
                </a>
              </div>
              
              <div className="flex space-x-2">
                <a 
                  href={`https://maps.google.com/?q=${selectedLocation.address}, ${selectedLocation.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-primary-500 text-white text-xs font-medium rounded hover:bg-primary-600 transition-colors flex-1 text-center"
                >
                  Get Directions
                </a>
                <Link
                  href={`/${locale}/locations#${selectedLocation.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1.5 border border-primary-500 text-primary-600 text-xs font-medium rounded hover:bg-primary-50 transition-colors flex-1 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
} 