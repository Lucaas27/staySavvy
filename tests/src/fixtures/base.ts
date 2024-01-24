import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const test = baseTest.extend<{ HomePage: HomePage; LoginPage: LoginPage; RegisterPage: RegisterPage }>({
  HomePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  LoginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  RegisterPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});
