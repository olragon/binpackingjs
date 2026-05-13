import React from "react";
import { CodeBlock } from "./CodeBlock";
import { StatRow, type Stat } from "./StatRow";

type Props = {
  kicker: string;
  title: string;
  description: string;
  code?: string;
  viz: React.ReactNode;
  stats?: Stat[];
  onReshuffle?: () => void;
};

export function DemoCard({ kicker, title, description, code, viz, stats, onReshuffle }: Props) {
  return (
    <section className="demo">
      <div className="demo-header">
        <div>
          <h2>
            <span className="kicker">{kicker}</span>
            {title}
          </h2>
          <p>{description}</p>
        </div>
        {onReshuffle && (
          <button className="reshuffle" onClick={onReshuffle} title="randomise input">
            ↻ Reshuffle
          </button>
        )}
      </div>
      <div className={code !== undefined ? "demo-body" : "demo-body full"}>
        {code !== undefined && <CodeBlock source={code} />}
        <div className="viz">{viz}</div>
      </div>
      {stats && stats.length > 0 && <StatRow stats={stats} />}
    </section>
  );
}
