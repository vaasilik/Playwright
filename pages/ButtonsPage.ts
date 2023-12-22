import { Page } from 'playwright';

export class ButtonsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToButtonsPage() {
    await this.page.goto('/buttons');
  }

  async isClickMeMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#dynamicClickMessage:has-text("${expectedMessage}")`);
    const locator = this.page.locator(`#dynamicClickMessage:has-text("${expectedMessage}")`);
    return await locator.isVisible();
  }

  async doubleClickPage(buttonText: string) {
    const button = await this.page.locator(`button:has-text("${buttonText}")`);
    await button.dblclick();
  }

  async isDoubleClickMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#doubleClickMessage:has-text("${expectedMessage}")`);
    const locator = this.page.locator(`#doubleClickMessage:has-text("${expectedMessage}")`);
    return await locator.isVisible();
  }

  async rightClickPage(buttonText: string) {
    const button = await this.page.locator(`button:has-text("${buttonText}")`);
    await button.click({ button: 'right' });
  }

  async isRightClickMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#rightClickMessage:has-text("${expectedMessage}")`);
    const locator = this.page.locator(`#rightClickMessage:has-text("${expectedMessage}")`);
    return await locator.isVisible();
  }
}
