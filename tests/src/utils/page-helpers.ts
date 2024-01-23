import { Frame, Page } from "@playwright/test";

export class PageHelpers {
  constructor(private readonly page: Page) {}

  async getTabBy(number: number) {
    return this.page.context().pages()[number];
  }

  async reloadTab(number: number) {
    let tabPage = await this.getTabBy(number);

    await tabPage.bringToFront();
    await tabPage.reload();
    await tabPage.waitForLoadState("networkidle");

    return tabPage;
  }

  async waitForPageLoad(withExplicitWait: boolean = false) {
    withExplicitWait && (await this.page.waitForTimeout(5000));

    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("load");
    await this.page.waitForLoadState("networkidle");
  }

  async selectDropDownItem(page: Page, selector: string, index: number = 1) {
    await page.locator(selector).selectOption({ index: index });
  }
}
