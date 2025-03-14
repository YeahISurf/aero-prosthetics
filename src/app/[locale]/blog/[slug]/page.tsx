import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { constructMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogPostSchema } from '@/components/ui/BlogSchema';
import BlogHeader from '@/components/ui/BlogHeader';
import BlogSidebar from '@/components/ui/BlogSidebar';
import { BlogPost } from '@/components/ui/BlogCard';
import { getBlogPosts, getCategories, getTags } from '@/lib/blog/getPosts';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  // In a real application, you would fetch the blog post data based on the slug
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: ['blog', post.category, 'prosthetics', 'orthotics'],
    path: `/${locale}/blog/${slug}`,
    type: 'article',
    image: post.featuredImage,
  });
}

// This is a placeholder function that would be replaced with real data fetching in a production environment
async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

// Use a constant for the standard blog image path to ensure consistency
const BLOG_IMAGE_PATH = '/images/blog/blog-image.jpg';

const getBlogContent = (slug: string) => {
  // Each post would have its own content in a real implementation
  // For now, we'll return placeholder content based on the slug
  
  switch (slug) {
    case 'advancements-in-prosthetic-technology':
      return `
        <h2>The Evolution of Prosthetic Technology</h2>
        <p>Over the past decade, prosthetic technology has advanced at an unprecedented rate. From simple mechanical devices to sophisticated bionic limbs with neural interfaces, the evolution has been remarkable.</p>
        
        <figure>
          <img src="${BLOG_IMAGE_PATH}" alt="Advanced prosthetic limb technology" width="800" height="450" />
          <figcaption>State-of-the-art prosthetic limb with microprocessor control</figcaption>
        </figure>
        
        <h3>Microprocessor Technology</h3>
        <p>One of the most significant advancements has been in microprocessor-controlled prosthetics. These devices utilize sensors and sophisticated algorithms to adapt to the user's movement patterns, providing more natural motion and improved stability.</p>
        
        <h3>Materials Science Innovations</h3>
        <p>Alongside electronic improvements, materials science has contributed to lighter, stronger, and more comfortable prosthetic components. Carbon fiber, titanium alloys, and advanced polymers have replaced heavier materials, reducing user fatigue and increasing durability.</p>
        
        <figure>
          <img src="${BLOG_IMAGE_PATH}" alt="Materials used in modern prosthetics" width="800" height="450" />
          <figcaption>Carbon fiber components offer exceptional strength-to-weight ratio</figcaption>
        </figure>
        
        <h3>Direct Neural Integration</h3>
        <p>Perhaps the most exciting frontier in prosthetic technology is direct neural integration. By connecting prosthetic devices directly to the nervous system, users can control their prosthetics with their thoughts and even receive sensory feedback, creating a more natural and intuitive experience.</p>
        
        <h3>Future Directions</h3>
        <p>Looking ahead, research continues in several promising areas:</p>
        <ul>
          <li>Improved battery technology for longer use between charges</li>
          <li>Enhanced sensory feedback systems</li>
          <li>Artificial intelligence for more adaptive responses</li>
          <li>Fully integrated osseointegration for direct skeletal attachment</li>
          <li>Regenerative medicine approaches to improve the interface between prosthetics and biological tissues</li>
        </ul>
        
        <p>With these ongoing advancements, the future of prosthetic technology looks increasingly bright, offering users ever-greater functionality, comfort, and quality of life.</p>
      `;
      
    case 'patient-success-story-michael':
      return `
        <h2>Michael's Journey: From Amputation to Marathon</h2>
        <p>When Michael Johnson lost his right leg in a motorcycle accident three years ago, he wasn't sure if he would ever walk normally again, let alone run. Today, he's completed two marathons and is training for his third.</p>
        
        <figure>
          <img src="${BLOG_IMAGE_PATH}" alt="Michael training with his prosthetic leg" width="800" height="450" />
          <figcaption>Michael during his early morning training routine</figcaption>
        </figure>
        
        <h3>The Beginning</h3>
        <p>"Those first few weeks after the amputation were the darkest of my life," Michael recalls. "I couldn't see a way forward. The phantom pain was intense, and I was grieving for the loss of my mobility."</p>
        
        <p>Six weeks after his surgery, Michael was fitted with his first prosthetic. "It was nothing like what I have now," he says. "It was uncomfortable, and I struggled with even basic walking."</p>
        
        <h3>Finding the Right Solution</h3>
        <p>Everything changed when Michael was referred to Aero Prosthetics. "From the first consultation, I knew this was different," he says. "They took the time to understand not just my physical needs, but my goals and lifestyle. They told me that running could be possible again, which no one else had suggested."</p>
        
        <p>Working with specialists, Michael was fitted with a custom-designed running blade with microprocessor knee technology. The team worked meticulously to achieve the perfect fit and alignment.</p>
        
        <figure>
          <img src="${BLOG_IMAGE_PATH}" alt="Michael's custom running prosthetic" width="800" height="450" />
          <figcaption>The custom running blade that helped Michael return to his passion</figcaption>
        </figure>
        
        <h3>The Road to Recovery</h3>
        <p>Rehabilitation was intensive. "It wasn't just about learning to use the prosthetic," Michael explains. "It was rebuilding strength, balance, and confidence. The Aero team was with me every step of the way, adjusting the prosthetic as my residual limb changed and my gait improved."</p>
        
        <p>Nine months after receiving his running prosthetic, Michael completed his first 5K race. "Crossing that finish line was emotional. I never thought I'd experience that feeling again."</p>
        
        <h3>Marathon Achievements</h3>
        <p>Two years after his accident, Michael completed his first marathon. "26.2 miles with a prosthetic leg isn't easy," he laughs. "But the freedom and accomplishment I feel makes every difficult step worth it."</p>
        
        <p>Michael now mentors other amputees, showing them what's possible with the right prosthetic solution and determination. "Losing a limb isn't the end of your story," he says. "Sometimes, it's just the beginning of a new chapter."</p>
      `;
      
    // Add more cases for other blog posts
    
    default:
      return `
        <h2>Advanced Prosthetic Solutions</h2>
        <p>This is a placeholder article about advanced prosthetic solutions. In a real implementation, each article would have unique content stored in a database or CMS.</p>
        
        <figure>
          <img src="${BLOG_IMAGE_PATH}" alt="Advanced prosthetic technology" width="800" height="450" />
          <figcaption>State-of-the-art prosthetic technology improving lives</figcaption>
        </figure>
        
        <p>The field of prosthetics has seen remarkable advancements in recent years, combining cutting-edge materials with sophisticated electronics and innovative design to create solutions that offer unprecedented functionality and comfort.</p>
        
        <h3>Key Innovations</h3>
        <ul>
          <li>Microprocessor-controlled joints that adapt to the user's gait and terrain</li>
          <li>Lightweight, durable materials that reduce fatigue and increase comfort</li>
          <li>Custom socket designs that improve fit and reduce skin issues</li>
          <li>Advanced suspension systems that enhance stability and control</li>
          <li>Intuitive control systems that make using prosthetics more natural</li>
        </ul>
        
        <p>At Aero Prosthetics, we're committed to staying at the forefront of these innovations, ensuring our patients have access to the most effective and comfortable solutions available.</p>
      `;
  }
};

