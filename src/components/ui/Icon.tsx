"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const iconVariants = cva("", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
      "3xl": "h-12 w-12",
    },
    variant: {
      default: "text-current",
      primary: "text-primary-600",
      secondary: "text-gray-700",
      success: "text-success-500",
      warning: "text-warning-500", 
      error: "text-error-500",
      muted: "text-gray-400",
      accent: "text-secondary-teal-500",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  }
});

export interface IconProps 
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  label?: string;
  tooltip?: string;
}

const Icon = ({ 
  className, 
  icon: IconComponent, 
  size, 
  variant, 
  label, 
  tooltip, 
  ...props 
}: IconProps) => {
  const styles = iconVariants({ size, variant, className });
  
  const iconElement = <IconComponent className={styles} aria-hidden={!label} {...props} />;
  
  // If a label is provided, make it accessible to screen readers
  if (label) {
    return (
      <span className="inline-flex items-center" role="img" aria-label={label}>
        {iconElement}
      </span>
    );
  }
  
  // If a tooltip is provided, make it visible on hover
  if (tooltip) {
    return (
      <span className="inline-flex relative group">
        {iconElement}
        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {tooltip}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
        </span>
      </span>
    );
  }
  
  return iconElement;
};

Icon.displayName = "Icon";

export { Icon, iconVariants }; 