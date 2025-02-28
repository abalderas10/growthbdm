export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invite_codes: {
        Row: {
          id: number
          code: string
          is_used: boolean
          used_by: string | null
          used_at: string | null
          created_at: string
        }
        Insert: {
          id?: number
          code: string
          is_used?: boolean
          used_by?: string | null
          used_at?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          code?: string
          is_used?: boolean
          used_by?: string | null
          used_at?: string | null
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          status: 'pending' | 'confirmed' | 'cancelled'
          payment_id: string | null
          amount: number
          invite_code: string | null
          event_date: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_id?: string | null
          amount?: number
          invite_code?: string | null
          event_date: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_id?: string | null
          amount?: number
          invite_code?: string | null
          event_date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
