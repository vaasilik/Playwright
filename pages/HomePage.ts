import { Page } from 'playwright';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToHomePage() {
    await this.page.goto('/');
  }

  async isCategoryVisible(category: string) {
    const locator = this.page.locator(`:text("${category}")`);
    return await locator.isVisible();
  }
}