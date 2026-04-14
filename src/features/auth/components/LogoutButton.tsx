import { Button } from "@/components/ui/button"
import { logoutAction } from "../actions/authActions"

export function LogoutButton() {
    return <Button variant="outline" className="bg-blue-950 text-white" onClick={logoutAction}>Logout</Button>
}
