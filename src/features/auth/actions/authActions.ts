import { getErrorMessage } from "@/utils/getErrorMessage";
import { loginWithEmail, signUpWithEmail, logout } from "../api/authService"
import type { LoginFormValues, SignUpFormValues } from "../types"
import { toast } from "sonner";

export const loginAction = async (values: LoginFormValues) => {
    try {
        await loginWithEmail(values);
        toast.success("Logged in successfully");
    } catch (error: unknown) {
        toast.error("Error al iniciar sesión", { description: getErrorMessage(error) });
        throw error;
    }
};

export const signUpAction = async (values: SignUpFormValues) => {
    try {
        await signUpWithEmail(values);
        toast.success("Account created successfully.");
    } catch (error: unknown) {
        toast.error("Error al crear cuenta", { description: getErrorMessage(error) });
        throw error;
    }
};

export const logoutAction = async () => {
    try {
        await logout();
        toast.success("Logged out successfully");
    } catch (error: unknown) {
        toast.error("Error al cerrar sesión", { description: getErrorMessage(error) });
        throw error;
    }
};