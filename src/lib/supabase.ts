
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Venue = {
  id: string
  name: string
  city: string
  country: string
  capacity: number
  created_at: string
}

export type Match = {
  id: string
  venue_id: string
  match_type: string
  match_date: string
  match_time: string | null
  description: string
  created_at: string
  venues?: Venue
}

export type Package = {
  id: string
  name: string
  match_id: string
  description: string
  price_usd: number
  includes_jet: boolean
  includes_rolls_royce: boolean
  includes_hospitality: boolean
  seats: string
  available: number
  crypto_only: boolean
  created_at: string
  matches?: Match
}

export type Enquiry = {
  name: string
  email: string
  phone?: string
  country?: string
  message: string
  interest?: string
  preferred_crypto?: string
}
