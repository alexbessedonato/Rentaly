import { usePropertiesQuery } from "./usePropertiesQuery";

export const usePropertiesListViewModel = () => {
  const { data: properties, isLoading, isError, error } = usePropertiesQuery();

  return {
    properties: properties ?? [],
    isLoading,
    isError,
    error,
  };
};
