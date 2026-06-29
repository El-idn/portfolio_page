import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import {
  HighlightBadge,
  ProjectStatusBadge,
  TechBadges,
} from "@/components/shared/MetricBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

function ProjectCardFooter({ project }: { project: Project }) {
  const hasActions = project.caseStudySlug || project.repoUrl || project.liveUrl;
  if (!hasActions) return null;

  return (
    <CardFooter className="flex-wrap gap-4">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ExternalLink className="size-4" />
          Live demo
        </a>
      )}
      {project.caseStudySlug && (
        <Link
          to={`/case-studies/${project.caseStudySlug}`}
          onClick={(event) => event.stopPropagation()}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          View case study
        </Link>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <Github className="size-4" />
          Source
        </a>
      )}
    </CardFooter>
  );
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const hasActions = project.caseStudySlug || project.repoUrl || project.liveUrl;
  const wrapWithLiveOnly =
    project.liveUrl && !project.caseStudySlug && !project.repoUrl;

  const content = (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <ProjectStatusBadge status={project.status} />
              <Badge variant="secondary">{project.category}</Badge>
            </div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
          </div>
          {hasActions && (
            <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-colors" />
          )}
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <DashboardMockup variant={project.variant} compact className="pointer-events-none" />
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            Technical highlights
          </p>
          <div className="grid grid-cols-2 gap-2">
            {project.highlights.map((highlight) => (
              <HighlightBadge
                key={`${highlight.label}-${highlight.value}`}
                label={highlight.label}
                value={highlight.value}
              />
            ))}
          </div>
        </div>
        <TechBadges items={project.technologies} />
      </CardContent>
      <ProjectCardFooter project={project} />
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

  if (wrapWithLiveOnly) {
    return (
      <motion.div {...motionProps}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  if (project.repoUrl && !project.caseStudySlug && !project.liveUrl) {
    return (
      <motion.div {...motionProps}>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return <motion.div {...motionProps}>{content}</motion.div>;
}
