'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ClientImageProps extends ImageProps {
  fallbackStyles?: React.CSSProperties;
  fallbackSrc?: string;
}

export default function ClientImage({ fallbackStyles, fallbackSrc, ...props }: ClientImageProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    if (fallbackSrc) {
      return <Image {...props} src={fallbackSrc} />;
    }
    return <div style={{ ...fallbackStyles }} />;
  }

  return <Image {...props} onError={handleError} />;
} 