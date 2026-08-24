"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable (private mode, disabled) - theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-surface text-sm"
    >
      ◐
    </button>
  );
}
