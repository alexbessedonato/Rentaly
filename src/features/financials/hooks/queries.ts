import { useQuery } from "@tanstack/react-query";
import { getFinancials } from "../api/financials";
import { FINANCIALS_QUERY_KEY } from "../constants/financialsQueryKey";

export const useFinancialsQuery = () => {
  return useQuery({
    queryKey: FINANCIALS_QUERY_KEY,
    queryFn: getFinancials,
  });
};
