import { Button } from "@/components/ui/button"
import { useAuthActions } from "../hooks/useAuthActions"

export function LoginButton() {
    const { goToLogin } = useAuthActions()
    return <Button variant="outline" onClick={goToLogin}>Login</Button>
}
