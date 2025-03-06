import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

// Card variants using class-variance-authority
const cardVariants = cva(
  "bg-white rounded-lg border border-gray-100 overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        elevated: "shadow-md",
        highlight: "border-primary-100 bg-primary-50/30 shadow-sm",
        outline: "border-2 border-primary-100 shadow-none",
        ghost: "border-0 shadow-none bg-transparent",
        glass: "bg-white bg-opacity-30 backdrop-blur-md border border-white/20 shadow-sm",
      },
      hover: {
        true: "hover:shadow-md hover:border-gray-200",
        lift: "hover:shadow-md hover:border-gray-200 hover:-translate-y-1",
        glow: "hover:shadow-glow hover:border-primary-100",
        scale: "hover:scale-[1.02] hover:shadow-md",
        interactive: "cursor-pointer hover:shadow-md hover:border-gray-200 hover:-translate-y-1 active:-translate-y-0.5",
      },
      size: {
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
        none: "", // No padding, for custom layouts
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
  href?: string;
  external?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant, size, hover, fullWidth, as, href, external, ...props }, ref) => {
    const Comp = as || 'div';
    const cardClasses = cardVariants({ variant, size, hover, fullWidth, className });

    // If href is provided, render a link
    if (href) {
      if (external) {
        return (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
            {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link 
          href={href} 
          className={cardClasses}
          {...(props as Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <Comp ref={ref} className={cardClasses} {...props}>
        {children}
      </Comp>
    );
  }
);

Card.displayName = "Card";

// Subcomponents for a more structured API
const CardHeader = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`card-header ${className || ''}`} 
    {...props} 
  />
));

CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`card-content ${className || ''}`} 
    {...props} 
  />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`card-footer ${className || ''}`} 
    {...props} 
  />
));

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter, cardVariants }; 