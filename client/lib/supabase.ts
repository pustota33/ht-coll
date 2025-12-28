import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://elybuqtwakmuuwihaoto.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseWJ1cXR3YWttdXV3aWhhb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MDU1NTMsImV4cCI6MjA4MDQ4MTU1M30.DWg8qFXVO0Px4VEegnLYXCeAB4lyoNQlZ9dK7JnDGqo";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for database tables
export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  preview_url: string;
  gumroad_url: string;
  cover: string | null;
  description: string | null;
  specs: Record<string, string> | null;
  demos: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface DbPlugin {
  id: string;
  slug: string;
  name: string;
  preview_url: string;
  gumroad_url: string;
  cover: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  content: string;
  products: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface DbAdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface DbSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  created_at: string;
  updated_at: string;
}

export interface DbSiteSetting {
  id: string;
  key: string;
  value: string | null;
  created_at: string;
  updated_at: string;
}
