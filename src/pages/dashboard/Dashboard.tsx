import { FinancialsCardSet } from "@/features/financials/components/FinancialsCardSet";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { PropertiesList } from "@/features/properties/components/PropertiesList";
import { TenantsList } from "@/features/tenants/components/TenantsList";
import { useStore } from "@nanostores/react"; 
import { $auth } from "@/features/auth/store/authStore";

export const Dashboard = () => {

  const auth = useStore($auth);
  if (auth.status !== "authenticated") return null;
  
  return (
    <section className="flex flex-col gap-8">
      <PropertiesList />
      <FinancialsCardSet />
      <ManagersList />
      <TenantsList />
    </section>
  );
};
