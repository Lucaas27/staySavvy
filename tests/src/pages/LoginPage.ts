import { Locator, Page, expect } from "@playwright/test";
import { PageHelpers } from "../utils/page-helpers";
import * as fs from "fs";

export class LoginPage {
  private readonly passwordInput: Locator;
  private readonly emailInput: Locator;
  private readonly loginBtn: Locator;
  private readonly logoutBtn: Locator;
  private readonly navBookingsLink: Locator;
  private readonly navHotelsLink: Locator;
  private readonly toastMessage: Locator;
  private readonly pageHelpers: PageHelpers;

  constructor(private readonly page: Page) {
    this.emailInput = this.page.locator("[name=email]");
    this.passwordInput = this.page.locator("[name=password]");
    this.loginBtn = this.page.getByTestId("login-form-btn");
    this.logoutBtn = this.page.getByTestId("logout-btn");
    this.navBookingsLink = this.page.getByTestId("nav-my-bookings-link");
    this.navHotelsLink = this.page.getByTestId("nav-my-hotels-link");
    this.toastMessage = this.page.getByTestId("toast-component-message");
    this.pageHelpers = new PageHelpers(this.page);
  }

  async checkForExistingToken() {
    const stats = fs.existsSync("src/.auth/auth_token.json") && fs.statSync("src/.auth/auth_token.json");

    if (stats && stats.mtimeMs > new Date().getTime() - 300000 /* 5 min */) {
      console.log("Login skipped because token was generated within the last hour");
      return;
    }
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await this.pageHelpers.waitForPageLoad();
  }

  async saveAuthToken() {
    await this.toastMessage.waitFor();
    await this.page.context().storageState({ path: "src/.auth/auth_token.json" });
  }

  async assertLoggedInUserDetails() {
    await this.toastMessage.waitFor();
    await expect(this.toastMessage).toContainText("Login successful");
    await expect(this.logoutBtn).toContainText("Logout");
    await expect(this.navHotelsLink).toBeVisible();
    await expect(this.navBookingsLink).toBeVisible();
  }
}
