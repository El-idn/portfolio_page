import { site } from "@/data/site";
import campusVoteScreenshot from "@/assets/CampusVote.png";
import frebobScreenshot from "@/assets/FreBob.png";
import openBankingScreenshot from "@/assets/OpenBanking.png";
import portfolioScreenshot from "@/assets/PortfolioPage.png";
import prodPilotScreenshot from "@/assets/ProdPilot.png";

export type ProjectCategory = "Dashboards" | "AI" | "Full Stack";
export type ProjectStatus = "concept-demo" | "shipped";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  screenshot?: string;
  highlights: { label: string; value: string }[];
  caseStudySlug?: string;
  repoUrl?: string;
  liveUrl?: string;
  variant: "banking" | "ai" | "education" | "wallet" | "hero";
};

export const projectCategories: ProjectCategory[] = ["Dashboards", "AI", "Full Stack"];

export const projects: Project[] = [
  {
    id: "portfolio-site",
    title: "Portfolio Landing Page",
    description:
      "This site - React + Vite, case studies, command menu, dark-mode system. Live on Vercel.",
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
    screenshot: portfolioScreenshot,
    variant: "hero",
  },
  {
    id: "frebob",
    title: "FreBob",
    description:
      "Expo React Native business ops - WhatsApp-style orders, stock, payments, receipt scan, Ask Bob chat. Supabase auth + Node API on Render.",
    category: "Full Stack",
    status: "shipped",
    technologies: [
      "Expo",
      "React Native",
      "TypeScript",
      "Node.js",
      "Supabase",
      "Zustand",
      "Expo Router",
      "Render",
    ],
    highlights: [
      { label: "Scope", value: "Business ops mobile" },
      { label: "Auth", value: "Supabase" },
      { label: "API", value: "Node.js · Express" },
      { label: "Web", value: "Expo web · Render" },
    ],
    caseStudySlug: "frebob",
    repoUrl: "https://github.com/El-idn/FreBob",
    liveUrl: "https://frebob-web.onrender.com",
    screenshot: frebobScreenshot,
    variant: "wallet",
  },
  {
    id: "open-banking",
    title: "OpenBank NG",
    description:
      "Ops dashboard UI - KYC, transactions, consents, RBAC. MSW mock API. Live on Vercel.",
    category: "Dashboards",
    status: "shipped",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Tailwind CSS",
      "MSW",
      "Recharts",
    ],
    highlights: [
      { label: "Scope", value: "Ops dashboard UI" },
      { label: "Data", value: "MSW mock API" },
      { label: "Access", value: "RBAC · 4 roles" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudySlug: "open-banking-dashboard",
    repoUrl: "https://github.com/El-idn/OpenBanking_Dashboard",
    liveUrl: "https://open-banking-dashboard-zeta.vercel.app/login",
    screenshot: openBankingScreenshot,
    variant: "banking",
  },
  {
    id: "ai-pm-assistant",
    title: "ProdPilot AI",
    description:
      "AI PM workspace - streaming PRDs, copilot chat, KPI views. Mock data + optional Groq. Live on Vercel.",
    category: "AI",
    status: "shipped",
    technologies: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "Groq",
      "Tailwind CSS",
      "Zustand",
      "Recharts",
    ],
    highlights: [
      { label: "Scope", value: "PM workspace UI" },
      { label: "AI", value: "Streaming PRD + chat" },
      { label: "Data", value: "Mock + localStorage" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudySlug: "ai-product-management-assistant",
    repoUrl: "https://github.com/El-idn/AIProduct_manager",
    liveUrl: "https://ai-product-manager-flame.vercel.app/",
    screenshot: prodPilotScreenshot,
    variant: "ai",
  },
  {
    id: "campus-vote",
    title: "CampusVote NG",
    description:
      "Campus voting platform - elections, ballots, live results, admin tools. MSW mock API. Live on Vercel.",
    category: "Full Stack",
    status: "shipped",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "MSW",
      "Recharts",
    ],
    highlights: [
      { label: "Scope", value: "Campus voting UI" },
      { label: "Data", value: "MSW mock API" },
      { label: "Roles", value: "Student · Admin" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudySlug: "campus-vote",
    repoUrl: "https://github.com/El-idn/Campus_vote",
    liveUrl: "https://campus-vote-nine.vercel.app/",
    screenshot: campusVoteScreenshot,
    variant: "education",
  },
];

export function getLiveDemoProjects() {
  return projects.filter((project) => project.liveUrl);
}

export function getProjectDomain(project: Project): string {
  if (project.liveUrl) {
    try {
      return new URL(project.liveUrl).hostname;
    } catch {
      return project.liveUrl;
    }
  }

  try {
    return new URL(site.seo.url).hostname;
  } catch {
    return "amoseden.dev";
  }
}
