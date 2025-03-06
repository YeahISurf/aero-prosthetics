"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const timelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      vertical: "flex flex-col",
      horizontal: "flex flex-row",
    },
    lineStyle: {
      solid: "before:border-solid",
      dashed: "before:border-dashed",
      dotted: "before:border-dotted",
    },
    lineColor: {
      primary: "before:border-primary-500",
      secondary: "before:border-gray-300",
      accent: "before:border-secondary-teal-500",
      success: "before:border-success-500",
      warning: "before:border-warning-500",
      error: "before:border-error-500",
    },
    lineWidth: {
      thin: "before:border-[1px]",
      medium: "before:border-[2px]",
      thick: "before:border-[3px]",
    },
    animated: {
      true: "timeline-animated",
    },
  },
  defaultVariants: {
    variant: "vertical",
    lineStyle: "solid",
    lineColor: "primary",
    lineWidth: "medium",
    animated: false,
  },
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  children: React.ReactNode;
}

export function Timeline({
  className,
  variant,
  lineStyle,
  lineColor,
  lineWidth,
  animated,
  children,
  ...props
}: TimelineProps) {
  const timelineClass = timelineVariants({
    variant,
    lineStyle,
    lineColor,
    lineWidth,
    animated,
    className,
  });

  const isVertical = variant !== "horizontal";
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [animated]);

  return (
    <div
      ref={timelineRef}
      className={`${timelineClass} ${
        isVertical
          ? "before:absolute before:top-0 before:bottom-0 before:left-[15px] before:border-l"
          : "before:absolute before:left-0 before:right-0 before:top-[15px] before:border-t"
      } ${isVisible ? "timeline-visible" : ""}`}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement<TimelineItemProps>, {
          isVertical,
          index,
          animated: animated ? isVisible : false,
        });
      })}
    </div>
  );
}

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  time?: React.ReactNode;
  isVertical?: boolean;
  index?: number;
  animated?: boolean;
}

export function TimelineItem({
  className,
  icon,
  title,
  time,
  children,
  isVertical = true,
  index = 0,
  animated = false,
  ...props
}: TimelineItemProps) {
  return (
    <div
      className={`relative ${
        isVertical ? "pl-10 pb-8 last:pb-0" : "pb-10 pr-8 last:pr-0"
      } ${className || ""} ${
        animated
          ? "opacity-0 translate-y-4 transition-all duration-700 ease-out"
          : ""
      }`}
      style={
        animated
          ? {
              opacity: 1,
              transform: "translateY(0)",
              transitionDelay: `${index * 150}ms`,
            }
          : undefined
      }
      {...props}
    >
      {/* Timeline dot/icon */}
      <div
        className={`absolute ${
          isVertical
            ? "left-0 top-0"
            : "top-0 left-0"
        } w-8 h-8 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center z-10`}
      >
        {icon || <div className="w-3 h-3 bg-primary-500 rounded-full" />}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {time && <time className="text-sm text-gray-500">{time}</time>}
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
} 