async function getRelatedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, 3);
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  // Enable static rendering
  unstable_setRequestLocale(locale);
  
  // Use getTranslations instead of useTranslations for async server components
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  // In a real application, fetch the blog post data based on the slug
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Get the formatted date
  const publishedDate = new Date(post.publishedDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get related posts
  const relatedPosts = await getRelatedPosts(post);
  
  // Get categories and tags for the sidebar
  const categories = await getCategories();
  const tags = await getTags();

  // Get the blog content (this would be fetched from a CMS in a real implementation)
  const content = getBlogContent(slug);
  
  return (
    <>
      {/* Add structured data for SEO */}
      <BlogPostSchema
        title={post.title}
        description={post.excerpt}
        datePublished={post.publishedDate}
        image={post.featuredImage}
        url={`https://aeroprosthetics.com/${locale}/blog/${post.slug}`}
        authorName={post.author.name}
        publisherName="Aero Prosthetics"
        publisherLogo="/images/logo.png"
      />
      
      {/* Hero Section with Featured Image */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-400 to-primary-300 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-900/50 mix-blend-multiply"></div>
        </div>
        
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <Link 
              href={`/${locale}/blog`} 
              className="inline-flex items-center mb-6 text-primary-50 hover:text-white transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('backToBlog')}
            </Link>
            
            {/* Blog Header */}
            <BlogHeader
              title={post.title}
              category={post.category}
              author={post.author}
              publishedDate={publishedDate}
              readingTime={post.readingTime}
            />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 5).map((tag) => (
                    <Link 
                      key={tag.slug}
                      href={`/${locale}/blog?tag=${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.author.name}</h3>
                    <p className="text-gray-600">Prosthetics Specialist at Aero Prosthetics</p>
                  </div>
                </div>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="group">
                        <Link href={`/${locale}/blog/${relatedPost.slug}`} className="block">
                          <div className="relative aspect-[16/9] mb-3 overflow-hidden rounded-lg">
                            <Image
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar 
                categories={categories} 
                tags={tags.slice(0, 10)} 
                recentPosts={await getBlogPosts()}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 