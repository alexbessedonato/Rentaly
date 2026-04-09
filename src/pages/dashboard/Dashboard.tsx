import { ManagersList } from "@/features/managers/components/ManagersList";
import { PropertyList } from "@/features/properties/components/PropertyList";

export const Dashboard = () => {
  return (
    <section className="flex flex-col gap-8">
      <PropertyList />
      <ManagersList />
    </section>
  );
};
