import { supabase } from "@/lib/supabaseClient";
import type { Financials } from "../types";

export const getFinancials = async (): Promise<Financials> => {
  const { data, error } = await supabase.rpc("get_user_financials");

  if (error) {
    throw new Error("Error fetching financials: " + error.message);
  }
  return data as Financials;
};
