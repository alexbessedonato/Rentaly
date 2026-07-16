import { FinancialsCardSet } from "@/features/financials/components/FinancialsCardSet";
import { useFinancialsQuery } from "@/features/financials/hooks/queries";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { useManagersQuery } from "@/features/managers/hooks/queries";
import { PropertiesList } from "@/features/properties/components/PropertiesList";
import { usePropertiesQuery } from "@/features/properties/hooks/queries";
import { TenantsList } from "@/features/tenants/components/TenantsList";
import { useTenantsQuery } from "@/features/tenants/hooks/queries";
import { DashboardSkeleton } from "@/pages/dashboard/DashboardSkeleton";

export const Dashboard = () => {

  const properties = usePropertiesQuery()
  const managers = useManagersQuery();
  const tenants = useTenantsQuery();
  const financials = useFinancialsQuery();

  if (
    properties.isPending || 
    managers.isPending || 
    tenants.isPending || 
    financials.isPending
  ) return <DashboardSkeleton />

  return (
    <section className="flex flex-col gap-8">
      <PropertiesList />
      <FinancialsCardSet />
      <ManagersList />
      <TenantsList />
    </section>
  );
};

