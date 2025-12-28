import { useState, useEffect } from "react";
import { supabase, DbProduct } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { uploadAudioFile } from "@/lib/storage";

interface ProductFormProps {
  product?: DbProduct;
  onSaved: () => void;
}

export default function ProductForm({ product, onSaved }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    price: 0,
    preview_url: "",
    gumroad_url: "",
    cover: "",
    description: "",
    bpm: "",
    key: "",
    format: "",
    size: "",
    type: "",
    demos: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        slug: product.slug,
        name: product.name,
        price: product.price,
        preview_url: product.preview_url,
        gumroad_url: product.gumroad_url,
        cover: product.cover || "",
        description: product.description || "",
        bpm: product.specs?.bpm || "",
        key: product.specs?.key || "",
        format: product.specs?.format || "",
        size: product.specs?.size || "",
        type: product.specs?.type || "",
        demos: product.demos?.join("\n") || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadAudioFile(file);
      setFormData((prev) => ({
        ...prev,
        preview_url: url,
      }));
      toast.success("Audio uploaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const specs = {
        bpm: formData.bpm,
        key: formData.key,
        format: formData.format,
        size: formData.size,
        type: formData.type,
      };

      const demos = formData.demos
        .split("\n")
        .map((d) => d.trim())
        .filter((d) => d);

      const productData = {
        slug: formData.slug,
        name: formData.name,
        price: parseFloat(String(formData.price)),
        preview_url: formData.preview_url,
        gumroad_url: formData.gumroad_url,
        cover: formData.cover || null,
        description: formData.description || null,
        specs: Object.values(specs).some((v) => v) ? specs : null,
        demos: demos.length > 0 ? demos : null,
        updated_at: new Date().toISOString(),
      };

      if (product) {
        // Update existing
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        // Create new
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        toast.success("Product created");
      }

      onSaved();
    } catch (error) {
      toast.error("Failed to save product");
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
          Price ($) *
        </label>
        <Input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          className="bg-neutral-800 border-neutral-700 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Preview Audio File * (upload MP3 or paste URL)
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              disabled={uploading}
              className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 text-white rounded text-sm file:bg-neutral-700 file:text-white file:border-0 file:px-3 file:py-1 file:rounded"
            />
            {uploading && <span className="text-neutral-400 text-sm">Uploading...</span>}
          </div>
          <Input
            name="preview_url"
            type="url"
            value={formData.preview_url}
            onChange={handleChange}
            className="bg-neutral-800 border-neutral-700 text-white"
            placeholder="https://... (auto-filled after upload)"
            required
          />
          {formData.preview_url && (
            <div className="text-xs text-green-400">✓ Preview URL set</div>
          )}
        </div>
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
          rows={3}
        />
      </div>

      <div className="border-t border-neutral-700 pt-4">
        <h3 className="text-sm font-medium text-neutral-200 mb-3">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              BPM
            </label>
            <Input
              name="bpm"
              value={formData.bpm}
              onChange={handleChange}
              placeholder="140–155"
              className="bg-neutral-800 border-neutral-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Key
            </label>
            <Input
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="Various"
              className="bg-neutral-800 border-neutral-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Format
            </label>
            <Input
              name="format"
              value={formData.format}
              onChange={handleChange}
              placeholder="WAV 24-bit"
              className="bg-neutral-800 border-neutral-700 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Size
            </label>
            <Input
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="850MB"
              className="bg-neutral-800 border-neutral-700 text-white text-xs"
            />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Type
          </label>
          <Input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Drums & Loops"
            className="bg-neutral-800 border-neutral-700 text-white text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Demo URLs (one per line)
        </label>
        <textarea
          name="demos"
          value={formData.demos}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded p-2 text-xs"
          rows={3}
          placeholder="https://example.com/demo1.mp3&#10;https://example.com/demo2.mp3"
        />
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-neutral-700">
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
