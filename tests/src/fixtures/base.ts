import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

export const test = baseTest.extend<{ HomePage: HomePage; LoginPage: LoginPage }>({
  HomePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  LoginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
