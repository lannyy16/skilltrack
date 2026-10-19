import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  caption: string;
  icon: LucideIcon;
  tone: "purple" | "blue" | "orange" | "green";
}

export default function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon--${tone}`}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row">
        <strong className="stat-value">{value}</strong>
      </div>
      <p className="stat-caption">{caption}</p>
    </article>
  );
}
