import { motion } from "framer-motion";
import { expertiseAreas } from "@/data/expertise";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ExpertiseSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <Section id="expertise">
      <SectionHeader
        eyebrow="Technical Expertise"
        title="Stack I work in"
        description="React Native, web, Node, fintech UIs, AI copilots."
      />

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {expertiseAreas.map((area) => {
          const Icon = area.icon;
          return (
            <motion.div key={area.title} variants={item}>
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
      </motion.div>
    </Section>
  );
}
