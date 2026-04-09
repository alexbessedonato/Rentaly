import { Button } from "@/components/ui/button"
import { useAuthNavigation } from "../hooks/useAuthNavigation"

export function LoginButton() {
    const { navigateToLogin } = useAuthNavigation()
    return <Button variant="outline" onClick={navigateToLogin}>Login</Button>
}
