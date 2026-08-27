import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { outcomes } from "@/data/outcomes";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function OutcomesSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <Section id="outcomes">
      <SectionHeader
        eyebrow="Selected outcomes"
        title="What shipping looks like"
        description="Live demos. Clear architecture. Honest scope."
      />

      <motion.ul
        className="border-border divide-border divide-y overflow-hidden rounded-xl border"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {outcomes.map((outcome) => (
          <motion.li
            key={outcome.title}
            variants={item}
            className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="min-w-0 space-y-1">
              <h3 className="font-semibold tracking-tight">{outcome.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {outcome.summary}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4 text-sm">
              {outcome.liveUrl && (
                <a
                  href={outcome.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 font-medium transition-colors"
                >
                  View live
                  <ExternalLink className="size-3.5" />
                </a>
              )}
              {outcome.caseStudySlug && (
                <Link
                  to={`/case-studies/${outcome.caseStudySlug}`}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  Case study
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
