import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { loginWithEmail, logout, signUpWithEmail } from "../api/auth";
import type { LoginFormValues, SignUpFormValues } from "../types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (values: LoginFormValues) => loginWithEmail(values),
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error: unknown) => {
      toast.error("Error al iniciar sesión", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (values: SignUpFormValues) => signUpWithEmail(values),
    onSuccess: () => {
      toast.success("Account created successfully.");
    },
    onError: (error: unknown) => {
      toast.error("Error al crear cuenta", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully");
    },
    onError: (error: unknown) => {
      toast.error("Error al cerrar sesión", {
        description: getErrorMessage(error),
      });
    },
  });
};
