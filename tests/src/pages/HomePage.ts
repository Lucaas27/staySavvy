import { Locator, Page } from "@playwright/test";
import { PageHelpers } from "../utils/page-helpers";
import { faker } from "@faker-js/faker/locale/en";

export class HomePage {
  private readonly brand: Locator;
  private readonly navRegisterLink: Locator;
  private readonly heroTitle: Locator;
  private readonly heroCallToAction: Locator;
  private readonly navLoginLink: Locator;
  private readonly pageHelpers: PageHelpers;

  constructor(private readonly page: Page) {
    this.brand = this.page.locator("#brand");
    this.navRegisterLink = this.page.getByTestId("nav-register-link");
    this.navLoginLink = this.page.getByTestId("nav-login-link");
    this.heroTitle = this.page.getByTestId("hero-title");
    this.heroCallToAction = this.page.getByTestId("hero-call2Action");
    this.pageHelpers = new PageHelpers(this.page);
  }

  async navigateTo(web_url: string) {
    await this.page.goto(web_url);
    await this.pageHelpers.waitForPageLoad();
  }
  async goToLoginPage() {
    await this.page.goto(`${process.env.CLIENT_URL}/login`);
    await this.pageHelpers.waitForPageLoad();
  }

  async goToRegisterPage() {
    await this.navRegisterLink.click();
    await this.pageHelpers.waitForPageLoad();
  }
}
