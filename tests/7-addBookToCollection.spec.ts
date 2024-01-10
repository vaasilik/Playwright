import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { BookStorePage } from '../pages/BookStorePage';
import { ProfilePage } from '../pages/ProfilePage';
import { config } from '../config/config';

test('Add Book To Collection Test And Verify It', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookStorePage = new BookStorePage(page);
  const profilePage = new ProfilePage(page);

  await page.goto(`${config.baseUrl}/login`);
  await loginPage.login(config.userName, config.password);

  await bookStorePage.goToBookStore();

  const bookTitle = 'Git Pocket Guide'; 
  await bookStorePage.selectBook(bookTitle);
  await bookStorePage.addBookToCollection();

  page.on('dialog', dialog => dialog.accept());
  await page.click('button:has-text("OK")');

  await page.goto(`${config.baseUrl}/profile`);

  const isBookAdded = await profilePage.isBookVisible();
  expect(isBookAdded).toBeTruthy();
});
