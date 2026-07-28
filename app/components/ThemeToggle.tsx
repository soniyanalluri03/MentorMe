"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("mentor-theme");
    const value = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    queueMicrotask(() => setDark(value));
    document.documentElement.dataset.theme = value ? "dark" : "light";
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("mentor-theme", next ? "dark" : "light");
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
