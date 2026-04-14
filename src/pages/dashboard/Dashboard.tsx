import { FinancialCardSet } from "@/features/financials/components/FinancialsCardSet";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { PropertyList } from "@/features/properties/components/PropertyList";
import { TenantsList } from "@/features/tenants/components/TenantsList";

export const Dashboard = () => {
  return (
    <section className="flex flex-col gap-8">
      <PropertyList />
      <FinancialCardSet />
      <ManagersList />
      <TenantsList />
    </section>
  );
};
