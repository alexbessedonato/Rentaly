import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../api/tenantsService";

export const getTenantsQuery = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
};
