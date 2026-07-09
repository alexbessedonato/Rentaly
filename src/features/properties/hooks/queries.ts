import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addProperty, deleteProperty, editProperty, getProperties } from "../api/properties";
import type { PropertyEditInput, PropertyFormValues } from "../types";
import { PROPERTIES_QUERY_KEY } from "../constants/propertiesQueryKey";
import { FINANCIALS_QUERY_KEY } from "@/features/financials/constants/financialsQueryKey";
import { TENANTS_QUERY_KEY } from "@/features/tenants/constants/tenantsQueryKey";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
  });
};

export const useDeletePropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId: string) => deleteProperty(propertyId),
    onSuccess: () => {
      toast.success("Propiedad eliminada con éxito")
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});
      queryClient.invalidateQueries({ queryKey: TENANTS_QUERY_KEY});
    },
    onError: (error: unknown) => {
      toast.error("Error al eliminar propiedad", {description: getErrorMessage(error)})
    }
  })

}

export const useEditPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: PropertyEditInput) => editProperty(property),
    onSuccess: () => {
      toast.success("Propiedad actualizada con éxito");
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});

    },
    onError: (error: unknown) => {
      toast.error("Error al actualizar propiedad", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useAddPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: PropertyFormValues) => addProperty(property),
    onSuccess: () => {
      toast.success("Propiedad añadida con exito");
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: FINANCIALS_QUERY_KEY});
    },
    onError: (error: unknown) => {
      toast.error("Error al agregar propiedad", {
        description: getErrorMessage(error),
      });
    },
  });
};
