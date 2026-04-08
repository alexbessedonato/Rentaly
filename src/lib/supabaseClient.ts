import { createClient } from '@supabase/supabase-js'

// We grab the variables from Vite's environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

// Defensive programming: Fail fast if the environment is broken
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env file.")
}

// Create and export the single, shared instance of the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)