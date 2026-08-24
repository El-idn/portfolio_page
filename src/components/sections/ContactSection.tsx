import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { site } from "@/data/site";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const iconComponents = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export function ContactSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build modern digital products."
        description="Open to product collaborations, and high-impact freelance work."
        align="center"
      />

      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <Card className="mx-auto max-w-2xl">
          <CardContent className="space-y-6 pt-6">
            <div className="flex justify-center">
              <Button asChild size="lg">
                <a href={`mailto:${site.email}`}>
                  <Mail className="size-4" />
                  Email me
                </a>
              </Button>
            </div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {site.social.map((link) => {
                const Icon = iconComponents[link.icon];
                return (
                  <motion.a
                    key={link.label}
                    variants={item}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </motion.a>
                );
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
}
