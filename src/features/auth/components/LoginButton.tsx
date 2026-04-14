import { Button } from "@/components/ui/button"
import { useAuthNavigation } from "../hooks/useAuthNavigation"

export function LoginButton() {
    const { navigateToLogin } = useAuthNavigation()
    return <Button variant="outline" className="bg-blue-950 text-white" onClick={navigateToLogin}>Login</Button>
}
