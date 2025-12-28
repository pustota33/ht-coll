import { useState, useEffect } from "react";
import { supabase, DbSiteSetting } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      (data || []).forEach((item: DbSiteSetting) => {
        settingsMap[item.key] = item.value || "";
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updates = Object.entries(settings).map(async ([key, value]) => {
        const { error } = await supabase
          .from("site_settings")
          .upsert({ key, value }, { onConflict: "key" });
        if (error) throw error;
      });

      await Promise.all(updates);
      toast.success("Settings saved successfully!");
      fetchSettings();
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-neutral-400">Loading settings...</div>;

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Site Settings</h2>
      </div>

      {/* Hero Section */}
      <div className="border border-neutral-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={settings["hero_title"] || ""}
              onChange={(e) => handleChange("hero_title", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={settings["hero_description"] || ""}
              onChange={(e) => handleChange("hero_description", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border border-neutral-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Footer</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={settings["footer_title"] || ""}
              onChange={(e) => handleChange("footer_title", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={settings["footer_subtitle"] || ""}
              onChange={(e) => handleChange("footer_subtitle", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Copyright
            </label>
            <input
              type="text"
              value={settings["footer_copyright"] || ""}
              onChange={(e) => handleChange("footer_copyright", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings["footer_youtube"] || ""}
                onChange={(e) => handleChange("footer_youtube", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings["footer_instagram"] || ""}
                onChange={(e) => handleChange("footer_instagram", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                SoundCloud URL
              </label>
              <input
                type="url"
                value={settings["footer_soundcloud"] || ""}
                onChange={(e) => handleChange("footer_soundcloud", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Telegram URL
              </label>
              <input
                type="url"
                value={settings["footer_telegram"] || ""}
                onChange={(e) => handleChange("footer_telegram", e.target.value)}
                className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Page */}
      <div className="border border-neutral-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Contact Page</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Contact Text
            </label>
            <textarea
              value={settings["contact_text"] || ""}
              onChange={(e) => handleChange("contact_text", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Terms & Privacy Pages */}
      <div className="border border-neutral-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Legal Pages</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Terms of Service
            </label>
            <textarea
              value={settings["terms_content"] || ""}
              onChange={(e) => handleChange("terms_content", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Privacy Policy
            </label>
            <textarea
              value={settings["privacy_content"] || ""}
              onChange={(e) => handleChange("privacy_content", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-green-700 hover:bg-green-600 text-white w-full"
      >
        {saving ? "Saving..." : "Save All Settings"}
      </Button>
    </div>
  );
}
