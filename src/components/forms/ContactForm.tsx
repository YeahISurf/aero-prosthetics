"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { contactSchema, ContactFormData } from '@/lib/validation/contactSchema';

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
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">{t('title')}</h3>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-secondary-green-500/10 text-secondary-green-500 rounded-md">
          {t('success')}
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-secondary-red-500/10 text-secondary-red-500 rounded-md flex flex-col">
          <p>{errorMessage || t('error')}</p>
          {retries < maxRetries && (
            <button
              type="button"
              onClick={handleRetry}
              className="mt-2 self-start text-sm font-medium underline hover:text-secondary-red-600"
            >
              {t('retry')}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('firstName')} <span className="text-secondary-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.firstName ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('lastName')} <span className="text-secondary-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.lastName ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')} <span className="text-secondary-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.email ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('phone')}
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.phone ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            {t('subject')} <span className="text-secondary-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.subject ? 'border-secondary-red-500' : 'border-gray-300'
            }`}
            {...register('subject')}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-secondary-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t('message')} <span className="text-secondary-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.message ? 'border-secondary-red-500' : 'border-gray-300'
            }`}
            {...register('message')}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-secondary-red-500">{errors.message.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preferred Location */}
          <div>
            <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700 mb-1">
              {t('preferredLocation')}
            </label>
            <select
              id="preferredLocation"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.preferredLocation ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('preferredLocation')}
            >
              <option value="">Select a location</option>
              <option value="anaheim">Anaheim Hills</option>
              <option value="victorville">Victorville</option>
            </select>
            {errors.preferredLocation && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.preferredLocation.message}</p>
            )}
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-1">
              {t('preferredContact')} <span className="text-secondary-red-500">*</span>
            </label>
            <select
              id="preferredContact"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.preferredContact ? 'border-secondary-red-500' : 'border-gray-300'
              }`}
              {...register('preferredContact')}
            >
              <option value="">Select a contact method</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            {errors.preferredContact && (
              <p className="mt-1 text-sm text-secondary-red-500">{errors.preferredContact.message}</p>
            )}
          </div>
        </div>

        {/* HIPAA Notice */}
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">HIPAA Privacy Notice</h4>
          <p className="text-sm text-gray-700 mb-2">
            The information you provide through this form is protected under the Health Insurance Portability and Accountability Act (HIPAA). 
            We will only use this information to respond to your inquiry and will not share it with third parties except as permitted by law 
            or with your explicit consent.
          </p>
          <p className="text-sm text-gray-700">
            For more information about how we protect your health information, please review our{' '}
            <Link href="/en/legal/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4">
          {/* Privacy Policy Consent */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                {...register('consent')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                I consent to the processing of my personal data according to the{' '}
                <Link href="/en/legal/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
                . <span className="text-secondary-red-500">*</span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-sm text-secondary-red-500">{errors.consent.message}</p>
              )}
            </div>
          </div>

          {/* PHI Consent */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="phiConsent"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                {...register('phiConsent')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="phiConsent" className="font-medium text-gray-700">
                I understand that any health information I provide may be considered Protected Health Information (PHI) 
                under HIPAA and consent to its use as described in the Privacy Policy. <span className="text-secondary-red-500">*</span>
              </label>
              {errors.phiConsent && (
                <p className="mt-1 text-sm text-secondary-red-500">{errors.phiConsent.message}</p>
              )}
            </div>
          </div>

          {/* Communication Consent */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="communicationConsent"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                {...register('communicationConsent')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="communicationConsent" className="font-medium text-gray-700">
                I consent to receive communications from Aero Prosthetics via my preferred contact method.
              </label>
              {errors.communicationConsent && (
                <p className="mt-1 text-sm text-secondary-red-500">{errors.communicationConsent.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('submitting')}
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                {t('submit')}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
