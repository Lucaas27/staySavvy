import { useMutation, useQueryClient } from "react-query";
import ILoginForm from "../interfaces/ILoginForm";
import * as AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";

export function useLogin() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(AuthService.Login, {
    onSuccess: async () => {
      showToast({ message: "Login successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError(error: Error) {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const loginMutation = (formData: ILoginForm) => mutation.mutate(formData);

  const isLoading = mutation.isLoading;

  return { loginMutation, isLoading };
}
