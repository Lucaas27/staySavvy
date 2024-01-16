import IRegistrationForm from "../../interfaces/IRegistrationForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: IRegistrationForm) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await res.json();

  if (!res.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Token invalid");
  }

  return res.json();
};
