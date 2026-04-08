import { Button } from "@/components/ui/button"
import { useAuthActions } from "../hooks/useAuthActions"

export function LogoutButton() {
    const { executeLogout } = useAuthActions()
    return <Button variant="outline" onClick={executeLogout}>Logout</Button>
}
