import type { ProjectStatus } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

type HighlightBadgeProps = {
  label: string;
  value: string;
};

export function HighlightBadge({ label, value }: HighlightBadgeProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

/** @deprecated Use HighlightBadge */
export const MetricBadge = HighlightBadge;

export function TechBadges({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <Badge key={tech} variant="secondary">
          {tech}
        </Badge>
      ))}
    </div>
  );
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "shipped") {
    return <Badge className="bg-primary text-primary-foreground">Live</Badge>;
  }

  return (
    <Badge variant="outline" className="border-primary/30 text-primary">
      Concept Demo
    </Badge>
  );
}

/** @deprecated Use ProjectStatusBadge */
export const ConceptDemoBadge = () => <ProjectStatusBadge status="concept-demo" />;
