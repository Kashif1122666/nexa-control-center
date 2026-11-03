
import Link from "next/link";
import { notFound } from "next/navigation";
import { agents } from "@/data/agents";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AgentProfilePage({ params }: Props) {
  const { id } = await params;
  const agent = agents.find((item) => item.id === id);

  if (!agent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <Link
        href="/agents"
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        ← Back to agents
      </Link>

      <header className="mt-8 border-b border-zinc-800 pb-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm text-blue-400">
              {agent.department}
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              {agent.name}
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              {agent.role}
            </p>
          </div>

          <span className="w-fit rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs capitalize text-amber-400">
            {agent.status}
          </span>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-400">
          {agent.description}
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
          <h2 className="text-lg font-semibold">Responsibilities</h2>

          <ul className="mt-5 space-y-3">
            {agent.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-zinc-400">
                <span className="text-blue-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
          <h2 className="text-lg font-semibold">Capabilities</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {agent.capabilities.map((item) => (
              <span
                key={item}
                className="rounded-lg bg-zinc-800 px-3 py-2 text-xs text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-[#111114] p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Model Configuration</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Config label="Provider" value={agent.configuration.modelProvider ?? "Not configured"} />
            <Config label="Model" value={agent.configuration.modelName ?? "Not configured"} />
            <Config label="Temperature" value={String(agent.configuration.temperature)} />
            <Config label="Maximum retries" value={String(agent.configuration.maxRetries)} />
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-[#111114] p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Permissions</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Permission
              label="Knowledge access"
              enabled={agent.permissions.canAccessKnowledge}
            />
            <Permission
              label="External tools"
              enabled={agent.permissions.canUseExternalTools}
            />
            <Permission
              label="External action approval"
              enabled={agent.permissions.requiresApprovalForExternalActions}
            />
          </div>
        </section>
      </div>

      <p className="mt-8 text-center text-xs text-zinc-600">
        Agent profile · Local configuration · Execution engine not connected
      </p>
    </main>
  );
}

function Config({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 text-sm text-zinc-200">{value}</p>
    </div>
  );
}

function Permission({
  label,
  enabled,
}: {
  label: string;
  enabled: boolean;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 p-4">
      <p className="text-sm text-zinc-300">{label}</p>
      <p className={`mt-2 text-xs ${enabled ? "text-green-400" : "text-zinc-500"}`}>
        {enabled ? "Enabled" : "Disabled"}
      </p>
    </div>
  );
}
