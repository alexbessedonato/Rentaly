import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addProperty, editProperty, getProperties } from "../api/properties";
import type { PropertyEditInput, PropertyFormValues } from "../types";
import { PROPERTIES_QUERY_KEY } from "../constants/propertiesQueryKey";
import { FINANCIALS_QUERY_KEY } from "@/features/financials/constants/financialsQueryKey";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
  });
};

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
