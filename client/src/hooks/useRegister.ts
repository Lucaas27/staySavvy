import { useMutation, useQueryClient } from "react-query";
import IRegistrationForm from "../interfaces/IRegistrationForm";
import * as AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";

export function useRegister() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(AuthService.Register, {
    onSuccess: async () => {
      showToast({ message: "Registration successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },
    onError(error: Error) {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const signUpMutation = (formData: IRegistrationForm) =>
    mutation.mutate(formData);

  const isLoading = mutation.isLoading;
  return { signUpMutation, isLoading };
}
