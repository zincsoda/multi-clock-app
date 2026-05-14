import { useRegisterSW } from "virtual:pwa-register/react";

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: "rgba(14, 34, 54, 0.97)",
        color: "#e8eef5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "0.95rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.35)",
      }}
    >
      <span>New update available!</span>
      <button
        type="button"
        onClick={() => updateServiceWorker(true)}
        style={{
          flexShrink: 0,
          padding: "8px 16px",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "#0e2236",
          backgroundColor: "#7cb8ff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Reload
      </button>
    </div>
  );
}
