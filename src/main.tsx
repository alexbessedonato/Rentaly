import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { setAuth } from './features/auth/store/authStore.ts'
import { supabase } from './lib/supabaseClient.ts'

supabase.auth.onAuthStateChange((_event, session) => {
  console.log("Auth state changed:", _event, session)
  setAuth(session?.user ?? null)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
