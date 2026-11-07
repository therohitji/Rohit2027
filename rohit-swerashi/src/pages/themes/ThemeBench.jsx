export const h = (i) => {
  try {
    return new URL(i).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

export function ThemeBench() {
  return (
    <svg
      className="sv-th-bench"
      viewBox="0 0 1180 600"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect className="blk" x="64" y="96" width="420" height="54" rx="6" />
      <rect className="blk" x="64" y="164" width="330" height="54" rx="6" />
      <rect className="blk is-soft" x="64" y="232" width="250" height="54" rx="6" />
      <rect className="chip" x="64" y="320" width="84" height="38" rx="19" />
      <rect className="chip" x="160" y="320" width="118" height="38" rx="19" />
      <rect className="chip" x="290" y="320" width="130" height="38" rx="19" />
      <rect className="chip" x="432" y="320" width="112" height="38" rx="19" />
      <circle className="chip" cx="92" cy="514" r="26" />
      <rect className="blk is-soft" x="134" y="502" width="120" height="24" rx="4" />
      <g className="scr">
        <rect x="620" y="40" width="500" height="260" rx="8" />
        <path d="M620 72 H1120" />
        <rect className="blk is-soft" x="652" y="120" width="220" height="30" rx="4" />
        <rect className="blk is-soft" x="652" y="160" width="160" height="30" rx="4" />
      </g>
      <g className="scr">
        <rect x="540" y="330" width="290" height="230" rx="8" />
        <path d="M540 358 H830" />
        <rect className="blk is-soft" x="566" y="392" width="150" height="22" rx="4" />
      </g>
      <g className="scr">
        <rect x="850" y="330" width="290" height="230" rx="8" />
        <path d="M850 358 H1140" />
        <rect className="blk is-soft" x="876" y="392" width="170" height="22" rx="4" />
      </g>
    </svg>
  );
}
