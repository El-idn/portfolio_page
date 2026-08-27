import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Database,
  Layers,
  LineChart,
  Server,
  Smartphone,
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
    title: "Backend & APIs",
    description:
      "Node APIs, REST design, data models, and clean third-party integrations.",
    icon: Server,
  },
  {
    title: "Database",
    description:
      "Supabase/Postgres on shipped work; also comfortable with MongoDB and MySQL - modeling, indexes, clear queries.",
    icon: Database,
  },
  {
    title: "Product dashboards",
    description:
      "Data-dense ops UIs, RBAC, and complex workflows that stay scannable.",
    icon: LineChart,
  },
  {
    title: "AI Integrations",
    description:
      "Streaming copilots, prompt workflows, and human-in-the-loop product UX.",
    icon: Brain,
  },
];
