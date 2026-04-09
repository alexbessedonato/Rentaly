import { useManagersQuery } from "./useManagersQuery";

export const useManagersListViewModel = () => {
  const { data: managers, isLoading } = useManagersQuery();

  return {
    managers: managers ?? [],
    isLoading,
  };
};
