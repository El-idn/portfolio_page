import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Cpu,
  Layers,
  LineChart,
  Network,
  Palette,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";

export type ExpertiseArea = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Frontend Engineering",
    description:
      "Design systems, performant React architectures, and polished interaction layers for complex SaaS and web products.",
    icon: Layers,
  },
  {
    title: "React Native Mobile",
    description:
      "Cross-platform iOS and Android apps with native-feel UX, offline support, and shared logic across mobile and web.",
    icon: Smartphone,
  },
  {
    title: "Backend Systems",
    description:
      "Reliable APIs, data modeling, and service boundaries that scale with product complexity.",
    icon: Server,
  },
  {
    title: "API Architecture",
    description:
      "REST and GraphQL design, versioning strategies, and integration patterns for third-party ecosystems.",
    icon: Network,
  },
  {
    title: "Fintech Systems",
    description:
      "Open banking flows, payment rails, compliance-aware UX, and financial data normalization.",
    icon: LineChart,
  },
  {
    title: "AI Integrations",
    description:
      "RAG pipelines, copilot UX, prompt workflows, and human-in-the-loop product experiences.",
    icon: Brain,
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals, bundle strategy, caching, and observability for sub-second experiences.",
    icon: Zap,
  },
  {
    title: "Microservices",
    description:
      "Event-driven services, async workers, and deployment patterns for high-availability platforms.",
    icon: Cpu,
  },
  {
    title: "Product Design Thinking",
    description:
      "Translating user problems into shippable increments with clear engineering tradeoffs.",
    icon: Palette,
  },
];
