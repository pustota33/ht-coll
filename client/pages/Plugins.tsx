import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withUtm } from "@/lib/content";
import { supabase, DbPlugin } from "@/lib/supabase";
import WaveformPlayer from "@/components/site/WaveformPlayer";
import Rating from "@/components/site/Rating";

export default function Plugins() {
  const [plugins, setPlugins] = useState<DbPlugin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        const { data, error } = await supabase.from("plugins").select("*");
        if (error) throw error;
        setPlugins(data || []);
      } catch (error) {
        console.error("Error fetching plugins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlugins();
  }, []);

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="text-3xl md:text-4xl">VSTs, Racks & Presets</h1>
        <p className="text-muted-foreground">Creative tools and presets for brutal warehouse sound.</p>
      </header>

      {loading ? (
        <div className="text-muted-foreground">Loading plugins...</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plugins.map((pl) => (
            <article key={pl.slug} className="rounded-lg overflow-hidden border border-border bg-secondary/60 hover:shadow-neon transition-shadow p-4">
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
                <WaveformPlayer url={pl.preview_url} />
                <a
                  className="inline-flex items-center justify-center h-10 px-4 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors"
                  href={withUtm(pl.gumroad_url, pl.name)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buy ${pl.name} on Gumroad`}
                >
                  BUY IT
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="grid gap-4">
        <h2 className="text-xl tracking-widest">Installation Guides</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border border-border p-4 bg-secondary/50">
            <div className="font-semibold mb-2">Ableton Racks</div>
            <p className="text-sm text-muted-foreground">Drag the .adg into User Library &gt; Presets &gt; Audio Effects.</p>
          </div>
          <div className="rounded-md border border-border p-4 bg-secondary/50">
            <div className="font-semibold mb-2">Max for Live</div>
            <p className="text-sm text-muted-foreground">Open the .amxd file or drop onto a track to install.</p>
          </div>
          <div className="rounded-md border border-border p-4 bg-secondary/50">
            <div className="font-semibold mb-2">Synth Presets</div>
            <p className="text-sm text-muted-foreground">Import via synth preset manager (Serum, Vital, etc.).</p>
          </div>
        </div>
      </section>
    </div>
  );
}
