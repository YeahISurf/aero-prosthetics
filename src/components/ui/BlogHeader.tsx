"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type Author = {
  name: string;
  avatar: string;
};

type BlogHeaderProps = {
  title: string;
  category: string;
  author: Author;
  publishedDate: string;
  readingTime: number;
};

const BlogHeader = ({ title, category, author, publishedDate, readingTime }: BlogHeaderProps) => {
  const t = useTranslations('blog');
  const locale = useLocale();
  
  return (
    <header className="mb-6">
      {/* Category Link */}
      <Link 
        href={`/${locale}/blog?category=${category}`} 
        className="inline-block text-sm font-medium text-primary-100 bg-primary-600 px-3 py-1 rounded-full mb-4 hover:bg-primary-700 transition-colors"
      >
        {t(`categories.${category}`)}
      </Link>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
        {title}
      </h1>
      
      {/* Author & Metadata */}
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden w-10 h-10 border-2 border-primary-100">
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">
            {author.name}
          </p>
          <div className="flex items-center text-sm text-white/80">
            <time dateTime={typeof publishedDate === 'string' ? publishedDate : new Date(publishedDate).toISOString()}>
              {publishedDate}
            </time>
            <span className="mx-2">•</span>
            <span>
              {readingTime} {t('minRead')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader; 