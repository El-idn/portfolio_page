export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "calendar";
};

export const site = {
  name: "Amos Eden",
  title: "Full Stack & React Native Mobile App Engineer",
  tagline:
    "Full Stack and React Native engineer building AI and fintech products — from mobile apps to scalable web systems, product UX, and modern architecture.",
  shortBio:
    "Product-focused engineer shipping React Native mobile apps, fintech platforms, open banking integrations, and AI-powered SaaS tools for teams that care about craft and velocity.",
  email: "amos.eden56@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/El-idn", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amos-eden-7769a7244", icon: "linkedin" },
    { label: "Calendly", href: "https://calendly.com/amos-eden56/30min", icon: "calendar" },
    { label: "X", href: "https://x.com/example", icon: "twitter" },
  ] satisfies SocialLink[],
  stats: [
    { label: "Years building products", value: 6 },
    { label: "Products shipped", value: 12 },
    { label: "Engineering domains", value: 5 },
  ],
  seo: {
    title: "Amos Eden — Full Stack & React Native Engineer | Fintech & AI Products",
    description:
      "Full Stack and React Native mobile app engineer building fintech and AI products for modern digital experiences. Open banking, cross-platform mobile, and product UX engineering.",
    url: "https://amoseden.dev",
    ogImage: "/og-image.svg",
  },
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export type NavItem = (typeof navItems)[number];
