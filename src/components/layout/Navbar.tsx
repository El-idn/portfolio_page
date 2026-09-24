import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ExternalLink,
  FolderKanban,
  Home,
  Mail,
  Moon,
  Network,
  Search,
  Sun,
  User,
} from "lucide-react";
import { caseStudies, getCaseStudyTitle } from "@/data/caseStudies";
import { getLiveDemoProjects } from "@/data/projects";
import { navItems, site } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToSection, cn } from "@/lib/utils";
import { useThemeContext } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const sectionIds = ["home", "projects", "case-studies", "architecture", "about", "contact"];

const iconMap = {
  Home,
  Projects: FolderKanban,
  "Case Studies": BookOpen,
  Architecture: Network,
  About: User,
  Contact: Mail,
};

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeSection = (href: string) => {
    onOpenChange(false);
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: id });
      setTimeout(() => scrollToSection(id), 100);
      return;
    }
    scrollToSection(id);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Command Menu">
      <CommandInput placeholder="Search pages, projects, and sections..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => {
            const Icon = iconMap[item.label as keyof typeof iconMap] ?? Home;
            const isLargeOnly = item.href === "#architecture";
            return (
              <CommandItem
                key={item.href}
                onSelect={() => goHomeSection(item.href)}
                className={cn(isLargeOnly && "hidden lg:flex")}
              >
                <Icon className="size-4" />
                {item.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Live demos">
          {getLiveDemoProjects().map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => {
                onOpenChange(false);
                if (project.liveUrl) {
                  window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <ExternalLink className="size-4" />
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Case Studies">
          {caseStudies.map((study) => (
            <CommandItem
              key={study.slug}
              onSelect={() => {
                onOpenChange(false);
                navigate(`/case-studies/${study.slug}`);
              }}
            >
              <BookOpen className="size-4" />
              {getCaseStudyTitle(study)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const activeId = useScrollSpy(sectionIds);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    if (isHome) {
      scrollToSection(id);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "border-border bg-background/80 border-b backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            {site.name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = isHome && activeId === id;
              const isLargeOnly = item.href === "#architecture";
              return (
                <Link
                  key={item.href}
                  to={{ pathname: "/", hash: id }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isLargeOnly && "hidden lg:inline-flex",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setCommandOpen(true)}
            >
              <Search className="size-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="bg-muted text-muted-foreground hidden rounded px-1.5 py-0.5 text-[10px] lg:inline">
                ⌘K
              </kbd>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between gap-0 p-0">
                <div>
                  <SheetHeader className="p-5 pb-4 border-b border-border/60 text-left pr-10">
                    <SheetTitle className="text-base font-semibold tracking-tight text-foreground">
                      {site.name}
                    </SheetTitle>
                    <p className="text-xs text-muted-foreground font-medium">
                      Full Stack &amp; React Native
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>{site.availability}</span>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col gap-1.5 p-3 pt-4">
                    {navItems
                      .filter((item) => item.href !== "#architecture")
                      .map((item) => {
                        const id = item.href.replace("#", "");
                        const isActive = isHome && activeId === id;
                        const Icon = iconMap[item.label as keyof typeof iconMap] ?? Home;
                        return (
                          <SheetClose asChild key={item.href}>
                            <Link
                              to={{ pathname: "/", hash: id }}
                              onClick={() => handleNavClick(item.href)}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                  ? "bg-accent text-accent-foreground font-semibold"
                                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex size-7 items-center justify-center rounded-md transition-colors",
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                <Icon className="size-4" />
                              </div>
                              <span>{item.label}</span>
                              {isActive && (
                                <span className="ml-auto size-1.5 rounded-full bg-primary" />
                              )}
                            </Link>
                          </SheetClose>
                        );
                      })}
                  </div>
                </div>

                <div className="p-4 border-t border-border/60 mt-auto bg-muted/10">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="font-medium">Connect</span>
                    <span className="font-mono text-[10.5px] opacity-80">{site.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {site.social.map((soc) => (
                      <a
                        key={soc.label}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-3 rounded-lg border border-border bg-card/70 hover:bg-accent text-xs font-medium text-foreground transition-colors"
                      >
                        {soc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
