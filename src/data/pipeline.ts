import {
  Smartphone,
  ShieldCheck,
  Cpu,
  Sparkles,
  Database,
  type LucideIcon,
} from "lucide-react";

export type PipelineStage = {
  id: string;
  stepNumber: string;
  name: string;
  subtitle: string;
  category: "Client" | "Edge" | "Backend" | "AI" | "Infra";
  icon: LucideIcon;
  latency: string;
  statusText: string;
  shortSummary: string;
  description: string;
  keyResponsibilities: string[];
  techStack: string[];
  tradeoffHighlight: {
    title: string;
    details: string;
  };
  samplePayload: {
    type: "json" | "typescript";
    title: string;
    code: string;
  };
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "mobile-client",
    stepNumber: "01",
    name: "React Native Client",
    subtitle: "What runs on the device",
    category: "Client",
    icon: Smartphone,
    latency: "< 16ms (60fps)",
    statusText: "Optimistic State Synced",
    shortSummary:
      "React Native and Expo with local SQLite caching, biometric auth, and optimistic state updates.",
    description:
      "Handling gesture threads, local offline storage, and biometric checks right on the phone before anything ever hits the network.",
    keyResponsibilities: [
      "Biometric unlock with Keychain / Keystore (Expo SecureStore)",
      "Instant UI updates backed by local SQLite / WatermelonDB cache",
      "60–120fps gesture animations on dedicated Reanimated threads",
      "Offline mutation queue with exponential backoff on reconnection",
    ],
    techStack: ["React Native", "Expo EAS", "TypeScript", "Zustand", "Reanimated 3"],
    tradeoffHighlight: {
      title: "Instant UI vs. server truth",
      details:
        "The UI updates immediately so taps feel instant. If the server rejects the transfer (insufficient funds, expired session), the client rolls back the state cleanly with an inline toast.",
    },
    samplePayload: {
      type: "json",
      title: "client_dispatch.json",
      code: `{
  "action": "INITIATE_TRANSFER",
  "client_timestamp": 1774360120,
  "idempotency_key": "idemp_8fa2_901c",
  "device_integrity": "verified_hardware_attested",
  "payload": {
    "recipient_id": "usr_99a82b",
    "amount_cents": 125000,
    "currency": "NG"
  }
}`,
    },
  },
  {
    id: "edge-gateway",
    stepNumber: "02",
    name: "Edge Gateway & Auth",
    subtitle: "Perimeter checks & rate limits",
    category: "Edge",
    icon: ShieldCheck,
    latency: "~4ms edge",
    statusText: "Token Verified & Sanitized",
    shortSummary:
      "Perimeter defense: validating JWT tokens, enforcing sliding-window rate limits, and checking webhook signatures before hitting internal servers.",
    description:
      "Requests hit edge workers first to block bad traffic, verify identity, and check rate limits close to the user—keeping core servers protected.",
    keyResponsibilities: [
      "Stateless JWT verification with cached JWKS public keys",
      "Sliding-window rate limits in Redis to block abusive traffic",
      "Strict Zod schema validation to drop malformed payloads early",
      "HMAC signature checks for incoming fintech and bank webhooks",
    ],
    techStack: ["Cloudflare Workers", "Zod", "JWT / Web Crypto", "Redis Upstash"],
    tradeoffHighlight: {
      title: "Fast edge checks vs. instant revocation",
      details:
        "Validating short-lived tokens at the edge takes <2ms without hitting a database. Critical lockouts check a shared Redis cache so revocations still happen in real time.",
    },
    samplePayload: {
      type: "typescript",
      title: "edge_guard.ts",
      code: `export async function verifyIngress(req: Request) {
  const token = req.headers.get("authorization");
  const claims = await verifyJwt(token, JWKS_CACHE);
  
  const isRateLimited = await redis.slidingWindow(
    \`rl:\${claims.sub}\`, 
    { limit: 120, windowSec: 60 }
  );
  if (isRateLimited) throw new RateLimitError();

  return { userId: claims.sub, tier: claims.role };
}`,
    },
  },
  {
    id: "core-service",
    stepNumber: "03",
    name: "Core Services & Bus",
    subtitle: "Business logic & job queues",
    category: "Backend",
    icon: Cpu,
    latency: "~18ms processing",
    statusText: "Transactional Outbox Queued",
    shortSummary:
      "Node.js services running business rules, database transactions, and background workers for heavy async tasks.",
    description:
      "Core business logic runs here. Critical records are saved atomically, while long-running jobs (notifications, reports, webhooks) are handed off to background queues.",
    keyResponsibilities: [
      "Domain validation, ledger checks, and business calculations",
      "Asynchronous background processing with BullMQ and Redis",
      "Transactional outbox pattern so events are never lost",
      "Live status push back to the phone screen via WebSockets",
    ],
    techStack: ["Node.js", "Express / Fastify", "BullMQ", "Redis", "WebSockets"],
    tradeoffHighlight: {
      title: "Fast API responses vs. background work",
      details:
        "Return an acknowledgment to the mobile client in under 25ms, then let worker queues handle heavy ledger updates and notification dispatching behind the scenes.",
    },
    samplePayload: {
      type: "typescript",
      title: "event_worker.ts",
      code: `const worker = new Worker('fintech-events', async (job) => {
  const { transactionId, userId, amount } = job.data;
  
  await db.transaction(async (tx) => {
    await ledger.debit(tx, { userId, amount });
    await outbox.record(tx, 'PAYMENT_CONFIRMED', { transactionId });
  });

  await notifyClientSocket(userId, { status: 'SETTLED' });
});`,
    },
  },
  {
    id: "ai-engine",
    stepNumber: "04",
    name: "AI Copilot & Vector RAG",
    subtitle: "Embeddings & streaming AI",
    category: "AI",
    icon: Sparkles,
    latency: "~240ms first token",
    statusText: "Tokens Streaming via SSE",
    shortSummary:
      "Vector similarity search and structured tool calls with real-time token streaming back to the client.",
    description:
      "When features need intelligence, the system pulls relevant context from vector storage, validates LLM output against strict Zod schemas, and streams tokens live to the UI.",
    keyResponsibilities: [
      "Semantic vector search with pgvector for context retrieval",
      "Strict JSON schema validation with Zod to prevent model hallucinations",
      "Server-Sent Events (SSE) streaming tokens directly into mobile components",
      "Graceful fallback cascade from local models to cloud LLM providers",
    ],
    techStack: ["LangChain", "OpenAI / Claude API", "pgvector", "SSE Streaming"],
    tradeoffHighlight: {
      title: "Perceived speed vs. thorough reasoning",
      details:
        "Streaming delivers the first word in <250ms so users aren't staring at a spinner, while full classification and tool execution wrap up in parallel.",
    },
    samplePayload: {
      type: "json",
      title: "ai_tool_call.json",
      code: `{
  "agent": "FINANCIAL_COPILOT",
  "tool_invocation": {
    "name": "analyze_spending_anomaly",
    "arguments": {
      "category": "SAAS_SUBSCRIPTIONS",
      "baseline_30d_avg": 340.00,
      "detected_spike": 890.00
    }
  },
  "confidence_score": 0.984,
  "stream_status": "CHUNKING"
}`,
    },
  },
  {
    id: "cloud-infra",
    stepNumber: "05",
    name: "Cloud Store & DevOps",
    subtitle: "Postgres & automated deploys",
    category: "Infra",
    icon: Database,
    latency: "< 5ms p99 query",
    statusText: "Telemetry Healthy · 99.99%",
    shortSummary:
      "Reliable PostgreSQL storage, connection pooling, and automated GitHub Actions CI/CD with preview environments.",
    description:
      "The foundation: indexed relational storage, safe database migrations, connection pooling for mobile spikes, and automated test pipelines on every PR.",
    keyResponsibilities: [
      "PostgreSQL tables with Row-Level Security (RLS) and PgBouncer pooling",
      "Automated GitHub Actions checking types, lints, and integration tests",
      "Docker containerization for identical local and staging environments",
      "Telemetry monitoring, query latency tracking, and health checks",
    ],
    techStack: ["PostgreSQL", "Prisma / Drizzle", "Docker", "GitHub Actions", "Vercel / AWS"],
    tradeoffHighlight: {
      title: "Safe canary rollouts vs. fast hotfixes",
      details:
        "Every PR spins up an isolated preview environment. Deploys roll out gradually with error-budget alarms so bad builds get rolled back before users notice.",
    },
    samplePayload: {
      type: "typescript",
      title: "db_schema.prisma",
      code: `model Transaction {
  id              String   @id @default(uuid())
  idempotencyKey  String   @unique
  userId          String   @db.VarChar(64)
  amountCents     Int
  status          Status   @default(PENDING)
  createdAt       DateTime @default(now())

  @@index([userId, createdAt])
  @@map("transactions")
}`,
    },
  },
];
