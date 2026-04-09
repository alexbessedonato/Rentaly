import { useQuery } from "@tanstack/react-query";
import { addManager, getManagers } from "../api/managersService";
import { useNavigate } from "@tanstack/react-router"; 
import type { Manager } from "../types";
import { toast } from "sonner";

export const useManagerActions = () => {
    const navigate = useNavigate();
        const closeAddManagerModal = () => navigate({ to: "/" });
        const goToAddManager = () => navigate({ to: "/add-manager" });

    
    const executeAddManager = async (manager: Omit<Manager, "id" | "owner_id" | "created_at">) => {
        try {
            await addManager(manager)
        } catch (error: any){
            toast.error("Error al añadir manager", {description: error.message})
            throw error
        }
    }
    

    const useManagers = () => {
        return useQuery({
            queryKey: ["managers"],
            queryFn: getManagers,
        })
    };

    return { useManagers, closeAddManagerModal, goToAddManager, executeAddManager };
};
