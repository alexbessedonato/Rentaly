import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSignedUrl } from "../api/properties";
import { usePropertiesQuery } from "./queries";

export const usePropertiesList = () => {
  const { data: properties = [] } = usePropertiesQuery();

  const handleOpenFile = async (filePath: string) => {
    try {
      const signedUrl = await getSignedUrl(filePath);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      toast.error("Error al obtener URL firmada", {
        description: getErrorMessage(err),
      });
    }
  };

  return {
    properties,
    handleOpenFile,
  };
};
