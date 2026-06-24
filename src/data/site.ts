export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "calendar";
};

export const site = {
  name: "Amos Eden",
  title: "Full Stack & React Native Mobile App Engineer",
  tagline:
    "Full Stack and React Native engineer exploring fintech and AI through concept products, portfolio demos, and production-quality code.",
  shortBio:
    "Product-focused engineer working across fintech, AI, and mobile — with an emphasis on scalable architecture, polished UI, and modern React ecosystems.",
  demoNote:
    "Featured concept builds below are portfolio demos deployed on Vercel — engineered to demonstrate craft, architecture, and stack depth.",
  email: "amos.eden56@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/El-idn", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amos-eden-7769a7244", icon: "linkedin" },
    { label: "Calendly", href: "https://calendly.com/amos-eden56/30min", icon: "calendar" },
  ] satisfies SocialLink[],
  stats: [
    { label: "Focus areas", value: 4, suffix: "" },
    { label: "Core stack", value: 3, suffix: "" },
    { label: "Deployment", value: 1, suffix: "" },
  ],
  statLabels: ["Fintech · AI · Mobile · Web", "React · RN · Node", "Vercel"],
  seo: {
    title: "Amos Eden — Full Stack & React Native Engineer | Fintech & AI Products",
    description:
      "Full Stack and React Native engineer showcasing fintech and AI work through portfolio demos, concept builds, and open-source projects on Vercel.",
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
