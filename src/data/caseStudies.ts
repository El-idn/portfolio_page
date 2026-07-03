import { projects, type Project } from "@/data/projects";

export type CaseStudy = {
  slug: string;
  projectId: string;
  summary: string;
  buildSummary: string;
  problem: string;
  painPoints: string[];
  architecture: string[];
  frontendChallenges: string[];
  uxProcess: string[];
  scalability: string[];
  highlights: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "open-banking-dashboard",
    projectId: "open-banking",
    summary:
      "Live OpenBank NG demo on Vercel — a Nigerian open banking operations UI with executive dashboard, customer/KYC views, transactions, consents, and role-based access. All data is mocked via MSW.",
    buildSummary:
      "Frontend-only portfolio demo: React 19, TypeScript, and Vite with no live backend or real banking integrations.",
    problem:
      "Nigerian fintech ops teams need a single interface to monitor customers, accounts, transactions, open banking consents, and compliance workflows — this demo explores what that UI could look like.",
    painPoints: [
      "Customer, account, and transaction views often live in separate tools",
      "Compliance and auditor roles need different visibility than admins or customers",
      "Consent grants and revocations need clear audit trails in the UI",
      "Dense financial tables and KPI dashboards must stay scannable on desktop and mobile",
    ],
    architecture: [
      "React 19 + TypeScript + Vite single-page application",
      "MSW mock API layer with TanStack Query for data fetching and polling",
      "React Router with role-based route guards (customer, admin, compliance, auditor)",
      "Shadcn UI + Tailwind CSS v4 component system",
    ],
    frontendChallenges: [
      "Role-based navigation and permission matrix across four demo roles",
      "Executive dashboard with KPI cards, charts, and recent transaction feed",
      "Transaction monitoring with search, filters, and CSV export",
      "Login plus MFA verification flow before reaching the dashboard",
      "Responsive layout with dark/light mode toggle",
    ],
    uxProcess: [
      "Mapped core ops modules: dashboard, customers, accounts, transfers, transactions, consents",
      "Designed customer profiles with KYC fields (BVN, NIN, tiers) and linked accounts",
      "Built consent management with revoke flow and audit event visibility",
      "Added Phase 2 modules: fraud center, audit logs, API monitoring, transfers, reports, and notifications",
    ],
    scalability: [
      "All data is mocked locally via MSW — no production backend in this demo",
      "No live bank APIs, PSD2 integrations, or real authentication service",
      "Demo credentials and a fixed MFA code (123456); header role switcher for permission demos",
      "Deployed as a static SPA on Vercel with client-side routing",
    ],
    highlights: [
      { label: "Live module", value: "Executive dashboard" },
      { label: "Live module", value: "Customers & KYC" },
      { label: "Live module", value: "Transactions & consents" },
      { label: "Live module", value: "Fraud · Audit · Reports" },
    ],
  },
  {
    slug: "ai-product-management-assistant",
    projectId: "ai-pm-assistant",
    summary:
      "Live ProdPilot AI demo on Vercel — an AI product management workspace with dashboard KPIs, streaming PRD generation, copilot chat, and analytics views. Metrics are mocked; AI uses Groq when configured, otherwise simulated streaming.",
    buildSummary:
      "Frontend-first portfolio demo: Next.js 15 with Zustand and localStorage persistence — no Supabase, vector store, or production backend.",
    problem:
      "Product teams juggle PRDs, prioritization, and KPI monitoring across disconnected tools — this demo explores a single workspace UI for those PM workflows.",
    painPoints: [
      "PRDs take too long to draft from a raw feature idea",
      "Prioritization debates lack a shared RICE-style view in the UI",
      "KPI and anomaly signals are scattered across dashboards",
      "Copilot answers need workspace context (role, goals, recent PRDs)",
    ],
    architecture: [
      "Next.js 15 App Router with TypeScript and cookie-based route guards",
      "Zustand store with localStorage for workspace, PRDs, and chat history",
      "Vercel AI SDK streaming routes for PRD generation and copilot chat",
      "Groq (`llama-3.3-70b-versatile`) when `GROQ_API_KEY` is set; mock streaming fallback otherwise",
    ],
    frontendChallenges: [
      "Streaming PRD output into editable section cards during generation",
      "Copilot chat with workspace context sidebar and suggested prompt chips",
      "Dashboard layout combining KPI cards, RICE table, charts, and AI recommendation cards",
      "Analytics page with MRR, retention cohorts, funnel, churn, and anomaly alert cards",
      "Dark-theme marketing landing page with features and pricing tiers",
    ],
    uxProcess: [
      "Built marketing landing with six advertised PM workflows and pricing CTAs",
      "Shipped live modules: dashboard, AI PRD generator, copilot, and KPI analytics",
      "Added mock auth flow (login, signup, onboarding) with demo credentials",
      "Marked roadmap, feedback, team, and settings as coming soon in the sidebar",
    ],
    scalability: [
      "No real database — all workspace state persists in the browser via localStorage",
      "Mock auth accepts any email/password; demo login is `demo@prodpilot.ai` / `demo123`",
      "In-memory rate limiting (10 req/min per IP) on AI API routes",
      "Roadmap, feedback intelligence, and team collaboration are not implemented in this demo",
    ],
    highlights: [
      { label: "Live module", value: "Dashboard & RICE table" },
      { label: "Live module", value: "AI PRD generator" },
      { label: "Live module", value: "Streaming copilot" },
      { label: "Live module", value: "KPI analytics" },
    ],
  },
  {
    slug: "campus-vote",
    projectId: "campus-vote",
    summary:
      "Live CampusVote NG demo on Vercel — a Nigerian campus election platform with public election discovery, student voting flows, live results charts, and admin election management. All data is mocked via MSW.",
    buildSummary:
      "Frontend-only portfolio demo: React 19, TypeScript, and Vite with no live backend or real vote tallying service.",
    problem:
      "Campus elections often rely on paper ballots or fragmented tools — students and admins need a single, mobile-friendly interface to discover elections, cast votes, and monitor turnout.",
    painPoints: [
      "Students need a clear path from election discovery to ballot confirmation",
      "Duplicate voting must be blocked in the UI with immediate feedback",
      "Admins need to create elections, approve candidates, and watch turnout in one place",
      "Results should update frequently enough to feel live during an active election",
    ],
    architecture: [
      "React 19 + TypeScript + Vite single-page application",
      "MSW mock API with TanStack Query for elections, votes, and analytics",
      "Zustand for auth session persistence; role-based route guards (student, candidate, admin)",
      "Shadcn-style Radix UI + Tailwind CSS v4 with Framer Motion",
    ],
    frontendChallenges: [
      "Single-select voting flow with confirmation dialog and duplicate-vote prevention",
      "Live results page with bar/pie charts, animated counters, and 5-second polling refresh",
      "Public explore page with search, institution/category filters, and status tabs",
      "Admin election CRUD, candidate approval, and analytics dashboard",
      "Mobile bottom nav for students and desktop sidebar for admin layouts",
    ],
    uxProcess: [
      "Built public landing with platform stats and featured active elections",
      "Mapped student journey: dashboard → ballot → confirmation → results",
      "Added registration with matric verification step (mock) and password recovery UI",
      "Designed admin shell for election management, candidate approval, and analytics",
    ],
    scalability: [
      "All elections and votes are mocked in-memory via MSW — no production database",
      "Demo accounts: student, candidate, and admin roles with preset credentials",
      "No facial/QR verification, push notifications, offline voting, or multi-school tenancy",
      "Phase 2 notes Supabase backend with RLS — not implemented in this demo",
    ],
    highlights: [
      { label: "Live module", value: "Election discovery" },
      { label: "Live module", value: "Student voting flow" },
      { label: "Live module", value: "Live results charts" },
      { label: "Live module", value: "Admin dashboard" },
    ],
  },
];

export function getProjectForCaseStudy(study: CaseStudy): Project | undefined {
  return projects.find((project) => project.id === study.projectId);
}

export function getCaseStudyTitle(study: CaseStudy): string {
  return getProjectForCaseStudy(study)?.title ?? study.slug;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? caseStudies[index - 1] : undefined,
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined,
  };
}
