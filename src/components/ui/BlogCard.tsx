"use client";

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  readingTime: number;
};

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const t = useTranslations('blog');
  const locale = useLocale();
  
  // Format the date in a user-friendly way using native Date methods
  const formattedDate = new Date(post.publishedDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Determine if we should use the featured (larger) card style
  if (featured) {
    return (
      <article className="group relative grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Featured image (larger size) */}
        <div className="relative aspect-[16/9] md:aspect-auto md:h-full">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col">
          {/* Category */}
          <Link 
            href={`/${locale}/blog?category=${post.category}`}
            className="inline-block text-sm text-primary-600 font-medium mb-2"
          >
            {t(`categories.${post.category}`)}
          </Link>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-3">
            <Link href={`/${locale}/blog/${post.slug}`} className="block">
              {post.title}
            </Link>
          </h2>
          
          {/* Excerpt */}
          <p className="text-gray-600 mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          {/* Author and metadata */}
          <div className="flex items-center mt-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <time dateTime={post.publishedDate}>{formattedDate}</time>
                <span className="mx-1">•</span>
                <span>{post.readingTime} {t('minRead')}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
  
  // Standard card
  return (
    <article className="group bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Featured image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <Link 
          href={`/${locale}/blog?category=${post.category}`}
          className="inline-block text-sm text-primary-600 font-medium mb-2"
        >
          {t(`categories.${post.category}`)}
        </Link>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
          <Link href={`/${locale}/blog/${post.slug}`} className="block">
            {post.title}
          </Link>
        </h2>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        {/* Author and metadata */}
        <div className="flex items-center mt-2">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <div className="ml-2">
            <div className="flex items-center text-xs text-gray-500">
              <span className="font-medium text-gray-700 mr-1">{post.author.name}</span>
              <span>•</span>
              <time className="mx-1" dateTime={post.publishedDate}>{formattedDate}</time>
              <span>•</span>
              <span className="ml-1">{post.readingTime} {t('minRead')}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 