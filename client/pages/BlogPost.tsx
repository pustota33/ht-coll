import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, DbBlogPost, DbProduct } from "@/lib/supabase";
import ProductCard from "@/components/site/ProductCard";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<DbBlogPost | null>(null);
  const [others, setOthers] = useState<DbBlogPost[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      try {
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (postError || !postData) {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(postData);

        const { data: otherPosts } = await supabase
          .from("blog_posts")
          .select("*")
          .neq("slug", slug)
          .limit(4);
        setOthers(otherPosts || []);

        if (postData.products && postData.products.length > 0) {
          const { data: products } = await supabase
            .from("products")
            .select("*")
            .in("slug", postData.products);
          setFeaturedProducts(products || []);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="text-muted-foreground">Loading article...</div>;
  }

  if (!post) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-heading tracking-widest">Article Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The requested article does not exist. Go back to the {" "}
          <Link to="/blog" className="underline hover:text-primary">blog</Link>.
        </p>
      </section>
    );
  }

  return (
    <article className="grid gap-12">
      <header className="grid gap-6">
        <h1 className="text-3xl md:text-5xl">{post.title}</h1>
        <div className="mx-auto w-full max-w-3xl">
          <div className="aspect-video rounded-lg overflow-hidden border border-border bg-gradient-to-br from-[#141414] to-[#0c0c0c]">
            {post.cover ? (
              <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
            ) : null}
          </div>
        </div>
      </header>

      <div className="grid gap-8 max-w-3xl mx-auto w-full">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose-headings:text-lg prose-headings:font-semibold prose-p:text-muted-foreground prose-p:leading-relaxed" />
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="grid gap-6 border-t border-border/50 pt-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommended Tools</h3>
              <p className="text-sm text-muted-foreground">Perfect for implementing these techniques</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* You Might Also Like */}
      {others.length > 0 && (
        <section className="grid gap-6 border-t border-border/50 pt-12">
          <h2 className="text-xl tracking-widest">YOU MIGHT ALSO LIKE</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="block group no-underline">
                <article className="rounded-lg overflow-hidden border border-border bg-secondary/60 group-hover:shadow-neon transition-shadow h-full flex flex-col">
                  <div className="aspect-video w-full bg-gradient-to-br from-[#1b1b1b] to-[#101010] overflow-hidden">
                    {p.cover ? (
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                  <div className="p-4 grid gap-2 flex-1">
                    <div className="font-semibold group-hover:text-primary">
                      {p.title}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
