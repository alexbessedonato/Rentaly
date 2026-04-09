import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from '../components/layout/MainLayout';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { Login } from '@/pages/login/Login';
import { SignUp } from '@/pages/signUp/SignUp';
import { AddManager } from '@/pages/addManager/addManager';
import { AddProperty } from '@/pages/addProperty/addProperty';

export const rootRoute = createRootRoute({
    component: MainLayout,
})

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login,
});

export const signUpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/signup",
    component: SignUp,
});

export const addManagerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/add-manager",
    component: AddManager,
});

export const addPropertyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/add-property",
    component: AddProperty,
});

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, signUpRoute, addManagerRoute, addPropertyRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
