import { Link } from "react-router-dom";
import WaveformPlayer from "./WaveformPlayer";
import Rating from "@/components/site/Rating";
import { withUtm, Product } from "@/lib/content";
import { DbProduct } from "@/lib/supabase";

type ProductType = Product | DbProduct;

export default function ProductCard({ product }: { product: ProductType }) {
  const previewUrl = "previewUrl" in product ? product.previewUrl : product.preview_url;
  const gumroadUrl = "gumroadUrl" in product ? product.gumroadUrl : product.gumroad_url;

  return (
    <div className="group rounded-lg overflow-hidden border border-border bg-secondary/60 hover:shadow-neon transition-shadow">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-square w-full bg-gradient-to-br from-[#1b1b1b] to-[#101010] overflow-hidden">
          {product.cover ? (
            <img
              src={product.cover}
              alt={`${product.name} cover`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
      </Link>
      <div className="p-4 grid gap-4">
        <WaveformPlayer url={previewUrl} />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link to={`/product/${product.slug}`} className="font-semibold hover:text-primary">
                {product.name}
              </Link>
              <Rating seed={product.slug} />
            </div>
            <div className="text-sm text-muted-foreground">${product.price}</div>
          </div>
          <a
            className="inline-flex items-center justify-center h-10 px-4 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors"
            href={withUtm(gumroadUrl, product.name)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Buy ${product.name} on Gumroad`}
            onClick={() => {
              if ((window as any).gtag) (window as any).gtag("event", "buy_click", { label: product.slug });
              if ((window as any).plausible) (window as any).plausible("BuyClick", { props: { slug: product.slug } });
            }}
          >
            BUY IT
          </a>
        </div>
      </div>
    </div>
  );
}
