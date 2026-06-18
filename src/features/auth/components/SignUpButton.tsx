import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SignUpButton() {
  const navigate = useNavigate();

  return (
    <Button variant="outline" onClick={() => navigate({ to: "/signup" })}>
      Sign Up
    </Button>
  );
}
