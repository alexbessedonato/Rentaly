import { useFinancialsQuery } from "./queries";

export const useFinancialsCardSet = () => {
  const { data: financials, isLoading, isError, error } = useFinancialsQuery();

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
    isError,
    error,
  };
};
