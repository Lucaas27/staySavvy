import IRegistrationForm from "../interfaces/IRegistrationForm";
import ILoginForm from "../interfaces/ILoginForm";
import { useFetch } from "../hooks/useFetch";

export const Register = async (formData: IRegistrationForm) => {
  try {
    const { body } = await useFetch(`/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return body;
  } catch (error) {
    console.error("Registration failed:", (error as Error).message);
    throw error;
  }
};

export const Login = async (formData: ILoginForm) => {
  try {
    const { body } = await useFetch(`/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return body;
  } catch (error) {
    console.error("Login failed:", (error as Error).message);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const { body } = await useFetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return body;
  } catch (error) {
    console.error("Login failed:", (error as Error).message);
    throw error;
  }
};

export const ValidateToken = async (): Promise<boolean> => {
  try {
    const { body } = await useFetch(
      `/api/auth/authorize`,
      {
        credentials: "include",
      },
      "Unauthorized",
    );

    return body.isLoggedIn;
  } catch (error) {
    console.error("Validation failed:", (error as Error).message);
    throw error;
  }
};
