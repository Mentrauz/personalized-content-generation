import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey)

// Create client only when env vars are present; otherwise export a null placeholder
export const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>)

// Types for our authentication
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}
