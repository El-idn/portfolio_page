export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  status: "concept-demo";
  buildSummary: string;
  problem: string;
  painPoints: string[];
  architecture: string[];
  frontendChallenges: string[];
  uxProcess: string[];
  scalability: string[];
  technologies: string[];
  highlights: { label: string; value: string }[];
  variant: "banking" | "ai";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "open-banking-dashboard",
    title: "Open Banking Dashboard",
    status: "concept-demo",
    summary:
      "A concept dashboard exploring open banking data aggregation UX and frontend architecture for multi-institution financial views.",
    buildSummary:
      "A portfolio concept exploring how product teams might visualize fragmented bank API data through a unified, role-based dashboard.",
    problem:
      "This concept explores how product teams could gain a single view of customer financial behavior across fragmented bank APIs — each with different auth flows, data schemas, and rate limits.",
    painPoints: [
      "Manual reconciliation across disconnected bank integrations",
      "Inconsistent transaction categorization affecting analytics clarity",
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
      "Designed for finance ops workflows and critical decision paths",
      "Prototyped dashboard IA with progressive disclosure for power users",
      "Explored transaction drill-down and export flow interactions",
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
    highlights: [
      { label: "Deliverable", value: "Dashboard UI" },
      { label: "Deliverable", value: "Data normalization layer" },
      { label: "Deliverable", value: "Role-based views" },
      { label: "Deploy", value: "Vercel" },
    ],
    variant: "banking",
  },
  {
    slug: "ai-product-management-assistant",
    title: "AI Product Management Assistant",
    status: "concept-demo",
    summary:
      "A concept AI copilot exploring how scattered product signals could become actionable roadmaps and release documentation.",
    buildSummary:
      "A portfolio concept demonstrating streaming AI UI, citation-first copilot patterns, and RAG workflow architecture for product teams.",
    problem:
      "This concept explores how PM teams drowning in feedback across Slack, support tickets, and analytics might synthesize signals into prioritized work with traceable AI outputs.",
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
      "Designed high-trust AI interaction patterns for PM workflows",
      "Built citation-first layouts to surface source traceability",
      "Exposed prompt templates as guided, editable workflows",
      "Prototyped onboarding that demonstrates core value quickly",
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
    highlights: [
      { label: "Deliverable", value: "Streaming copilot UI" },
      { label: "Deliverable", value: "RAG workflow" },
      { label: "Deliverable", value: "Citation interface" },
      { label: "Deploy", value: "Vercel" },
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
