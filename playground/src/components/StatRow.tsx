import React from "react";

export type Stat = { label: string; value: React.ReactNode; tone?: "warn" | "ok" };

export function StatRow({ stats }: { stats: Stat[] }) {
  if (stats.length === 0) return null;
  return (
    <div className="stat-row">
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <span className="label">{s.label}</span>
          <span className={`value${s.tone ? ` ${s.tone}` : ""}`}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}
