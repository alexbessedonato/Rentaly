import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import type { AddTenantInput, TenantEditInput, TenantForTable } from "../types";
import { TENANTS_WITH_PROPERTY_SELECT } from "../constants/tenantsSelect";

export const getTenants = async (): Promise<TenantForTable[]> => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("tenant")
    .select(TENANTS_WITH_PROPERTY_SELECT)
    .eq("owner_id", userId)
    .order("full_name", { ascending: true });

  if (error) {
    throw new Error("Error fetching tenants: " + error.message);
  }

  return data as TenantForTable[];
};

export const addTenant = async (tenant: AddTenantInput): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("tenant")
    .insert({
      property_id: tenant.property_id,
      full_name: tenant.full_name,
      email: tenant.email,
      phone: tenant.phone,
      end_of_contract: tenant.end_of_contract ?? null,
      owner_id: userId,
    });

  if (error) {
    throw new Error("Error adding tenant: " + error.message);
  }
};

export const editTenant = async (tenant: TenantEditInput): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("tenant")
    .update({
      full_name: tenant.full_name,
      email: tenant.email,
      phone: tenant.phone,
      property_id: tenant.property_id,
    })
    .eq("id", tenant.id)
    .eq("owner_id", userId);

  if (error) {
    throw new Error("Error updating tenant: " + error.message);
  }
};

export const deleteTenant = async (tenantId: string): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error: unlinkError } = await supabase
    .from("tenant")
    .update({ property_id: null })
    .eq("id", tenantId)
    .eq("owner_id", userId);

  if (unlinkError) {
    throw new Error("Error unlinking tenant from property: " + unlinkError.message);
  }

  const { error: deleteError } = await supabase
    .from("tenant")
    .delete()
    .eq("id", tenantId)
    .eq("owner_id", userId);

  if (deleteError) {
    throw new Error("Error deleting tenant: " + deleteError.message);
  }
};
