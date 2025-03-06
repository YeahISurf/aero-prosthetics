"use client";

import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

// Button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600 shadow-sm",
        secondary: "bg-white text-primary-600 border border-primary-600 hover:bg-primary-50 focus-visible:ring-primary-600",
        accent: "bg-secondary-teal-500 text-white hover:bg-opacity-90 focus-visible:ring-secondary-teal-500 shadow-sm",
        high_contrast: "bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-900 shadow-sm",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        destructive: "bg-secondary-red-500 text-white hover:bg-secondary-red-600 focus-visible:ring-secondary-red-500 shadow-sm",
        link: "bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 h-auto shadow-none",
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-2.5 text-base",
        xl: "h-14 px-8 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
      withIcon: {
        true: "gap-2",
        leading: "pl-2.5",
        trailing: "pr-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

// Add ripple effect when button is clicked
const addRippleEffect = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.className = 'absolute rounded-full bg-white bg-opacity-30 transform scale-0 animate-ripple pointer-events-none';
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, fullWidth, isLoading, disabled, href, leftIcon, rightIcon, external, ...props }, ref) => {
    // Handle icon placement
    const hasLeftIcon = Boolean(leftIcon) || isLoading;
    const hasRightIcon = Boolean(rightIcon);
    const iconPlacement = hasLeftIcon && !hasRightIcon ? 'leading' : hasRightIcon && !hasLeftIcon ? 'trailing' : hasLeftIcon && hasRightIcon ? true : undefined;
    
    // Combine all variant props
    const buttonClasses = buttonVariants({ 
      variant, 
      size, 
      fullWidth,
      withIcon: iconPlacement,
      className 
    });

    // If href is provided, render an anchor tag with Link
    if (href) {
      return external ? (
        <a
          href={href}
          className={buttonClasses}
          rel="noopener noreferrer"
          target="_blank"
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          onClick={(e) => {
            props.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
            addRippleEffect(e);
          }}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {!isLoading && leftIcon}
          <span>{children}</span>
          {rightIcon}
        </a>
      ) : (
        <Link
          href={href}
          className={buttonClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          onClick={(e) => {
            props.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
            addRippleEffect(e);
          }}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {!isLoading && leftIcon}
          <span>{children}</span>
          {rightIcon}
        </Link>
      );
    }

    // Otherwise render a button
    return (
      <button
        type="button"
        className={buttonClasses}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          addRippleEffect(e);
        }}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 