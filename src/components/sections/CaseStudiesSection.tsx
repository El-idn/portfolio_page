import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies, getCaseStudyTitle } from "@/data/caseStudies";
import { Section, SectionHeader } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CaseStudiesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="case-studies">
      <SectionHeader
        eyebrow="Case Studies"
        title="Technical walkthroughs of concept builds"
        description="Architecture, UI, and engineering decisions behind portfolio demos — not production postmortems."
      />

      <div className="grid gap-x-3 gap-y-6 sm:grid-cols-2">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <Link
              to={`/case-studies/${study.slug}`}
              className="group border-border bg-card hover:border-primary/40 flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5"
            >
              <span className="font-medium">{getCaseStudyTitle(study)}</span>
              <ArrowRight className="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition-all group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
