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
    
    console.log('Navigating to http://localhost:3000...');
    try {
      await page.goto('http://localhost:3000', { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      console.log('Navigation successful!');
    } catch (navError) {
      console.error('Navigation error:', navError.message);
      console.log('Attempting to continue anyway...');
    }
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png' });
    
    console.log('Screenshot saved to screenshot.png');
    await browser.close();
    console.log('Browser closed.');
  } catch (error) {
    console.error('Error:', error);
  }
})();
