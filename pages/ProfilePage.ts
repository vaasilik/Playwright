import { Page, Locator } from 'playwright';

export class ProfilePage {
  private page: Page;
  private bookLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bookLinkLocator = this.page.locator('a[href="/profile?book=9781449325862"]');
  }

  async goToProfilePage() {
    await this.page.goto('/profile');
  }

  async isBookVisible() {
    return await this.bookLinkLocator.isVisible();
  }
}