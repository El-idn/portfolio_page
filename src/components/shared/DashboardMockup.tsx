import { motion } from "framer-motion";
import { Activity, BarChart3, Code2, CreditCard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type DashboardVariant = "banking" | "ai" | "education" | "wallet" | "hero";

const variantConfig: Record<
  DashboardVariant,
  { title: string; metric: string; change: string; bars: number[] }
> = {
  hero: {
    title: "Product Analytics",
    metric: "$2.4M",
    change: "+18.2%",
    bars: [40, 65, 45, 80, 55, 90, 70],
  },
  banking: {
    title: "Account Overview",
    metric: "$128,450",
    change: "+4.1%",
    bars: [30, 50, 45, 70, 60, 75, 65],
  },
  ai: {
    title: "Roadmap Insights",
    metric: "24 signals",
    change: "Prioritized",
    bars: [55, 40, 75, 50, 85, 60, 95],
  },
  education: {
    title: "Learner Progress",
    metric: "87%",
    change: "+12%",
    bars: [35, 55, 50, 68, 72, 80, 88],
  },
  wallet: {
    title: "Wallet Activity",
    metric: "$3,240",
    change: "-2.3%",
    bars: [60, 45, 70, 40, 55, 65, 50],
  },
};

function MiniChart({ bars }: { bars: number[] }) {
  return (
    <div className="flex h-16 items-end gap-1">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-primary/70 w-2 rounded-sm"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

type DashboardMockupProps = {
  variant?: DashboardVariant;
  className?: string;
  compact?: boolean;
};

export function DashboardMockup({
  variant = "hero",
  className,
  compact = false,
}: DashboardMockupProps) {
  const config = variantConfig[variant];
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-2xl"
      >
        <div className="border-border flex items-center gap-2 border-b px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-muted-foreground ml-2 text-xs">dashboard.app</span>
        </div>
        <div className={cn("space-y-4 p-4", compact && "p-3")}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-xs">{config.title}</p>
              <p className="text-2xl font-semibold tracking-tight">{config.metric}</p>
              <p className="text-primary text-xs font-medium">{config.change}</p>
            </div>
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              {variant === "ai" ? (
                <Sparkles className="size-4" />
              ) : variant === "wallet" ? (
                <CreditCard className="size-4" />
              ) : (
                <BarChart3 className="size-4" />
              )}
            </div>
          </div>
          <MiniChart bars={config.bars} />
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground text-[10px]">Active users</p>
              <p className="text-sm font-medium">12.4K</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <p className="text-muted-foreground text-[10px]">Conversion</p>
              <p className="text-sm font-medium">6.8%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {!compact && (
        <>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-border bg-card absolute -right-4 -bottom-6 w-44 rounded-xl border p-3 shadow-xl"
          >
            <div className="mb-2 flex items-center gap-2">
              <Activity className="text-primary size-4" />
              <span className="text-xs font-medium">Live sync</span>
            </div>
            <p className="text-muted-foreground text-[10px]">42 institutions connected</p>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="border-border bg-card absolute -top-4 -left-4 w-48 rounded-xl border p-3 shadow-xl"
          >
            <div className="mb-2 flex items-center gap-2">
              <Code2 className="text-primary size-4" />
              <span className="text-xs font-medium">API health</span>
            </div>
            <pre className="text-muted-foreground overflow-hidden text-[10px] leading-relaxed">
              {`GET /v1/accounts\n200 · 98ms`}
            </pre>
          </motion.div>
        </>
      )}
    </div>
  );
}
