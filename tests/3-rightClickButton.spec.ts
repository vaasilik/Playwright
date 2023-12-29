import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage';

test('Right click on button and verify message', async ({ page }) => {
  const rightClickPage = new ButtonsPage(page);
  await rightClickPage.goToButtonsPage();

  const buttonText = 'Right Click Me';
  const expectedMessage = 'You have done a right click';

  await rightClickPage.rightClickButton(buttonText);
  
  const isMessageVisible = await rightClickPage.isRightClickMessageVisible(expectedMessage);
  expect(isMessageVisible).toBeTruthy();
});
