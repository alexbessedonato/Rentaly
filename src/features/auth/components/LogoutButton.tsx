import { Button } from "@/components/ui/button"
import { logoutAction } from "../actions/authActions"

export function LogoutButton() {
    return <Button variant="outline" onClick={logoutAction}>Logout</Button>
}
