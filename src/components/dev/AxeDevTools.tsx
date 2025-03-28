'use client';

import React from 'react';

// Conditionally run Axe DevTools in development environment
export default function AxeDevTools() {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      // Dynamically import axe and run it
      import('@axe-core/react').then(axe => {
        // Run Axe after a short delay to allow the page to fully render
        // Adjust delay as needed based on application complexity
        const AXE_DELAY_MS = 1000;
        setTimeout(() => {
          axe.default(React, require('react-dom'), AXE_DELAY_MS);
          console.log('Axe DevTools initialized for accessibility testing.');
        }, AXE_DELAY_MS);
      }).catch(error => {
        console.error('Failed to load Axe DevTools:', error);
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // This component doesn't render anything itself
  return null;
} 