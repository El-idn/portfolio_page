import { motion } from "framer-motion";
import { expertiseAreas } from "@/data/expertise";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ExpertiseSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="expertise">
      <SectionHeader
        eyebrow="Technical Expertise"
        title="Engineering across the full product stack"
        description="Focused capabilities across mobile, web, fintech platforms, AI copilots, and scalable product systems."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expertiseAreas.map((area, index) => {
          const Icon = area.icon;
          return (
            <motion.div
              key={area.title}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <CardHeader className="space-y-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
