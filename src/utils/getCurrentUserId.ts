import { supabase } from "@/lib/supabaseClient";

export const getCurrentUserId = async (): Promise<string> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("No user found");
  }

  return user.id;
};
