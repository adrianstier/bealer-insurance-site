import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

try {
  console.log('Navigating to site...');
  const response = await page.goto('http://localhost:4322', { waitUntil: 'networkidle', timeout: 30000 });
  
  console.log('Status:', response?.status());
  console.log('URL:', page.url());
  
  // Check for errors in console
  page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('Page Error:', err.message));
  
  // Wait a bit to see page
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
  console.log('Screenshot saved to debug-screenshot.png');
  
  // Check if main elements are present
  const hero = await page.$('section');
  console.log('Hero section found:', !!hero);
  
  const form = await page.$('#quote-form');
  console.log('Quote form found:', !!form);
  
  // Get page content
  const html = await page.content();
  console.log('HTML length:', html.length);
  
  if (html.length < 1000) {
    console.log('Page content:', html);
  }
  
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
