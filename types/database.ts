export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          weight_kg: number
          height_cm: number
          created_at: string
        }
        Insert: {
          id: string
          name?: string
          weight_kg?: number
          height_cm?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          weight_kg?: number
          height_cm?: number
          created_at?: string
        }
        Relationships: []
      }
      body_weight_logs: {
        Row: {
          id: string
          user_id: string
          weight_kg: number
          logged_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          weight_kg: number
          logged_at: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          weight_kg?: number
          logged_at?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      training_blocks: {
        Row: {
          id: string
          week_start: string
          day_of_week: number
          phase: string
          month: string
          category: string
          title: string
          description: string
          skills: string[]
          is_travel_block: boolean
          created_at: string
        }
        Insert: {
          id?: string
          week_start: string
          day_of_week: number
          phase: string
          month: string
          category: string
          title: string
          description?: string
          skills?: string[]
          is_travel_block?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          week_start?: string
          day_of_week?: number
          phase?: string
          month?: string
          category?: string
          title?: string
          description?: string
          skills?: string[]
          is_travel_block?: boolean
          created_at?: string
        }
        Relationships: []
      }
      block_completions: {
        Row: {
          id: string
          user_id: string
          block_id: string
          status: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          block_id: string
          status: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          block_id?: string
          status?: string
          completed_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      skill_logs: {
        Row: {
          id: string
          user_id: string
          block_id: string | null
          skill: string
          metric_type: string
          metric_value: number
          notes: string | null
          feel: number
          logged_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          block_id?: string | null
          skill: string
          metric_type: string
          metric_value: number
          notes?: string | null
          feel: number
          logged_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          block_id?: string | null
          skill?: string
          metric_type?: string
          metric_value?: number
          notes?: string | null
          feel?: number
          logged_at?: string
          created_at?: string
        }
        Relationships: []
      }
      competition_results: {
        Row: {
          id: string
          user_id: string
          competition_date: string
          competition_name: string
          category: string
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competition_date: string
          competition_name: string
          category: string
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competition_date?: string
          competition_name?: string
          category?: string
          notes?: string
          created_at?: string
        }
        Relationships: []
      }
      milestone_checks: {
        Row: {
          id: string
          user_id: string
          skill: string
          target_value: number
          target_unit: string
          achieved_value: number | null
          achieved_at: string | null
          is_minimum: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill: string
          target_value: number
          target_unit: string
          achieved_value?: number | null
          achieved_at?: string | null
          is_minimum: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill?: string
          target_value?: number
          target_unit?: string
          achieved_value?: number | null
          achieved_at?: string | null
          is_minimum?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type BodyWeightLog = Database['public']['Tables']['body_weight_logs']['Row']
export type TrainingBlock = Database['public']['Tables']['training_blocks']['Row']
export type BlockCompletion = Database['public']['Tables']['block_completions']['Row']
export type SkillLog = Database['public']['Tables']['skill_logs']['Row']
export type CompetitionResult = Database['public']['Tables']['competition_results']['Row']
export type MilestoneCheck = Database['public']['Tables']['milestone_checks']['Row']

export type Phase = 'build' | 'competition' | 'elite'
export type Category = 'strength' | 'gymnastics' | 'cardio' | 'olympic_lifting' | 'travel' | 'milestone'
export type BlockStatus = 'completed' | 'pending' | 'deleted'
export type MetricType = 'reps' | 'weight_kg' | 'time_seconds' | 'distance_meters'

export type TrainingBlockWithCompletion = TrainingBlock & {
  completion?: BlockCompletion
}
