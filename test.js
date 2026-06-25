/**
 * Self-Heal Demo
 * ==============================
 * The test toggles the 🛡️ Self-Heal switch on the page first.
 * This swaps all element IDs to -action- variants.
 * The test then tries to find elements by their ORIGINAL IDs → fails.
 * BrowserStack Self-Heal catches the broken selectors and fixes them.
 *
 * Run:  npm test
 */

const { Builder, By, until } = require('selenium-webdriver');

const PAGE_URL = 'http://127.0.0.1:5500/'; // OR https://bstack_self-heal.site.drasticcoder.in/
const WAIT = 10000;

describe('Sweet Crumbs Bakery', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(PAGE_URL);

    // Toggle Self-Heal → all IDs swap to -action- variants (breaks selectors below)
    const toggle = await driver.findElement(By.id('healCheck'));
    // await driver.executeScript('arguments[0].click();', toggle); //TODO: Uncomment this line to trigger self heal
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Click Explore Menu', async () => {
    const btn = await driver.wait(
      until.elementLocated(By.id('explore-menu-btn')),
      WAIT,
    );
    await btn.click();
  });

  test('Open Contact Us modal', async () => {
    const btn = await driver.wait(
      until.elementLocated(By.id('contact-us-btn')),
      WAIT,
    );
    await driver.executeScript(
      'arguments[0].scrollIntoView({block:"center"});',
      btn,
    );
    await driver.executeScript('arguments[0].click();', btn);
    const form = await driver.wait(
      until.elementLocated(By.id('contact-form')),
      WAIT,
    );
    await driver.wait(until.elementIsVisible(form), WAIT);
  });

  test('Fill and submit contact form', async () => {
    const nameInput = await driver.wait(
      until.elementLocated(By.css('.contact-name-input')),
      WAIT,
    );
    await driver.wait(until.elementIsVisible(nameInput), WAIT);
    await driver.wait(until.elementIsEnabled(nameInput), WAIT);
    await nameInput.sendKeys('BrowserStack Demo');
    await driver
      .findElement(By.css('.contact-email-input'))
      .sendKeys('demo@browserstack.com');
    await driver
      .findElement(By.css('.contact-message-input'))
      .sendKeys('Testing self-heal!');
    await driver.findElement(By.id('send-message-btn')).click();
    const toast = await driver.wait(until.elementLocated(By.id('toast')), WAIT);
    await driver.wait(until.elementIsVisible(toast), WAIT);
    const text = await toast.getText();
    expect(text).toContain('Message sent');
  });
});
