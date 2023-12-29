import { Page, Locator } from 'playwright';

export class ButtonsPage {
  private page: Page;
  private clickMeMessage: Locator;
  private doubleClickMessage: Locator;
  private rightClickMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clickMeMessage = this.page.locator(`#dynamicClickMessage`);
    this.doubleClickMessage = this.page.locator(`#doubleClickMessage`);
    this.rightClickMessage = this.page.locator(`#rightClickMessage`);
  }

  async goToButtonsPage() {
    await this.page.goto('/buttons');
  }

  async isClickMeMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#dynamicClickMessage:has-text("${expectedMessage}")`);
    return this.clickMeMessage.isVisible();
  }

  async doubleClickButton(buttonText: string) {
    const button = await this.page.locator(`button:has-text("${buttonText}")`);
    await button.dblclick();
  }

  async isDoubleClickMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#doubleClickMessage:has-text("${expectedMessage}")`);
    return this.doubleClickMessage.isVisible();
  }

  async rightClickButton(buttonText: string) {
    const button = await this.page.locator(`button:has-text("${buttonText}")`);
    await button.click({ button: 'right' });
  }

  async isRightClickMessageVisible(expectedMessage: string) {
    await this.page.waitForSelector(`#rightClickMessage:has-text("${expectedMessage}")`);
    return this.rightClickMessage.isVisible();
  }
}