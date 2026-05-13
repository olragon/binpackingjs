import React from "react";

// Lightweight syntax-ish colouring without a library: regex-based, just enough
// to distinguish keywords/strings/numbers/comments in short TS snippets.
function highlight(src: string): React.ReactNode {
  const KW = /\b(import|from|const|let|var|function|return|new|export|type|interface)\b/g;
  const STR = /(['"`])(?:\\.|(?!\1).)*\1/g;
  const NUM = /\b\d+(?:\.\d+)?\b/g;
  const COM = /\/\/.*$/gm;

  const tokens: { type: "kw" | "str" | "num" | "com" | "text"; text: string; start: number; end: number }[] = [];
  const claimed: { start: number; end: number; type: "kw" | "str" | "num" | "com" }[] = [];
  function collect(re: RegExp, type: "kw" | "str" | "num" | "com") {
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      const start = m.index;
      const end = start + m[0].length;
      const overlaps = claimed.some((c) => start < c.end && end > c.start);
      if (!overlaps) claimed.push({ start, end, type });
    }
  }
  collect(COM, "com");
  collect(STR, "str");
  collect(KW, "kw");
  collect(NUM, "num");
  claimed.sort((a, b) => a.start - b.start);

  let cursor = 0;
  for (const c of claimed) {
    if (c.start > cursor) tokens.push({ type: "text", text: src.slice(cursor, c.start), start: cursor, end: c.start });
    tokens.push({ type: c.type, text: src.slice(c.start, c.end), start: c.start, end: c.end });
    cursor = c.end;
  }
  if (cursor < src.length) tokens.push({ type: "text", text: src.slice(cursor), start: cursor, end: src.length });

  return tokens.map((t, i) =>
    t.type === "text" ? <span key={i}>{t.text}</span> : <span key={i} className={t.type}>{t.text}</span>
  );
}

export function CodeBlock({ source }: { source: string }) {
  return (
    <pre className="code-block">
      <code>{highlight(source)}</code>
    </pre>
  );
}
