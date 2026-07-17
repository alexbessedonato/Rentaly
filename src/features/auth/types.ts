import type { User } from '@supabase/supabase-js'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthState {
  user: User | null
  status: AuthStatus
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface SignUpFormValues extends LoginFormValues {
  fullName: string;
  confirmPassword: string;
}

export interface PasswordResetFormValues {
  email: string;
}

export interface NewPasswordFormValues {
  password: string
}

