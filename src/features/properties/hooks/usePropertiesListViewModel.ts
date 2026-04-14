import { usePropertiesQuery } from "./usePropertiesQuery";
import { getSignedUrlAction } from "../actions/propertiesActions";

export const usePropertiesListViewModel = () => {
  const { data: properties, isLoading, isError, error } = usePropertiesQuery();

  const handleOpenFile = async (filePath: string) => {
    try {
      const signedUrl = await getSignedUrlAction(filePath);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch {}
  };

  return {
    properties: properties ?? [],
    isLoading,
    isError,
    error,
    handleOpenFile,
  };
};
