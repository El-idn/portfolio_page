import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { getProjectDomain, projects } from "@/data/projects";
import { scrollToSection } from "@/lib/utils";
import {
  getFadeScale,
  getFadeUp,
  getStaggerContainer,
  transitionBase,
} from "@/lib/motion";
import { ProjectScreenshot } from "@/components/shared/ProjectScreenshot";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const frebob = projects.find((project) => project.id === "frebob")!;

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);
  const mockup = getFadeScale(reducedMotion);

  return (
    <Section id="home" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
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
          variants={mockup}
          initial="hidden"
          animate="show"
          transition={{ ...transitionBase, delay: reducedMotion ? 0 : 0.15 }}
          className="group lg:pl-8"
        >
          <a
            href={frebob.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <ProjectScreenshot
              title={frebob.title}
              screenshot={frebob.screenshot}
              domain={getProjectDomain(frebob)}
              showTech={false}
            />
            <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-sm">
              <ExternalLink className="size-3.5" />
              Featured live demo — {frebob.title}
            </p>
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
