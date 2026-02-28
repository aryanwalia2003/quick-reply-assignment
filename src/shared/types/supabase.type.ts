export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// --- ENUMS (Matching SQL Enums) ---
export type ReadingStage = 
  | 'Abstract Read' 
  | 'Introduction Done' 
  | 'Methodology Done' 
  | 'Results Analyzed' 
  | 'Fully Read' 
  | 'Notes Completed';

export type ResearchDomain = 
  | 'Computer Science' 
  | 'Biology' 
  | 'Physics' 
  | 'Chemistry' 
  | 'Mathematics' 
  | 'Social Sciences';

export type ImpactScore = 
  | 'High Impact' 
  | 'Medium Impact' 
  | 'Low Impact' 
  | 'Unknown';

// --- DATABASE SCHEMA ---
export interface Database {
  public: {
    Tables: {
      papers_metadata: {
        Row: {
          id: string
          title: string
          first_author: string
          domain: ResearchDomain
          citation_count: number
        }
        Insert: {
          title: string
          first_author: string
          domain: ResearchDomain
          citation_count: number
        }
        Update: {
          title?: string
          first_author?: string
          domain?: ResearchDomain
          citation_count?: number
        }
        Relationships: []
      }
      user_paper_interactions: {
        Row: {
          id: string
          user_id: string
          paper_id: string
          reading_stage: ReadingStage
          impact_score: ImpactScore
          created_at: string
        }
        Insert: {
          user_id?: string // Defaults to auth.uid()
          paper_id: string
          reading_stage?: ReadingStage
          impact_score?: ImpactScore
        }
        Update: {
          reading_stage?: ReadingStage
          impact_score?: ImpactScore
        }
        Relationships: [
          {
            foreignKeyName: 'user_paper_interactions_paper_id_fkey'
            columns: ['paper_id']
            isOneToOne: false
            referencedRelation: 'papers_metadata'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      reading_stage_enum: ReadingStage
      research_domain_enum: ResearchDomain
      impact_score_enum: ImpactScore
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}