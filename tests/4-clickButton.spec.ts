import { test } from "playwright/test";

test('Click on button and verify message', async ({ page }) => {

  await page.goto('/buttons');

  const buttonText = 'Click Me';
  const expectedMessage = 'You have done a dynamic click';
  const button = await page.locator(`button:has-text("${buttonText}")`);

  await button.click();
  await page.waitForSelector(`#dynamicClickMessage:has-text("${expectedMessage}")`);
});
