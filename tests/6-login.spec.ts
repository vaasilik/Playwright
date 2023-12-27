import { test, expect } from 'playwright/test';
import { LoginPage } from '../pages/loginPage';
import { config } from '../config/config';

test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await page.goto(config.baseUrl);
  await loginPage.enterUserName(config.userName);
  await loginPage.enterPassword(config.password);


  await loginPage.clickLoginButtonWithNavigation();

  const profilePageUrl = 'https://demoqa.com/profile';
  await page.waitForURL(profilePageUrl);
  expect(page.url()).toBe(profilePageUrl);
});
