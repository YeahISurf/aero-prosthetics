import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';
import { BlogListingSchema, BreadcrumbListSchema } from '@/components/ui/BlogSchema';
import BlogCard from '@/components/ui/BlogCard';
import BlogSidebar from '@/components/ui/BlogSidebar';
import BlogPagination from '@/components/ui/BlogPagination';
import { getBlogPosts, getCategories, getTags } from '@/lib/blog/getPosts';
import { Suspense } from 'react';
import { ANIMATION_DELAYS } from '@/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

// Enable Incremental Static Regeneration for the blog page
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.meta' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['blog', 'news', 'prosthetics', 'orthotics', 'innovation', 'patient stories', 'medical technology'],
    path: `/${locale}/blog`,
    type: 'website',
    image: '/images/blog/blog-og-image.jpg',
    locale,
  });
}

// Placeholder loading UI for Suspense boundaries
function BlogListingLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-xl mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 h-56 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

function SidebarLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      <div className="h-40 bg-gray-200 rounded mb-6"></div>
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  // Fetch blog posts and categories
  const posts = await getBlogPosts();
  const categories = await getCategories();
  const tags = await getTags();
  
  // For demo purposes, we're using a fixed page size and current page
  const currentPage = 1;
  const totalPages = Math.ceil(posts.length / 5); // Set a reasonable page size

  return (
    <>
      {/* Add structured data for SEO */}
      <BlogListingSchema
        title={t('meta.title')}
        description={t('meta.description')}
        url={`https://aeroprosthetics.com/${locale}/blog`}
        items={posts.map(post => ({
          title: post.title,
          url: `https://aeroprosthetics.com/${locale}/blog/${post.slug}`,
          datePublished: post.publishedDate,
          image: post.featuredImage,
        }))}
      />
      
      {/* Add breadcrumb structured data */}
      <BreadcrumbListSchema
        items={[
          {
            name: 'Home',
            url: `https://aeroprosthetics.com/${locale}`,
          },
          {
            name: t('meta.title'),
            url: `https://aeroprosthetics.com/${locale}/blog`,
          },
        ]}
      />
      
      {/* Enhanced Hero Section with premium design elements */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
        {/* Premium accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Subtle particle effect overlay */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Modern dual-tone gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-secondary-teal-500/10 to-secondary-teal-500/20 mix-blend-overlay"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white/95 text-sm font-medium mb-3 animate-fadeIn">
              {t('hero.badge') || 'Insights & Updates'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 text-white animate-slideInUp">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            
            {/* Add a link to blog sitemap for better SEO */}
            <link rel="sitemap" type="application/xml" href="/blog-sitemap.xml" />
          </div>
        </div>
        
        {/* Enhanced subtle gradient transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      </section>
      
      {/* Enhanced Blog Content Section */}
      <section className="section relative bg-white overflow-hidden py-16 md:py-20">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary-teal-500/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Suspense fallback={<BlogListingLoading />}>
                {/* Featured Post with enhanced styling */}
                {posts.length > 0 && (
                  <div className="mb-12 transform transition-all duration-500 hover:translate-y-[-5px] animate-fadeIn" 
                       style={{ animationDelay: `${ANIMATION_DELAYS.ITEM_BASE}s` }}>
                    <BlogCard post={posts[0]} featured={true} />
                  </div>
                )}
                
                {/* Post Grid with animations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {posts.slice(1).map((post, index) => (
                    <div key={post.id} className="transform transition-all duration-500 hover:translate-y-[-5px] animate-fadeIn"
                         style={{ animationDelay: `${ANIMATION_DELAYS.getStaggeredDelay(index, ANIMATION_DELAYS.ITEM_BASE, ANIMATION_DELAYS.QUICK)}s` }}>
                      <BlogCard key={post.id} post={post} />
                    </div>
                  ))}
                </div>
                
                {/* Pagination with enhanced styling */}
                <div className="animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.SECTION_CONTENT}s` }}>
                  <BlogPagination 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    basePath={`/${locale}/blog`} 
                  />
                </div>
              </Suspense>
            </div>
            
            {/* Sidebar with enhanced styling */}
            <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: `${ANIMATION_DELAYS.ITEM_BASE}s` }}>
              <Suspense fallback={<SidebarLoading />}>
                <BlogSidebar 
                  categories={categories} 
                  tags={tags} 
                  recentPosts={posts.slice(0, 4)} 
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 