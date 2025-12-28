import { FormEvent, useState } from "react";

export default function SignupBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative rounded-2xl border border-border/60 bg-gradient-to-b from-secondary to-background p-8 md:p-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(156,39,255,0.15)" }} />
      <div className="relative grid gap-6 max-w-2xl">
        <h3 className="text-2xl md:text-3xl font-heading tracking-widest">JOIN THE UNDERGROUND</h3>
        <p className="text-muted-foreground">Subscribe for exclusive packs & updates</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            aria-label="Email address"
            className="flex-1 h-11 rounded-md bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary px-4 placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-md bg-primary text-primary-foreground hover:bg-destructive transition-colors shadow-neon"
          >
            JOIN NOW
          </button>
        </form>
        {status === "ok" && (
          <p className="text-xs text-green-400">Thanks!</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
