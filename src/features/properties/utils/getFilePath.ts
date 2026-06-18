import type { PropertyFormValues } from "../types";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]+/g, "");

export const getFilePath = async (
  property: PropertyFormValues,
  userId: string,
) => {
  const cleanProperty = slugify(property.name);
  const date = new Date().toISOString().split("T")[0];

  let insurancePath: string | null = null;
  let contractPath: string | null = null;

  if (property.insurance_file) {
    const ext = property.insurance_file.name.split(".").pop();
    insurancePath = `${userId}/insurancecontracts/${cleanProperty}/${date}/${cleanProperty}.${ext}`;
  }

  if (property.contract_file) {
    const ext = property.contract_file.name.split(".").pop();
    contractPath = `${userId}/propertycontracts/${cleanProperty}/${date}/${cleanProperty}.${ext}`;
  }

  return { insurancePath, contractPath };
};
