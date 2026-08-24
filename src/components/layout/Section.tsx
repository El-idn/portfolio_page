import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getFadeUp, getStaggerContainer, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({ id, children, className, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 md:py-28", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  const container = getStaggerContainer(reducedMotion);
  const item = getFadeUp(reducedMotion);

  return (
    <motion.div
      className={cn(
        "mb-12 max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
      )}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <motion.p
          variants={item}
          className="text-primary text-sm font-medium tracking-wide uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={item}
        className="text-3xl font-semibold tracking-tight text-balance md:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={item}
          className="text-muted-foreground text-lg leading-relaxed text-balance"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
