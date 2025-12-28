import { useState, useEffect } from "react";
import { withUtm } from "@/lib/content";
import { supabase, DbProduct, DbPlugin, DbBlogPost } from "@/lib/supabase";
import ProductCard from "@/components/site/ProductCard";
import ProductWave from "@/components/site/WaveformPlayer";
import Rating from "@/components/site/Rating";
import { Link } from "react-router-dom";
import BlogCard from "@/components/site/BlogCard";
import SignupBlock from "@/components/site/SignupBlock";
import HeroSpectrum from "@/components/site/HeroSpectrum";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Index() {
  const { settings } = useSiteSettings();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [plugins, setPlugins] = useState<DbPlugin[]>([]);
  const [blog, setBlog] = useState<DbBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, pluginsRes, blogRes] = await Promise.all([
          supabase.from("products").select("*"),
          supabase.from("plugins").select("*"),
          supabase.from("blog_posts").select("*"),
        ]);

        if (productsRes.data) setProducts(productsRes.data);
        if (pluginsRes.data) setPlugins(pluginsRes.data);
        if (blogRes.data) setBlog(blogRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="grid gap-16 animate-pulse"></div>;
  }

  return (
    <div className="grid gap-16">
      {/* Animated Spectrum Visualization */}
      <HeroSpectrum />

      {/* Hero intro minimal */}
      <section className="grid gap-6">
        <h1 className="text-4xl md:text-5xl">{settings["hero_title"] || "HardTechno Collective"}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {settings["hero_description"] || "A minimalist dark storefront for relentless hard techno & schranz. Fast audio preview, no accounts, direct Gumroad checkout."}
        </p>
      </section>

      {/* Latest Packs */}
      <section className="grid gap-8 animate-fadein">
        <h2 className="text-xl tracking-widest text-foreground/90">
          LATEST HARD TECHNO PACKS
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Plugins & Presets */}
      <section className="grid gap-8 bg-[#111111] rounded-2xl p-6 md:p-8">
        <h2 className="text-xl tracking-widest">VSTs, Racks & Presets</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plugins.slice(0, 4).map((pl) => (
            <div key={pl.slug} className="rounded-lg overflow-hidden border border-border bg-secondary/60 hover:shadow-neon transition-shadow p-4">
              <Link to={`/plugins/${pl.slug}`} className="block">
                <div className="aspect-square w-full bg-gradient-to-br from-[#1b1b1b] to-[#101010] overflow-hidden">
                  {pl.cover ? (
                    <img src={pl.cover} alt={`${pl.name} cover`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : null}
                </div>
              </Link>

              <div className="mt-4 grid gap-4">
                <div className="flex items-center gap-2">
                  <Link to={`/plugins/${pl.slug}`} className="font-semibold hover:text-primary">{pl.name}</Link>
                  <Rating seed={pl.slug} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Preview</div>
                  <div>
                    <div className="pt-1">
                      <ProductWave url={pl.preview_url} />
                    </div>
                  </div>
                </div>
                <a
                  className="inline-flex items-center justify-center h-10 px-4 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors"
                  href={withUtm(pl.gumroad_url, pl.name)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buy ${pl.name} on Gumroad`}
                  onClick={() => {
                    if ((window as any).gtag) (window as any).gtag("event", "buy_click", { label: pl.slug });
                    if ((window as any).plausible) (window as any).plausible("BuyClick", { props: { slug: pl.slug } });
                  }}
                >
                  BUY IT
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="grid gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl tracking-widest">Production Articles & Hard Techno Tips</h2>
          <a href="/blog" className="text-sm uppercase tracking-widest hover:text-primary">VIEW ALL ARTICLES</a>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blog.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Signup */}
      <SignupBlock />
    </div>
  );
}
