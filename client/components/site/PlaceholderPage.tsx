export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="grid gap-4 place-items-center text-center py-24">
      <h1 className="text-3xl md:text-4xl font-heading tracking-widest">{title}</h1>
      <p className="text-muted-foreground max-w-xl">
        This page is set up and ready. Tell me to fill it with content next.
      </p>
    </section>
  );
}
