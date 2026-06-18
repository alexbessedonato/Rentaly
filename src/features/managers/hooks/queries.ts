import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getManagers, addManager } from "../api/managers";
import { MANAGERS_QUERY_KEY } from "../constants/managersQueryKey";
import type { AddManagerInput } from "../types";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useManagersQuery = () => {
  return useQuery({
    queryKey: MANAGERS_QUERY_KEY,
    queryFn: getManagers,
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
    toast.error("Error al añadir manager", { description: getErrorMessage(error) });
  },
});
};
