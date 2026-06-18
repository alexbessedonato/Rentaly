import { supabase } from "@/lib/supabaseClient";
import type { AddTenantInput, TenantForTable } from "../types";
import { TENANTS_WITH_PROPERTY_SELECT } from "../constants/tenantsSelect";

export const getTenants = async (): Promise<TenantForTable[]> => {
  const { data, error } = await supabase
    .from("tenant")
    .select(TENANTS_WITH_PROPERTY_SELECT)
    .order("full_name", { ascending: true });

  if (error) {
    throw new Error("Error fetching tenants: " + error.message);
  }

  return data as TenantForTable[];
};

export const addTenant = async (tenant: AddTenantInput): Promise<void> => {
  const { error } = await supabase.from("tenant").insert(tenant);

  if (error) throw new Error("Error adding tenant: " + error.message);
};
