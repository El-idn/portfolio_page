export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail";
};

export const site = {
  name: "Eden Amos",
  title: "Full Stack & React Native Mobile App Engineer",
  tagline:
    "Full Stack and React Native engineer shipping fintech, AI, and SME product demos with production-quality code.",
  shortBio:
    "Full Stack and React Native engineer building fintech, AI, and SME product UIs. I ship live demos with clear architecture and honest scope — including FreBob, OpenBank NG, and CampusVote NG.",
  demoNote:
    "Featured projects include live demos on Vercel and Render, with case studies that document real architecture and UI decisions.",
  email: "amos.eden56@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/El-idn", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amos-eden-7769a7244", icon: "linkedin" },
  ] satisfies SocialLink[],
  stats: [
    { label: "Live demos", value: 5, suffix: "" },
    { label: "Case studies", value: 4, suffix: "" },
    { label: "Focus", value: 1, suffix: "" },
  ],
  statLabels: ["5 shipped", "4 walkthroughs", "Fintech · AI · Mobile"],
  seo: {
    title: "Eden Amos — Full Stack & React Native Engineer | Fintech & AI Products",
    description:
      "Full Stack and React Native engineer showcasing fintech and AI work through live demos, technical case studies, and open-source projects.",
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
