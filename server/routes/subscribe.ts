import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://elybuqtwakmuuwihaoto.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseWJ1cXR3YWttdXV3aWhhb3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MDU1NTMsImV4cCI6MjA4MDQ4MTU1M30.DWg8qFXVO0Px4VEegnLYXCeAB4lyoNQlZ9dK7JnDGqo";

const supabase = createClient(supabaseUrl, supabaseKey);

export const handleSubscribe: RequestHandler = async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email" });
  }

  try {
    const { error } = await supabase.from("subscribers").insert({
      email: email.toLowerCase().trim(),
    });

    if (error) {
      if (error.code === "23505") {
        return res.status(400).json({ ok: false, error: "Email already subscribed" });
      }
      console.error("Supabase error:", error);
      return res.status(500).json({ ok: false, error: "Failed to subscribe" });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return res.status(500).json({ ok: false, error: "Failed to subscribe" });
  }
};
