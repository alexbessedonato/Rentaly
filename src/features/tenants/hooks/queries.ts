import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addTenant, getTenants } from "../api/tenants";
import type { AddTenantInput } from "../types";
import { TENANTS_QUERY_KEY } from "../constants/tenantsQueryKey";

export const useTenantsQuery = () => {
  return useQuery({
    queryKey: TENANTS_QUERY_KEY,
    queryFn: getTenants,
  });
};

export const useAddTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenant: AddTenantInput) => addTenant(tenant),
    onSuccess: () => {
      toast.success("Inquilino añadido con éxito");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al agregar inquilino", {
        description: getErrorMessage(error),
      });
    },
  });
};
