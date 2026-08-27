export type Outcome = {
  title: string;
  summary: string;
  liveUrl?: string;
  caseStudySlug?: string;
};

export const outcomes: Outcome[] = [
  {
    title: "FreBob",
    summary: "Orders and stock out of WhatsApp chaos into a live ops app",
    liveUrl: "https://frebob-web.onrender.com",
    caseStudySlug: "frebob",
  },
  {
    title: "OpenBank NG",
    summary: "One RBAC ops UI for KYC, consents, and transactions",
    liveUrl: "https://open-banking-dashboard-zeta.vercel.app/login",
    caseStudySlug: "open-banking-dashboard",
  },
  {
    title: "ProdPilot AI",
    summary: "PRDs and KPIs in one streaming workspace",
    liveUrl: "https://ai-product-manager-flame.vercel.app/",
    caseStudySlug: "ai-product-management-assistant",
  },
];
