import { getTenantsQuery } from "./useTenantsQuery";

export const useTenantsListViewModel = () => {
  const { data: tenants, isLoading, isError, error } = getTenantsQuery();

  return { tenants: tenants ?? [], isLoading, isError, error };
};
