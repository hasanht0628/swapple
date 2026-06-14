/**
 * Hand-written Supabase schema types.
 * NOTE: this will eventually be replaced by `supabase gen types typescript`.
 * Keep in sync with supabase/migrations.
 */

export type SubscriptionStatus = "free" | "paid" | "past_due" | "canceled";
export type ScanItemVerdict = "good" | "caution" | "avoid";
export type ScanStatus = "processing" | "completed" | "failed";
export type TrackerEventType = "saved" | "unsaved" | "swapped" | "unswapped";

export type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  priorities: string[];
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  onboarding_complete: boolean;
  disclaimer_accepted_at: string | null;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type ScanRow = {
  id: string;
  user_id: string;
  image_path: string;
  image_url: string | null;
  status: ScanStatus;
  item_count: number | null;
  raw_ai_response: unknown | null;
  created_at: string;
};

export type ScanItemRow = {
  id: string;
  scan_id: string;
  user_id: string;
  item_name: string;
  brand_name: string | null;
  barcode: string | null;
  verdict: ScanItemVerdict;
  free_reason: string;
  general_principle: string;
  detailed_reason: string | null;
  priority_tradeoffs: unknown;
  brand_recommendations: unknown;
  product_data_source: string | null;
  confidence: number | null;
  saved: boolean;
  saved_recommendation_rank: number | null;
  saved_recommendation: unknown | null;
  swapped: boolean;
  created_at: string;
};

export type TrackerEventRow = {
  id: string;
  user_id: string;
  scan_item_id: string | null;
  event_type: TrackerEventType;
  created_at: string;
};

/**
 * Minimal Database type shaped for @supabase/supabase-js generics.
 * Expand/replace with generated types when wiring a real Supabase project.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & { id: string };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      scans: {
        Row: ScanRow;
        Insert: Partial<ScanRow> & { user_id: string; image_path: string };
        Update: Partial<ScanRow>;
        Relationships: [];
      };
      scan_items: {
        Row: ScanItemRow;
        Insert: Partial<ScanItemRow> & {
          scan_id: string;
          user_id: string;
          item_name: string;
          verdict: ScanItemVerdict;
          free_reason: string;
          general_principle: string;
        };
        Update: Partial<ScanItemRow>;
        Relationships: [];
      };
      tracker_events: {
        Row: TrackerEventRow;
        Insert: Partial<TrackerEventRow> & {
          user_id: string;
          event_type: TrackerEventType;
        };
        Update: Partial<TrackerEventRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      subscription_status: SubscriptionStatus;
      scan_item_verdict: ScanItemVerdict;
    };
  };
}
