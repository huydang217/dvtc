export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_permissions: {
        Row: {
          misc: string
          permission_id: number
        }
        Insert: {
          misc: string
          permission_id?: number
        }
        Update: {
          misc?: string
          permission_id?: number
        }
        Relationships: []
      }
      chinese_dictionary: {
        Row: {
          chinese_word: string
          english_translation: string
          pinyin: string
          word_id: number
        }
        Insert: {
          chinese_word: string
          english_translation: string
          pinyin: string
          word_id?: number
        }
        Update: {
          chinese_word?: string
          english_translation?: string
          pinyin?: string
          word_id?: number
        }
        Relationships: []
      }
      program_permissions: {
        Row: {
          permission_id: number
          program_id: string
        }
        Insert: {
          permission_id: number
          program_id: string
        }
        Update: {
          permission_id?: number
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "app_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "program_permissions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      program_settings: {
        Row: {
          program_id: string
          url: string
        }
        Insert: {
          program_id: string
          url: string
        }
        Update: {
          program_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_settings_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: true
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      programs: {
        Row: {
          program_id: string
          program_name: string
        }
        Insert: {
          program_id: string
          program_name: string
        }
        Update: {
          program_id?: string
          program_name?: string
        }
        Relationships: []
      }
      user_programs: {
        Row: {
          program_id: string
          user_id: string
        }
        Insert: {
          program_id: string
          user_id: string
        }
        Update: {
          program_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "user_programs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          enc_password: string | null
          user_id: string
          username: string
        }
        Insert: {
          enc_password?: string | null
          user_id: string
          username: string
        }
        Update: {
          enc_password?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_chinese_data: {
        Args: {
          chinese_word_text: string
          english_translation_text: string
          pinyin_text: string
        }
        Returns: string
      }
      get_chinese_character_detail: {
        Args: {
          input_text: string
        }
        Returns: {
          chinese_word: string
          english_translation: string
          pinyin: string
        }[]
      }
      get_user_programs: {
        Args: {
          in_user_id: string
        }
        Returns: {
          program_name: string
          program_settings_url: string
          app_permissions: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
