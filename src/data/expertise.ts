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
      "React design systems, fast UIs, and interaction polish for complex products.",
    icon: Layers,
  },
  {
    title: "React Native Mobile",
    description:
      "Expo apps with native-feel UX, offline support, and shared logic across platforms.",
    icon: Smartphone,
  },
  {
    title: "Backend Systems",
    description:
      "Node APIs, data models, and service boundaries that scale with the product.",
    icon: Server,
  },
  {
    title: "API Architecture",
    description:
      "REST design, versioning, and clean integrations with third-party systems.",
    icon: Network,
  },
  {
    title: "Fintech Systems",
    description:
      "Open banking flows, payment UX, and compliance-aware financial interfaces.",
    icon: LineChart,
  },
  {
    title: "AI Integrations",
    description:
      "Streaming copilots, prompt workflows, and human-in-the-loop product UX.",
    icon: Brain,
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals, bundles, caching, and observability for snappy apps.",
    icon: Zap,
  },
  {
    title: "Microservices",
    description:
      "Event-driven services, async workers, and deploy patterns for uptime.",
    icon: Cpu,
  },
  {
    title: "Product Design Thinking",
    description:
      "Turn user problems into shippable increments with clear engineering tradeoffs.",
    icon: Palette,
  },
];
