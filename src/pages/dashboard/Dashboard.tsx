import { FinancialCardSet } from "@/features/financials/components/FinancialsCardSet";
import { ManagersList } from "@/features/managers/components/ManagersList";
import { PropertiesList } from "@/features/properties/components/PropertiesList";
import { TenantsList } from "@/features/tenants/components/TenantsList";

export const Dashboard = () => {
  return (
    <section className="flex flex-col gap-8">
      <PropertiesList />
      <FinancialCardSet />
      <ManagersList />
      <TenantsList />
    </section>
  );
};
