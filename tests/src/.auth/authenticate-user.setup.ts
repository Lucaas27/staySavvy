import { expect } from "@playwright/test";
import { test as setup } from "../fixtures/base";

setup.describe("Authenticate user", () => {
  setup("As a user I am able to login", async ({ LoginPage }) => {
    await setup.step("Go to staySavvy website", async () => {
      await LoginPage.navigate(`${process.env.CLIENT_URL}`);
    });

    await setup.step("Click the login link", async () => {
      await LoginPage.gotoLoginPage();
    });

    await setup.step("Check for existing valid token", async () => {
      await LoginPage.checkForExistingToken();
    });

    await setup.step("Input valid credentials", async () => {
      await LoginPage.login(process.env.EMAIL as string, process.env.PASSWORD as string);
    });

    await setup.step("Save auth token", async () => {
      await LoginPage.saveAuthToken();
    });
  });
});
