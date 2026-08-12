import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Nexus.AI — AI-Native App Foundry",
      },
      {
        name: "description",
        content:
          "Nexus.AI orchestrates a 7-agent pipeline that turns your brief into a running codebase — nested file trees, sandboxed previews and edge deploys included.",
      },
      { property: "og:title", content: "Nexus.AI — Ship the app you described in one prompt." },
      {
        property: "og:description",
        content:
          "A 7-agent pipeline that turns your brief into a running codebase — sandboxed previews and edge deploys included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nexus.AI — AI-Native App Foundry" },
      {
        name: "twitter:description",
        content:
          "A 7-agent pipeline that turns your brief into a running codebase.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Pipeline", href: "#pipeline" },
];

const TERMINAL_LINES = [
  { t: "> nexus generate \"SaaS dashboard w/ stripe billing\"", c: "text-primary" },
  { t: "[architect]  outline → 6 modules, 3 routes", c: "text-foreground" },
  { t: "[designer]   palette: slate/obsidian, IBM Plex", c: "text-foreground" },
  { t: "[coder]      writing 8 files (452 loc)", c: "text-foreground" },
  { t: "[tester]     ✔ smoke.pass  ✔ eslint.pass", c: "text-muted-foreground" },
  { t: "[reviewer]   ✔ quality gate green", c: "text-muted-foreground" },
  { t: "[optimizer]  bundle ~ 42kb gz", c: "text-muted-foreground" },
  { t: "[deployer]   ⇢ edge://nexus.build/saas-01", c: "text-primary" },
];

const PLATFORM = [
  {
    title: "7-Agent Pipeline",
    body: "Architect → Designer → Coder → Tester → Reviewer → Optimizer → Deployer. Live orchestration, streamed to your terminal.",
    icon: (
      <path d="M3 5h6v4H3zM15 5h6v4h-6zM3 15h6v4H3zM15 15h6v4h-6zM9 7h6M9 17h6" />
    ),
  },
  {
    title: "Real Project Studio",
    body: "Nested file trees, Monaco-style editor, device-toggling sandbox, one-click edge deploys.",
    icon: <path d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M8 3v3h8V3M8 3H6m10 8-3 3 3 3M9 13H4" />,
  },
  {
    title: "Blueprint Library",
    body: "SaaS dashboards, storefronts, health trackers, chatbot playgrounds — instantiate in one click.",
    icon: <path d="M4 7h16M4 12h16M4 17h16M4 3h10M18 3v4" />,
  },
  {
    title: "Admin Cockpit",
    body: "SLA banners, MRR charts, tier overrides, email campaigns, immutable audit logs.",
    icon: <path d="M12 3 3 6v6c0 5 4 8 9 9 5-1 9-4 9-9V6l-9-3ZM9 12l2 2 4-4" />,
  },
];

const AGENTS = [
  { n: "01", name: "Architect", role: "Module & route outline" },
  { n: "02", name: "Designer", role: "Palette, type, layout system" },
  { n: "03", name: "Coder", role: "File tree & implementation" },
  { n: "04", name: "Tester", role: "Smoke, lint, unit gates" },
  { n: "05", name: "Reviewer", role: "Quality gate enforcement" },
  { n: "06", name: "Optimizer", role: "Bundle & perf tuning" },
  { n: "07", name: "Deployer", role: "Edge rollout & preview" },
];

