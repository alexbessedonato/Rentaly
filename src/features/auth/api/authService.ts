import { supabase } from "@/lib/supabaseClient";
import type { LoginFormValues, SignUpFormValues } from "../types";

export const loginWithEmail = async ({ email, password }: LoginFormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,   
        password, 
    });
    
    if (error) throw error;

    return data;
};

export const signUpWithEmail = async ({ email, password, fullName }: SignUpFormValues) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) throw error;
    return data;
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};