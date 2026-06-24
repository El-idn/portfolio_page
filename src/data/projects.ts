export type ProjectCategory = "Fintech" | "AI" | "Full Stack";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  metrics: { label: string; value: string }[];
  caseStudySlug?: string;
  variant: "banking" | "ai" | "education" | "wallet";
};

export const projectCategories: ProjectCategory[] = ["Fintech", "AI", "Full Stack"];

export const projects: Project[] = [
  {
    id: "open-banking",
    title: "Open Banking Dashboard",
    description:
      "Unified financial data platform connecting multiple bank APIs with real-time transaction analytics for product teams.",
    category: "Fintech",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Plaid API"],
    metrics: [
      { label: "API latency", value: "<120ms" },
      { label: "Institutions", value: "40+" },
    ],
    caseStudySlug: "open-banking-dashboard",
    variant: "banking",
  },
  {
    id: "ai-pm-assistant",
    title: "AI Product Management Assistant",
    description:
      "SaaS copilot that turns customer feedback, specs, and metrics into prioritized roadmaps and release notes.",
    category: "AI",
    technologies: ["Next.js", "OpenAI", "Supabase", "Tailwind", "Vercel"],
    metrics: [
      { label: "Time saved", value: "35%" },
      { label: "Teams onboarded", value: "18" },
    ],
    caseStudySlug: "ai-product-management-assistant",
    variant: "ai",
  },
  {
    id: "education-quiz",
    title: "Education Quiz Platform",
    description:
      "Adaptive learning platform with live assessments, instructor dashboards, and performance insights at scale.",
    category: "Full Stack",
    technologies: ["React", "GraphQL", "Redis", "AWS", "Prisma"],
    metrics: [
      { label: "Active learners", value: "25K+" },
      { label: "Uptime", value: "99.9%" },
    ],
    variant: "education",
  },
  {
    id: "fintech-wallet",
    title: "Fintech Wallet System",
    description:
      "Cross-platform digital wallet with instant transfers, spending insights, and compliance-ready KYC flows — built with React Native for iOS and Android.",
    category: "Fintech",
    technologies: ["React Native", "NestJS", "Stripe", "Kafka", "Docker"],
    metrics: [
      { label: "Transactions/mo", value: "1.2M" },
      { label: "Fraud reduction", value: "28%" },
    ],
    variant: "wallet",
  },
];
