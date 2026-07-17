import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { loginWithEmail, logout, resetPassword, signUpWithEmail, updatePassword } from "../api/auth";
import type {
  LoginFormValues,
  PasswordResetFormValues,
  SignUpFormValues,
} from "../types";

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

export const usePasswordResetMutation = () => {
  return useMutation({
    mutationFn: (values: PasswordResetFormValues) => resetPassword(values),
    onSuccess: () => {
      toast.success("Password reset email sent, check your inbox")
    },
    onError: (error: unknown) => {
      toast.error("Error al resetear contraseña", {
        description: getErrorMessage(error)
      })
    }
  })
}

export const usePasswordUpdateMutation = () => {
  return useMutation({
    mutationFn: (values: string) => updatePassword(values),
    onSuccess: () => {
      toast.success("contraseña actualizada con exito")
    },
    onError: (error: unknown)=> {
      toast.error("Error al resetear contraseña", {
        description: getErrorMessage(error)
      })
    }
  })
}
