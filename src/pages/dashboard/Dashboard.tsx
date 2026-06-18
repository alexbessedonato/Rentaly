import { FinancialsCardSet } from "@/features/financials/components/FinancialsCardSet";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { PropertiesList } from "@/features/properties/components/PropertiesList";
import { TenantsList } from "@/features/tenants/components/TenantsList";
import { $auth } from "@/features/auth/store/authStore";
import { useStore } from "@nanostores/react";
import { LandingPage } from "@/pages/landing/LandingPage";
import { LandingPageSkeleton } from "@/pages/landing/LandingPageSkeleton";

export const Dashboard = () => {
  const auth = useStore($auth);

  if (auth.status === "loading") {
    return <LandingPageSkeleton />;
  }

  if (auth.status !== "authenticated") {
    return <LandingPage />;
  }

  return (
    <section className="flex flex-col gap-8">
      <PropertiesList />
      <FinancialsCardSet />
      <ManagersList />
      <TenantsList />
    </section>
  );
};
