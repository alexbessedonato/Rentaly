import { addProperty } from "../api/propertiesService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import type { PropertyFormValues } from "../types";
import { toast } from "sonner";

export const addPropertyAction = async (
  property: PropertyFormValues,
): Promise<void> => {
  try {
    await addProperty(property);
    toast.success("Propiedad añadida con exito");
  } catch (error: unknown) {
    toast.error("Error al agregar propiedad", {
      description: getErrorMessage(error),
    });
    throw error;
  }
};
