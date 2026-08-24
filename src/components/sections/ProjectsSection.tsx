import { useState } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { site } from "@/data/site";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Featured Work"
        title="Live demos across fintech, AI, and full stack engineering"
        description="Explore shipped portfolio products with real deployments, clear architecture, and polished UI craft."
      />

      <p className="text-muted-foreground border-border bg-muted/30 -mt-6 mb-8 rounded-lg border px-4 py-3 text-sm leading-relaxed">
        {site.demoNote}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {(["All", ...projectCategories] as const).map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={cn(activeCategory === category && "shadow-sm")}
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        className="grid gap-x-6 gap-y-12 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {filtered.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
