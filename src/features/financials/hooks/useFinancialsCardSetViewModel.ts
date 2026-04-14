import { toast } from "sonner";
import { useFinancialsQuery } from "./useFinancialsQuery";

export const useFinancialsCardSetViewModel = () => {
  const { data: financials, isLoading, error } = useFinancialsQuery();

  if (error) {
    toast.error("Error fetching financials: " + error.message);
  }

  const cards = [
    {
      title: "Total Rent",
      value: `${financials?.total_rent ?? 0} €`,
    },
    {
      title: "Total Mortgage",
      value: `${financials?.total_mortgage ?? 0} €`,
    },
    {
      title: "Net Income",
      value: `${financials?.net_profit ?? 0} €`,
    },
  ];

  return {
    cards,
    isLoading,
    error,
  };
};
