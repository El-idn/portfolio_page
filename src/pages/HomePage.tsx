import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Seo } from "@/components/shared/Seo";
import { site } from "@/data/site";
import { scrollToSection } from "@/lib/utils";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 50);
    }
  }, [location.hash]);

  return (
    <>
      <Seo
        title={site.seo.title}
        description={site.seo.description}
        url={site.seo.url}
        image={site.seo.ogImage}
      />
      <HeroSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <ExpertiseSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
