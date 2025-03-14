"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BlogPost } from './BlogCard';

type Category = {
  name: string;
  slug: string;
  count: number;
};

type Tag = {
  name: string;
  slug: string;
};

type BlogSidebarProps = {
  categories: Category[];
  tags: Tag[];
  recentPosts: BlogPost[];
  currentSlug?: string;
};

export default function BlogSidebar({ 
  categories, 
  tags, 
  recentPosts,
  currentSlug 
}: BlogSidebarProps) {
  const t = useTranslations('blog');
  const locale = useLocale();
  
  // Exclude current post from recent posts if currentSlug is provided
  const filteredRecentPosts = currentSlug
    ? recentPosts.filter(post => post.slug !== currentSlug).slice(0, 3)
    : recentPosts.slice(0, 3);
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sidebar.search')}</h3>
        <div className="relative">
          <input
            type="text"
            placeholder={t('sidebar.searchPlaceholder')}
            className="w-full px-4 py-2 pr-10 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-primary-600"
            aria-label={t('sidebar.search')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sidebar.categories')}</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/${locale}/blog?category=${category.slug}`}
                className="flex justify-between items-center group"
              >
                <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                  {t(`categories.${category.name}`, { defaultValue: category.name })}
                </span>
                <span className="text-sm bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sidebar.recentPosts')}</h3>
        <div className="space-y-4">
          {filteredRecentPosts.map((post) => (
            <div key={post.id} className="flex items-start">
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {post.readingTime} {t('minRead')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tags */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sidebar.tags')}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/${locale}/blog?tag=${tag.slug}`}
              className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-primary-50 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{t('sidebar.newsletter')}</h3>
        <p className="text-gray-600 mb-4">{t('sidebar.newsletterDescription')}</p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder={t('sidebar.emailPlaceholder')}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            {t('sidebar.subscribe')}
          </button>
        </form>
      </div>
    </div>
  );
} 