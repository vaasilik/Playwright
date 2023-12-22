// import { test, expect } from "playwright/test";

// test('Double click on button and verify message', async ({ page }) => {

//   await page.goto('/buttons');

//   const buttonText = 'Double Click Me';
//   const expectedMessage = 'You have done a double click';
//   const button = await page.locator(`button:has-text("${buttonText}")`);

//   await button.dblclick();
//   await page.waitForSelector(`#doubleClickMessage:has-text("${expectedMessage}")`);
//   await expect(page.locator(`#doubleClickMessage:has-text("${expectedMessage}")`)).toBeVisible();
// });

import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage';

test('Double click on button and verify message', async ({ page }) => {
  const doubleClickPage = new ButtonsPage(page);
  await doubleClickPage.goToButtonsPage();

  const buttonText = 'Double Click Me';
  const expectedMessage = 'You have done a double click';

  await doubleClickPage.doubleClickPage(buttonText);
  const isMessageVisible = await doubleClickPage.isDoubleClickMessageVisible(expectedMessage);

  expect(isMessageVisible).toBeTruthy();
});
