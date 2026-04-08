import { Outlet } from '@tanstack/react-router';
import { NavigationBar } from './NavigationBar';
import { Toaster } from '../ui/sonner';


export const MainLayout = () => {
    return (
        <div>
            <Toaster richColors position='bottom-center' />
            <header>
                <NavigationBar />
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}