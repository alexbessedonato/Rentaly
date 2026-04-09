import { useNavigate } from '@tanstack/react-router';

export const useAuthNavigation = () => {
    const navigate = useNavigate()

   return {
        navigateToLogin: () => navigate({ to: '/login' }),
        navigateToSignUp: () => navigate({ to: '/signup' }),
        navigateToHome: () => navigate({ to: '/' }),
    }
}