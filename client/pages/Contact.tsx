import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Instagram, Youtube, MessageSquareMore, Music2 } from "lucide-react";

export default function Contact() {
  const { settings, loading } = useSiteSettings();

  if (loading) {
    return <div className="grid gap-16 animate-pulse">Loading...</div>;
  }

  const socialLinks = [
    {
      href: settings["footer_youtube"] || "https://youtube.com",
      icon: Youtube,
      label: "YouTube",
    },
    {
      href: settings["footer_instagram"] || "https://instagram.com",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: settings["footer_soundcloud"] || "https://soundcloud.com",
      icon: Music2,
      label: "SoundCloud",
    },
    {
      href: settings["footer_telegram"] || "https://t.me",
      icon: MessageSquareMore,
      label: "Telegram",
    },
  ];

  return (
    <div className="grid gap-8">
      <header className="grid gap-3">
        <h1 className="text-3xl md:text-4xl">Get in Touch</h1>
        <p className="text-muted-foreground">
          {settings["contact_text"] || "We reply within 24–48 hours. Or email contact@hardtechnodna.com"}
        </p>
      </header>

      <div className="grid gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="hover:text-primary transition-colors"
                >
                  <Icon size={32} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
