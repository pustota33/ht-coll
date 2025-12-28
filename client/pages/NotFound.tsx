import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="grid place-items-center py-24 text-center">
      <div>
        <h1 className="text-5xl font-heading tracking-widest">404</h1>
        <p className="mt-3 text-muted-foreground">Page not found.</p>
        <a href="/" className="inline-block mt-6 h-11 px-6 rounded bg-primary text-primary-foreground hover:bg-destructive transition-colors">
          Go Home
        </a>
      </div>
    </section>
  );
};

export default NotFound;
