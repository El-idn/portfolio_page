import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  FolderKanban,
  Home,
  Mail,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
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

const sectionIds = ["home", "projects", "case-studies", "about", "contact"];

const iconMap = {
  Home,
  Projects: FolderKanban,
  "Case Studies": BookOpen,
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
            return (
              <CommandItem key={item.href} onSelect={() => goHomeSection(item.href)}>
                <Icon className="size-4" />
                {item.label}
              </CommandItem>
            );
          })}
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
              {study.title}
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
              return (
                <Link
                  key={item.href}
                  to={{ pathname: "/", hash: id }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
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
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        to={{ pathname: "/", hash: item.href.replace("#", "") }}
                        onClick={() => handleNavClick(item.href)}
                        className="hover:bg-accent rounded-md px-3 py-2 text-sm"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
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
