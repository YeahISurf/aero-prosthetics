import { unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  unstable_setRequestLocale(locale);
  
  return constructMetadata({
    title: 'Book a Demo',
    description: 'Schedule a personalized demonstration of our prosthetic solutions',
    keywords: ['demo', 'booking', 'appointment', 'prosthetics', 'consultation'],
  });
}

export default async function BookDemoPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
            Experience Our Solutions
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Book a Demo
          </h1>
          <p className="text-lg text-gray-700">
            Schedule a personalized demonstration to experience our advanced prosthetic solutions firsthand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Book a Demo?</h2>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Experience our cutting-edge prosthetic technology firsthand</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Get personalized answers to your specific questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Learn about custom solutions tailored to your specific needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Meet our team of certified prosthetists and specialists</span>
                </li>
              </ul>
              
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <h3 className="text-lg font-semibold text-primary-800 mb-2">Demo Options</h3>
                <p className="text-primary-700 mb-3">Choose from in-person demos at our facilities or virtual consultations from the comfort of your home.</p>
                <p className="text-sm text-primary-600">Demos typically last 60-90 minutes and are completely free of charge.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Demo</h2>
              
              <p className="mb-6 text-gray-700">
                Please contact us to schedule your personalized demo. You can reach us at <strong>714-385-1000</strong> or use the contact form on our <Link href="/en/contact" className="text-primary-600 hover:text-primary-700 underline">Contact page</Link>.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What to Expect</h3>
                <p className="text-gray-700 mb-4">
                  During your demo, our specialists will:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Discuss your specific needs and goals</li>
                  <li>• Demonstrate our prosthetic solutions</li>
                  <li>• Answer all your questions</li>
                  <li>• Provide information about next steps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 