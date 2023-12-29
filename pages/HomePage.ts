import { Page, Locator } from 'playwright';

export class HomePage {
  private page: Page;
  private categoryLocators: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.categoryLocators = {
      'Elements': this.page.locator(':text("Elements")'),
      'Forms': this.page.locator(':text("Forms")'),
      'Alerts, Frame & Windows': this.page.locator(':text("Alerts, Frame & Windows")'),
      'Widgets': this.page.locator(':text("Widgets")'),
      'Interactions': this.page.locator(':text("Interactions")'),
      'Book Store Application': this.page.locator(':text("Book Store Application")'),
    };
  }

  async goToHomePage() {
    await this.page.goto('/');
  }

  async isCategoryVisible(category: string) {
    const locator = this.categoryLocators[category];
    return await locator.isVisible();
  }
}