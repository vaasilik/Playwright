import { expect, test } from "playwright/test";

test('Check if categories are displayed', async ({ page }) => {
  await page.goto('/');
  
  const expectedCategories = [
    'Elements',
    'Forms',
    'Alerts, Frame & Windows',
    'Widgets',
    'Interactions',
    'Book Store Application'
  ];

  for (const category of expectedCategories) {
    const locator = page.locator(`:text("${category}")`);
    expect(await locator.isVisible()).toBeTruthy();
  }
});