import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { scrollToSection } from "@/lib/utils";
import { DashboardMockup } from "@/components/shared/DashboardMockup";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.1 },
    },
  };

  const item = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

  return (
    <Section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="space-y-4">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {site.title}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-balance">
              {site.tagline}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => scrollToSection("projects")}>
              View Projects
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:pl-8"
        >
          <DashboardMockup variant="hero" />
        </motion.div>
      </div>
    </Section>
  );
}
