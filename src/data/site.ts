export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail";
};

export const site = {
  name: "Eden Amos",
  title: "Full Stack & React Native Mobile App Engineer",
  tagline:
    "I turn messy product flows into clear UIs you can click - mobile, web, and AI.",
  shortBio:
    "Full stack and React Native engineer. Expo mobile to Node APIs - ops tools, AI workflows, and complex dashboards.",
  demoNote: "All featured apps are live.",
  availability: "Open for freelance · remote",
  email: "amos.eden56@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/El-idn", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amos-eden-7769a7244", icon: "linkedin" },
  ] satisfies SocialLink[],
  stats: [
    { label: "Live demos", value: 5, suffix: "" },
    { label: "Case studies", value: 4, suffix: "" },
    { label: "Craft", value: 1, suffix: "" },
  ],
  statLabels: ["5 shipped", "4 walkthroughs", "Mobile · Web · AI"],
  seo: {
    title: "Eden Amos - Full Stack & React Native Engineer",
    description:
      "Full Stack and React Native engineer. Live demos, technical case studies, and product UIs across mobile, web, and AI.",
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
