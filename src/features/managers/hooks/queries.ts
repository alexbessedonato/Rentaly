import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $auth } from "@/features/auth/store/authStore";
import { getManagers, addManager, editManager, deleteManager } from "../api/managers";
import { MANAGERS_QUERY_KEY } from "../constants/managersQueryKey";
import type { AddManagerInput, ManagerEditInput } from "../types";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { PROPERTIES_QUERY_KEY } from "@/features/properties/constants/propertiesQueryKey";

export const useManagersQuery = () => {
  const { status } = useStore($auth);
  return useQuery({
    queryKey: MANAGERS_QUERY_KEY,
    queryFn: getManagers,
    enabled: status === "authenticated",
  });
};

export const useAddManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (manager: AddManagerInput) => addManager(manager),
    onSuccess: () => {
      toast.success("Manager añadido con éxito");
      queryClient.invalidateQueries({ queryKey: MANAGERS_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al añadir manager", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useEditManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (manager: ManagerEditInput) => editManager(manager),
    onSuccess: () => {
      toast.success("Manager actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: MANAGERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al actualizar manager", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (managerId: string) => deleteManager(managerId),
    onSuccess: () => {
      toast.success("Manager eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: MANAGERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error("Error al eliminar manager", {
        description: getErrorMessage(error),
      });
    },
  });
};
