import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Logo() {
  const t = useTranslations('footer.company');

  return (
    <Link href="/en" className="flex items-center space-x-2">
      {/* Placeholder logo - replace with actual logo later */}
      <div className="w-10 h-10 bg-primary-500 rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-xl">AP</span>
      </div>
      <div>
        <h1 className="text-xl font-bold text-primary-600">{t('title')}</h1>
        <p className="text-xs text-gray-500">{t('description')}</p>
      </div>
    </Link>
  );
}
