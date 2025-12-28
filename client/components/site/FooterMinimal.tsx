import { Link } from "react-router-dom";
import { Instagram, Youtube, MessageSquareMore, Music2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const menu = [
  { to: "/", label: "All Products" },
  { to: "/shop", label: "Samples" },
  { to: "/plugins", label: "Plugins" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function FooterMinimal() {
  const { settings } = useSiteSettings();

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
    <footer className="mt-24 border-t border-border/60 bg-secondary/50">
      <div className="container py-12 grid gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-heading text-xl tracking-widest">
              {settings["footer_title"] || "HARDTECHNO COLLECTIVE"}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {settings["footer_subtitle"] || "Hard Techno Lives Here."}
            </p>
          </div>
          <nav className="flex gap-6 text-sm uppercase tracking-widest">
            {menu.map((m) => (
              <Link key={m.to} to={m.to} className="hover:text-primary">
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="hover:text-primary"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground border-t border-border/60 pt-6">
          <p>{settings["footer_copyright"] || "© 2025 HardTechno Collective"}</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
