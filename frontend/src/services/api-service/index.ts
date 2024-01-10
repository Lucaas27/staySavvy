import ISignInForm from "../../interfaces/ISignInForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: ISignInForm) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
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
