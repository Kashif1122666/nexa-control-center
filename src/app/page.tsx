
import StatCard from "@/components/dashboard/stat-card";
import Sidebar from "@/components/layout/sidebar";

const stats = [
  { label: "Total Agents", value: 0, description: "Registered AI agents" },
  { label: "Active Tasks", value: 0, description: "Currently running tasks" },
  { label: "Active Projects", value: 0, description: "Ongoing company projects" },
  { label: "Total Clients", value: 0, description: "Registered clients" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#09090b] text-white">
      

      <section className="min-w-0 flex-1 p-6 md:p-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Welcome to your company control center.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
            System Status: Initializing
          </div>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
            <h3 className="font-semibold">Company Activity</h3>
            <p className="mt-3 text-sm text-zinc-500">
              Your company activity will appear here.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
            <h3 className="font-semibold">AI Management</h3>
            <p className="mt-3 text-sm text-zinc-500">
              Your AI management system will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
