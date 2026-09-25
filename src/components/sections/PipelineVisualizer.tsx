import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  Zap,
  Code2,
  Check,
} from "lucide-react";
import { pipelineStages, type PipelineStage } from "@/data/pipeline";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PipelineVisualizer() {
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(pipelineStages[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedIndex, setSimulatedIndex] = useState<number | null>(null);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [simComplete, setSimComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const simTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup simulation timeouts if unmounted
  useEffect(() => {
    return () => {
      simTimeoutRef.current.forEach(clearTimeout);
    };
  }, []);

  const runSimulation = () => {
    if (isSimulating) return;

    // Reset state
    simTimeoutRef.current.forEach(clearTimeout);
    simTimeoutRef.current = [];
    setIsSimulating(true);
    setSimComplete(false);
    setSimulatedLogs([]);
    setSimulatedIndex(0);
    setSelectedStage(pipelineStages[0]);

    const stepDelays = [0, 450, 950, 1500, 2100];
    const logMessages = [
      "[01:CLIENT] Optimistic mutation recorded, dispatched via SQLite (14ms)",
      "[02:EDGE] JWT verified, rate-limit passed at edge (3ms)",
      "[03:WORKER] Outbox saved, async job enqueued to BullMQ (18ms)",
      "[04:AI] pgvector retrieved, SSE stream initialized (210ms)",
      "[05:DB] ACID commit confirmed, telemetry dispatched (5ms)",
    ];

    stepDelays.forEach((delay, index) => {
      const timeout = setTimeout(() => {
        setSimulatedIndex(index);
        setSelectedStage(pipelineStages[index]);
        setSimulatedLogs((prev) => [...prev, logMessages[index]]);

        if (index === pipelineStages.length - 1) {
          const finishTimeout = setTimeout(() => {
            setIsSimulating(false);
            setSimComplete(true);
          }, 600);
          simTimeoutRef.current.push(finishTimeout);
        }
      }, delay);
      simTimeoutRef.current.push(timeout);
    });
  };

  const handleCopyCode = () => {
    if (!selectedStage) return;
    navigator.clipboard.writeText(selectedStage.samplePayload.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="architecture" className="hidden lg:block relative overflow-hidden pt-12 md:pt-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <SectionHeader
          eyebrow="Architecture & Delivery"
          title="From phone screen to cloud database"
          description="How requests travel from a finger tap to a cloud database. Click any station to see real tradeoffs, payloads, and fallback logic."
          align="left"
        />

        {/* Live Simulation Trigger Bar */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto -mt-6 md:mt-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Cluster: Nominal</span>
            <span className="text-border">|</span>
            <span>P99: 42ms</span>
          </div>

          <Button
            variant={isSimulating ? "secondary" : "default"}
            size="sm"
            onClick={runSimulation}
            disabled={isSimulating}
            className="gap-2 shadow-sm font-medium transition-all"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="size-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                <span>Simulate Event Packet</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Visualizer Container */}
      <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-sm">
        {/* Simulation Banner Feedback */}
        <AnimatePresence>
          {simComplete && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>
                  <strong>Simulation complete:</strong> End-to-end request passed through all 5 stations in <strong>~250ms total</strong>.
                </span>
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                200 OK
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5-Stage Pipeline Rail */}
        <div className="relative mb-8">
          {/* Subtle connecting rail line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[2px] bg-border/80 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = selectedStage.id === stage.id;
              const isCurrentlySimulated = simulatedIndex === idx;

              return (
                <motion.button
                  key={stage.id}
                  onClick={() => {
                    setSelectedStage(stage);
                    setSimulatedIndex(null);
                  }}
                  whileHover={reducedMotion ? {} : { y: -2 }}
                  whileTap={reducedMotion ? {} : { scale: 0.98 }}
                  className={cn(
                    "group relative flex flex-col text-left p-4 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isSelected
                      ? "bg-accent/70 border-primary/50 shadow-sm ring-1 ring-primary/30"
                      : "bg-card/70 border-border/70 hover:border-border hover:bg-card",
                    isCurrentlySimulated &&
                    "border-primary ring-2 ring-primary/40 bg-primary/10",
                  )}
                >
                  {/* Top indicator row */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground/80">
                      {stage.stepNumber}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0 uppercase tracking-wider font-mono",
                        isSelected
                          ? "border-primary/40 text-primary bg-primary/5"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {stage.category}
                    </Badge>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg transition-colors",
                        isSelected || isCurrentlySimulated
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary",
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="font-medium text-sm text-foreground line-clamp-1">
                      {stage.name}
                    </div>
                  </div>

                  {/* Subtitle & Latency Metric */}
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                    {stage.subtitle}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="size-3 text-primary/70" />
                      {stage.latency}
                    </span>
                    <ArrowRight
                      className={cn(
                        "size-3 transition-transform",
                        isSelected ? "text-primary translate-x-0.5" : "opacity-0 group-hover:opacity-100",
                      )}
                    />
                  </div>

                  {/* Visual pulse effect during simulation */}
                  {isCurrentlySimulated && (
                    <motion.span
                      layoutId="pulse-beacon"
                      className="absolute -top-1 -right-1 flex h-3 w-3"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Station Deep-Dive Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-border/60"
          >
            {/* Left Column: Architectural Overview & Tradeoffs (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    Stage {selectedStage.stepNumber} · {selectedStage.category}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Activity className="size-3 text-emerald-500" />
                    {selectedStage.statusText}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight">
                  {selectedStage.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedStage.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="size-3.5 text-primary" />
                  Core Responsibilities
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-foreground/90">
                  {selectedStage.keyResponsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-muted/30 p-2 rounded-md border border-border/40">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Tradeoff Box */}
              <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <Terminal className="size-3.5" />
                  <span>Architecture Trade-Off: {selectedStage.tradeoffHighlight.title}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-5">
                  {selectedStage.tradeoffHighlight.details}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs font-mono text-muted-foreground mr-1">Stack:</span>
                {selectedStage.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs font-mono bg-card/60">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Column: Code Payload & Live Logs (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-border bg-slate-100 dark:bg-black/90 text-slate-800 dark:text-slate-100 p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-300/60 dark:border-white/10 mb-3">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Code2 className="size-4 text-primary" />
                  <span className="font-semibold tracking-tight">{selectedStage.samplePayload.title}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-white/10"
                  title="Copy payload"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {/* Code Preview */}
              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-700 dark:text-slate-200/90 font-mono py-1 max-h-56 scrollbar-thin">
                <code>{selectedStage.samplePayload.code}</code>
              </pre>

              {/* Simulated Live Event Stream Window */}
              <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-white/10">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <span>Simulated Telemetry Stream</span>
                  {isSimulating && <span className="text-emerald-500 dark:text-emerald-400 animate-pulse font-mono">CAPTURING...</span>}
                </div>
                <div className="bg-slate-200/60 dark:bg-white/5 border border-slate-300/50 dark:border-transparent rounded p-2 text-[10.5px] text-slate-700 dark:text-slate-300 space-y-1 font-mono min-h-16 max-h-24 overflow-y-auto">
                  {simulatedLogs.length > 0 ? (
                    simulatedLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-emerald-600 dark:text-emerald-300/90">
                        <span className="text-slate-400 dark:text-slate-500 select-none">&gt;</span>
                        <span className="leading-tight">{log}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 italic">
                      Click &quot;Simulate Event Packet&quot; above to watch a request move through the stack in real time.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
