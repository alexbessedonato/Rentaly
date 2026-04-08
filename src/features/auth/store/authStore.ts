import { atom } from 'nanostores'
import type { AuthState } from '../types'
import type { User } from '@supabase/supabase-js'

export const $auth = atom<AuthState>({
  user: null,
  status: 'loading'
})

export const setAuth = (user: User | null) => {
  $auth.set({
    user,
    status: user ? 'authenticated' : 'unauthenticated'
  })
}