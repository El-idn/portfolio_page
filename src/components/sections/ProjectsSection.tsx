import { useState } from "react";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { site } from "@/data/site";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Featured Work"
        title="Concept builds exploring fintech, AI, and full stack engineering"
        description="Portfolio demos that showcase UI craft, architecture thinking, and modern stack choices — deployed on Vercel."
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

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
