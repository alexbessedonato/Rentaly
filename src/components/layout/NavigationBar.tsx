import { Logo } from "./Logo";
import { Searchbar } from "./Searchbar";
import { AuthMenu } from "./AuthMenu";

export const NavigationBar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white px-3 sm:px-4 md:px-6">
            <div className="grid h-16 w-full grid-cols-[1fr_minmax(160px,480px)_1fr] items-center gap-3 sm:gap-4 md:gap-6">
                <div className="justify-self-start">
                    <Logo />
                </div>

                <div className="w-full justify-self-center">
                    <Searchbar />
                </div>

                <div className="justify-self-end">
                    <AuthMenu />
                </div>

            </div>
        </header>
    )
}