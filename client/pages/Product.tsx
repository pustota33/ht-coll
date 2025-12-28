import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { withUtm } from "@/lib/content";
import { supabase, DbProduct } from "@/lib/supabase";
import WaveformPlayer from "@/components/site/WaveformPlayer";
import Rating from "@/components/site/Rating";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [others, setOthers] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          setProduct(null);
        } else {
          setProduct(data);

          const { data: otherData } = await supabase
            .from("products")
            .select("*")
            .neq("slug", slug)
            .limit(4);
          setOthers(otherData || []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="text-muted-foreground">Loading product...</div>;
  }

  if (!product) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-heading tracking-widest">Product Not Found</h1>
      </section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    sku: product.slug,
    image: product.cover || "/placeholder.svg",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: product.gumroad_url,
    },
  };

  return (
    <div className="grid gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero - Side by Side Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-border bg-gradient-to-br from-[#1b1b1b] to-[#101010] grid place-items-center">
            <img
              src={product.cover || "https://placehold.co/500x500/111/FFF?text=No+Cover"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="grid gap-6 h-fit">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">{product.name}</h1>
            <Rating seed={product.slug} className="text-sm text-muted-foreground" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">${product.price}</span>
          </div>

          <a
            className="inline-flex items-center justify-center h-11 px-6 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors shadow-neon w-full md:w-auto"
            href={withUtm(product.gumroad_url, product.name)}
            target="_blank"
            rel="noreferrer"
          >
            BUY IT ON GUMROAD
          </a>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="border-t border-border/50 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-3">Preview</h3>
            <WaveformPlayer url={product.preview_url} />
          </div>
        </div>
      </section>

      {/* Additional Demos */}
      {product.demos && product.demos.length > 1 && (
        <section className="grid gap-6 border-t border-border/50 pt-12">
          <h2 className="text-xl tracking-widest">MORE PREVIEW TRACKS</h2>
          <div className="grid gap-4">
            {product.demos.slice(1).map((u, i) => (
              <WaveformPlayer key={i} url={u} />
            ))}
          </div>
        </section>
      )}

      {/* Specs */}
      {product.specs && (
        <section className="grid gap-6">
          <h2 className="text-xl tracking-widest">PRODUCT SPECS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {(product.specs as any).bpm && (
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <div className="text-muted-foreground">BPM RANGE</div>
                <div className="font-semibold">{(product.specs as any).bpm}</div>
              </div>
            )}
            {(product.specs as any).key && (
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <div className="text-muted-foreground">KEY</div>
                <div className="font-semibold">{(product.specs as any).key}</div>
              </div>
            )}
            {(product.specs as any).format && (
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <div className="text-muted-foreground">FORMAT</div>
                <div className="font-semibold">{(product.specs as any).format}</div>
              </div>
            )}
            {(product.specs as any).size && (
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <div className="text-muted-foreground">SIZE</div>
                <div className="font-semibold">{(product.specs as any).size}</div>
              </div>
            )}
            {(product.specs as any).type && (
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <div className="text-muted-foreground">TYPE</div>
                <div className="font-semibold">{(product.specs as any).type}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* You Might Also Like */}
      {others.length > 0 && (
        <section className="grid gap-6 border-t border-border/50 pt-12">
          <h2 className="text-xl tracking-widest">YOU MIGHT ALSO LIKE</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="block group no-underline">
                <article className="rounded-lg overflow-hidden border border-border bg-secondary/60 group-hover:shadow-neon transition-shadow h-full flex flex-col">
                  <div className="aspect-square w-full bg-gradient-to-br from-[#1b1b1b] to-[#101010] overflow-hidden">
                    {p.cover ? (
                      <img src={p.cover} alt={`${p.name} cover`} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                  <div className="p-4 grid gap-2 flex-1">
                    <div className="font-semibold group-hover:text-primary">
                      {p.name}
                    </div>
                    <div className="text-sm text-muted-foreground">${p.price}</div>
                    <Rating seed={p.slug} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
