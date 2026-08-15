export interface TrackNode {
  level: number;
  x: number;
  y: number;
}

export interface GapMarker {
  label: string;
  x: number;
  y: number;
}

export const trackNodes: TrackNode[] = [
  { level: 1, x: 120, y: 115 },
  { level: 2, x: 300, y: 78 },
  { level: 3, x: 480, y: 125 },
  { level: 4, x: 670, y: 85 },
  { level: 5, x: 850, y: 135 },
  { level: 6, x: 790, y: 270 },
  { level: 7, x: 610, y: 308 },
  { level: 8, x: 430, y: 270 },
  { level: 9, x: 250, y: 320 },
  { level: 10, x: 100, y: 280 },
  { level: 15, x: 170, y: 438 },
  { level: 20, x: 400, y: 500 },
  { level: 30, x: 720, y: 438 },
  { level: 40, x: 850, y: 610 },
  { level: 50, x: 650, y: 690 },
  { level: 60, x: 340, y: 625 },
  { level: 70, x: 120, y: 785 },
  { level: 80, x: 400, y: 885 },
  { level: 90, x: 760, y: 810 },
];

export const gapMarkers: GapMarker[] = [
  { label: "Levels 11–14", x: 125, y: 365 },
  { label: "Levels 16–19", x: 285, y: 475 },
  { label: "Levels 21–29", x: 555, y: 475 },
  { label: "Levels 31–39", x: 815, y: 525 },
  { label: "Levels 41–49", x: 755, y: 660 },
  { label: "Levels 51–59", x: 490, y: 665 },
  { label: "Levels 61–69", x: 205, y: 710 },
  { label: "Levels 71–79", x: 255, y: 840 },
  { label: "Levels 81–89", x: 585, y: 855 },
];

export const zoneLabels = [
  { label: "DISCOVER", x: 75, y: 25 },
  { label: "BUILD SKILLS", x: 430, y: 190 },
  { label: "CREATE PROOF", x: 745, y: 370 },
  { label: "CAREER READY", x: 515, y: 760 },
];

export const trackPath = `
  M 120 115
  C 205 28, 222 150, 300 78
  S 405 147, 480 125
  S 592 35, 670 85
  S 795 67, 850 135

  C 900 205, 872 244, 790 270
  S 690 350, 610 308
  S 510 235, 430 270
  S 330 370, 250 320
  S 150 240, 100 280

  C 40 342, 80 414, 170 438
  C 250 470, 300 500, 400 500
  C 520 500, 590 418, 720 438

  C 830 458, 900 520, 850 610
  C 800 680, 720 710, 650 690
  C 550 660, 430 600, 340 625

  C 240 660, 170 730, 120 785
  C 80 842, 230 905, 400 885
  C 540 868, 640 792, 760 810
`;

export const visibleLevels = trackNodes.map(
  (node) => node.level,
);

export function formatLevel(level: number) {
  return String(level).padStart(2, "0");
}

export function getSelectionInformation(level: number) {
  const selectedIndex = visibleLevels.indexOf(level);

  if (level <= 10) {
    return {
      range: `LEVEL ${formatLevel(level)}`,
      included: "FREE STARTER JOURNEY",
    };
  }

  const previousVisibleLevel =
    visibleLevels[selectedIndex - 1];

  const hiddenStart = previousVisibleLevel + 1;
  const hiddenEnd = level - 1;

  return {
    range: `LEVELS ${previousVisibleLevel}–${level}`,
    included:
      hiddenStart <= hiddenEnd
        ? `INCLUDES LEVELS ${hiddenStart}–${hiddenEnd}`
        : "NEXT MILESTONE",
  };
}