import { useState, useEffect } from "react";
import { supabase, DbBlogPost } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import BlogPostForm from "./BlogPostForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BlogPostsManager() {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<DbBlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("blog_posts").select("*");
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error("Failed to fetch blog posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      setPosts(posts.filter((p) => p.id !== id));
      toast.success("Blog post deleted");
    } catch (error) {
      toast.error("Failed to delete blog post");
      console.error(error);
    }
  };

  const handleEditPost = (post: DbBlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const handlePostSaved = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
    fetchPosts();
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search blog posts by title or slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-neutral-900 border-neutral-700 text-white"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddPost}
              className="bg-white text-black hover:bg-neutral-200 whitespace-nowrap"
            >
              + Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <BlogPostForm
              post={editingPost || undefined}
              onSaved={handlePostSaved}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-neutral-400">Loading blog posts...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-neutral-400">No blog posts found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 px-4 text-neutral-300">Title</th>
                <th className="text-left py-3 px-4 text-neutral-300">Slug</th>
                <th className="text-left py-3 px-4 text-neutral-300">Created</th>
                <th className="text-left py-3 px-4 text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-neutral-800 hover:bg-neutral-900">
                  <td className="py-3 px-4 text-white">{post.title}</td>
                  <td className="py-3 px-4 text-neutral-400">{post.slug}</td>
                  <td className="py-3 px-4 text-neutral-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditPost(post)}
                        size="sm"
                        className="bg-neutral-700 text-white hover:bg-neutral-600"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeletePost(post.id)}
                        size="sm"
                        className="bg-red-900 text-white hover:bg-red-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
