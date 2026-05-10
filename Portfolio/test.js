
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });
  await page.goto('file:///e:/VSCode/My_Portofolio/Portfolio/index.html');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(2000);
  await browser.close();
})();
