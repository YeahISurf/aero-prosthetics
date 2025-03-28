'use client';

import React, { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import AdvancedForm from '@/components/ui/AdvancedForm';
import Toast from '@/components/ui/Toast';

export default function TailwindV4Demo() {
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    variant: 'info',
  });

  const showToast = (message: string, variant: 'success' | 'error' | 'warning' | 'info') => {
    setToast({
      visible: true,
      message,
      variant,
    });
  };

  // Type assertion to match AdvancedForm's expected onSubmit type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    showToast('Form submitted successfully!', 'success');
  };

  return (
    <div className="responsive-container py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Tailwind CSS v4 Features Demo</h1>
      
      {/* Section 1: ARIA and Container Queries */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Container Queries & New Animations</h2>
        <p className="mb-6 text-gray-700">
          Resize your browser to see how these components adapt based on their container width,
          not just the viewport width. Also notice the smooth animations powered by Tailwind v4.
        </p>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ResponsiveCard
            title="Using Container Queries"
            description="This card uses the new @container queries in Tailwind CSS v4, allowing it to respond to its parent container's width rather than the viewport."
            imageUrl="https://images.unsplash.com/photo-1617142584314-1921c1d82bf8?q=80&w=2070&auto=format&fit=crop"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">Container Queries</span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800">Responsive Design</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">Tailwind v4</span>
            </div>
          </ResponsiveCard>
          
          <ResponsiveCard
            title="New Animations"
            description="Tailwind CSS v4 comes with built-in animations that were previously only available through plugins."
            imageUrl="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
          >
            <div className="grid grid-cols-2 gap-2">
              <button className="center-content rounded-md bg-indigo-100 py-2 text-sm text-indigo-700 transition hover:bg-indigo-200 animate-bounce-subtle">
                Subtle Bounce
              </button>
              <button className="center-content rounded-md bg-pink-100 py-2 text-sm text-pink-700 transition hover:bg-pink-200 animate-fade-in-up">
                Fade In Up
              </button>
            </div>
          </ResponsiveCard>
        </div>
      </section>
      
      {/* Section 2: Utilities and ARIA Support */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Custom Utilities & ARIA Support</h2>
        <p className="mb-6 text-gray-700">
          This section showcases Tailwind v4&apos;s new @utility API for creating custom utilities
          and the enhanced ARIA attribute styling support.
        </p>
        
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-medium">New @utility API Examples</h3>
          
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="center-content aspect-video rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              center-content utility
            </div>
            
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-balance">
                This paragraph uses the new text-balance utility, which helps distribute text 
                evenly across lines for better readability.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-pretty">
                This paragraph uses the text-pretty utility, optimizing hyphenation for better 
                visual appearance in justified text.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-medium">ARIA Attribute Styling</h3>
          
          <div className="flex gap-4 mb-6">
            <button 
              className="rounded-md bg-gray-200 px-4 py-2 aria-pressed:bg-blue-600 aria-pressed:text-white"
              aria-pressed="false"
              onClick={(e) => {
                const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
                e.currentTarget.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
              }}
            >
              Toggle Button
            </button>
            
            <div 
              role="option"
              className="rounded-md bg-gray-200 px-4 py-2 aria-selected:bg-green-600 aria-selected:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-selected="false"
              tabIndex={0}
              onClick={(e) => {
                const isSelected = e.currentTarget.getAttribute('aria-selected') === 'true';
                e.currentTarget.setAttribute('aria-selected', isSelected ? 'false' : 'true');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const isSelected = e.currentTarget.getAttribute('aria-selected') === 'true';
                  e.currentTarget.setAttribute('aria-selected', isSelected ? 'false' : 'true');
                }
              }}
            >
              Selectable Option
            </div>
            
            <button 
              className="rounded-md bg-gray-200 px-4 py-2 aria-expanded:bg-purple-600 aria-expanded:text-white"
              aria-expanded="false"
              onClick={(e) => {
                const isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
                e.currentTarget.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
              }}
            >
              Expandable Button
            </button>
          </div>
        </div>
      </section>
      
      {/* Section 3: Advanced Form with ARIA */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Advanced Form with ARIA Support</h2>
        <p className="mb-6 text-gray-700">
          This form showcases Tailwind v4&apos;s ARIA attribute styling, making it both accessible and interactive.
        </p>
        
        <AdvancedForm
          title="Contact Information"
          description="Please fill out the form below to get in touch with us."
          fields={[
            {
              id: 'name',
              label: 'Full Name',
              type: 'text',
              placeholder: 'John Doe',
              required: true,
            },
            {
              id: 'email',
              label: 'Email Address',
              type: 'email',
              placeholder: 'john@example.com',
              required: true,
            },
            {
              id: 'subject',
              label: 'Subject',
              type: 'select',
              required: true,
              options: [
                { value: 'general', label: 'General Inquiry' },
                { value: 'support', label: 'Technical Support' },
                { value: 'feedback', label: 'Feedback' },
              ],
            },
            {
              id: 'message',
              label: 'Message',
              type: 'textarea',
              placeholder: 'Your message here...',
              required: true,
            },
            {
              id: 'subscribe',
              label: 'Subscribe',
              type: 'checkbox',
              placeholder: 'Subscribe to our newsletter',
            },
          ]}
          submitLabel="Send Message"
          onSubmit={handleFormSubmit}
        />
      </section>
      
      {/* Toast notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
      
      {/* Animation Showcase */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">Animation Showcase</h2>
        <p className="mb-6 text-gray-700">
          Here are some of the new built-in animations available in Tailwind CSS v4.
        </p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['success', 'error', 'warning', 'info'].map((variant) => (
            <button
              key={variant}
              className="rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
              onClick={() => showToast(`This is a ${variant} toast notification!`, variant as 'success' | 'error' | 'warning' | 'info')}
            >
              Show {variant} toast
            </button>
          ))}
        </div>
      </section>
    </div>
  );
} 