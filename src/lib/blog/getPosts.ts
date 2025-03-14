import { BlogPost } from '@/components/ui/BlogCard';

// Path to our standard blog image
const BLOG_IMAGE_PATH = '/images/blog/blog-image.jpg';
const AUTHOR_IMAGE_PATH = '/images/blog/blog-image.jpg'; // Using the same image for authors as well

/**
 * Fetches blog posts from the data source
 * This is a placeholder for the actual data fetching function
 * In a real implementation, this would fetch data from a CMS
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Sample blog posts data
  return [
    {
      id: '1',
      slug: 'advancements-in-prosthetic-technology',
      title: 'Recent Advancements in Prosthetic Technology',
      excerpt: 'Explore the latest innovations in prosthetic technology and how they are improving quality of life for amputees.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'innovation',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-11-15T09:00:00Z',
      readingTime: 8,
    },
    {
      id: '2',
      slug: 'patient-success-story-michael',
      title: 'Patient Success Story: Michael\'s Journey to Mobility',
      excerpt: 'Read about Michael\'s inspiring journey from amputation to running marathons with his custom prosthetic.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'patientStories',
      author: {
        name: 'James Wilson',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-10-28T14:30:00Z',
      readingTime: 6,
    },
    {
      id: '3',
      slug: 'choosing-the-right-prosthetic',
      title: 'How to Choose the Right Prosthetic for Your Lifestyle',
      excerpt: 'A comprehensive guide to selecting the most appropriate prosthetic solution based on your daily activities and goals.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'education',
      author: {
        name: 'Dr. Robert Johnson',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-10-10T11:15:00Z',
      readingTime: 10,
    },
    {
      id: '4',
      slug: 'research-microprocessor-knees',
      title: 'New Research on Microprocessor Knee Technology',
      excerpt: 'Discover the latest research findings on microprocessor knee technology and its impact on gait and stability.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'research',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-09-22T08:45:00Z',
      readingTime: 12,
    },
    {
      id: '5',
      slug: 'annual-prosthetics-conference',
      title: 'Highlights from the Annual Prosthetics & Orthotics Conference',
      excerpt: 'A summary of key takeaways and innovations presented at this year\'s international prosthetics and orthotics conference.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'events',
      author: {
        name: 'James Wilson',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-09-05T16:20:00Z',
      readingTime: 7,
    },
    {
      id: '6',
      slug: 'caring-for-your-prosthetic',
      title: 'Essential Tips for Caring for Your Prosthetic Device',
      excerpt: 'Learn how to properly maintain and care for your prosthetic device to ensure longevity and optimal performance.',
      featuredImage: BLOG_IMAGE_PATH,
      category: 'education',
      author: {
        name: 'Dr. Robert Johnson',
        avatar: AUTHOR_IMAGE_PATH,
      },
      publishedDate: '2023-08-18T10:30:00Z',
      readingTime: 5,
    },
  ];
}

/**
 * Fetches blog categories from the data source
 * This is a placeholder for the actual data fetching function
 */
export async function getCategories() {
  return [
    { name: 'innovation', slug: 'innovation', count: 8 },
    { name: 'patientStories', slug: 'patient-stories', count: 12 },
    { name: 'research', slug: 'research', count: 6 },
    { name: 'events', slug: 'events', count: 4 },
    { name: 'education', slug: 'education', count: 10 },
  ];
}

/**
 * Fetches blog tags from the data source
 * This is a placeholder for the actual data fetching function
 */
export async function getTags() {
  return [
    { name: 'Prosthetics', slug: 'prosthetics' },
    { name: 'Orthotics', slug: 'orthotics' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Innovation', slug: 'innovation' },
    { name: 'Patient Care', slug: 'patient-care' },
    { name: 'Mobility', slug: 'mobility' },
    { name: 'Research', slug: 'research' },
    { name: 'Rehabilitation', slug: 'rehabilitation' },
  ];
} 