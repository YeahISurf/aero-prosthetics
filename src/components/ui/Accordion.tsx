"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const accordionVariants = cva("border overflow-hidden", {
  variants: {
    variant: {
      default: "border-gray-200 rounded-md",
      bordered: "border-gray-200 rounded-md divide-y divide-gray-200",
      minimal: "border-transparent",
      ghost: "border-transparent bg-gray-50 hover:bg-gray-100",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
}

export function Accordion({
  className,
  variant,
  size,
  items,
  defaultOpen = [],
  allowMultiple = false,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  const accordionClass = accordionVariants({
    variant,
    size,
    className,
  });

  return (
    <div className={accordionClass} {...props}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div 
            key={item.id} 
            className={`overflow-hidden transition-colors ${variant === 'bordered' ? '' : 'border-b border-gray-200 last:border-b-0'}`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex justify-between items-center w-full text-left py-4 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 transform' : ''
                }`}
              />
            </button>
            
            <div
              id={`accordion-content-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-hidden={!isOpen}
            >
              <div className="p-5 pt-0 text-gray-700">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// FAQ specific implementation
export interface FAQProps extends Omit<AccordionProps, 'items'> {
  questions: {
    question: string;
    answer: React.ReactNode;
    id?: string;
  }[];
}

export function FAQ({ questions, ...props }: FAQProps) {
  // Transform questions into accordion items
  const items = questions.map((q, index) => ({
    id: q.id || `faq-${index}`,
    title: q.question,
    content: q.answer,
  }));

  return (
    <Accordion
      items={items}
      variant="bordered"
      allowMultiple={true}
      {...props}
    />
  );
} 