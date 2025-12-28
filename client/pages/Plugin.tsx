import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { withUtm } from "@/lib/content";
import { supabase, DbPlugin } from "@/lib/supabase";
import WaveformPlayer from "@/components/site/WaveformPlayer";
import Rating from "@/components/site/Rating";

export default function PluginPage() {
  const { slug } = useParams();
  const [plugin, setPlugin] = useState<DbPlugin | null>(null);
  const [others, setOthers] = useState<DbPlugin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlugin = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("plugins")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          setPlugin(null);
        } else {
          setPlugin(data);

          const { data: otherData } = await supabase
            .from("plugins")
            .select("*")
            .neq("slug", slug)
            .limit(4);
          setOthers(otherData || []);
        }
      } catch (error) {
        console.error("Error fetching plugin:", error);
        setPlugin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlugin();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="text-muted-foreground">Loading plugin...</div>;
  }

  if (!plugin) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-heading tracking-widest">Plugin Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The requested plugin does not exist. Go back to the {" "}
          <Link to="/plugins" className="underline hover:text-primary">plugins</Link> page.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-12">
      {/* Hero - Side by Side Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border border-border bg-gradient-to-br from-[#1b1b1b] to-[#101010] grid place-items-center">
            {plugin.cover ? (
              <img
                src={plugin.cover}
                alt={plugin.name}
                className="object-cover w-full h-full"
              />
            ) : null}
          </div>
        </div>

        {/* Right: Content */}
        <div className="grid gap-6 h-fit">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">{plugin.name}</h1>
            <Rating seed={plugin.slug} className="text-sm text-muted-foreground" />
          </div>

          <a
            className="inline-flex items-center justify-center h-11 px-6 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors shadow-neon w-full md:w-auto"
            href={withUtm(plugin.gumroad_url, plugin.name)}
            target="_blank"
            rel="noreferrer"
          >
            BUY IT ON GUMROAD
          </a>

          {plugin.description && (
            <p className="text-muted-foreground">{plugin.description}</p>
          )}

          <div className="border-t border-border/50 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-3">Preview</h3>
            <WaveformPlayer url={plugin.preview_url} />
          </div>
        </div>
      </section>

      {/* You Might Also Like */}
      {others.length > 0 && (
        <section className="grid gap-6 border-t border-border/50 pt-12">
          <h2 className="text-xl tracking-widest">YOU MIGHT ALSO LIKE</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {others.map((pl) => (
              <Link key={pl.slug} to={`/plugins/${pl.slug}`} className="block group no-underline">
                <article className="rounded-lg overflow-hidden border border-border bg-secondary/60 group-hover:shadow-neon transition-shadow h-full flex flex-col">
                  <div className="aspect-square w-full bg-gradient-to-br from-[#1b1b1b] to-[#101010] overflow-hidden">
                    {pl.cover ? (
                      <img src={pl.cover} alt={`${pl.name} cover`} className="w-full h-full object-cover pointer-events-none" loading="lazy" decoding="async" />
                    ) : null}
                  </div>
                  <div className="p-4 grid gap-2 flex-1">
                    <div className="font-semibold group-hover:text-primary">
                      {pl.name}
                    </div>
                    <Rating seed={pl.slug} />
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
