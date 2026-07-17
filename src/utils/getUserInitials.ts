import type { AuthState } from "@/features/auth/types"

export const getUserInitials = (auth: AuthState): string => {
    const username = auth.user?.user_metadata.full_name?.trim().split(/\s+/)
    const email = auth.user?.user_metadata?.email?.trim()
    if (username && username.length >= 2) {
        const first_letter = username[0][0]
        const second_letter = username[1][0]
        return (first_letter + second_letter).toUpperCase()
    }

    if (email && email.length >= 1) {
        return email[0].toUpperCase()
    }

    return "?"

}