const PRICING = [
  {
    name: "FREE",
    price: "$0",
    per: "/mo",
    features: ["3 projects", "Community support", "Basic templates"],
    cta: "CHOOSE FREE",
    highlight: false,
  },
  {
    name: "PRO",
    price: "$29",
    per: "/mo",
    features: ["Unlimited projects", "Priority AI queue", "All templates", "Deploy hooks"],
    cta: "CHOOSE PRO",
    highlight: true,
  },
  {
    name: "TEAM",
    price: "$99",
    per: "/mo",
    features: ["Everything in Pro", "Team roles + audit", "SSO + MFA", "Dedicated SLA"],
    cta: "CHOOSE TEAM",
    highlight: false,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Nav />
      <Hero />
      <Ticker />
      <Platform />
      <Pipeline />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-primary" />
          NEXUS<span className="text-primary">.AI</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Sign in
          </a>
          <a
            href="#"
            className="nx-btn-primary inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start building →
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="nx-glow absolute inset-0" />
      <div className="nx-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="nx-fade-up flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-primary" />
            AI-Native App Foundry · v2026.1
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            Ship the app
            <br />
            you described in
            <br />
            <span className="text-primary">one prompt.</span>
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
            Nexus.AI orchestrates a 7-agent pipeline that turns your brief into a
            running codebase — nested file trees, sandboxed previews and edge
            deploys included.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="nx-btn-primary inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold tracking-tight text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start building free
            </a>
            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold tracking-tight text-foreground transition-colors hover:bg-card"
            >
              See the pipeline
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span>Claude Sonnet 4.6</span>
            <span className="text-primary">◇</span>
            <span>Gemini 3 Flash</span>
            <span className="text-primary">◇</span>
            <span>Edge Deploy</span>
          </div>
        </div>

        <div className="nx-fade-up relative flex items-center" style={{ animationDelay: "120ms" }}>
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const [visible, setVisible] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible >= TERMINAL_LINES.length) return;
    const delay = visible === 0 ? 500 : 480 + Math.random() * 260;
    const id = setTimeout(() => {
      setVisible((v) => v + 1);
    }, delay);
    return () => clearTimeout(id);
  }, [visible]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visible]);

  return (
    <div className="relative w-full">
      <div className="absolute -inset-3 -z-10 rounded-2xl bg-primary/10 blur-2xl" />
      <div className="overflow-hidden rounded-xl border border-border bg-[oklch(0.08_0.01_264)] shadow-2xl shadow-primary/10">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-card/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.22_25)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_85)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_150)]" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Terminal · Session-01
          </span>
        </div>
        {/* body */}
        <div
          ref={scrollRef}
          className="h-[340px] space-y-1.5 overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed"
        >
          {TERMINAL_LINES.slice(0, visible).map((line, i) => (
            <p key={i} className={line.c}>
              {line.t}
            </p>
          ))}
          {visible >= TERMINAL_LINES.length ? (
            <p className="text-primary">
              <span className="nx-cursor" />
            </p>
          ) : (
            <p>
              <span className="nx-cursor" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const items = [
    "edge://nexus.build",
    "smoke.pass",
    "eslint.pass",
    "bundle 42kb gz",
    "quality gate green",
    "edge deploy live",
    "claude sonnet 4.6",
    "gemini 3 flash",
  ];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-card/30">
      <div className="flex overflow-hidden">
        <div className="nx-marquee flex shrink-0 items-center gap-8 py-2.5 pr-8">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {t}
              <span className="text-primary">◇</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      <span className="text-primary">◇</span>
      {children}
    </span>
  );
}

function Platform() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-2xl">
        <SectionLabel>Platform Surface</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Every layer of the builder, exposed.
        </h2>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM.map((p) => (
          <div key={p.title} className="group bg-background p-8 transition-colors hover:bg-card/40">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/40 text-primary transition-colors group-hover:bg-primary/10">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {p.icon}
              </svg>
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section id="pipeline" className="relative overflow-hidden border-y border-border bg-card/20">
      <div className="nx-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-2xl">
          <SectionLabel>The 7-Agent Pipeline</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Seven specialists.
            <br />
            <span className="text-muted-foreground">One deterministic build.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-7">
          {AGENTS.map((a) => (
            <div
              key={a.n}
              className="group relative flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-card/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 font-mono text-sm text-primary nx-pulse">
                {a.n}
              </div>
              <div>
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {a.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {a.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-2xl">
        <SectionLabel>Simple Pricing</SectionLabel>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Pay for velocity.
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border p-8 transition-transform hover:-translate-y-1 ${
              tier.highlight
                ? "border-primary/60 bg-card/50 nx-btn-primary"
                : "border-border bg-card/20"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                Most popular
              </span>
            )}
            <h3 className="font-mono text-sm uppercase tracking-[0.22em] text-muted-foreground">
              {tier.name}
            </h3>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-5xl font-bold tracking-tight">
                {tier.price}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">{tier.per}</span>
            </div>
            <ul className="mt-8 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">›</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-8 inline-flex items-center justify-center rounded-md px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                tier.highlight
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border text-foreground hover:bg-card"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-primary" />
          NEXUS<span className="text-primary">.AI</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Nexus.AI · Built on Emergent
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            github
          </a>
          <span className="flex items-center gap-2">
            status{" "}
            <span className="text-[oklch(0.7_0.18_150)]">✓</span> operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Index;
