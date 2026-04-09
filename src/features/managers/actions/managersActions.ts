import { getErrorMessage } from "@/utils/getErrorMessage";
import { addManager } from "../api/managersService";
import { toast } from "sonner";
import type { AddManagerInput } from "../types";

export const addManagerAction = async (manager: AddManagerInput) => {
    try {
        await addManager(manager)
    } catch (error: unknown){
        toast.error("Error al añadir manager", {description: getErrorMessage(error)})
        throw error
    }
};
