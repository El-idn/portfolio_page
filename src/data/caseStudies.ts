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
      "Open banking ops UI — dashboard, KYC, transactions, consents, RBAC. MSW mocks. Live on Vercel.",
    buildSummary:
      "React 19 + Vite SPA. MSW mocks. No live bank APIs.",
    problem:
      "Ops teams need one place for customers, accounts, transactions, consents, and compliance. This UI is that place.",
    painPoints: [
      "Customers, accounts, and transactions live in separate tools",
      "Compliance and auditors need different views than admins",
      "Consent grants and revokes need a clear audit trail",
      "Dense tables and KPIs must stay scannable on any screen",
    ],
    architecture: [
      "React 19 + TypeScript + Vite SPA",
      "MSW mock API + TanStack Query for fetch and polling",
      "React Router with RBAC guards (customer, admin, compliance, auditor)",
      "Shadcn UI + Tailwind CSS v4",
    ],
    frontendChallenges: [
      "Permission matrix across four demo roles",
      "Executive dashboard: KPIs, charts, recent transactions",
      "Transaction monitoring with search, filters, CSV export",
      "Login + MFA before the dashboard",
      "Responsive layout with dark/light mode",
    ],
    uxProcess: [
      "Mapped ops modules: dashboard, customers, accounts, transfers, transactions, consents",
      "Customer profiles with KYC (BVN, NIN, tiers) and linked accounts",
      "Consent management with revoke flow and audit events",
      "Phase 2: fraud center, audit logs, API monitoring, transfers, reports, notifications",
    ],
    scalability: [
      "MSW mocks only — no production backend",
      "No live bank APIs, PSD2, or real auth service",
      "Demo credentials + fixed MFA (123456); header role switcher",
      "Static SPA on Vercel",
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
      "AI PM workspace — streaming PRDs, copilot chat, KPI views. Mock data + optional Groq. Live on Vercel.",
    buildSummary:
      "Next.js 15 + Zustand + localStorage. No production backend.",
    problem:
      "PMs juggle PRDs, prioritization, and KPIs across disconnected tools. One workspace UI for those flows.",
    painPoints: [
      "PRDs take too long to draft from a raw idea",
      "Prioritization needs a shared RICE-style view",
      "KPI and anomaly signals are scattered",
      "Copilot needs workspace context — role, goals, recent PRDs",
    ],
    architecture: [
      "Next.js 15 App Router + TypeScript + cookie route guards",
      "Zustand + localStorage for workspace, PRDs, and chat",
      "Vercel AI SDK streaming for PRDs and copilot chat",
      "Groq (`llama-3.3-70b-versatile`) when keyed; mock streaming otherwise",
    ],
    frontendChallenges: [
      "Stream PRD output into editable section cards",
      "Copilot chat with context sidebar and prompt chips",
      "Dashboard: KPIs, RICE table, charts, AI recommendation cards",
      "Analytics: MRR, cohorts, funnel, churn, anomaly alerts",
      "Dark marketing landing with features and pricing",
    ],
    uxProcess: [
      "Marketing landing with six PM workflows and pricing CTAs",
      "Shipped: dashboard, AI PRD generator, copilot, KPI analytics",
      "Mock auth (login, signup, onboarding) with demo credentials",
      "Roadmap, feedback, team, settings marked coming soon",
    ],
    scalability: [
      "No database — workspace state in localStorage",
      "Mock auth; demo login `demo@prodpilot.ai` / `demo123`",
      "In-memory rate limit: 10 req/min per IP on AI routes",
      "Roadmap, feedback, and team collab not built yet",
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
      "Campus voting platform — elections, ballots, live results, admin tools. MSW mocks. Live on Vercel.",
    buildSummary:
      "React 19 + Vite SPA. MSW mocks. No live vote tally service.",
    problem:
      "Campus elections still run on paper or scattered tools. Students and admins need one mobile-friendly place to discover elections, vote, and watch turnout.",
    painPoints: [
      "Clear path from election discovery to ballot confirmation",
      "Duplicate votes blocked in the UI with instant feedback",
      "Admins create elections, approve candidates, watch turnout in one place",
      "Results refresh often enough to feel live",
    ],
    architecture: [
      "React 19 + TypeScript + Vite SPA",
      "MSW mock API + TanStack Query for elections, votes, analytics",
      "Zustand auth session; RBAC guards (student, candidate, admin)",
      "Radix UI + Tailwind CSS v4 + Framer Motion",
    ],
    frontendChallenges: [
      "Single-select vote flow with confirm dialog and duplicate-vote block",
      "Live results: bar/pie charts, animated counters, 5s polling",
      "Public explore with search, filters, and status tabs",
      "Admin election CRUD, candidate approval, analytics",
      "Mobile bottom nav for students; desktop sidebar for admin",
    ],
    uxProcess: [
      "Public landing with platform stats and featured elections",
      "Student journey: dashboard → ballot → confirm → results",
      "Registration with mock matric check + password recovery UI",
      "Admin shell for elections, candidates, and analytics",
    ],
    scalability: [
      "MSW in-memory mocks — no production database",
      "Demo accounts for student, candidate, and admin",
      "No facial/QR verify, push, offline vote, or multi-school tenancy",
      "Phase 2 notes Supabase + RLS — not built yet",
    ],
    highlights: [
      { label: "Live module", value: "Election discovery" },
      { label: "Live module", value: "Student voting flow" },
      { label: "Live module", value: "Live results charts" },
      { label: "Live module", value: "Admin dashboard" },
    ],
  },
  {
    slug: "frebob",
    projectId: "frebob",
    summary:
      "Expo React Native business ops — WhatsApp-style orders, stock, payments, receipt scan, Ask Bob chat. Supabase auth + Node API on Render.",
    buildSummary:
      "Expo (mobile + web) on Render. Node.js Express API. Supabase auth.",
    problem:
      "Nigerian SMEs take orders over WhatsApp and SMS, then lose track of partial payments, stock, and balances across chats and notebooks.",
    painPoints: [
      "Orders and payments live in chat threads, not a ledger",
      "Partial payments leave unclear customer balances",
      "Stock and sales are hard to query in plain language",
      "Receipt photos need review before they become trusted records",
    ],
    architecture: [
      "Expo Router + TypeScript across Android, iOS, and web",
      "Supabase email/password auth; JWT bootstrap to the Render API",
      "Zustand + AsyncStorage; syncFromApi loads orders, customers, stock",
      "Node.js Express frebob-backend on Render for CRUD and seeding",
    ],
    frontendChallenges: [
      "Capture → Review → Approve — write only after explicit approval",
      "WhatsApp simulation UI (not a live WhatsApp Business API)",
      "Side-by-side review of chat/receipt fields before save",
      "Ask Bob chat with English and Nigerian Pidgin language chips",
      "Onboarding: language → business setup → WhatsApp access seeds sample data",
    ],
    uxProcess: [
      "Splash + auth: Sign up / Sign in + Explore Demo for sample data",
      "Home metrics after API sync or demo seed",
      "Ops modules: orders, inventory, customers, memory, notifications, settings",
      "Receipt scan via camera, gallery, or demo extract into the same review pipeline",
    ],
    scalability: [
      "WhatsApp and SMS are simulations — no live WhatsApp Business API",
      "Voice Ask Bob does not claim YarnGPT yet",
      "Explore Demo sample data is optional; not persisted across cold starts",
      "Web: Expo static export on Render; mobile: EAS builds",
    ],
    highlights: [
      { label: "Live module", value: "Order capture & review" },
      { label: "Live module", value: "Stock & payments" },
      { label: "Live module", value: "Ask Bob chat" },
      { label: "Live module", value: "Receipt scan" },
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
