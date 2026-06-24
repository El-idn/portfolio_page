import { site } from "@/data/site";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-border border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="text-muted-foreground text-sm">{site.title}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <Separator className="my-6" />
      <p className="text-muted-foreground mx-auto max-w-6xl px-4 text-center text-xs sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {site.name}. Built with React, Vite, and Tailwind CSS.
      </p>
    </footer>
  );
}
