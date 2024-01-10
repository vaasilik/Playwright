import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage';

test('Double click on button and verify message', async ({ page }) => {
  const doubleClickPage = new ButtonsPage(page);
  await doubleClickPage.goToButtonsPage();

  const buttonText = 'Double Click Me';
  const expectedMessage = 'You have done a double click';

  await doubleClickPage.doubleClickButton(buttonText);
  const isMessageVisible = await doubleClickPage.isDoubleClickMessageVisible(expectedMessage);

  expect(isMessageVisible).toBeTruthy();
});
