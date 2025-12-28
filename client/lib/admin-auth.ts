import { supabase } from "./supabase";

// Simple password hashing utility (for production, use bcrypt)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const newHash = await hashPassword(password);
  return newHash === hash;
}

export interface AdminUser {
  id: string;
  email: string;
}

let currentAdminUser: AdminUser | null = null;

// Initialize from localStorage
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("admin_user");
  if (stored) {
    currentAdminUser = JSON.parse(stored);
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return null;
  }

  const isValid = await verifyPassword(password, data.password_hash);
  if (!isValid) {
    return null;
  }

  const user: AdminUser = { id: data.id, email: data.email };
  currentAdminUser = user;
  localStorage.setItem("admin_user", JSON.stringify(user));
  return user;
}

export async function registerAdmin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    // Check if admin user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing user:", checkError);
      throw checkError;
    }

    if (existingUser) {
      console.warn("User already exists:", email);
      throw new Error("User already exists");
    }

    const passwordHash = await hashPassword(password);

    const { data, error } = await supabase
      .from("admin_users")
      .insert([{ email, password_hash: passwordHash }])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      throw error;
    }

    if (!data) {
      console.error("No data returned from insert");
      throw new Error("Failed to create user");
    }

    const user: AdminUser = { id: data.id, email: data.email };
    currentAdminUser = user;
    localStorage.setItem("admin_user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

export function logoutAdmin(): void {
  currentAdminUser = null;
  localStorage.removeItem("admin_user");
}

export function getCurrentAdmin(): AdminUser | null {
  return currentAdminUser;
}

export function isAdminLoggedIn(): boolean {
  return currentAdminUser !== null;
}
