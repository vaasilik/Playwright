import { test, expect } from "playwright/test";

test('Right click on button and verify message', async ({ page }) => {

  await page.goto('/buttons');

  const buttonText = 'Right Click Me';
  const expectedMessage = 'You have done a right click';
  const button = await page.locator(`button:has-text("${buttonText}")`);

  await button.click({ button: 'right' });
  await page.waitForSelector(`#rightClickMessage:has-text("${expectedMessage}")`);
  await expect(page.locator(`#rightClickMessage:has-text("${expectedMessage}")`)).toBeVisible();
});
