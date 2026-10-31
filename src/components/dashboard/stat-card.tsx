
type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

export default function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#111114] p-6">
      <p className="text-sm text-zinc-500">{label}</p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
}
