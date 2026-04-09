import { Button } from "@/components/ui/button"
import { useAuthNavigation } from "../hooks/useAuthNavigation";

export function SignUpButton() {
    const { navigateToSignUp } = useAuthNavigation();

    return <Button variant="outline" onClick={navigateToSignUp}>Sign Up</Button>
}
