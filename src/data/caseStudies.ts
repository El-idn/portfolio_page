export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  problem: string;
  painPoints: string[];
  architecture: string[];
  frontendChallenges: string[];
  uxProcess: string[];
  scalability: string[];
  technologies: string[];
  outcomes: { label: string; value: string }[];
  variant: "banking" | "ai";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "open-banking-dashboard",
    title: "Open Banking Dashboard",
    summary:
      "A unified financial intelligence layer for product teams managing multi-institution data pipelines.",
    outcome: "Reduced financial data aggregation time by 60% across 40+ institutions.",
    problem:
      "Product teams needed a single view of customer financial behavior across fragmented bank APIs, each with different auth flows, data schemas, and rate limits.",
    painPoints: [
      "Manual reconciliation across disconnected bank integrations",
      "Inconsistent transaction categorization hurting analytics accuracy",
      "Slow onboarding when adding new financial institutions",
      "No shared UI patterns for compliance-sensitive financial data",
    ],
    architecture: [
      "Event-driven ingestion layer normalizing PSD2 and open banking payloads",
      "Token vault with short-lived credentials and audit logging",
      "Read-optimized analytics store with pre-aggregated daily rollups",
      "BFF pattern isolating frontend from provider-specific API quirks",
    ],
    frontendChallenges: [
      "Designing dense financial tables that remain scannable on mobile",
      "Real-time balance updates without layout shift or stale state",
      "Role-based views for analysts, compliance, and executives",
      "Accessible charting for trend analysis and anomaly detection",
    ],
    uxProcess: [
      "Shadowed finance ops workflows to map critical decision paths",
      "Prototyped dashboard IA with progressive disclosure for power users",
      "Ran usability tests on transaction drill-down and export flows",
      "Established a design system for currency, status, and risk indicators",
    ],
    scalability: [
      "Horizontal workers for webhook ingestion spikes",
      "Caching strategy for institution metadata and exchange rates",
      "Feature flags for gradual institution rollout",
      "Observability dashboards tracking sync lag per provider",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Plaid",
      "AWS",
      "Terraform",
    ],
    outcomes: [
      { label: "Aggregation time", value: "-60%" },
      { label: "Institutions supported", value: "40+" },
      { label: "Dashboard load", value: "<1.2s" },
      { label: "Support tickets", value: "-45%" },
    ],
    variant: "banking",
  },
  {
    slug: "ai-product-management-assistant",
    title: "AI Product Management Assistant",
    summary:
      "An AI copilot that transforms scattered product signals into actionable roadmaps and release documentation.",
    outcome: "Cut roadmap planning cycles from two weeks to three days for early adopters.",
    problem:
      "PM teams were drowning in feedback across Slack, support tickets, and analytics — with no reliable way to synthesize signals into prioritized work.",
    painPoints: [
      "Roadmap debates driven by anecdotes instead of structured evidence",
      "Hours spent writing PRDs and release notes from scratch",
      "Disconnected tools for research, specs, and stakeholder updates",
      "Low confidence in AI outputs without traceable source citations",
    ],
    architecture: [
      "RAG pipeline over feedback, docs, and analytics events",
      "Workflow engine orchestrating summarization, clustering, and drafting",
      "Vector store with tenant isolation and retention policies",
      "Human-in-the-loop review before publishing roadmap changes",
    ],
    frontendChallenges: [
      "Streaming AI responses with editable structured outputs",
      "Side-by-side source citation UI for trust and auditability",
      "Complex filtering across themes, segments, and release trains",
      "Optimistic UI for collaborative roadmap editing",
    ],
    uxProcess: [
      "Interviewed PMs to define high-trust AI interaction patterns",
      "Designed citation-first layouts to reduce hallucination anxiety",
      "Iterated on prompt templates exposed as guided workflows",
      "Built onboarding that demonstrates value in under five minutes",
    ],
    scalability: [
      "Async job queue for large document ingestion batches",
      "Per-tenant rate limiting on model inference",
      "Prompt versioning and evaluation harness in CI",
      "Cost monitoring per workspace with usage alerts",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "Supabase",
      "pgvector",
      "Tailwind CSS",
      "Vercel",
    ],
    outcomes: [
      { label: "Planning cycle", value: "-78%" },
      { label: "Teams onboarded", value: "18" },
      { label: "Doc drafting time", value: "-65%" },
      { label: "User satisfaction", value: "4.7/5" },
    ],
    variant: "ai",
  },
];

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
