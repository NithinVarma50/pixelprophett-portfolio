
import { createClient } from '@supabase/supabase-js'

// Initialize with empty strings if env vars are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://placeholder-url.com'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence to avoid errors
    autoRefreshToken: false, // Disable auto refresh
    detectSessionInUrl: false // Disable session detection
  }
})
