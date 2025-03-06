"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const skeletonVariants = cva(
  "animate-pulse bg-gray-200 dark:bg-gray-700 rounded overflow-hidden relative",
  {
    variants: {
      variant: {
        default: "bg-gray-200 dark:bg-gray-700",
        shimmer: "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      },
      size: {
        xs: "h-4",
        sm: "h-5",
        md: "h-6",
        lg: "h-8",
        xl: "h-10",
        "2xl": "h-12",
        "3xl": "h-16",
        full: "h-full",
      },
      width: {
        xs: "w-16",
        sm: "w-24",
        md: "w-32",
        lg: "w-48",
        xl: "w-64",
        "2xl": "w-80",
        "3xl": "w-96",
        full: "w-full",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "shimmer",
      size: "md",
      width: "full",
      rounded: "md",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  count?: number;
  gap?: string;
}

export function Skeleton({
  className,
  variant,
  size,
  width,
  rounded,
  count = 1,
  gap = "0.5rem",
  ...props
}: SkeletonProps) {
  const skeletonClass = skeletonVariants({
    variant,
    size,
    width,
    rounded,
    className,
  });

  if (count === 1) {
    return <div className={skeletonClass} {...props} />;
  }

  return (
    <div className="flex flex-col" style={{ gap }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} {...props} />
      ))}
    </div>
  );
}

// Predefined skeleton components for common use cases
export function AvatarSkeleton({ size = "md", ...props }: Omit<SkeletonProps, "rounded" | "width">) {
  return <Skeleton rounded="full" width={size} size={size} {...props} />;
}

export function TextSkeleton({ lines = 3, ...props }: Omit<SkeletonProps, "count"> & { lines?: number }) {
  return <Skeleton count={lines} size="xs" {...props} />;
}

export function CardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-lg border border-gray-200 p-4 ${className || ''}`} {...props}>
      <Skeleton width="3xl" size="md" className="mb-4" />
      <Skeleton count={3} size="xs" className="mb-6" />
      <div className="flex justify-between items-center">
        <Skeleton width="sm" size="sm" />
        <Skeleton width="xs" size="sm" rounded="full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 4, ...props }: { columns?: number } & Omit<SkeletonProps, "count">) {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton 
          key={index} 
          width={index === 0 ? "sm" : "md"} 
          size="sm" 
          className={index === 0 ? "flex-shrink-0" : "flex-1"} 
          {...props} 
        />
      ))}
    </div>
  );
} 