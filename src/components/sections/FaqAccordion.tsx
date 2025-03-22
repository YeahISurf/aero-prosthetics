"use client";

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="group mb-4 overflow-hidden transition-all duration-200 border border-gray-200 hover:border-gray-300 rounded-xl bg-white hover:shadow-md"
        >
          <button
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            aria-expanded={expandedIndex === i}
            onClick={() => toggleItem(i)}
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {item.question}
            </h3>
            <svg 
              className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${expandedIndex === i ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedIndex === i ? 'max-h-96 py-6' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-6">
              <p className="text-gray-700">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 