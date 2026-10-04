"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

import { firstFiveLevels, processSteps } from "./homeJourneyData";

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("hj-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function useHomeTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.dataset.theme === "dark"
          ? "dark"
          : "light",
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export function useHomeJourneyState() {
  const rootRef = useReveal();
  const theme = useHomeTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [activeLevel, setActiveLevel] = useState(0);
  const [roadmapImpact, setRoadmapImpact] = useState(false);
  const [roadmapReturning, setRoadmapReturning] = useState(false);

  const activeProcess = processSteps[activeStep];
  const selectedLevel = firstFiveLevels[activeLevel];

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const schedule = (callback: () => void, delay: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const runCycle = (level: number) => {
      if (cancelled) return;

      if (level < firstFiveLevels.length - 1) {
        schedule(() => {
          const nextLevel = level + 1;
          setActiveLevel(nextLevel);
          runCycle(nextLevel);
        }, 2300);
        return;
      }

      schedule(() => {
        setRoadmapImpact(true);

        schedule(() => {
          setRoadmapImpact(false);
          setRoadmapReturning(true);

          schedule(() => {
            setActiveLevel(0);

            schedule(() => {
              setRoadmapReturning(false);
              runCycle(0);
            }, 260);
          }, 220);
        }, 1050);
      }, 2100);
    };

    runCycle(0);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const processProgress =
    processSteps.length <= 1
      ? 0
      : (activeStep / (processSteps.length - 1)) * 100;

  const sparkProgress =
    activeStep === 0 || processSteps.length <= 1
      ? 0
      : ((activeStep - 0.5) / (processSteps.length - 1)) * 100;

  return {
    rootRef,
    theme,
    activeStep,
    setActiveStep,
    activeProcess,
    activeLevel,
    setActiveLevel,
    roadmapImpact,
    setRoadmapImpact,
    roadmapReturning,
    setRoadmapReturning,
    selectedLevel,
    processProgress,
    sparkProgress,
  };
}
