import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import {
  getAdjacentCaseStudies,
  getCaseStudy,
  getCaseStudyTitle,
  getProjectForCaseStudy,
} from "@/data/caseStudies";
import { site } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import {
  HighlightBadge,
  ProjectStatusBadge,
  TechBadges,
} from "@/components/shared/MetricBadge";
import { Seo } from "@/components/shared/Seo";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NotFoundPage } from "@/pages/NotFoundPage";

const sections = [
  { id: "problem", title: "Problem" },
  { id: "pain-points", title: "Pain points" },
  { id: "architecture", title: "Architecture" },
  { id: "frontend", title: "Frontend" },
  { id: "ux", title: "UX" },
  { id: "scalability", title: "Limits" },
  { id: "highlights", title: "What I Built" },
] as const;

const sectionIds = sections.map((section) => section.id);

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const activeId = useScrollSpy(sectionIds);

  if (!study) {
    return <NotFoundPage />;
  }

  const project = getProjectForCaseStudy(study);
  const title = getCaseStudyTitle(study);
  const { prev, next } = getAdjacentCaseStudies(study.slug);

  return (
    <>
      <Seo
        title={`${title} - Case Study | ${site.name}`}
        description={study.summary}
        url={`${site.seo.url}/case-studies/${study.slug}`}
        type="article"
      />

      <Section id="case-study-hero" className="pt-32 pb-12">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link to="/#case-studies">
            <ArrowLeft className="size-4" />
            Back to case studies
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-primary text-sm font-medium uppercase">Case Study</p>
              {project && <ProjectStatusBadge status={project.status} />}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{study.summary}</p>
            <p className="text-foreground text-base font-medium">{study.buildSummary}</p>
            {project?.liveUrl && (
              <Button asChild size="lg">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  View live demo
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            )}
            {project && <TechBadges items={project.technologies} />}
          </div>
          {project && <DashboardMockup variant={project.variant} />}
        </div>
      </Section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="border-border sticky top-28 space-y-1 border-l pl-0">
            <p className="text-muted-foreground mb-3 px-3 text-xs font-medium uppercase tracking-wide">
              On this page
            </p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "relative -ml-px block rounded-r-md px-3 py-1.5 text-sm transition-colors",
                  activeId === section.id
                    ? "text-foreground before:bg-primary font-medium before:absolute before:top-1/2 before:left-0 before:h-3.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:content-['']"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="space-y-12">
          <section id="problem" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Problem</h2>
            <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
          </section>

          <section id="pain-points" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Pain points</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section id="architecture" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Architecture</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="frontend" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Frontend</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.frontendChallenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="ux" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">UX</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.uxProcess.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="scalability" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Limits</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.scalability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="highlights" className="scroll-mt-28 space-y-4">
            <h2 className="text-2xl font-semibold">What I Built</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {study.highlights.map((highlight) => (
                <HighlightBadge
                  key={`${highlight.label}-${highlight.value}`}
                  label={highlight.label}
                  value={highlight.value}
                />
              ))}
            </div>
          </section>
        </article>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {prev ? (
          <Button asChild variant="outline">
            <Link to={`/case-studies/${prev.slug}`}>
              <ArrowLeft className="size-4" />
              {getCaseStudyTitle(prev)}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button asChild variant="outline" className="sm:ml-auto">
            <Link to={`/case-studies/${next.slug}`}>
              {getCaseStudyTitle(next)}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
