import { Locator, Page, expect } from "@playwright/test";
import { PageHelpers } from "../utils/page-helpers";
import * as fs from "fs";

export class LoginPage {
  private readonly passwordInput: Locator;
  private readonly emailInput: Locator;
  private readonly loginBtn: Locator;
  private readonly loginNavLink: Locator;
  private readonly logoutBtn: Locator;
  private readonly toastMessage: Locator;
  private readonly pageHelpers: PageHelpers;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.locator("[name=email]");
    this.passwordInput = this.page.locator("[name=password]");
    this.loginBtn = this.page.getByTestId("login-form-btn");
    this.loginNavLink = this.page.getByTestId("nav-login-link");
    this.logoutBtn = this.page.getByTestId("logout-btn");
    this.toastMessage = this.page.getByTestId("toast-component-message");
    this.pageHelpers = new PageHelpers(this.page);
  }

  async navigate(web_url: string) {
    await this.page.goto(web_url);
    await this.pageHelpers.waitForPageLoad();
  }
  async gotoLoginPage() {
    await this.loginNavLink.click();
    await this.pageHelpers.waitForPageLoad();
  }

  async checkForExistingToken() {
    const stats = fs.existsSync("src/.auth/auth_token.json") && fs.statSync("src/.auth/auth_token.json");

    if (stats && stats.mtimeMs > new Date().getTime() - 3600000 /* 1 hour */) {
      console.log("Login skipped because token was generated within the last hour");
      return;
    }
  }

  async login(email: string, password: string) {
    // await expect.soft(this.lblLoginFrom).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await this.pageHelpers.waitForPageLoad();
  }

  async saveAuthToken() {
    await this.toastMessage.waitFor();
    await expect(this.toastMessage).toContainText("successful");
    await this.page.context().storageState({ path: "src/.auth/auth_token.json" });
  }

  async assertLoggedInUserDetails(userDetails: string = process.env.EMAIL as string) {
    await expect(this.emailInput).toContainText(userDetails);
    await expect(this.logoutBtn).toContainText("Logout");
  }
}