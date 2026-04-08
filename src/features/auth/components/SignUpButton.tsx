import { Button } from "@/components/ui/button"
import { useAuthActions } from "../hooks/useAuthActions";

export function SignUpButton() {
    const { goToSignUp } = useAuthActions();

    return <Button variant="outline" onClick={goToSignUp}>Sign Up</Button>
}
