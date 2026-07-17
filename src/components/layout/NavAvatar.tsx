import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { $auth } from "@/features/auth/store/authStore"
import { getUserInitials } from "@/utils/getUserInitials"
import { useStore } from "@nanostores/react"

export function NavAvatar() {
    const auth = useStore($auth)
    const initials = getUserInitials(auth)
    return (
        <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}
