import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import type { AddManagerInput, Manager, ManagerEditInput } from "../types";

export const getManagers = async (): Promise<Manager[]> => {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("manager")
    .select("*")
    .eq("owner_id", userId)
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Error fetching managers: " + error.message);
  }

  return data as Manager[];
};

export const addManager = async (manager: AddManagerInput): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("manager")
    .insert({ ...manager, owner_id: userId });

  if (error) {
    throw new Error("Error adding manager: " + error.message);
  }
};

export const editManager = async (manager: ManagerEditInput): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("manager")
    .update({
      name: manager.name,
      phone: manager.phone,
      email: manager.email,
      company: manager.company,
    })
    .eq("id", manager.id)
    .eq("owner_id", userId);

  if (error) {
    throw new Error("Error updating manager: " + error.message);
  }
};

export const deleteManager = async (managerId: string): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error: unlinkError } = await supabase
    .from("property")
    .update({ manager_id: null })
    .eq("user_id", userId)
    .eq("manager_id", managerId);

  if (unlinkError) {
    throw new Error("Error unlinking manager from properties: " + unlinkError.message);
  }

  const { error: deleteError } = await supabase
    .from("manager")
    .delete()
    .eq("id", managerId)
    .eq("owner_id", userId);

  if (deleteError) {
    throw new Error("Error deleting manager: " + deleteError.message);
  }
};
