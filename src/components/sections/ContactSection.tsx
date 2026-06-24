import { Calendar, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { site } from "@/data/site";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const iconComponents = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  calendar: Calendar,
};

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build modern digital products."
        description="Open to engineering leadership conversations, product collaborations, and high-impact freelance work."
        align="center"
      />

      <Card className="mx-auto max-w-2xl">
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a href={`mailto:${site.email}`}>
                <Mail className="size-4" />
                Email me
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={site.social.find((s) => s.icon === "calendar")?.href} target="_blank" rel="noreferrer">
                <Calendar className="size-4" />
                Book a call
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {site.social.map((link) => {
              const Icon = iconComponents[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                >
                  <Icon className="size-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}
