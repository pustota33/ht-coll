import { Link } from "react-router-dom";
import { BlogPost } from "@/lib/content";
import { DbBlogPost } from "@/lib/supabase";

type BlogPostType = BlogPost | DbBlogPost;

export default function BlogCard({ post }: { post: BlogPostType }) {
  return (
    <article className="rounded-lg overflow-hidden border border-border bg-secondary/60">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-video w-full bg-gradient-to-br from-[#141414] to-[#0c0c0c] overflow-hidden">
          {post.cover ? (
            <img src={post.cover} alt={post.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          ) : null}
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/blog/${post.slug}`} className="font-semibold hover:text-primary">
          {post.title}
        </Link>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      </div>
    </article>
  );
}
