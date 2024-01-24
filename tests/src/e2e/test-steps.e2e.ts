import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { UserModel } from "../../db-connection/MongoClient";

let registeredUser: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

test.describe("End-to-End Tests", () => {
  test("As a user I am able to register", async ({ HomePage, RegisterPage }) => {
    await test.step("Go to staySavvy website", async () => {
      await HomePage.navigateTo(`${process.env.CLIENT_URL}`);
    });

    await test.step("Click the register link", async () => {
      await HomePage.goToRegisterPage();
    });

    await test.step("Fill the form and click register", async () => {
      await RegisterPage.register();
    });

    await test.step("Assert user is registered", async () => {
      await RegisterPage.assertUserIsRegistered();
      registeredUser = await RegisterPage.getRegisteredUserData();
    });
  });

  //   test.use({ storageState: "src/.auth/auth_token.json" });
  test("As a user I am able to login", async ({ LoginPage, HomePage }) => {
    await test.step("Check for existing valid token", async () => {
      await LoginPage.checkForExistingToken();
    });

    await test.step("Go to login page", async () => {
      await HomePage.goToLoginPage();
    });

    await test.step("Input valid credentials and login", async () => {
      await LoginPage.login("testaccount@gmail.com", "password");
    });

    await test.step("Assert user is logged in", async () => {
      await LoginPage.assertLoggedInUserDetails();
    });

    await test.step("Save auth token", async () => {
      await LoginPage.saveAuthToken();
    });
  });
});
