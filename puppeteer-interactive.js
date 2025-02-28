const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/google/idx/builtins/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('Browser launched successfully!');
    console.log('Opening page...');
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate to the homepage
    console.log('Navigating to http://localhost:3000/en...');
    try {
      await page.goto('http://localhost:3000/en', { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      console.log('Navigation successful!');
    } catch (navError) {
      console.error('Navigation error:', navError.message);
      console.log('Attempting to continue anyway...');
    }
    
    // Take a screenshot of the homepage
    console.log('Taking screenshot of homepage...');
    await page.screenshot({ path: 'homepage.png' });
    console.log('Homepage screenshot saved to homepage.png');
    
    // Wait for a moment to ensure page is loaded
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get all links on the page
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      return anchors.map(a => {
        return {
          text: a.textContent.trim(),
          href: a.href
        };
      }).filter(link => link.href.startsWith('http://localhost:3000/en'));
    });
    
    console.log('Found links:', links);
    
    // Click on the first internal link (if any)
    if (links.length > 0) {
      console.log(`Clicking on link: ${links[0].text} (${links[0].href})`);
      
      try {
        // Navigate to the link
        await page.goto(links[0].href, { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        console.log('Navigation to link successful!');
        
        // Take a screenshot of the new page
        await page.screenshot({ path: 'subpage.png' });
        console.log('Subpage screenshot saved to subpage.png');
      } catch (navError) {
        console.error('Navigation to link error:', navError.message);
      }
    } else {
      console.log('No internal links found to click on.');
    }
    
    // Close the browser
    await browser.close();
    console.log('Browser closed.');
    
    console.log('Puppeteer interactive session completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
})();
