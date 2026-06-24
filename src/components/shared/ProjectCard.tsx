import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import { MetricBadge, TechBadges } from "@/components/shared/MetricBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const content = (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Badge variant="secondary">{project.category}</Badge>
            <CardTitle className="text-xl">{project.title}</CardTitle>
          </div>
          {project.caseStudySlug && (
            <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-colors" />
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <DashboardMockup variant={project.variant} compact className="pointer-events-none" />
        <div className="grid grid-cols-2 gap-2">
          {project.metrics.map((metric) => (
            <MetricBadge key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
        <TechBadges items={project.technologies} />
      </CardContent>
      {project.caseStudySlug && (
        <CardFooter>
          <span className="text-primary text-sm font-medium">View case study</span>
        </CardFooter>
      )}
    </Card>
  );

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.45, delay: index * 0.08 },
      };

  if (project.caseStudySlug) {
    return (
      <motion.div {...motionProps}>
        <Link to={`/case-studies/${project.caseStudySlug}`} className="block h-full">
          {content}
        </Link>
      </motion.div>
    );
  }

  return <motion.div {...motionProps}>{content}</motion.div>;
}
