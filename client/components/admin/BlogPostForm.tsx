import { useState, useEffect } from "react";
import { supabase, DbBlogPost } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BlogPostFormProps {
  post?: DbBlogPost;
  onSaved: () => void;
}

export default function BlogPostForm({ post, onSaved }: BlogPostFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    cover: "",
    content: "",
    products: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        cover: post.cover || "",
        content: post.content,
        products: post.products?.join("\n") || "",
      });
    }
  }, [post]);

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
      const products = formData.products
        .split("\n")
        .map((p) => p.trim())
        .filter((p) => p);

      const postData = {
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        cover: formData.cover || null,
        content: formData.content,
        products: products.length > 0 ? products : null,
        updated_at: new Date().toISOString(),
      };

      if (post) {
        // Update existing
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id);
        if (error) throw error;
        toast.success("Blog post updated");
      } else {
        // Create new
        const { error } = await supabase.from("blog_posts").insert([postData]);
        if (error) throw error;
        toast.success("Blog post created");
      }

      onSaved();
    } catch (error) {
      toast.error("Failed to save blog post");
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
            Title *
          </label>
          <Input
            name="title"
            value={formData.title}
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
          Excerpt *
        </label>
        <Input
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="bg-neutral-800 border-neutral-700 text-white"
          placeholder="Brief summary of the blog post"
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
          Content (HTML) *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded p-2 font-mono text-xs"
          rows={8}
          placeholder="<h2>Heading</h2><p>Paragraph content...</p>"
          required
        />
        <p className="text-xs text-neutral-400 mt-2">
          Use HTML tags for content formatting. Supported: h2, h3, p, strong, em, a, ul, ol, li
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-1">
          Related Product Slugs (one per line)
        </label>
        <textarea
          name="products"
          value={formData.products}
          onChange={handleChange}
          className="w-full bg-neutral-800 border border-neutral-700 text-white rounded p-2 text-xs"
          rows={3}
          placeholder="schranz-alpha&#10;dna-kicks-vol1&#10;fm-kicks"
        />
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-neutral-700">
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {loading ? "Saving..." : post ? "Update Blog Post" : "Create Blog Post"}
        </Button>
      </div>
    </form>
  );
}
