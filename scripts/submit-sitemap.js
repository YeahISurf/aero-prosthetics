/**
 * Script to ping search engines with your sitemap URL
 * 
 * This script notifies major search engines about your sitemap,
 * which can help with faster indexing of your website.
 * 
 * Usage: node scripts/submit-sitemap.js
 */

const https = require('https');
const { URL } = require('url');

// Get base URL based on environment
function getBaseUrl() {
  const environment = process.env.NODE_ENV || 'development';
  
  // Use production URL only in production environment
  if (environment === 'production') {
    return 'https://aeroprosthetics.com';
  }
  
  // For development or other environments, use localhost
  // Note: Search engines won't be able to access localhost URLs,
  // but this helps with testing the script locally
  return 'http://localhost:3000';
}

// Your sitemap URL
const BASE_URL = getBaseUrl();
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

// List of search engines to ping
const SEARCH_ENGINES = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

/**
 * Send a ping request to a search engine
 * @param {Object} engine - The search engine to ping
 * @returns {Promise} - Promise resolved when ping is complete
 */
function pingSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    console.log(`Pinging ${engine.name}...`);
    
    const url = new URL(engine.url);
    
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET'
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ ${engine.name} ping successful! Status code: ${res.statusCode}`);
          resolve();
        } else {
          console.log(`⚠️ ${engine.name} ping returned status code: ${res.statusCode}`);
          resolve();
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ Error pinging ${engine.name}: ${error.message}`);
      resolve(); // Resolve anyway to continue with other engines
    });
    
    req.end();
  });
}

/**
 * Ping all search engines with the sitemap URL
 */
async function pingAllSearchEngines() {
  console.log(`🔔 Submitting sitemap: ${SITEMAP_URL}`);
  
  // Display environment warning if not in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n⚠️ WARNING: You are not in production environment.');
    console.log('Search engines cannot access development URLs (localhost).');
    console.log('This is just a simulation for testing purposes.\n');
  }
  
  for (const engine of SEARCH_ENGINES) {
    await pingSearchEngine(engine);
  }
  
  console.log('\n✨ Sitemap submission process completed');
  console.log('\nNext steps:');
  console.log('1. Verify your sitemap in Google Search Console: https://search.google.com/search-console');
  console.log('2. Verify your sitemap in Bing Webmaster Tools: https://www.bing.com/webmasters');
}

// Execute the main function
pingAllSearchEngines().catch(console.error); 