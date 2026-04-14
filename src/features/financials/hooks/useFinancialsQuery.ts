import { useQuery } from "@tanstack/react-query";
import { getFinancials } from "../api/financialsService";

export const useFinancialsQuery = () => {
  return useQuery({
    queryKey: ["financials"],
    queryFn: getFinancials,
  });
};
