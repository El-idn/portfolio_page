export type ProjectCategory = "Fintech" | "AI" | "Full Stack";
export type ProjectStatus = "concept-demo" | "shipped";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  highlights: { label: string; value: string }[];
  caseStudySlug?: string;
  repoUrl?: string;
  liveUrl?: string;
  variant: "banking" | "ai" | "education" | "wallet" | "hero";
};

export const projectCategories: ProjectCategory[] = ["Fintech", "AI", "Full Stack"];

export const projects: Project[] = [
  {
    id: "portfolio-site",
    title: "Portfolio Landing Page",
    description:
      "This site — a React + Vite portfolio with case studies, command menu, and dark-mode design system, deployed on Vercel.",
    category: "Full Stack",
    status: "shipped",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion"],
    highlights: [
      { label: "Stack", value: "React + Vite" },
      { label: "UI", value: "Design system" },
      { label: "Features", value: "Case studies" },
      { label: "Deploy", value: "Vercel" },
    ],
    repoUrl: "https://github.com/El-idn/portfolio_page",
    variant: "hero",
  },
  {
    id: "open-banking",
    title: "Open Banking Dashboard",
    description:
      "Fintech dashboard deployed on Vercel — exploring unified financial data views, bank API integration patterns, and analytics UI.",
    category: "Fintech",
    status: "shipped",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Plaid API"],
    highlights: [
      { label: "Focus", value: "Dashboard UI" },
      { label: "Patterns", value: "API integration" },
      { label: "Layout", value: "Responsive" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudySlug: "open-banking-dashboard",
    liveUrl: "https://open-banking-dashboard-zeta.vercel.app/login",
    variant: "banking",
  },
  {
    id: "ai-pm-assistant",
    title: "AI Product Management Assistant",
    description:
      "AI SaaS copilot deployed on Vercel — exploring streaming UI, RAG workflows, and copilot patterns for roadmap and spec generation.",
    category: "AI",
    status: "shipped",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind", "Vercel"],
    highlights: [
      { label: "Focus", value: "Streaming UI" },
      { label: "Workflow", value: "RAG pipeline" },
      { label: "Backend", value: "Supabase + OpenAI" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudySlug: "ai-product-management-assistant",
    liveUrl: "https://ai-product-manager-flame.vercel.app/",
    variant: "ai",
  },
  {
    id: "campus-vote",
    title: "Campus Vote",
    description:
      "Live voting platform for campus elections — ballot flows, admin views, and real-time results, deployed on Vercel.",
    category: "Full Stack",
    status: "shipped",
    technologies: ["React", "TypeScript", "Vercel", "Tailwind"],
    highlights: [
      { label: "Focus", value: "Voting flows" },
      { label: "Views", value: "Admin dashboard" },
      { label: "Deploy", value: "Vercel" },
      { label: "Status", value: "Live" },
    ],
    liveUrl: "https://campus-vote-nine.vercel.app/",
    variant: "education",
  },
  {
    id: "education-quiz",
    title: "Education Quiz Platform",
    description:
      "Concept learning platform with live assessments and instructor dashboards — exploring real-time quiz flows and performance views.",
    category: "Full Stack",
    status: "concept-demo",
    technologies: ["React", "GraphQL", "Redis", "AWS", "Prisma"],
    highlights: [
      { label: "Focus", value: "Live quiz flow" },
      { label: "Views", value: "Instructor dashboard" },
      { label: "API", value: "GraphQL schema" },
      { label: "Deploy", value: "Vercel" },
    ],
    variant: "education",
  },
  {
    id: "fintech-wallet",
    title: "Fintech Wallet System",
    description:
      "Concept cross-platform wallet exploring instant transfers, spending insights, and KYC flow screens — built with React Native for iOS and Android.",
    category: "Fintech",
    status: "concept-demo",
    technologies: ["React Native", "NestJS", "Stripe", "Kafka", "Docker"],
    highlights: [
      { label: "Focus", value: "React Native UI" },
      { label: "Flows", value: "KYC screens" },
      { label: "Platform", value: "Cross-platform" },
      { label: "Deploy", value: "Vercel" },
    ],
    variant: "wallet",
  },
];

export function getLiveDemoProjects() {
  return projects.filter((project) => project.liveUrl);
}
