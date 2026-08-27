import { motion } from "framer-motion";
import { site } from "@/data/site";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { Section, SectionHeader } from "@/components/layout/Section";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <SectionHeader
          eyebrow="About"
          title="Build systems that stay clear under complexity."
          description={site.shortBio}
        />

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {site.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="border-border bg-card rounded-xl border p-5 shadow-sm"
            >
              <p className="text-lg font-semibold tracking-tight">{site.statLabels[index]}</p>
              <p className="text-muted-foreground mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div
          variants={item}
          className="border-border bg-muted/30 rounded-xl border p-6"
        >
          <h3 className="mb-2 font-semibold">How I build</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Clear architecture. Tight UX. Maintainable code. Tradeoffs weighed against
            users, compliance, and performance.
          </p>
        </motion.div>
        <motion.div
          variants={item}
          className="border-border bg-muted/30 rounded-xl border p-6"
        >
          <h3 className="mb-2 font-semibold">What I’ve shipped</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            FreBob for SME ops. OpenBank NG for ops dashboards. ProdPilot AI for
            streaming copilots. CampusVote NG for campus voting. Live demos, honest scope.
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
