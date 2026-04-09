import { useNavigate } from "@tanstack/react-router";

export const usePropertiesNavigation = () => {
  const navigate = useNavigate();

  return {
    navigateToHome: () => navigate({ to: "/" }),
    navigateToAddProperty: () => navigate({ to: "/add-property" }),
  };
};
