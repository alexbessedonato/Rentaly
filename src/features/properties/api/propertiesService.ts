import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import type { PropertyForTable, PropertyFormValues } from "../types";
import { PROPERTY_WITH_RELATIONS_SELECT } from "../constants/propertySelect";
import { getFilePath } from "../utils/getFilePath";

export const getProperties = async (): Promise<PropertyForTable[]> => {
  const { data, error } = await supabase
    .from("property")
    .select(PROPERTY_WITH_RELATIONS_SELECT)
    .order("name", { ascending: true });

  if (error) {
    throw new Error("Error fetching properties: " + error.message);
  }
  return data as PropertyForTable[];
};

export const addProperty = async (
  property: PropertyFormValues,
): Promise<void> => {
  const userId = await getCurrentUserId();

  const { insurancePath, contractPath } = await getFilePath(property, userId);

  const insurance_url: string | null = await uploadOptionalFileAndGetUrl(
    property.insurance_file,
    insurancePath,
    "Error subiendo seguro",
  );
  const contract_url: string | null = await uploadOptionalFileAndGetUrl(
    property.contract_file,
    contractPath,
    "Error subiendo contrato",
  );

  const { insurance_file, contract_file, ...cleanPropertyData } = property;

  const { error: DbError } = await supabase.from("property").insert({
    ...cleanPropertyData,
    insurance_url,
    contract_url,
    user_id: userId,
  });

  if (DbError) {
    throw new Error("Error adding property: " + DbError.message);
  }
};

const uploadOptionalFileAndGetUrl = async (
  file: File | null,
  path: string | null,
  errorPrefix: string,
): Promise<string | null> => {
  if (!file || !path) {
    return null;
  }

  const { error } = await supabase.storage
    .from("PropertyContracts")
    .upload(path, file);

  if (error) {
    throw new Error(`${errorPrefix}: ${error.message}`);
  }

  return supabase.storage.from("PropertyContracts").getPublicUrl(path).data
    .publicUrl;
};
