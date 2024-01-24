import { Locator, Page, expect } from "@playwright/test";
import { PageHelpers } from "../utils/page-helpers";
import { faker } from "@faker-js/faker/locale/en";
import { UserModel } from "../../db-connection/MongoClient";

export class RegisterPage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly registerBtn: Locator;
  private registeredUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  private readonly toastMessage: Locator;
  private readonly pageHelpers: PageHelpers;

  constructor(private readonly page: Page) {
    this.firstName = this.page.getByTestId("first-name-input");
    this.lastName = this.page.getByTestId("last-name-input");
    this.email = this.page.getByTestId("email-input");
    this.password = this.page.getByTestId("password-input");
    this.confirmPassword = this.page.getByTestId("confirm-password-input");
    this.registerBtn = this.page.getByTestId("register-form-btn");
    this.registeredUser = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.toastMessage = this.page.getByTestId("toast-component-message");
    this.pageHelpers = new PageHelpers(this.page);
  }

  async register() {
    this.registeredUser.firstName = faker.person.firstName();
    this.registeredUser.lastName = faker.person.lastName();
    this.registeredUser.email = faker.internet.email({
      firstName: this.registeredUser.firstName,
      lastName: this.registeredUser.lastName,
      provider: "testing.com",
    });
    this.registeredUser.password = faker.internet.password();

    const { firstName, lastName, email, password } = this.registeredUser;

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.registerBtn.click();
    await this.pageHelpers.waitForPageLoad();
  }

  async assertUserIsRegistered() {
    const { email } = this.registeredUser;

    await this.toastMessage.waitFor();
    await expect(this.toastMessage).toContainText("Registration successful");
    expect(await UserModel.find({ email })).toHaveLength(1);
  }

  async getRegisteredUserData() {
    return this.registeredUser;
  }
}
