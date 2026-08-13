import { useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Nexus.AI" },
      {
        name: "description",
        content:
          "Your Nexus.AI control room: agent pipeline status, recent builds and workspace settings.",
      },
      { property: "og:title", content: "Dashboard — Nexus.AI" },
      {
        property: "og:description",
        content: "Track agent runs and manage your Nexus.AI workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      return { user, profile };
    },
  });

  const needsOnboarding = !isLoading && data !== null && !data?.profile?.onboarding_completed;

  useEffect(() => {
    if (needsOnboarding) navigate({ to: "/onboarding", replace: true });
  }, [needsOnboarding, navigate]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const name = data?.profile?.display_name ?? data?.user.email ?? "there";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-primary" />
            NEXUS<span className="text-primary">.AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {data?.user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
          {isLoading ? "Loading…" : `Welcome back, ${name}`}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Your 7-agent pipeline is idle. Start a build to see live terminal output, nested file
          trees and sandboxed previews.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Active builds", value: "0" },
            { label: "Agents online", value: "7" },
            { label: "Edge deploys", value: "0" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card/60 p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/60 p-6">
            <h2 className="font-display text-lg font-semibold">Your profile</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                ["Name", data?.profile?.display_name],
                ["Company", data?.profile?.company],
                ["Primary use case", data?.profile?.use_case],
                ["Team size", data?.profile?.team_size],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground">{v ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/onboarding">Update details</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-6">
            <h2 className="font-display text-lg font-semibold">Start a build</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Describe an app and Nexus will scaffold, test and deploy it.
            </p>
            <Button className="mt-5">New build →</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
