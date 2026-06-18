import { Logo } from "./Logo";
import { Searchbar } from "./Searchbar";
import { AuthMenu } from "./AuthMenu";
import { $auth } from "@/features/auth/store/authStore";
import { useStore } from "@nanostores/react";

export const NavigationBar = () => {
    const auth = useStore($auth);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white px-3 sm:px-4 md:px-6">
            <div className="flex h-16 w-full items-center gap-3 sm:gap-4 md:gap-6">
                <div className="flex flex-1 justify-start">
                    <Logo />
                </div>

                {auth.status === "authenticated" && (
                    <div className="w-full max-w-[480px] shrink">
                        <Searchbar />
                    </div>
                )}

                <div className="flex flex-1 justify-end">
                    <AuthMenu />
                </div>
            </div>
        </header>
    )
}