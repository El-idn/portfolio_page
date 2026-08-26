import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies, getCaseStudyTitle } from "@/data/caseStudies";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CaseStudiesSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <Section id="case-studies">
      <SectionHeader
        eyebrow="Case Studies"
        title="How they’re built"
        description="Architecture, UI systems, and engineering tradeoffs."
      />

      <motion.div
        className="grid gap-x-3 gap-y-6 sm:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {caseStudies.map((study) => (
          <motion.div key={study.slug} variants={item}>
            <Link
              to={`/case-studies/${study.slug}`}
              className="group border-border bg-card hover:border-primary/40 flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5"
            >
              <span className="font-medium">{getCaseStudyTitle(study)}</span>
              <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-all group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
