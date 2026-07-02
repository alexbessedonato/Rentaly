import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import type { PropertyEditInput, PropertyForTable, PropertyFormValues } from "../types";
import { PROPERTY_WITH_RELATIONS_SELECT } from "../constants/propertySelect";
import { getFilePath } from "../utils/getFilePath";

const PROPERTY_FILES_BUCKET = "PropertyContracts";

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

  await uploadOptionalFileAndGetUrl(
    property.insurance_file,
    insurancePath,
    "Error subiendo seguro",
  );
  await uploadOptionalFileAndGetUrl(
    property.contract_file,
    contractPath,
    "Error subiendo contrato",
  );

  const { insurance_file, contract_file, ...cleanPropertyData } = property;

  const { error: DbError } = await supabase.from("property").insert({
    ...cleanPropertyData,
    insurance_url: insurancePath,
    contract_url: contractPath,
    user_id: userId,
  });

  if (DbError) {
    throw new Error("Error adding property: " + DbError.message);
  }
};

export const editProperty = async (
  property: PropertyEditInput,
): Promise<void> => {
  const userId = await getCurrentUserId();

  const { insurancePath, contractPath } = await getFilePath(property, userId);

  await uploadOptionalFileAndGetUrl(
    property.insurance_file,
    insurancePath,
    "Error subiendo seguro",
    true,
  );
  await uploadOptionalFileAndGetUrl(
    property.contract_file,
    contractPath,
    "Error subiendo contrato",
    true,
  );

  const finalInsuranceUrl = property.insurance_file
    ? insurancePath
    : property.insurance_url;
  const finalContractUrl = property.contract_file
    ? contractPath
    : property.contract_url;

  const { error } = await supabase
    .from("property")
    .update({
      name: property.name,
      address: property.address,
      rent: property.rent,
      mortgage: property.mortgage,
      manager_id: property.manager_id,
      insurance_url: finalInsuranceUrl,
      contract_url: finalContractUrl,
    })
    .eq("id", property.id);

  if (error) {
    throw new Error("Error updating property: " + error.message);
  }
};

const uploadOptionalFileAndGetUrl = async (
  file: File | null,
  path: string | null,
  errorPrefix: string,
  upsert = false,
): Promise<void> => {
  if (!file || !path) {
    return;
  }

  const { error } = await supabase.storage
    .from(PROPERTY_FILES_BUCKET)
    .upload(path, file, { upsert });

  if (error) {
    throw new Error(
      `${errorPrefix}: ${error.message}. Bucket used: ${PROPERTY_FILES_BUCKET}`,
    );
  }
};

export const getSignedUrl = async (path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(PROPERTY_FILES_BUCKET)
    .createSignedUrl(path, 60);

  if (error) {
    throw new Error("Error generating signed URL: " + error.message);
  }

  return data.signedUrl;
};
