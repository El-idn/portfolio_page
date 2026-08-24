import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { getProjectDomain, type Project } from "@/data/projects";
import { ProjectScreenshot } from "@/components/shared/ProjectScreenshot";
import { ProjectStatusBadge } from "@/components/shared/MetricBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  project: Project;
};

function ProjectCardFooter({
  project,
  cardLinksToLive,
}: {
  project: Project;
  cardLinksToLive: boolean;
}) {
  const showLiveDemoLink = project.liveUrl && !cardLinksToLive;
  const hasFooterLinks =
    showLiveDemoLink || Boolean(project.caseStudySlug) || Boolean(project.repoUrl);

  if (!hasFooterLinks) return null;

  return (
    <CardFooter className="flex-wrap gap-4">
      {showLiveDemoLink && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ExternalLink className="size-4" />
          Live demo
        </a>
      )}
      {project.caseStudySlug && (
        <Link
          to={`/case-studies/${project.caseStudySlug}`}
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
          className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <Github className="size-4" />
          Source
        </a>
      )}
    </CardFooter>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasActions = project.caseStudySlug || project.repoUrl || project.liveUrl;
  const wrapWithLive = Boolean(project.liveUrl);

  const cardBody = (
    <>
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
      <CardContent>
        <ProjectScreenshot
          title={project.title}
          screenshot={project.screenshot}
          domain={getProjectDomain(project)}
          technologies={project.technologies}
        />
      </CardContent>
    </>
  );

  const content = (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {wrapWithLive ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block">
          {cardBody}
        </a>
      ) : (
        cardBody
      )}
      <ProjectCardFooter project={project} cardLinksToLive={wrapWithLive} />
    </Card>
  );

  if (project.repoUrl && !project.liveUrl) {
    return (
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return content;
}
