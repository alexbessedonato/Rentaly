import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "@/features/auth/store/authStore";
import { getFinancials } from "../api/financials";
import { FINANCIALS_QUERY_KEY } from "../constants/financialsQueryKey";

export const useFinancialsQuery = () => {
  const auth = getAuthStatus();
  return useQuery({
    queryKey: FINANCIALS_QUERY_KEY,
    queryFn: getFinancials,
    enabled: auth === "authenticated",
  });
};
