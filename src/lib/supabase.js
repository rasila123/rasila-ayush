import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zlkeigshxotmintueseq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsa2VpZ3NoeG90bWludHVlc2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTAxNTQsImV4cCI6MjA4NzMyNjE1NH0.O8bSXoZPXVlmJWyHwGSy7Yr7rm-AfslemBLoRiJL6KE'

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
