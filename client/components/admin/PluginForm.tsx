import { useState, useEffect } from "react";
import { supabase, DbPlugin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface PluginFormProps {
  plugin?: DbPlugin;
  onSaved: () => void;
}

export default function PluginForm({ plugin, onSaved }: PluginFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    preview_url: "",
    gumroad_url: "",
    cover: "",
    description: "",
  });

  useEffect(() => {
    if (plugin) {
      setFormData({
        slug: plugin.slug,
        name: plugin.name,
        preview_url: plugin.preview_url,
        gumroad_url: plugin.gumroad_url,
        cover: plugin.cover || "",
        description: plugin.description || "",
      });
    }
  }, [plugin]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pluginData = {
        slug: formData.slug,
        name: formData.name,
        preview_url: formData.preview_url,
        gumroad_url: formData.gumroad_url,
        cover: formData.cover || null,
        description: formData.description || null,
        updated_at: new Date().toISOString(),
      };

      if (plugin) {
        // Update existing
        const { error } = await supabase
          .from("plugins")
          .update(pluginData)
          .eq("id", plugin.id);
        if (error) throw error;
        toast.success("Plugin updated");
      } else {
        // Create new
        const { error } = await supabase.from("plugins").insert([pluginData]);
        if (error) throw error;
        toast.success("Plugin created");
      }

      onSaved();
    } catch (error) {
      toast.error("Failed to save plugin");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1">
            Name *
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-neutral-800 border-neutral-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1">
            Slug *
          </label>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="bg-neutral-800 border-neutral-700 text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Preview URL *
        </label>
        <Input
          name="preview_url"
          type="url"
          value={formData.preview_url}
          onChange={handleChange}
          className="bg-neutral-800 border-neutral-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Gumroad URL *
        </label>
        <Input
          name="gumroad_url"
          type="url"
          value={formData.gumroad_url}
          onChange={handleChange}
          className="bg-neutral-800 border-neutral-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Cover Image URL
        </label>
        <Input
          name="cover"
          type="url"
          value={formData.cover}
          onChange={handleChange}
          className="bg-neutral-800 border-neutral-700 text-white"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded p-2"
          rows={4}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-neutral-700">
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {loading ? "Saving..." : plugin ? "Update Plugin" : "Create Plugin"}
        </Button>
      </div>
    </form>
  );
}
