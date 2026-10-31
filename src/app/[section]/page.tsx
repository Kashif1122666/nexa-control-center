
import Link from "next/link";

const sections: Record<string, string> = {
  agents: "AI Agents",
  tasks: "Tasks",
  projects: "Projects",
  clients: "Clients",
  knowledge: "Knowledge Base",
  analytics: "Analytics",
  settings: "Settings",
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = sections[section];

  if (!title) {
    return (
      <main className="min-h-screen bg-[#09090b] p-10 text-white">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-400">
          Return to Overview
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] p-6 text-white md:p-10">
      <Link href="/" className="text-sm text-zinc-500 hover:text-white">
        ← Back to Overview
      </Link>

      <h1 className="mt-8 text-3xl font-semibold">{title}</h1>

      <p className="mt-3 text-zinc-500">
        The {title} workspace will be developed here.
      </p>
    </main>
  );
}
