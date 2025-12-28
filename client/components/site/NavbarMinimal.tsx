import { Link, NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "All Products" },
  { to: "/shop", label: "Samples" },
  { to: "/plugins", label: "Plugins" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function NavbarMinimal() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-heading text-lg tracking-widest text-foreground">
          HARDTECHNO COLLECTIVE
        </Link>
        <nav className="hidden md:flex gap-8">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm uppercase tracking-widest transition-colors ${
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="w-24" />
      </div>
    </header>
  );
}
