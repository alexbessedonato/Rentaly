import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "../hooks/mutations";

export function LogoutButton() {
  const logout = useLogoutMutation();

  return (
    <Button
      variant="outline"
      className="bg-blue-950 text-white"
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
    >
      {logout.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
