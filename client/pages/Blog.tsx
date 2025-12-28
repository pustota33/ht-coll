import { useState, useEffect } from "react";
import { supabase, DbBlogPost } from "@/lib/supabase";
import BlogCard from "@/components/site/BlogCard";

export default function Blog() {
  const [posts, setPosts] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("blog_posts").select("*");
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="text-3xl md:text-4xl">The Underground Journal</h1>
        <p className="text-muted-foreground">Production, sound design, mixing and news — focused on hard techno.</p>
      </header>

      {loading ? (
        <div className="text-muted-foreground">Loading blog posts...</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
