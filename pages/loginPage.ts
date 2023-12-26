import { Page, Locator } from 'playwright';

export class LoginPage {
  private page: Page;
  private userNameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = this.page.locator('#userName');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#login');
  }

  async enterUserName(userName: string) {
    await this.userNameInput.type(userName);
  }

  async enterPassword(password: string) {
    await this.passwordInput.type(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
  
  async clickLoginButtonWithNavigation() {
    await this.loginButton.click();
    await this.page.waitForNavigation();
  }
}
