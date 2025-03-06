'use client';

import { useState, useEffect } from 'react';

interface SafeClientTimeProps {
  date: Date | string;
  format?: 'short' | 'long' | 'relative';
  locale?: string;
}

export default function SafeClientTime({ 
  date, 
  format = 'short', 
  locale = 'en-US' 
}: SafeClientTimeProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    try {
      switch (format) {
        case 'long':
          setFormattedDate(
            dateObj.toLocaleDateString(locale, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          );
          break;
        case 'relative':
          const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
          const now = new Date();
          const diffInDays = Math.round((dateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          if (Math.abs(diffInDays) <= 7) {
            setFormattedDate(rtf.format(diffInDays, 'day'));
          } else {
            setFormattedDate(dateObj.toLocaleDateString(locale));
          }
          break;
        default:
          setFormattedDate(dateObj.toLocaleDateString(locale));
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate(dateObj.toString());
    }
  }, [date, format, locale]);
  
  // Return nothing during SSR to prevent hydration mismatch
  if (!isClient) {
    return null;
  }
  
  return <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>;
} 