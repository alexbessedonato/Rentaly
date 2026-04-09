import { useQuery } from "@tanstack/react-query";
import { getManagers } from "../api/managersService";

export const useManagersQuery = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: getManagers,
  });
};
