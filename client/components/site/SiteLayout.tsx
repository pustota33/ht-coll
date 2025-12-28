import { Outlet } from "react-router-dom";
import NavbarMinimal from "./NavbarMinimal";
import FooterMinimal from "./FooterMinimal";

export default function SiteLayout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <NavbarMinimal />
      <main className="container py-10 md:py-16">
        <Outlet />
      </main>
      <FooterMinimal />
    </div>
  );
}
