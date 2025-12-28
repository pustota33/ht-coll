import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SiteSettings {
  [key: string]: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*");
        if (error) throw error;

        const settingsMap: SiteSettings = {};
        (data || []).forEach((item: any) => {
          settingsMap[item.key] = item.value || "";
        });
        setSettings(settingsMap);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
