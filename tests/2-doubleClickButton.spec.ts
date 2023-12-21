import { test, expect } from "playwright/test";

test('Double click on button and verify message', async ({ page }) => {

  await page.goto('/buttons');

  const buttonText = 'Double Click Me';
  const expectedMessage = 'You have done a double click';
  const button = await page.locator(`button:has-text("${buttonText}")`);

  await button.dblclick();
  await page.waitForSelector(`#doubleClickMessage:has-text("${expectedMessage}")`);
  await expect(page.locator(`#doubleClickMessage:has-text("${expectedMessage}")`)).toBeVisible();
});
