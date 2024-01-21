import { useMutation, useQueryClient } from "react-query";
import * as AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";

export function useLogout() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(AuthService.Logout, {
    onSuccess: async () => {
      showToast({ message: "Signed out!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError(error: Error) {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const logoutMutation = () => mutation.mutate();

  const isLoading = mutation.isLoading;

  return { logoutMutation, isLoading };
}
