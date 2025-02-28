"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('navigation');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('company.title')}</h3>
            <p className="text-gray-300 mb-4">{t('company.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/en" className="text-gray-300 hover:text-white">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href="/en/about" className="text-gray-300 hover:text-white">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href="/en/services" className="text-gray-300 hover:text-white">
                  {nav('services')}
                </Link>
              </li>
              <li>
                <Link href="/en/team" className="text-gray-300 hover:text-white">
                  {nav('team')}
                </Link>
              </li>
              <li>
                <Link href="/en/contact" className="text-gray-300 hover:text-white">
                  {nav('contact')}
                </Link>
              </li>
              <li>
                <Link href="/en/resources" className="text-gray-300 hover:text-white">
                  {nav('resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('locations.title')}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">{t('locations.anaheim')}</h4>
                <p className="text-gray-300">1001 N Weir Canyon Road</p>
                <p className="text-gray-300">Anaheim Hills, CA 92807</p>
                <p className="text-gray-300">Tel: 714-385-1000</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">{t('locations.victorville')}</h4>
                <p className="text-gray-300">17189 Yuma Street</p>
                <p className="text-gray-300">Victorville, CA 92395</p>
                <p className="text-gray-300">Tel: 760-245-1000</p>
              </div>
            </div>
          </div>

          {/* Language & Legal */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('language')}</h3>
            <div className="mb-6">
              <LanguageToggle />
            </div>
            <div className="space-y-2">
              <Link href="/en/legal/privacy" className="block text-gray-300 hover:text-white">
                {useTranslations('legal.privacy')('title')}
              </Link>
              <Link href="/en/legal/terms" className="block text-gray-300 hover:text-white">
                {useTranslations('legal.terms')('title')}
              </Link>
              <Link href="/en/legal/accessibility" className="block text-gray-300 hover:text-white">
                {useTranslations('legal.accessibility')('title')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
