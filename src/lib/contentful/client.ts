import { createClient } from 'contentful';

// This would be replaced with actual environment variables in production
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'placeholder-space-id',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'placeholder-access-token',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export default contentfulClient;
