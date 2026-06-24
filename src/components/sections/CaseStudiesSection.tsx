import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CaseStudiesSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="case-studies">
      <SectionHeader
        eyebrow="Case Studies"
        title="Deep dives into product and engineering decisions"
        description="How complex problems were framed, architected, and shipped with measurable outcomes."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
          >
            <Link to={`/case-studies/${study.slug}`} className="group block h-full">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl">{study.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">{study.summary}</p>
                  <p className="text-primary text-sm font-medium">{study.outcome}</p>
                </CardHeader>
                <CardContent>
                  <DashboardMockup variant={study.variant} compact />
                  <div className="text-primary mt-4 flex items-center gap-2 text-sm font-medium">
                    Read case study
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
