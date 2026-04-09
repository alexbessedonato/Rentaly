import { useNavigate } from '@tanstack/react-router';

export const useManagersNavigation = () => {
    const navigate = useNavigate()

   return {
       navigateToHome: () => navigate({ to: "/" }),
       navigateToAddManager: () => navigate({ to: "/add-manager" }),
    }
}