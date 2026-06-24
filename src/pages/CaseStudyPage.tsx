import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentCaseStudies, getCaseStudy } from "@/data/caseStudies";
import { site } from "@/data/site";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import {
  ConceptDemoBadge,
  HighlightBadge,
  TechBadges,
} from "@/components/shared/MetricBadge";
import { Seo } from "@/components/shared/Seo";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NotFoundPage } from "@/pages/NotFoundPage";

const sections = [
  { id: "problem", title: "Problem" },
  { id: "pain-points", title: "Pain Points" },
  { id: "architecture", title: "Architecture" },
  { id: "frontend", title: "Frontend Challenges" },
  { id: "ux", title: "UI/UX Process" },
  { id: "scalability", title: "Scalability" },
  { id: "highlights", title: "What I Built" },
] as const;

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) {
    return <NotFoundPage />;
  }

  const { prev, next } = getAdjacentCaseStudies(study.slug);

  return (
    <>
      <Seo
        title={`${study.title} — Case Study | ${site.name}`}
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
              <ConceptDemoBadge />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {study.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{study.summary}</p>
            <p className="text-foreground text-base font-medium">{study.buildSummary}</p>
            <TechBadges items={study.technologies} />
          </div>
          <DashboardMockup variant={study.variant} />
        </div>
      </Section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-2">
            <p className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-wide">
              On this page
            </p>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-muted-foreground hover:text-primary block text-sm transition-colors"
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
            <h2 className="text-2xl font-semibold">User Pain Points</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section id="architecture" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Architecture Decisions</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="frontend" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Frontend Challenges</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.frontendChallenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="ux" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">UI/UX Process</h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 leading-relaxed">
              {study.uxProcess.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="scalability" className="scroll-mt-28 space-y-3">
            <h2 className="text-2xl font-semibold">Scalability Considerations</h2>
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
              {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button asChild variant="outline" className="sm:ml-auto">
            <Link to={`/case-studies/${next.slug}`}>
              {next.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
