import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $auth } from "@/features/auth/store/authStore";
import { getFinancials } from "../api/financials";
import { FINANCIALS_QUERY_KEY } from "../constants/financialsQueryKey";

export const useFinancialsQuery = () => {
  const { status } = useStore($auth);
  return useQuery({
    queryKey: FINANCIALS_QUERY_KEY,
    queryFn: getFinancials,
    enabled: status === "authenticated",
  });
};
