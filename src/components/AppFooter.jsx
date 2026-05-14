import React from "react";

export function formatDeployedAt(iso) {
  if (!iso) {
    return "—";
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "—";
  }
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AppFooter({ commitCount, deployedAtIso }) {
  return (
    <footer className="app-footer" aria-label="Build information">
      <p className="app-footer__meta">
        <span>
          Version <span className="app-footer__value">{commitCount}</span>
        </span>
        <span className="app-footer__sep" aria-hidden="true">
          ·
        </span>
        <span>
          Last deployed{" "}
          <time
            className="app-footer__value"
            dateTime={deployedAtIso || undefined}
          >
            {formatDeployedAt(deployedAtIso)}
          </time>
        </span>
      </p>
    </footer>
  );
}
