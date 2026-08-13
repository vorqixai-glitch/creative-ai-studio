import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your workspace — Nexus.AI" },
      {
        name: "description",
        content:
          "Tell Nexus.AI about you and your team so the agent pipeline can tailor scaffolds to your stack.",
      },
      { property: "og:title", content: "Set up your workspace — Nexus.AI" },
      {
        property: "og:description",
        content: "A three-step setup before your first agent run.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

const USE_CASES = [
  "Internal tools",
  "Client projects",
  "SaaS product",
  "Prototyping",
] as const;
const TEAM_SIZES = ["Just me", "2–10", "11–50", "50+"] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");

  const { data: user } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not signed in");
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName || null,
        company: company || null,
        use_case: useCase || null,
        team_size: teamSize || null,
        onboarding_completed: true,
      });
      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate({ to: "/dashboard" });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Could not save your profile"),
  });

  const steps = [
    {
      title: "Who are we building for?",
      body: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ada Lovelace"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company or team</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nexus Labs"
            />
          </div>
        </div>
      ),
      valid: displayName.trim().length > 0,
    },
    {
      title: "What will you ship first?",
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {USE_CASES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setUseCase(c)}
              className={`rounded-lg border p-4 text-left text-sm transition-colors ${
                useCase === c
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ),
      valid: useCase !== "",
    },
    {
      title: "How big is your team?",
      body: (
        <div className="grid gap-3 sm:grid-cols-2">
          {TEAM_SIZES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTeamSize(t)}
              className={`rounded-lg border p-4 text-left text-sm transition-colors ${
                teamSize === t
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      ),
      valid: teamSize !== "",
    },
  ];

  const current = steps[step]!;
  const isLast = step === steps.length - 1;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16">
      <div className="nx-glow absolute inset-0" />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card/70 p-7 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Step {step + 1} of {steps.length}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight">{current.title}</h1>
        <div className="mt-6">{current.body}</div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            type="button"
            disabled={!current.valid || save.isPending}
            onClick={() => (isLast ? save.mutate() : setStep((s) => s + 1))}
          >
            {isLast ? (save.isPending ? "Saving…" : "Enter dashboard") : "Continue"}
          </Button>
        </div>
      </div>
    </main>
  );
}
