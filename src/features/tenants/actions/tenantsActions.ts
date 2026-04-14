import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";
import { addTenant } from "../api/tenantsService";
import type { AddTenantInput } from "../types";

export const addTenantAction = async (
  tenant: AddTenantInput,
): Promise<void> => {
  try {
    await addTenant(tenant);
  } catch (error: unknown) {
    toast.error("Error al agregar inquilino", {
      description: getErrorMessage(error),
    });
    throw error;
  }
};
