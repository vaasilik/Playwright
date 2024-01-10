import { test } from 'playwright/test';
import { oneBookPatch } from './testDataAPI/booksData';

test.describe.only(async () => {
    test.only("Abort request", async ({ page }) => {
        await page.route('/BookStore/v1/Books', route => route.abort());
        await page.goto('/books');
        await page.pause();
    });
});

test.only("Mocking response", async ({ page }) => {
    await page.route('/BookStore/v1/Books', route => {
        route.fulfill({
            status: 200,
            contentType: 'application.json', 
            body: JSON.stringify(oneBookPatch),
        });
    });

    await page.goto('/books');
    await page.pause();
});