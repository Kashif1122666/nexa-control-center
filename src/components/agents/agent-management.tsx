
"use client";

import { useMemo, useState } from "react";
import { agents } from "@/data/agents";
import type { AgentCategory } from "@/types/agent";

const categories: Array<"All" | AgentCategory> = [
  "All",
  "Operations",
  "Growth",
  "Development",
  "Creative",
  "Quality",
  "Support",
];

const statusStyles = {
  planned: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  inactive: "border-zinc-700 bg-zinc-800 text-zinc-400",
  idle: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  working: "border-green-500/20 bg-green-500/10 text-green-400",
  paused: "border-orange-500/20 bg-orange-500/10 text-orange-400",
  error: "border-red-500/20 bg-red-500/10 text-red-400",
};

export default function AgentManagement() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<"All" | AgentCategory>("All");

  const filteredAgents = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesCategory =
        activeCategory === "All" ||
        agent.category === activeCategory;

      const searchableContent = [
        agent.name,
        agent.department,
        agent.role,
        agent.description,
        ...agent.capabilities,
        ...agent.responsibilities,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        searchableContent.includes(searchText)
      );
    });
  }, [search, activeCategory]);

  const countByStatus = (status: string) =>
    agents.filter((agent) => agent.status === status).length;

  return (
    <main className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <header className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-8 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-blue-400">COMPANY DEPARTMENTS</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            AI Agent Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Manage specialized AI agents, departments, responsibilities,
            and capabilities from one workspace.
          </p>
        </div>

        <div className="w-fit rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
          <p className="text-xs text-zinc-500">Agent system</p>
          <p className="mt-1 text-sm font-medium text-amber-400">
            Not connected
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Total Agents"
          value={agents.length}
          description="Registered agent definitions"
        />
        <Stat
          label="Planned"
          value={countByStatus("planned")}
          description="Awaiting implementation"
        />
        <Stat
          label="Active"
          value={countByStatus("working")}
          description="Currently executing tasks"
        />
        <Stat
          label="Departments"
          value={new Set(agents.map((agent) => agent.department)).size}
          description="Company departments"
        />
      </section>

      <section className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Company Agents</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Browse and organize specialized agents.
            </p>
          </div>

          <input
            type="search"
            placeholder="Search agents, departments, capabilities..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-[#111114] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-blue-500 lg:max-w-md"
          />
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAgents.map((agent) => (
          <article
            key={agent.id}
            className="rounded-xl border border-zinc-800 bg-[#111114] p-6 transition hover:border-zinc-600"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-lg font-semibold text-blue-400">
                {agent.name.charAt(0)}
              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs capitalize ${
                  statusStyles[agent.status]
                }`}
              >
                {agent.status}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-semibold">{agent.name}</h3>

            <p className="mt-1 text-xs font-medium text-blue-400">
              {agent.department}
            </p>

            <p className="mt-2 text-xs text-zinc-500">{agent.role}</p>

            <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-500">
              {agent.description}
            </p>

            <div className="mt-5 border-t border-zinc-800 pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Capabilities
              </p>

              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-md bg-zinc-800/70 px-2.5 py-1.5 text-xs text-zinc-300"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800 pt-4">
              <p className="text-xs text-zinc-500">
                Model configuration
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                {agent.configuration.modelProvider
                  ? `${agent.configuration.modelProvider} / ${agent.configuration.modelName}`
                  : "Not configured"}
              </p>
            </div>
          </article>
        ))}
      </section>

      {filteredAgents.length === 0 && (
        <div className="mt-6 rounded-xl border border-zinc-800 bg-[#111114] py-16 text-center">
          <p className="font-medium">No agents found</p>
          <p className="mt-2 text-sm text-zinc-500">
            Try another search term or department.
          </p>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-zinc-600">
        Agent definitions are stored locally for now. Database persistence
        and AI execution will be implemented in later stages.
      </p>
    </main>
  );
}

function Stat({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#111114] p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-zinc-600">{description}</p>
    </div>
  );
}
