import { test, expect } from "playwright/test";

test('Click on button and verify message', async ({ page }) => {
  await page.goto('/buttons');

  const buttonText = 'Click Me';
  const expectedMessage = 'You have done a dynamic click';
  const button = await page.getByRole('button', { name: buttonText, exact: true });

  await expect(button).toBeVisible();
  await button.click();
  await page.waitForSelector(`#dynamicClickMessage:has-text("${expectedMessage}")`);
  await expect(page.locator(`#dynamicClickMessage:has-text("${expectedMessage}")`)).toBeVisible();
});