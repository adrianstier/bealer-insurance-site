import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

try {
  console.log('Checking live site...');
  const response = await page.goto('https://goleta-insurance.pages.dev', { waitUntil: 'networkidle', timeout: 30000 });
  
  console.log('Status:', response?.status());
  console.log('Title:', await page.title());
  
  await page.screenshot({ path: 'live-site.png', fullPage: true });
  console.log('Screenshot saved to live-site.png');
  
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await browser.close();
}
