import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { MainLayout } from "../components/layout/MainLayout";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { AddManagerPage } from "@/features/managers/pages/AddManagerPage";
import { AddPropertyPage } from "@/features/properties/pages/AddPropertyPage";
import { AddTenantPage } from "@/features/tenants/pages/AddTenantPage";

export const rootRoute = createRootRoute({
  component: MainLayout,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

export const addManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-manager",
  component: AddManagerPage,
});

export const addPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-property",
  component: AddPropertyPage,
});

export const addTenantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-tenant",
  component: AddTenantPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signUpRoute,
  addManagerRoute,
  addPropertyRoute,
  addTenantRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
