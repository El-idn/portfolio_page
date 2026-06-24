import { site } from "@/data/site";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Section, SectionHeader } from "@/components/layout/Section";

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <SectionHeader
          eyebrow="About"
          title="Product engineer focused on systems that scale"
          description={site.shortBio}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {site.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-border bg-card rounded-xl border p-5 shadow-sm"
            >
              <p className="text-3xl font-semibold tracking-tight">
                <AnimatedCounter value={stat.value} suffix="+" />
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="border-border bg-muted/30 rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">Product engineering mindset</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I partner with product and design to ship features that move metrics — not just
            tickets. Every technical decision is weighed against user impact, compliance
            constraints, and long-term maintainability.
          </p>
        </div>
        <div className="border-border bg-muted/30 rounded-xl border p-6">
          <h3 className="mb-2 font-semibold">Domains I build in</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Open banking integrations, React Native mobile apps, AI-assisted workflows,
            real-time dashboards, and design-system-driven frontends for teams that need
            velocity without sacrificing craft.
          </p>
        </div>
      </div>
    </Section>
  );
}
