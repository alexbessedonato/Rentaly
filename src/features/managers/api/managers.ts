import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserId } from "@/utils/getCurrentUserId";
import type { AddManagerInput, Manager } from "../types";

export const getManagers = async (): Promise<Manager[]> => {
  const { data, error } = await supabase
    .from("manager")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;

  return data as Manager[];
};

export const addManager = async (manager: AddManagerInput): Promise<void> => {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from("manager")
    .insert({ ...manager, owner_id: userId });

  if (error) throw error;
};
