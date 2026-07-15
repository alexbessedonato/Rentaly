import { Logo } from "./Logo";
import { AuthMenu } from "./AuthMenu";

export const NavigationBar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white px-3 sm:px-4 md:px-6">
            <div className="flex h-16 w-full items-center gap-3 sm:gap-4 md:gap-6">
                <div className="flex flex-1 justify-start">
                    <Logo />
                </div>

                {/* //TODO: Add searchbar for authenticated users */}
              

                <div className="flex flex-1 justify-end">
                    <AuthMenu />
                </div>
            </div>
        </header>
    )
}