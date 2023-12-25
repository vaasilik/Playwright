import { test, expect } from "playwright/test";
import { ButtonsPage } from "../pages/ButtonsPage";

test('Click on button and verify message', async ({ page }) => {
  const clickMePage = new ButtonsPage(page);
  await clickMePage.goToButtonsPage();

  const buttonText = 'Click Me';
  const expectedMessage = 'You have done a dynamic click';

  const button = await page.getByRole('button', { name: buttonText, exact: true });
  await expect(button).toBeVisible();
  await button.click();

  const isMessageVisible = await clickMePage.isClickMeMessageVisible(expectedMessage);
  expect(isMessageVisible).toBeTruthy();
});