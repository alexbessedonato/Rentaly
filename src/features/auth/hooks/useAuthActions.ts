import { useNavigate } from "@tanstack/react-router"
import { loginWithEmail, logout, signUpWithEmail } from "../api/authService" 
import type { LoginFormValues, SignUpFormValues } from "../types"
import { toast } from "sonner";

export const useAuthActions = () => {
    const navigate = useNavigate()

    const goToLogin = () => navigate({ to: '/login' })
    const goToSignUp = () => navigate({ to: '/signup' })
    const closeAuthModal = () => navigate({ to: '/' })

    const executeLogin = async (values: LoginFormValues) => {
        try {
            await loginWithEmail(values)
            toast.success("Logged in successfully")
            closeAuthModal() 
        } catch (error: any) {
            toast.error("Error al iniciar sesión", { description: error.message })
            throw error 
        }
    }

    const executeSignUp = async (values: SignUpFormValues) => {
        try {
            await signUpWithEmail(values)
            toast.success("Account created successfully.") 
            closeAuthModal() 
        } catch (error: any) {
            toast.error("Error al crear cuenta", { description: error.message })
            throw error 
        }
    }

    const executeLogout = async () => {
        try {
            await logout()
            toast.success("Logged out successfully")
            closeAuthModal()
        } catch (error: any) {
            toast.error("Error al cerrar sesión", { description: error.message })
            throw error
        }
    }

    return {
        goToLogin,
        goToSignUp,
        closeAuthModal,
        executeLogin,
        executeSignUp,
        executeLogout,
    }
};