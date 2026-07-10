import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "../hooks/mutations";
import { useNavigate } from "@tanstack/react-router";

export function LogoutButton() {
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  const navigateToLanding = () => navigate({ to: "/", replace: true });
  return (
    <Button
      variant="outline"
      className="bg-blue-950 text-white"
      onClick={() => {
        logout
        .mutateAsync()
        .then(navigateToLanding)
        .catch(()=>{})
        
      }}
      disabled={logout.isPending}
    >
      {logout.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
