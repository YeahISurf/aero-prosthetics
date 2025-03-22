"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { contactSchema, ContactFormData } from '@/lib/validation/contactSchema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [retries, setRetries] = useState(0);
  const maxRetries = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const handleRetry = () => {
    if (retries < maxRetries) {
      setRetries(prev => prev + 1);
      setSubmitError(false);
      setErrorMessage('');
      onSubmit(getValues());
    } else {
      setErrorMessage(t('maxRetriesReached'));
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);
    setErrorMessage('');

    try {
      // This would be replaced with an actual API call in production
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random failures for testing error handling
          if (process.env.NODE_ENV === 'development' && Math.random() > 0.8) {
            reject(new Error('Simulated network error'));
          } else {
            resolve(true);
          }
        }, 1000);
      });
      
      setSubmitSuccess(true);
      setRetries(0);
      reset();

      // Scroll to top of form to show success message
      setTimeout(() => {
        document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
      
      // Set appropriate error message based on error type
      if (error instanceof Error) {
        if (error.message.includes('network')) {
          setErrorMessage(t('networkError'));
        } else {
          setErrorMessage(error.message || t('error'));
        }
      } else {
        setErrorMessage(t('error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto" id="form-top">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t('title')}</h1>
        <p className="mt-3 text-base text-gray-500">
          We're here to help with any questions about our services and products.
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-8 rounded-md bg-green-50 p-4 border-l-4 border-green-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-green-800">Thank you for your message</h3>
              <p className="mt-1 text-sm text-green-700">{t('success')}</p>
            </div>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-8 rounded-md bg-red-50 p-4 border-l-4 border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{errorMessage || t('error')}</p>
              {retries < maxRetries && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-2 text-sm font-medium text-red-800 hover:text-red-700 underline focus:outline-none"
                >
                  {t('retry')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm text-gray-500">Please provide your contact details so we can get back to you.</p>
          </div>
          
          <div className="px-8 py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  {t('firstName')} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="firstName"
                  type="text"
                  className={`${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full rounded-md shadow-sm`}
                  placeholder="Your first name"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  {t('lastName')} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="lastName"
                  type="text"
                  className={`${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full rounded-md shadow-sm`}
                  placeholder="Your last name"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('email')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    className={`${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full pl-10 rounded-md shadow-sm`}
                    placeholder="your.email@example.com"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t('phone')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    className={`${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full pl-10 rounded-md shadow-sm`}
                    placeholder="(123) 456-7890"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900">Message Details</h2>
            <p className="mt-1 text-sm text-gray-500">Tell us how we can help you today.</p>
          </div>
          
          <div className="px-8 py-6 space-y-6">
            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                {t('subject')} <span className="text-red-500">*</span>
              </label>
              <Input
                id="subject"
                type="text"
                className={`${errors.subject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full rounded-md shadow-sm`}
                placeholder="Subject of your message"
                {...register('subject')}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('message')} <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                rows={5}
                className={`${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full rounded-md shadow-sm`}
                placeholder="Please provide details about your inquiry"
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Preferred Location */}
              <div className="space-y-2">
                <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700">
                  {t('preferredLocation')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="preferredLocation"
                    className={`${errors.preferredLocation ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full pl-10 py-2 rounded-md shadow-sm`}
                    {...register('preferredLocation')}
                  >
                    <option value="">Select a location</option>
                    <option value="anaheim">Anaheim Hills</option>
                    <option value="victorville">Victorville</option>
                  </select>
                </div>
                {errors.preferredLocation && (
                  <p className="mt-1 text-sm text-red-600">{errors.preferredLocation.message}</p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">
                  {t('preferredContact')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="preferredContact"
                    className={`${errors.preferredContact ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} w-full pl-10 py-2 rounded-md shadow-sm`}
                    {...register('preferredContact')}
                  >
                    <option value="">Select a contact method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="either">Either</option>
                  </select>
                </div>
                {errors.preferredContact && (
                  <p className="mt-1 text-sm text-red-600">{errors.preferredContact.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* HIPAA Notice */}
        <div className="bg-blue-50 shadow rounded-lg overflow-hidden">
          <div className="px-8 py-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-900">HIPAA Privacy Notice</h3>
                <div className="mt-2 text-sm text-blue-700 space-y-2">
                  <p>
                    The information you provide through this form is protected under the Health Insurance Portability and Accountability Act (HIPAA).
                    We will only use this information to respond to your inquiry and will not share it with third parties except as permitted by law
                    or with your explicit consent.
                  </p>
                  <p>
                    For more information about how we protect your health information, please review our{' '}
                    <Link href="/en/legal/privacy" className="font-medium underline hover:text-blue-800 transition-colors">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-6">
            <h2 className="text-xl font-semibold text-gray-900">Consent & Privacy</h2>
            <p className="mt-1 text-sm text-gray-500">Please review and provide your consent to proceed.</p>
          </div>
          
          <div className="px-8 py-6 space-y-6">
            {/* Privacy Policy Consent */}
            <div className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id="consent"
                  type="checkbox"
                  className={`h-5 w-5 rounded ${errors.consent ? 'border-red-300 text-red-600 focus:ring-red-500' : 'border-gray-300 text-blue-600 focus:ring-blue-500'}`}
                  {...register('consent')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="consent" className="block text-sm font-medium text-gray-700">
                  I consent to the processing of my personal data according to the{' '}
                  <Link href="/en/legal/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  <span className="text-red-500">*</span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                )}
              </div>
            </div>

            {/* PHI Consent */}
            <div className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id="phiConsent"
                  type="checkbox"
                  className={`h-5 w-5 rounded ${errors.phiConsent ? 'border-red-300 text-red-600 focus:ring-red-500' : 'border-gray-300 text-blue-600 focus:ring-blue-500'}`}
                  {...register('phiConsent')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="phiConsent" className="block text-sm font-medium text-gray-700">
                  I understand that any health information I provide may be considered Protected Health Information (PHI)
                  under HIPAA and consent to its use as described in the Privacy Policy.
                  <span className="text-red-500">*</span>
                </label>
                {errors.phiConsent && (
                  <p className="mt-1 text-sm text-red-600">{errors.phiConsent.message}</p>
                )}
              </div>
            </div>

            {/* Communication Consent */}
            <div className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id="communicationConsent"
                  type="checkbox"
                  className={`h-5 w-5 rounded ${errors.communicationConsent ? 'border-red-300 text-red-600 focus:ring-red-500' : 'border-gray-300 text-blue-600 focus:ring-blue-500'}`}
                  {...register('communicationConsent')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="communicationConsent" className="block text-sm font-medium text-gray-700">
                  I consent to receive communications from Aero Prosthetics via my preferred contact method.
                </label>
                {errors.communicationConsent && (
                  <p className="mt-1 text-sm text-red-600">{errors.communicationConsent.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-8 py-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('submitting')}</span>
                </>
              ) : (
                t('submit')
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
