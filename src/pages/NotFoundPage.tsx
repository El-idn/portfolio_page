import { Link } from "react-router-dom";
import { Seo } from "@/components/shared/Seo";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you are looking for does not exist." />
      <Section id="not-found" className="pt-32">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-primary text-sm font-medium uppercase">404</p>
          <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            The page you requested doesn&apos;t exist or may have moved.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
