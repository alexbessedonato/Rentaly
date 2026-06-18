import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { addProperty, getProperties } from "../api/properties";
import type { PropertyFormValues } from "../types";
import { PROPERTIES_QUERY_KEY } from "../constants/propertiesQueryKey";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: getProperties,
  });
};

export const useAddPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: PropertyFormValues) => addProperty(property),
    onSuccess: () => {
      toast.success("Propiedad añadida con exito");
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al agregar propiedad", {
        description: getErrorMessage(error),
      });
    },
  });
};
