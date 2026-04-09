import { supabase } from "@/lib/supabaseClient";
import type { Manager } from "../types";

export const getManagers = async (): Promise<any[]> => {

    const {data, error} = await supabase
        .from("manager")
        .select("*")
        .order("name", { ascending: true });

    if (error) throw error;

    return data;
};

export const addManager = async (manager: Omit<Manager, "id" | "owner_id" | "created_at">) => {

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
    .from("manager")
    .insert({...manager, owner_id: user?.id})

    if (error) throw error;
};