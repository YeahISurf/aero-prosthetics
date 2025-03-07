import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Logo() {
  const t = useTranslations('footer.company');
  const locale = useLocale();

  return (
    <Link href={`/${locale}`} className="flex items-center space-x-2">
      {/* Placeholder logo - replace with actual logo later */}
      <div className="md:w-10 md:h-10 w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold md:text-xl text-lg">AP</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <h1 className="md:text-xl text-lg font-bold text-primary-600 leading-none">{t('title')}</h1>
        <p className="md:text-xs text-[10px] text-gray-500 md:block leading-tight mt-0.5">{t('description')}</p>
      </div>
    </Link>
  );
}
