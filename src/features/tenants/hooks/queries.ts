import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addTenant, deleteTenant, editTenant, getTenants } from "../api/tenants";
import type { AddTenantInput, TenantEditInput } from "../types";
import { TENANTS_QUERY_KEY } from "../constants/tenantsQueryKey";
import { PROPERTIES_QUERY_KEY } from "@/features/properties/constants/propertiesQueryKey";

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
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al agregar inquilino", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useEditTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenant: TenantEditInput) => editTenant(tenant),
    onSuccess: () => {
      toast.success("Inquilino actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al actualizar inquilino", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteTenantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tenantId: string) => deleteTenant(tenantId),
    onSuccess: () => {
      toast.success("Inquilino eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al eliminar inquilino", {
        description: getErrorMessage(error),
      });
    },
  });
};
