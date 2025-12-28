import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Terms() {
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return <div className="grid gap-16 animate-pulse">Loading...</div>;
  }

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="text-3xl md:text-4xl">Terms of Service</h1>
      </header>
      <article className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-muted-foreground">
          {settings["terms_content"] || "Terms of Service content will appear here."}
        </div>
      </article>
    </div>
  );
}
