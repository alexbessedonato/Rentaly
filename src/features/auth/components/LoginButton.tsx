import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="bg-blue-950 text-white"
      onClick={() => navigate({ to: "/login" })}
    >
      Login
    </Button>
  );
}
