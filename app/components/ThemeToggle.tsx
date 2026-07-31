"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const value = document.documentElement.dataset.theme === "dark";
    queueMicrotask(() => setDark(value));
  }, []);

  function toggle() {
    const next = !dark;
    const selectedTheme = next ? "dark" : "light";
    const root = document.documentElement;

    setDark(next);
    root.classList.remove("light", "dark");
    root.classList.add(selectedTheme);
    root.style.colorScheme = selectedTheme;
    root.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("mentor-me-theme", selectedTheme);
  }

  return <label className="sky-toggle" title={dark ? "Switch to light mode" : "Switch to dark mode"}>
    <input type="checkbox" checked={dark} onChange={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} />
    <span className="sky-toggle__scene">
      <span className="sky-toggle__stars"><i/><i/><i/><i/><i/></span>
      <span className="sky-toggle__clouds"><i/><i/><i/></span>
      <span className="sky-toggle__orb"><span className="sky-toggle__moon"><i/><i/><i/></span></span>
    </span>
  </label>;
}
