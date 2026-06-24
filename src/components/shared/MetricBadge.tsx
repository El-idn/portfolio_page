import { Badge } from "@/components/ui/badge";

type MetricBadgeProps = {
  label: string;
  value: string;
};

export function MetricBadge({ label, value }: MetricBadgeProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}

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
