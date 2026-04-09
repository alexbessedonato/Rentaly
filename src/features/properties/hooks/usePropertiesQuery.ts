import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../api/propertiesService";

export const usePropertiesQuery = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
};
