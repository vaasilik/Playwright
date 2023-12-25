import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Check if categories are displayed', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();

  const expectedCategories = [
    'Elements',
    'Forms',
    'Alerts, Frame & Windows',
    'Widgets',
    'Interactions',
    'Book Store Application'
  ];

  for (const category of expectedCategories) {
    expect(await homePage.isCategoryVisible(category)).toBeTruthy();
  }
});