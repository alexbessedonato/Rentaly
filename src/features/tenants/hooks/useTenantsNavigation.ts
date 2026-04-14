import { useNavigate } from "@tanstack/react-router";

export const useTenantsNavigation = () => {
  const navigate = useNavigate();

  return {
    navigateToHome: () => navigate({ to: "/" }),
    navigateToAddTenant: () => navigate({ to: "/add-tenant" }),
  };
};
