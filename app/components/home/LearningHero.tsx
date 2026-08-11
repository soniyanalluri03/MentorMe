"use client";

import Link from "next/link";
import { Environment, Float, Text } from "@react-three/drei";
import {
  Canvas,
  ThreeEvent,
  useFrame,
} from "@react-three/fiber";
import {
  MutableRefObject,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

/* =========================================================
   TYPES
========================================================= */

type ThemeMode = "light" | "dark";

type PanelId =
  | "code"
  | "roadmap"
  | "project";

type SelectedPanel =
  | PanelId
  | null;

type AnimationPhase = {
  bookOpen: number;
  contentReveal: number;
};

type PanelDefinition = {
  id: PanelId;
  eyebrow: string;
  title: string;
  description: string;
  secondaryText: string;
  progress: string;
  position: [
    number,
    number,
    number,
  ];
  rotation: [
    number,
    number,
    number,
  ];
  scale: number;
  delay: number;
};

/* =========================================================
   THEME DETECTION
========================================================= */

function useThemeMode(): ThemeMode {
  const [theme, setTheme] =
  useState<ThemeMode>("dark");

  useEffect(() => {
    function updateTheme() {
      setTheme(
        document.documentElement
          .dataset.theme === "dark"
          ? "dark"
          : "light",
      );
    }

    updateTheme();

    const observer =
      new MutationObserver(
        updateTheme,
      );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "data-theme",
        ],
      },
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  return theme;
}

/* =========================================================
   POINTER TRACKING
========================================================= */

function usePointerTracking() {
  const pointerRef = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handlePointerMove(
      event: PointerEvent,
    ) {
      const width = Math.max(
        window.innerWidth,
        1,
      );

      const height = Math.max(
        window.innerHeight,
        1,
      );

      pointerRef.current.x =
        THREE.MathUtils.clamp(
          (event.clientX /
            width) *
            2 -
            1,
          -1,
          1,
        );

      pointerRef.current.y =
        THREE.MathUtils.clamp(
          -(
            (event.clientY /
              height) *
              2 -
            1
          ),
          -1,
          1,
        );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
    };
  }, []);

  return pointerRef;
}

/* =========================================================
   HELPERS
========================================================= */

function easeInOutCubic(
  value: number,
) {
  if (value < 0.5) {
    return (
      4 *
      value *
      value *
      value
    );
  }

  return (
    1 -
    Math.pow(
      -2 * value + 2,
      3,
    ) /
      2
  );
}

function timedProgress(
  elapsed: number,
  start: number,
  duration: number,
) {
  const progress =
    THREE.MathUtils.clamp(
      (elapsed - start) /
        duration,
      0,
      1,
    );

  return easeInOutCubic(
    progress,
  );
}

/* =========================================================
   BOOK PAGE STACK
========================================================= */

function PageStack({
  side,
  theme,
}: {
  side: "left" | "right";
  theme: ThemeMode;
}) {
  const pageCount = 11;
  const layerStep = theme === "light" ? 0.015 : 0.012;
  const layerHeight = theme === "light" ? 0.024 : 0.021;

  const pagePrimary =
    theme === "dark"
      ? "#fff7e4"
      : "#fffdf4";

  const pageSecondary =
    theme === "dark"
      ? "#e9ddc5"
      : "#f1e7d5";

  return (
    <group>
      {Array.from({
        length: pageCount,
      }).map((_, index) => {
        const direction =
          side === "left"
            ? -1
            : 1;

        return (
          <mesh
            key={`${side}-${index}`}
            position={[
              direction *
                (0.715 -
                  index *
                    0.002),
              0.02 +
                index * layerStep,
              index * 0.0015,
            ]}
            castShadow
            receiveShadow
          >
            <boxGeometry
              args={[
                1.39 -
                  index *
                    0.008,
                layerHeight,
                0.97 -
                  index *
                    0.004,
              ]}
            />

            <meshStandardMaterial
              color={
                index % 2 === 0
                  ? pagePrimary
                  : pageSecondary
              }
              roughness={0.95}
              metalness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================
   TURNING PAGE
========================================================= */

function TurningPages({
  theme,
  phaseRef,
}: {
  theme: ThemeMode;
  phaseRef: MutableRefObject<AnimationPhase>;
}) {
  const pageRefs = useRef<Array<THREE.Group | null>>([]);
  const sequenceStartRef = useRef<number | null>(null);

  useFrame((state) => {
    const enabled =
      phaseRef.current.bookOpen >
      0.98;

    if (!enabled) {
      sequenceStartRef.current = null;
      pageRefs.current.forEach((page) => {
        if (!page) return;
        page.visible = false;
        page.position.y = 0;
        page.rotation.set(0, 0, 0);
      });
      return;
    }

    const now = state.clock.getElapsedTime();
    if (sequenceStartRef.current === null) {
      sequenceStartRef.current = now + 0.45;
    }

    const pageDuration = 1.55;
    const pageGap = 0.32;
    const sequenceDuration = pageRefs.current.length * (pageDuration + pageGap) + 1.35;
    const sequenceTime =
      ((now - sequenceStartRef.current) % sequenceDuration + sequenceDuration) %
      sequenceDuration;

    pageRefs.current.forEach((page, index) => {
      if (!page) return;
      const start = index * (pageDuration + pageGap);
      const rawProgress = THREE.MathUtils.clamp(
        (sequenceTime - start) / pageDuration,
        0,
        1,
      );
      const active = sequenceTime >= start && sequenceTime <= start + pageDuration;

      page.visible = active;
      if (!active) {
        page.position.y = 0;
        page.rotation.set(0, 0, 0);
        return;
      }

      const eased = easeInOutCubic(rawProgress);
      page.rotation.y = -eased * Math.PI;
      page.rotation.z = Math.sin(eased * Math.PI) * (0.018 + index * 0.003);
      page.position.y = Math.sin(eased * Math.PI) * (0.1 + index * 0.008);
    });
  });

  return (
    <group>
      {[0, 1, 2, 3].map((index) => (
        <group
          key={index}
          ref={(page) => {
            pageRefs.current[index] = page;
          }}
          visible={false}
        >
          <mesh position={[0.67, index * 0.004, -index * 0.004]} castShadow>
            <planeGeometry args={[1.34 - index * 0.008, 0.94 - index * 0.006, 26, 16]} />
            <meshStandardMaterial
              color={
                theme === "dark"
                  ? index % 2 === 0 ? "#fff8e9" : "#eee2c9"
                  : index % 2 === 0 ? "#fffefa" : "#f5ecdc"
              }
              side={THREE.DoubleSide}
              roughness={0.94}
              metalness={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   COMPLETE AUTO-OPENING BOOK

   Each book half includes:
   - Gold outer cover
   - Inner cover
   - Full page stack

   Therefore, pages and covers move together.
========================================================= */

function MentorBook({
  theme,
  phaseRef,
}: {
  theme: ThemeMode;
  phaseRef: MutableRefObject<AnimationPhase>;
}) {
  const rootRef =
    useRef<THREE.Group>(null);

  const leftHalfRef =
    useRef<THREE.Group>(null);

  const rightHalfRef =
    useRef<THREE.Group>(null);

  const goldOuter =
    theme === "dark"
      ? "#d9b64b"
      : "#c89b2e";

  const goldHighlight =
    theme === "dark"
      ? "#f5dd7c"
      : "#e8c861";

  const innerCover =
    theme === "dark"
      ? "#112a49"
      : "#503970";

  useFrame((state) => {
    if (
      !rootRef.current ||
      !leftHalfRef.current ||
      !rightHalfRef.current
    ) {
      return;
    }

    const elapsed =
      state.clock.getElapsedTime();

    const progress =
      phaseRef.current.bookOpen;
    const idleMotion = THREE.MathUtils.smoothstep(progress, 0.98, 1);

    /*
     * Closed book:
     * both complete halves stand together.
     *
     * Open book:
     * complete halves rotate into a
     * properly aligned V shape.
     */

    leftHalfRef.current.rotation.z =
      THREE.MathUtils.lerp(
        -1.49,
        -0.11,
        progress,
      );

    rightHalfRef.current.rotation.z =
      THREE.MathUtils.lerp(
        1.49,
        0.11,
        progress,
      );

    rootRef.current.position.y =
      THREE.MathUtils.lerp(
         0.15,
          -0.82,
        progress,
      ) +
      Math.sin(
        elapsed * 0.5,
      ) *
        0.015 * idleMotion;

    rootRef.current.position.z =
      THREE.MathUtils.lerp(
        0.15,
        0.48,
        progress,
      );

    rootRef.current.rotation.x =
      THREE.MathUtils.lerp(
        -0.04,
        -0.62,
        progress,
      );

    rootRef.current.rotation.y =
      THREE.MathUtils.lerp(
        -0.34,
        0,
        progress,
      );

    rootRef.current.rotation.z =
      Math.sin(
        elapsed * 0.28,
      ) * 0.005 * idleMotion;
  });

  return (
    <group
      ref={rootRef}
      position={[
        0,
        0.15,
        0.15,
      ]}
      rotation={[
        -0.04,
        -0.34,
        0,
      ]}
     scale={1.08}
    >
      {/* Gold central spine */}

      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            0.14,
            0.2,
            1.15,
          ]}
        />

        <meshPhysicalMaterial
          color={
            goldHighlight
          }
          metalness={0.62}
          roughness={0.19}
          clearcoat={1}
          clearcoatRoughness={
            0.06
          }
        />
      </mesh>

      {/* LEFT COMPLETE HALF */}

      <group
        ref={leftHalfRef}
        position={[
          -0.04,
          0,
          0,
        ]}
        rotation={[
          0,
          0,
          -1.49,
        ]}
      >
        <mesh
          position={[
            -0.77,
            -0.055,
            0,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[
              1.56,
              0.14,
              1.11,
            ]}
          />

          <meshPhysicalMaterial
            color={goldOuter}
            metalness={0.5}
            roughness={0.19}
            clearcoat={1}
            clearcoatRoughness={
              0.05
            }
          />
        </mesh>

        <mesh
          position={[
            -0.77,
            0.025,
            0,
          ]}
        >
          <boxGeometry
            args={[
              1.42,
              0.025,
              0.97,
            ]}
          />

          <meshPhysicalMaterial
            color={innerCover}
            metalness={0.22}
            roughness={0.27}
            clearcoat={0.8}
          />
        </mesh>

        <PageStack
          side="left"
          theme={theme}
        />
      </group>

      {/* RIGHT COMPLETE HALF */}

      <group
        ref={rightHalfRef}
        position={[
          0.04,
          0,
          0,
        ]}
        rotation={[
          0,
          0,
          1.49,
        ]}
      >
        <mesh
          position={[
            0.77,
            -0.055,
            0,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[
              1.56,
              0.14,
              1.11,
            ]}
          />

          <meshPhysicalMaterial
            color={goldOuter}
            metalness={0.5}
            roughness={0.19}
            clearcoat={1}
            clearcoatRoughness={
              0.05
            }
          />
        </mesh>

        <mesh
          position={[
            0.77,
            0.025,
            0,
          ]}
        >
          <boxGeometry
            args={[
              1.42,
              0.025,
              0.97,
            ]}
          />

          <meshPhysicalMaterial
            color={innerCover}
            metalness={0.22}
            roughness={0.27}
            clearcoat={0.8}
          />
        </mesh>

        <PageStack
          side="right"
          theme={theme}
        />
      </group>
<group
        position={[
          0,
          0.19,
          -0.47,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <TurningPages
          theme={theme}
          phaseRef={phaseRef}
        />
      </group>
    </group>
  );
}

/* =========================================================
   FLOATING CODE ELEMENTS
========================================================= */

function FloatingCodeItem({
  text,
  startPosition,
  delay,
  theme,
  phaseRef,
  gold = false,
}: {
  text: string;
  startPosition: [
    number,
    number,
    number,
  ];
  delay: number;
  theme: ThemeMode;
  phaseRef: MutableRefObject<AnimationPhase>;
  gold?: boolean;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const textRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry,
        THREE.Material
      >
    >(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const reveal =
      phaseRef.current
        .contentReveal;

    if (reveal < 0.12) {
      groupRef.current.visible =
        false;

      return;
    }

    const elapsed =
      state.clock.getElapsedTime();

    const duration = 7;

    const localTime =
      (elapsed -
        delay +
        duration * 20) %
      duration;

    const progress =
      localTime / duration;

    const fadeIn =
      THREE.MathUtils.smoothstep(
        progress,
        0,
        0.17,
      );

    const fadeOut =
      1 -
      THREE.MathUtils.smoothstep(
        progress,
        0.75,
        1,
      );

    const opacity =
      fadeIn *
      fadeOut *
      reveal;

    groupRef.current.visible =
      opacity > 0.02;

    groupRef.current.position.set(
      startPosition[0] +
        Math.sin(
          progress *
            Math.PI *
            2 +
            delay,
        ) *
          0.16,
      startPosition[1] +
        progress * 2.05,
      startPosition[2] +
        Math.cos(
          progress *
            Math.PI *
            2,
        ) *
          0.08,
    );

    const scale =
      0.68 +
      Math.sin(
        progress * Math.PI,
      ) *
        0.27;

    groupRef.current.scale.setScalar(
      scale,
    );

    if (textRef.current) {
      const material =
        textRef.current
          .material as THREE.Material & {
          opacity: number;
          transparent: boolean;
        };

      material.transparent =
        true;

      material.opacity =
        opacity;
    }
  });

  const color = gold
    ? theme === "dark"
      ? "#f4d46b"
      : "#9f781d"
    : theme === "dark"
      ? "#73dcff"
      : "#17324f";

  return (
    <group
      ref={groupRef}
      visible={false}
      position={startPosition}
    >
      <Float
        speed={1.1}
        floatIntensity={0.1}
        rotationIntensity={0.04}
      >
        <Text
          ref={textRef}
          fontSize={0.14}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Float>
    </group>
  );
}

/* =========================================================
   PANEL VISUAL CONTENT
========================================================= */

function CodePanelContent({
  accent,
  gold,
}: {
  accent: string;
  gold: string;
}) {
  const lines = [
    {
      y: 0.23,
      x: -0.13,
      width: 1.12,
      color: gold,
    },
    {
      y: 0.02,
      x: 0.03,
      width: 1.42,
      color: accent,
    },
    {
      y: -0.19,
      x: -0.2,
      width: 0.94,
      color: gold,
    },
    {
      y: -0.4,
      x: 0.02,
      width: 1.28,
      color: accent,
    },
  ];

  return (
    <>
      {lines.map((line) => (
        <mesh
          key={line.y}
          position={[
            line.x,
            line.y,
            0.067,
          ]}
        >
          <boxGeometry
            args={[
              line.width,
              0.037,
              0.018,
            ]}
          />

          <meshStandardMaterial
            color={line.color}
            emissive={line.color}
            emissiveIntensity={
              0.4
            }
            roughness={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

function RoadmapPanelContent({
  accent,
  gold,
}: {
  accent: string;
  gold: string;
}) {
  const nodes: [
    number,
    number,
  ][] = [
    [-0.56, -0.25],
    [-0.2, 0.04],
    [0.17, -0.04],
    [0.55, 0.29],
  ];

  return (
    <>
      {nodes
        .slice(0, -1)
        .map(
          (
            node,
            index,
          ) => {
            const next =
              nodes[index + 1];

            const start =
              new THREE.Vector3(
                node[0],
                node[1],
                0.067,
              );

            const end =
              new THREE.Vector3(
                next[0],
                next[1],
                0.067,
              );

            const middle =
              start
                .clone()
                .add(end)
                .multiplyScalar(
                  0.5,
                );

            const length =
              start.distanceTo(
                end,
              );

            const angle =
              Math.atan2(
                end.y -
                  start.y,
                end.x -
                  start.x,
              );

            return (
              <mesh
                key={index}
                position={[
                  middle.x,
                  middle.y,
                  middle.z,
                ]}
                rotation={[
                  0,
                  0,
                  angle,
                ]}
              >
                <boxGeometry
                  args={[
                    length,
                    0.025,
                    0.014,
                  ]}
                />

                <meshBasicMaterial
                  color={accent}
                />
              </mesh>
            );
          },
        )}

      {nodes.map(
        (node, index) => (
          <mesh
            key={index}
            position={[
              node[0],
              node[1],
              0.08,
            ]}
          >
            <sphereGeometry
              args={[
                index ===
                nodes.length -
                  1
                  ? 0.11
                  : 0.075,
                20,
                20,
              ]}
            />

            <meshStandardMaterial
              color={
                index ===
                nodes.length -
                  1
                  ? gold
                  : accent
              }
              emissive={
                index ===
                nodes.length -
                  1
                  ? gold
                  : accent
              }
              emissiveIntensity={
                index ===
                nodes.length -
                  1
                  ? 0.55
                  : 0.2
              }
            />
          </mesh>
        ),
      )}
    </>
  );
}

function ProjectPanelContent({
  accent,
  gold,
}: {
  accent: string;
  gold: string;
}) {
  const heights = [
    0.34,
    0.55,
    0.77,
    0.47,
  ];

  return (
    <>
      {heights.map(
        (height, index) => (
          <mesh
            key={index}
            position={[
              -0.48 +
                index * 0.32,
              -0.35 +
                height / 2,
              0.067,
            ]}
          >
            <boxGeometry
              args={[
                0.18,
                height,
                0.02,
              ]}
            />

            <meshStandardMaterial
              color={
                index === 2
                  ? gold
                  : accent
              }
              emissive={
                index === 2
                  ? gold
                  : accent
              }
              emissiveIntensity={
                0.33
              }
            />
          </mesh>
        ),
      )}
    </>
  );
}

/* =========================================================
   INTERACTIVE PANEL
========================================================= */

function InteractivePanel({
  definition,
  theme,
  phaseRef,
  selected,
  anotherSelected,
  onSelect,
}: {
  definition: PanelDefinition;
  theme: ThemeMode;
  phaseRef: MutableRefObject<AnimationPhase>;
  selected: boolean;
  anotherSelected: boolean;
  onSelect: (
    id: PanelId,
  ) => void;
}) {
  const panelRef =
    useRef<THREE.Group>(null);

  const [hovered, setHovered] =
    useState(false);

  const accent =
    theme === "dark"
      ? "#73d9ff"
      : "#7658ac";

  const gold =
    theme === "dark"
      ? "#f1d269"
      : "#c99e33";

  const panelColor =
    theme === "dark"
      ? "#0d2c4d"
      : "#efe7f8";

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor =
        "pointer";
    } else {
      document.body.style.cursor =
        "";
    }

    return () => {
      document.body.style.cursor =
        "";
    };
  }, [hovered]);

  useFrame((state) => {
    if (!panelRef.current) {
      return;
    }

    const reveal =
      phaseRef.current
        .contentReveal;

    const localReveal =
      THREE.MathUtils.clamp(
        (reveal -
          definition.delay) /
          Math.max(
            0.001,
            1 -
              definition.delay,
          ),
        0,
        1,
      );

    const easedReveal =
      easeInOutCubic(
        localReveal,
      );

    panelRef.current.visible =
      easedReveal > 0.01;

    const hiddenPosition =
      new THREE.Vector3(
        0,
        -0.65,
        0.18,
      );

    const normalPosition =
      new THREE.Vector3(
        ...definition.position,
      );

    const selectedPosition =
      new THREE.Vector3(
        0,
        0.65,
        1.5,
      );

    const targetPosition =
      selected
        ? selectedPosition
        : hiddenPosition
            .clone()
            .lerp(
              normalPosition,
              easedReveal,
            );

    panelRef.current.position.lerp(
      targetPosition,
      selected ? 0.09 : 0.07,
    );

    const targetScale =
      selected
        ? 1.2
        : definition.scale *
          easedReveal *
          (hovered
            ? 1.055
            : 1);

    panelRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        targetScale,
        targetScale,
      ),
      0.075,
    );

    const elapsed =
      state.clock.getElapsedTime();

    panelRef.current.rotation.x =
      THREE.MathUtils.lerp(
        panelRef.current
          .rotation.x,
        selected
          ? 0
          : definition
              .rotation[0],
        0.06,
      );

    panelRef.current.rotation.y =
      THREE.MathUtils.lerp(
        panelRef.current
          .rotation.y,
        selected
          ? Math.sin(
              elapsed * 0.35,
            ) * 0.012
          : definition
              .rotation[1] +
              Math.sin(
                elapsed * 0.4 +
                  definition.delay,
              ) *
                0.018,
        0.06,
      );

    panelRef.current.rotation.z =
      THREE.MathUtils.lerp(
        panelRef.current
          .rotation.z,
        selected
          ? 0
          : definition
              .rotation[2],
        0.06,
      );

    const targetOpacity =
      anotherSelected &&
      !selected
        ? 0.13
        : 1;

    panelRef.current.traverse(
      (child) => {
        if (
          !(
            child instanceof
            THREE.Mesh
          )
        ) {
          return;
        }

        const materials =
          Array.isArray(
            child.material,
          )
            ? child.material
            : [child.material];

        materials.forEach(
          (material) => {
            material.transparent =
              true;

            material.opacity =
              THREE.MathUtils.lerp(
                material.opacity,
                targetOpacity,
                0.1,
              );
          },
        );
      },
    );
  });

  function handleClick(
    event: ThreeEvent<MouseEvent>,
  ) {
    event.stopPropagation();

    onSelect(definition.id);
  }

  return (
    <group
      ref={panelRef}
      visible={false}
      position={[
        0,
        -0.65,
        0.18,
      ]}
      scale={0}
      onClick={handleClick}
      onPointerEnter={(
        event,
      ) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
    >
      <mesh castShadow>
        <boxGeometry
          args={[
            1.8,
            1.18,
            0.1,
          ]}
        />

        <meshPhysicalMaterial
          color={panelColor}
          transparent
          opacity={0.95}
          metalness={0.23}
          roughness={0.17}
          clearcoat={1}
          clearcoatRoughness={
            0.06
          }
        />
      </mesh>

      <mesh
        position={[
          0,
          0.51,
          0.058,
        ]}
      >
        <boxGeometry
          args={[
            1.55,
            0.043,
            0.018,
          ]}
        />

        <meshBasicMaterial
          color={accent}
        />
      </mesh>

      <Text
        position={[
          -0.7,
          0.4,
          0.067,
        ]}
        fontSize={0.085}
        color={accent}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.07}
      >
        {definition.eyebrow}
      </Text>

      {!selected &&
        definition.id ===
          "code" && (
          <CodePanelContent
            accent={accent}
            gold={gold}
          />
        )}

      {!selected &&
        definition.id ===
          "roadmap" && (
          <RoadmapPanelContent
            accent={accent}
            gold={gold}
          />
        )}

      {!selected &&
        definition.id ===
          "project" && (
          <ProjectPanelContent
            accent={accent}
            gold={gold}
          />
        )}

      {selected && (
        <group>
          <Text
            position={[
              -0.7,
              0.18,
              0.067,
            ]}
            fontSize={0.14}
            color={
              theme === "dark"
                ? "#f7faff"
                : "#172b4b"
            }
            anchorX="left"
            anchorY="middle"
          >
            {definition.title}
          </Text>

          <Text
            position={[
              -0.7,
              -0.05,
              0.067,
            ]}
            fontSize={0.083}
            color={
              theme === "dark"
                ? "#a9c7df"
                : "#665e76"
            }
            anchorX="left"
            anchorY="middle"
          >
            {definition.description}
          </Text>

          <Text
            position={[
              -0.7,
              -0.23,
              0.067,
            ]}
            fontSize={0.083}
            color={
              theme === "dark"
                ? "#a9c7df"
                : "#665e76"
            }
            anchorX="left"
            anchorY="middle"
          >
            {
              definition.secondaryText
            }
          </Text>

          <mesh
            position={[
              -0.06,
              -0.44,
              0.067,
            ]}
          >
            <boxGeometry
              args={[
                1.27,
                0.06,
                0.02,
              ]}
            />

            <meshBasicMaterial
              color={
                theme === "dark"
                  ? "#183f64"
                  : "#d9cfea"
              }
            />
          </mesh>

          <mesh
            position={[
              -0.31,
              -0.44,
              0.079,
            ]}
          >
            <boxGeometry
              args={[
                0.77,
                0.06,
                0.022,
              ]}
            />

            <meshBasicMaterial
              color={gold}
            />
          </mesh>

          <Text
            position={[
              0.71,
              -0.44,
              0.067,
            ]}
            fontSize={0.075}
            color={gold}
            anchorX="right"
            anchorY="middle"
          >
            {definition.progress}
          </Text>
        </group>
      )}

      <mesh
        position={[
          0,
          0,
          -0.07,
        ]}
        scale={1.08}
      >
        <boxGeometry
          args={[
            1.8,
            1.18,
            0.05,
          ]}
        />

        <meshBasicMaterial
          color={accent}
          transparent
          opacity={
            selected ||
            hovered
              ? 0.12
              : 0.05
          }
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   COMPLETE 3D SCENE
========================================================= */

function LearningVisualScene({
  theme,
  selectedPanel,
  onSelectPanel,
  isReady,
  onReady,
}: {
  theme: ThemeMode;
  selectedPanel: SelectedPanel;
  onSelectPanel: (
    id: PanelId,
  ) => void;
  isReady: boolean;
  onReady: () => void;
}) {
  const rootRef =
    useRef<THREE.Group>(null);

  const pointerRef =
    usePointerTracking();

  const phaseRef =
    useRef<AnimationPhase>({
      bookOpen: 0,
      contentReveal: 0,
    });
  const timelineStartRef = useRef<number | null>(null);
  const readyNotifiedRef = useRef(false);

  const panels =
    useMemo<
      PanelDefinition[]
    >(
      () => [
        {
          id: "code",
          eyebrow:
            "LIVE MISSION",
          title:
            "Frontend Mission",
          description:
            "Build a responsive dashboard",
          secondaryText:
            "HTML • CSS • React",
          progress: "64%",
          position: [
            -1.52,
            0.72,
            -0.18,
          ],
          rotation: [
            -0.03,
            0.18,
            -0.055,
          ],
          scale: 0.81,
          delay: 0,
        },
        {
          id: "roadmap",
          eyebrow:
            "CAREER ROADMAP",
          title:
            "Current World",
          description:
            "Practice",
          secondaryText:
            "Level 28 of 90",
          progress: "31%",
          position: [
            0.08,
            1.66,
            -0.5,
          ],
          rotation: [
            -0.02,
            0,
            0.012,
          ],
          scale: 0.74,
          delay: 0.18,
        },
        {
          id: "project",
          eyebrow:
            "PROJECT PROGRESS",
          title:
            "Active Project",
          description:
            "Campus Events Platform",
          secondaryText:
            "Status: In progress",
          progress: "72%",
          position: [
            1.82,
            0.76,
            -0.28,
          ],
          rotation: [
            -0.03,
            -0.18,
            0.06,
          ],
          scale: 0.79,
          delay: 0.36,
        },
      ],
      [],
    );

  useFrame((state) => {
    if (!rootRef.current) {
      return;
    }

    const canvasElapsed = state.clock.getElapsedTime();

    if (timelineStartRef.current === null) {
      timelineStartRef.current = canvasElapsed;
      phaseRef.current.bookOpen = 0;
      phaseRef.current.contentReveal = 0;
      rootRef.current.rotation.set(0, 0, 0);
      rootRef.current.position.set(0, 0, 0);

      if (!readyNotifiedRef.current) {
        readyNotifiedRef.current = true;
        onReady();
      }
    }

    const elapsed = canvasElapsed - timelineStartRef.current;

    /*
     * Faster and cleaner sequence:
     *
     * 0–0.45s:
     * Closed book.
     *
     * 0.45–1.75s:
     * Complete book halves open.
     *
     * 1.35–2.50s:
     * Panels rise one by one.
     */

    phaseRef.current.bookOpen =
      timedProgress(
        elapsed,
        0.55,
        2.2,
      );

    phaseRef.current
      .contentReveal =
      timedProgress(
        elapsed,
        2.35,
        1.3,
      );

    const interactionReveal = phaseRef.current.contentReveal;

    rootRef.current.rotation.y =
      THREE.MathUtils.lerp(
        rootRef.current
          .rotation.y,
        selectedPanel
          ? 0
          : pointerRef.current.x *
              0.07 * interactionReveal,
        0.04,
      );

    rootRef.current.rotation.x =
      THREE.MathUtils.lerp(
        rootRef.current
          .rotation.x,
        selectedPanel
          ? 0
          : -pointerRef.current.y *
              0.023 * interactionReveal,
        0.04,
      );

    rootRef.current.position.y =
      Math.sin(
        elapsed * 0.36,
      ) * 0.014 * interactionReveal;
  });

  const anotherSelected =
    selectedPanel !== null;

  return (
    <>
      <ambientLight
        intensity={
          theme === "dark"
            ? 1.45
            : 1.8
        }
      />

      <hemisphereLight
        intensity={1.16}
        color="#ffffff"
        groundColor={
          theme === "dark"
            ? "#071e39"
            : "#f3eadf"
        }
      />

      <directionalLight
        position={[4, 6, 5]}
        intensity={3.1}
        color="#ffffff"
        castShadow
      />

      <pointLight
        position={[
          -3,
          2,
          4,
        ]}
        intensity={2.05}
        color={
          theme === "dark"
            ? "#74d8ff"
            : "#fff4d8"
        }
      />

      <pointLight
        position={[
          1,
          3,
          -2,
        ]}
        intensity={4.25}
        color={
          theme === "dark"
            ? "#2875ca"
            : "#ffffff"
        }
      />

      <group ref={rootRef} visible={isReady}>
        <MentorBook
          theme={theme}
          phaseRef={phaseRef}
        />

        {panels.map(
          (definition) => (
            <InteractivePanel
              key={
                definition.id
              }
              definition={
                definition
              }
              theme={theme}
              phaseRef={phaseRef}
              selected={
                selectedPanel ===
                definition.id
              }
              anotherSelected={
                anotherSelected
              }
              onSelect={
                onSelectPanel
              }
            />
          ),
        )}

        <FloatingCodeItem
          text="</>"
          startPosition={[-0.48, -0.34, 0.05]}
          delay={0}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="{ }"
          startPosition={[0.2, -0.38, 0.02]}
          delay={0.9}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="const"
          startPosition={[-0.12, -0.42, -0.01]}
          delay={1.8}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="=>"
          startPosition={[0.58, -0.4, -0.04]}
          delay={2.7}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="[ ]"
          startPosition={[-0.74, -0.39, -0.03]}
          delay={3.6}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="TS"
          startPosition={[0.72, -0.36, 0.01]}
          delay={4.5}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="API"
          startPosition={[-0.3, -0.41, 0.04]}
          delay={5.4}
          theme={theme}
          phaseRef={phaseRef}
        />

        <FloatingCodeItem
          text="XP+"
          startPosition={[0.44, -0.37, -0.02]}
          delay={6.3}
          theme={theme}
          phaseRef={phaseRef}
          gold
        />

        <FloatingCodeItem
          text="01"
          startPosition={[-0.62, -0.4, -0.04]}
          delay={7.2}
          theme={theme}
          phaseRef={phaseRef}
          gold
        />
      </group>

      <Environment preset="city" />
    </>
  );
}


/* =========================================================
   FIXED FORMULA BACKGROUND
========================================================= */

const formulaBackgroundItems = [
  { text: "const skills = []", className: "mh-formula--one" },
  { text: "function buildCareer()", className: "mh-formula--two" },
  { text: "<Portfolio />", className: "mh-formula--three" },
  { text: "git commit -m \"progress\"", className: "mh-formula--four" },
  { text: "npm run dev", className: "mh-formula--five" },
  { text: "async / await", className: "mh-formula--six" },
  { text: "{ progress: true }", className: "mh-formula--seven" },
  { text: "return success", className: "mh-formula--eight" },
  { text: "GET /roadmap", className: "mh-formula--nine" },
  { text: "POST /projects", className: "mh-formula--ten" },
  { text: "TypeScript", className: "mh-formula--eleven" },
  { text: "React", className: "mh-formula--twelve" },
  { text: "FastAPI", className: "mh-formula--thirteen" },
  { text: "Python", className: "mh-formula--fourteen" },
  { text: "if (ready) launch()", className: "mh-formula--fifteen" },
  { text: "for (const level of levels)", className: "mh-formula--sixteen" },
  { text: "console.log(\"build\")", className: "mh-formula--seventeen" },
  { text: "import growth from \"journey\"", className: "mh-formula--eighteen" },
  { text: "class CareerPath", className: "mh-formula--nineteen" },
  { text: "git push origin main", className: "mh-formula--twenty" },
  { text: "01 → 90", className: "mh-formula--twenty-one" },
  { text: "XP++", className: "mh-formula--twenty-two" },
  { text: "</>", className: "mh-formula--twenty-three" },
  { text: "[ ]", className: "mh-formula--twenty-four" },
  { text: "{ }", className: "mh-formula--twenty-five" },
  { text: "API → UI → Proof", className: "mh-formula--twenty-six" },
];

function FormulaBackground({
  theme,
}: {
  theme: ThemeMode;
}) {
  return (
    <div
      className={`mh-formula-bg mh-formula-bg--${theme}`}
      aria-hidden="true"
    >


      <div className="mh-formula-orbit mh-formula-orbit--one">
        <span />
        <span />
        <span />
        <i />
      </div>

      <div className="mh-formula-orbit mh-formula-orbit--two">
        <span />
        <span />
        <span />
        <i />
      </div>

      {formulaBackgroundItems.map((item) => (
        <span
          key={item.className}
          className={`mh-formula ${item.className}`}
          style={{
  fontSize:
    item.text.length > 12
      ? "clamp(0.48rem, 0.62vw, 0.7rem)"
      : "clamp(0.4rem, 0.5vw, 0.58rem)",

  fontWeight: 400,
fontStyle: "normal",
opacity: theme === "light" ? 0.34 : 0.4,
}}
        >
          {item.text}
        </span>
      ))}

      <div className="mh-formula-wave mh-formula-wave--one" />
      <div className="mh-formula-wave mh-formula-wave--two" />
      <div className="mh-formula-flare" />
    </div>
  );
}

/* =========================================================
   ANIMATED LEFT-SIDE WORD
========================================================= */

const animatedWords = [
  "real projects",
  "career proof",
  "job readiness",
  "visible progress",
];

function AnimatedHeroWord({ theme }: { theme: ThemeMode }) {
  const [index, setIndex] =
    useState(0);

  const [visible, setVisible] =
    useState(true);

  useEffect(() => {
    let timeout:
      | number
      | undefined;

    const interval =
      window.setInterval(() => {
        setVisible(false);

        timeout =
          window.setTimeout(() => {
            setIndex(
              (current) =>
                (current + 1) %
                animatedWords.length,
            );

            setVisible(true);
          }, 360);
      }, 3200);

    return () => {
      window.clearInterval(
        interval,
      );

      if (timeout) {
        window.clearTimeout(
          timeout,
        );
      }
    };
  }, []);

  return (
    <span
      className={`mh-changing ${
        visible
          ? "mh-changing--visible"
          : ""
      }`}
      style={{
        backgroundImage:
          theme === "dark"
            ? "linear-gradient(110deg, #62ccff 0%, #92e4ff 48%, #d7f1fb 70%, #f2cf63 100%)"
            : "linear-gradient(110deg, #6D4ED6 0%, #8B5CF6 35%, #A855F7 60%, #D4AF37 85%, #F2D46B 100%)",

        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: "0 transparent",
        textShadow: "none",
      }}
    >
      {animatedWords[index]}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function LearningHero() {
  const theme =
    useThemeMode();
  const [isMounted, setIsMounted] = useState(false);
  const [readyTheme, setReadyTheme] = useState<ThemeMode | null>(null);
  const isReady = readyTheme === theme;

  const [
    selectedPanel,
    setSelectedPanel,
  ] =
    useState<SelectedPanel>(
      null,
    );

  const autoCloseRef =
    useRef<
      number | undefined
    >(undefined);

  function clearAutoClose() {
    if (
      autoCloseRef.current
    ) {
      window.clearTimeout(
        autoCloseRef.current,
      );

      autoCloseRef.current =
        undefined;
    }
  }

  function closeSelectedPanel() {
    clearAutoClose();
    setSelectedPanel(null);
  }

  function handlePanelSelect(
    id: PanelId,
  ) {
    clearAutoClose();

    setSelectedPanel(
      (current) =>
        current === id
          ? null
          : id,
    );

    autoCloseRef.current =
      window.setTimeout(() => {
        setSelectedPanel(null);
      }, 4500);
  }

  useEffect(() => {
    setIsMounted(true);

    return () => {
      clearAutoClose();
    };
  }, []);

  return (
    <section
      className="mh-root"
    >
      {theme === "light" && <div className="mh-light-center-wash" aria-hidden="true" />}
      <FormulaBackground theme={theme} />
      <div className="mh-grid" />
      <div className="mh-glow mh-glow--left" />
      <div className="mh-glow mh-glow--right" />

      <div className="mh-inner">
        <div className="mh-content">
          <h1>
            Build skills
            <br />
            that become
            <br />

            <AnimatedHeroWord theme={theme} />
          </h1>

          <p className="mh-description">
            <strong>Turn ambition into career-ready proof.</strong>
            <span>
              Follow a structured journey of guided learning, practical missions,
              portfolio-ready projects, and measurable progress.
            </span>
          </p>

          <div className="mh-actions">
            <Link
              className="mh-button mh-button--primary"
              href="/signup"
            >
              Start your journey
              <span>→</span>
            </Link>

            <Link
              className="mh-button mh-button--secondary"
              href="/roadmap"
            >
              Explore the roadmap
              <span>↗</span>
            </Link>
          </div>

          <div className="mh-metrics">
            <article>
              <strong>90</strong>

              <div>
                <b>
                  Guided Levels
                </b>

                <span>
                  One clear next
                  step
                </span>
              </div>
            </article>

            <article>
              <strong>12+</strong>

              <div>
                <b>
                  Real Projects
                </b>

                <span>
                  Portfolio-ready
                  work
                </span>
              </div>
            </article>

            <article>
              <strong>09</strong>

              <div>
                <b>
                  Career
                  Milestones
                </b>

                <span>
                  Visible proof of
                  growth
                </span>
              </div>
            </article>
          </div>
        </div>

        <div className="mh-visual">
          <div className="mh-halo">
            <i />
            <i />
          </div>

          <div className="mh-canvas">
            {isMounted && <Canvas
              shadows
              dpr={[1, 1.5]}
              onPointerMissed={() => {
                closeSelectedPanel();
              }}
              camera={{
                position: [
                  0,
                  theme === "light" ? 0.9 : 0.48,
                  7.6,
                ],
                fov: 37,
                near: 0.1,
                far: 100,
              }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference:
                  "high-performance",
              }}
              onCreated={({
                gl,
              }) => {
                gl.setClearColor(
                  "#000000",
                  0,
                );
              }}
            >
              <Suspense
                fallback={null}
              >
                <LearningVisualScene
                  key={theme}
                  theme={theme}
                  selectedPanel={
                    selectedPanel
                  }
                  onSelectPanel={
                    handlePanelSelect
                  }
                  isReady={isReady}
                  onReady={() => {
                    setReadyTheme(theme);
                  }}
                />
              </Suspense>
            </Canvas>}
          </div>

          <div className="mh-hint">
            Select a learning screen
            to explore
          </div>
        </div>
      </div>
      {theme === "light" && <div className="mh-bottom-fade" />}
      <style jsx>{`
:global([data-theme="dark"]) .mh-root {
          background:
            radial-gradient(
              circle at 12% 8%,
              rgba(69, 95, 135, 0.28),
              transparent 31%
            ),
            radial-gradient(
              circle at 88% 78%,
              rgba(212, 175, 55, 0.08),
              transparent 26%
            ),
            linear-gradient(
              145deg,
              #112139,
              #091525 52%,
              #050d17
            ) !important;
        }

        :global([data-theme="light"]) .mh-root {
          background:
            radial-gradient(
              circle at 12% 8%,
              rgba(223, 214, 245, 0.92),
              transparent 32%
            ),
            radial-gradient(
              circle at 88% 78%,
              rgba(212, 175, 55, 0.12),
              transparent 27%
            ),
            linear-gradient(
              145deg,
              #f1ebfa,
              #fffaf1 54%,
              #f7f2ea
            ) !important;
        }

        .mh-root {
          position: relative;
          isolation: isolate;
          width: 100%;

          min-height: 690px;
          height: clamp(
            690px,
            calc(100svh - 128px),
            750px
          );

          overflow: hidden;
          transition: background 0.35s ease;
        }

        .mh-light-center-wash {
          display: none !important;
        }
          :global([data-theme="dark"]) .mh-light-center-wash {
            display: none !important;
            background: none !important;
          }

        .mh-formula-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          overflow: hidden;
          pointer-events: none;
          perspective: 1100px;
          transform-style: preserve-3d;
        }

        .mh-formula-bg--light {
          z-index: -1;
          opacity: 0.92;
          filter: saturate(0.96) contrast(1.12);
        }

        .mh-formula-bg--dark {
          opacity: 1;
        }

        .mh-formula-stars {
          position: absolute;
          inset: -12%;
          background-repeat: repeat;
          transform: translateZ(-180px) scale(1.18);
        }

        .mh-formula-stars--far {
          opacity: 0.34;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.85) 0 1px, transparent 1.6px),
            radial-gradient(circle, rgba(149,108,255,0.72) 0 1.2px, transparent 1.9px);
          background-size: 82px 82px, 137px 137px;
          background-position: 12px 18px, 47px 66px;
          animation: mhStarsDriftFar 34s linear infinite;
        }

        .mh-formula-stars--near {
          opacity: 0.5;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.92) 0 1.4px, transparent 2px),
            radial-gradient(circle, rgba(184,154,255,0.9) 0 1.6px, transparent 2.4px);
          background-size: 163px 163px, 241px 241px;
          background-position: 24px 31px, 95px 57px;
          animation: mhStarsDriftNear 24s linear infinite;
        }

        .mh-formula {
  position: absolute;
  display: block;

  color: rgba(229, 221, 255, 0.48);

  font-family: "Times New Roman", Georgia, serif;
  font-size: inherit;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.01em;

  white-space: nowrap;
  text-shadow: none;

  transform-style: preserve-3d;
  will-change: transform, opacity, filter;

  animation: mhFormulaApproach 18s ease-in-out infinite;
}
  .mh-formula-bg--dark .mh-formula {
  color: rgba(229, 221, 255, 0.44);

  font-family: "Times New Roman", Georgia, serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.01em;

  text-shadow: none;
}

      .mh-formula-bg--light .mh-formula {
  color: rgba(15, 15, 27, 0.42);
  font-weight: 400;
  opacity: 0.62;
  text-shadow: none;
  filter: none;
}

        /* ---------- LIGHT MODE PREMIUM STARS ---------- */

.mh-formula-bg--light .mh-formula-stars--far{

    opacity:.30;

    background-image:

      radial-gradient(
        circle,
        rgba(255,255,255,.95) 0 1.7px,
        transparent 2.7px
      ),

      radial-gradient(
        circle,
        rgba(185,160,235,.35) 0 1.5px,
        transparent 2.5px
      );

    background-size:
      180px 180px,
      260px 260px;

    background-position:
      30px 20px,
      110px 70px;

    animation:mhStarsDriftFar 42s linear infinite;
}


.mh-formula-bg--light .mh-formula-stars--near{

    opacity:.45;

    background-image:

      radial-gradient(
        circle,
        rgba(255,255,255,1) 0 2.2px,
        transparent 3.4px
      ),

      radial-gradient(
        circle,
        rgba(170,135,235,.40) 0 1.8px,
        transparent 2.8px
      );

    background-size:
      230px 230px,
      340px 340px;

    background-position:
      70px 60px,
      160px 110px;

    animation:mhStarsDriftNear 28s linear infinite;
}

        .mh-formula-bg--light .mh-formula-orbit span {
          border-color: rgba(31, 22, 48, 0.5);
          box-shadow: 0 0 12px rgba(88, 60, 130, 0.1);
        }

        .mh-formula-bg--light .mh-formula-orbit i {
          background: rgba(27, 20, 42, 0.82);
          box-shadow:
            0 0 10px rgba(255,255,255,0.7),
            0 0 20px rgba(85, 53, 132, 0.18);
        }

        .mh-formula-bg--light .mh-formula-wave {
          border-bottom-color: rgba(29, 21, 44, 0.42);
          filter: drop-shadow(0 0 8px rgba(71, 48, 105, 0.08));
        }

        .mh-formula-bg--light .mh-formula {
          animation-name: mhFormulaApproachLight;
        }

        @keyframes mhFormulaApproachLight {
          0%,
          100% {
            opacity: 0.24;
            filter: blur(1.8px);
            transform:
              translate3d(0, 0, -170px)
              rotate(var(--rot))
              scale(0.84);
          }

          45% {
            opacity: 0.54;
            filter: blur(0.6px);
          }

          62% {
            opacity: 0.78;
            filter: blur(0);
            transform:
              translate3d(
                var(--x-shift),
                var(--y-shift),
                95px
              )
              rotate(var(--rot))
              scale(1.1);
          }

          82% {
            opacity: 0.42;
            filter: blur(1px);
            transform:
              translate3d(
                calc(var(--x-shift) * 1.35),
                calc(var(--y-shift) * 1.35),
                170px
              )
              rotate(var(--rot))
              scale(1.22);
          }
        }

        .mh-formula--one {
          top: 10%;
          left: 8%;
          font-size: clamp(1.2rem, 2.5vw, 3.1rem);
          animation-delay: -2s;
          --x-shift: 34px;
          --y-shift: -18px;
          --rot: -6deg;
        }

        .mh-formula--two {
          top: 26%;
          right: 8%;
          font-size: clamp(1.1rem, 2vw, 2.6rem);
          animation-delay: -8s;
          --x-shift: -26px;
          --y-shift: 22px;
          --rot: 7deg;
        }

        .mh-formula--three {
          top: 63%;
          left: 5%;
          font-size: clamp(1.3rem, 2.35vw, 2.9rem);
          animation-delay: -11s;
          --x-shift: 28px;
          --y-shift: 18px;
          --rot: -4deg;
        }

        .mh-formula--four {
          top: 70%;
          right: 12%;
          font-size: clamp(1.2rem, 2.2vw, 2.7rem);
          animation-delay: -5s;
          --x-shift: -30px;
          --y-shift: -18px;
          --rot: 5deg;
        }

        .mh-formula--five {
          top: 43%;
          left: 42%;
          font-size: clamp(1rem, 1.8vw, 2.2rem);
          animation-delay: -14s;
          --x-shift: 14px;
          --y-shift: 26px;
          --rot: -2deg;
        }

        .mh-formula--six {
          top: 16%;
          left: 58%;
          font-size: clamp(0.95rem, 1.65vw, 2rem);
          animation-delay: -16s;
          --x-shift: -20px;
          --y-shift: 16px;
          --rot: 3deg;
        }

        .mh-formula--seven {
          bottom: 9%;
          left: 30%;
          font-size: clamp(1rem, 1.9vw, 2.35rem);
          animation-delay: -7s;
          --x-shift: 20px;
          --y-shift: -22px;
          --rot: 2deg;
        }

        .mh-formula--eight {
          bottom: 18%;
          right: 30%;
          font-size: clamp(0.95rem, 1.55vw, 1.9rem);
          animation-delay: -12s;
          --x-shift: -18px;
          --y-shift: 14px;
          --rot: -5deg;
        }

        .mh-formula--nine {
          top: 39%;
          right: 2%;
          font-size: clamp(0.9rem, 1.55vw, 1.85rem);
          animation-delay: -3s;
          --x-shift: -22px;
          --y-shift: 24px;
          --rot: 8deg;
        }

        .mh-formula--ten {
          top: 81%;
          left: 10%;
          font-size: clamp(1.05rem, 1.8vw, 2.2rem);
          animation-delay: -18s;
          --x-shift: 26px;
          --y-shift: -14px;
          --rot: -7deg;
        }

        .mh-formula--eleven {
          top: 7%;
          left: 36%;
          font-size: clamp(0.9rem, 1.45vw, 1.75rem);
          animation-delay: -6s;
          --x-shift: 18px;
          --y-shift: 14px;
          --rot: 4deg;
        }

        .mh-formula--twelve {
          top: 33%;
          left: 20%;
          font-size: clamp(0.95rem, 1.55vw, 1.9rem);
          animation-delay: -9s;
          --x-shift: 22px;
          --y-shift: -20px;
          --rot: -5deg;
        }

        .mh-formula--thirteen {
          top: 54%;
          right: 19%;
          font-size: clamp(0.9rem, 1.5vw, 1.8rem);
          animation-delay: -13s;
          --x-shift: -18px;
          --y-shift: 16px;
          --rot: 3deg;
        }

        .mh-formula--fourteen {
          top: 76%;
          left: 48%;
          font-size: clamp(1rem, 1.65vw, 2rem);
          animation-delay: -4s;
          --x-shift: 20px;
          --y-shift: -16px;
          --rot: -2deg;
        }

        .mh-formula--fifteen {
          top: 23%;
          left: 72%;
          font-size: clamp(0.85rem, 1.35vw, 1.6rem);
          animation-delay: -15s;
          --x-shift: -18px;
          --y-shift: 18px;
          --rot: 6deg;
        }

        .mh-formula--sixteen {
          bottom: 7%;
          right: 8%;
          font-size: clamp(0.95rem, 1.5vw, 1.8rem);
          animation-delay: -1s;
          --x-shift: -24px;
          --y-shift: -12px;
          --rot: -4deg;
        }

        .mh-formula--seventeen {
          bottom: 27%;
          left: 18%;
          font-size: clamp(0.85rem, 1.35vw, 1.7rem);
          animation-delay: -17s;
          --x-shift: 20px;
          --y-shift: 16px;
          --rot: 2deg;
        }

        .mh-formula--eighteen {
          top: 47%;
          left: 4%;
          font-size: clamp(0.9rem, 1.45vw, 1.75rem);
          animation-delay: -10s;
          --x-shift: 18px;
          --y-shift: -14px;
          --rot: -6deg;
        }

        .mh-formula--nineteen {
          top: 12%;
          left: 49%;
          font-size: clamp(0.88rem, 1.38vw, 1.68rem);
          animation-delay: -5s;
          --x-shift: 16px;
          --y-shift: 18px;
          --rot: 3deg;
        }

        .mh-formula--twenty {
          top: 29%;
          left: 7%;
          font-size: clamp(0.9rem, 1.5vw, 1.82rem);
          animation-delay: -12s;
          --x-shift: 20px;
          --y-shift: -15px;
          --rot: -4deg;
        }

        .mh-formula--twenty-one {
          top: 38%;
          right: 28%;
          font-size: clamp(0.9rem, 1.45vw, 1.75rem);
          animation-delay: -3s;
          --x-shift: -18px;
          --y-shift: 16px;
          --rot: 5deg;
        }

        .mh-formula--twenty-two {
          top: 60%;
          left: 35%;
          font-size: clamp(0.88rem, 1.42vw, 1.72rem);
          animation-delay: -14s;
          --x-shift: 18px;
          --y-shift: 16px;
          --rot: -3deg;
        }

        .mh-formula--twenty-three {
          bottom: 16%;
          left: 4%;
          font-size: clamp(0.9rem, 1.48vw, 1.8rem);
          animation-delay: -8s;
          --x-shift: 22px;
          --y-shift: -14px;
          --rot: 4deg;
        }

        .mh-formula--twenty-four {
          bottom: 12%;
          right: 22%;
          font-size: clamp(0.88rem, 1.4vw, 1.7rem);
          animation-delay: -16s;
          --x-shift: -20px;
          --y-shift: 14px;
          --rot: -5deg;
        }

        .mh-formula--twenty-five {
          top: 67%;
          right: 3%;
          font-size: clamp(0.86rem, 1.35vw, 1.65rem);
          animation-delay: -6s;
          --x-shift: -18px;
          --y-shift: -16px;
          --rot: 6deg;
        }

        .mh-formula--twenty-six {
          top: 84%;
          left: 56%;
          font-size: clamp(0.84rem, 1.32vw, 1.62rem);
          animation-delay: -11s;
          --x-shift: 18px;
          --y-shift: -12px;
          --rot: -4deg;
        }

        .mh-formula-orbit {
          position: absolute;
          width: 118px;
          height: 118px;
          opacity: 0.34;
          transform-style: preserve-3d;
          animation: mhOrbitFloat 17s ease-in-out infinite;
        }

        .mh-formula-orbit--one {
          top: 12%;
          right: 18%;
          animation-delay: -4s;
        }

        .mh-formula-orbit--two {
          bottom: 14%;
          left: 13%;
          width: 92px;
          height: 92px;
          animation-delay: -10s;
          animation-duration: 21s;
        }

        .mh-formula-orbit span {
          position: absolute;
          inset: 20%;
          border: 1.5px solid rgba(218, 205, 255, 0.62);
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(128, 83, 232, 0.18);
        }

        .mh-formula-orbit span:nth-child(1) {
          transform: rotate(0deg) scaleX(1.45);
        }

        .mh-formula-orbit span:nth-child(2) {
          transform: rotate(60deg) scaleX(1.45);
        }

        .mh-formula-orbit span:nth-child(3) {
          transform: rotate(-60deg) scaleX(1.45);
        }

        .mh-formula-orbit i {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(238, 229, 255, 0.92);
          box-shadow:
            0 0 12px rgba(172, 126, 255, 0.84),
            0 0 26px rgba(124, 72, 255, 0.44);
          transform: translate(-50%, -50%);
        }

        .mh-formula-wave {
          position: absolute;
          width: 260px;
          height: 90px;
          opacity: 0.2;
          border-bottom: 2px solid rgba(199, 177, 255, 0.54);
          border-radius: 50%;
          transform: rotate(-4deg) skewX(-18deg);
          filter: drop-shadow(0 0 10px rgba(136, 82, 255, 0.18));
          animation: mhWaveFloat 15s ease-in-out infinite;
        }

        .mh-formula-wave--one {
          top: 18%;
          left: -40px;
        }

        .mh-formula-wave--two {
          right: -80px;
          bottom: 19%;
          transform: rotate(8deg) skewX(16deg);
          animation-delay: -7s;
        }

        .mh-formula-flare {
          position: absolute;
          left: 55%;
          top: 58%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #a164ff;
          box-shadow:
            0 0 14px 5px rgba(146, 80, 255, 0.6),
            0 0 45px 14px rgba(112, 48, 235, 0.34),
            0 0 90px 25px rgba(78, 31, 185, 0.18);
          animation: mhFlarePulse 4.8s ease-in-out infinite;
        }

        @keyframes mhFormulaApproach {
          0%,
          100% {
            opacity: 0.07;
            filter: blur(4px);
            transform:
              translate3d(0, 0, -220px)
              rotate(var(--rot))
              scale(0.78);
          }

          45% {
            opacity: 0.32;
            filter: blur(1.2px);
          }

          62% {
            opacity: 0.5;
            filter: blur(0);
            transform:
              translate3d(
                var(--x-shift),
                var(--y-shift),
                90px
              )
              rotate(var(--rot))
              scale(1.08);
          }

          82% {
            opacity: 0.18;
            filter: blur(2.2px);
            transform:
              translate3d(
                calc(var(--x-shift) * 1.35),
                calc(var(--y-shift) * 1.35),
                180px
              )
              rotate(var(--rot))
              scale(1.24);
          }
        }

        @keyframes mhStarsDriftFar {
          from {
            transform: translate3d(0, 0, -180px) scale(1.18);
          }
          to {
            transform: translate3d(-82px, 82px, -180px) scale(1.18);
          }
        }

        @keyframes mhStarsDriftNear {
          from {
            transform: translate3d(0, 0, -40px) scale(1.05);
          }
          to {
            transform: translate3d(96px, 122px, 20px) scale(1.09);
          }
        }

        @keyframes mhOrbitFloat {
          0%,
          100% {
            opacity: 0.16;
            filter: blur(1.6px);
            transform: translate3d(0, 0, -120px) rotate(0deg) scale(0.84);
          }

          55% {
            opacity: 0.42;
            filter: blur(0);
            transform: translate3d(22px, -18px, 80px) rotate(18deg) scale(1.08);
          }
        }

        @keyframes mhWaveFloat {
          0%,
          100% {
            opacity: 0.1;
            filter: blur(2px);
            translate: 0 0;
          }

          50% {
            opacity: 0.28;
            filter: blur(0.5px);
            translate: 24px -16px;
          }
        }

        @keyframes mhFlarePulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.72);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.25);
          }
        }

        .mh-root::before {
          content: "";
          position: absolute;
          z-index: -1;
          width: 720px;
          height: 650px;
          right: -2%;
          top: 2%;
          pointer-events: none;
          border-radius: 46%;
          background: radial-gradient(
            ellipse at center,
            rgba(16, 44, 74, 0.24) 0%,
            rgba(31, 66, 101, 0.16) 30%,
            rgba(62, 76, 112, 0.08) 52%,
            transparent 74%
          );
          filter: blur(24px);
          animation: lightNavyDrift 9s ease-in-out infinite;
        }

        .mh-root::after {
          display: none;
        }

        :global([data-theme="dark"]) .mh-root::before {
          background: radial-gradient(
            ellipse at center,
            rgba(43, 118, 181, 0.16) 0%,
            rgba(18, 73, 122, 0.09) 38%,
            transparent 72%
          );
          filter: blur(34px);
          animation-name: darkNavyDrift;
        }

        .mh-inner {
          position: relative;
          z-index: 5;
          width: min(
            1640px,
            100%
          );
          height: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns:
            minmax(
              470px,
              0.9fr
            )
            minmax(
              620px,
              1.1fr
            );
          align-items: center;
          gap: clamp(
            20px,
            2.8vw,
            48px
          );
          padding:
            22px
            clamp(
              38px,
              5vw,
              92px
            )
            24px;
        }

        .mh-grid {
          position: absolute;
          inset: 0;
          z-index: -3;
          pointer-events: none;
          opacity: 0.25;
          background-image:
            linear-gradient(
              rgba(
                  77,
                  58,
                  112,
                  0.07
                )
                1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                  77,
                  58,
                  112,
                  0.07
                )
                1px,
              transparent 1px
            );
          background-size:
            74px 74px;
          mask-image: radial-gradient(
            ellipse at 67% 50%,
            #000,
            transparent 82%
          );
        }

        :global(
            [data-theme="dark"]
          )
          .mh-grid {
          opacity: 0.32;
          background-image:
            linear-gradient(
              rgba(
                  88,
                  154,
                  218,
                  0.09
                )
                1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                  88,
                  154,
                  218,
                  0.09
                )
                1px,
              transparent 1px
            );
        }

        .mh-glow {
          position: absolute;
          z-index: -2;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(22px);
        }

        .mh-glow--left {
          width: 420px;
          height: 420px;
          left: -160px;
          top: 20%;
          background: radial-gradient(
            circle,
            rgba(
              200,
              171,
              235,
              0.25
            ),
            transparent 72%
          );
        }

        .mh-glow--right {
          width: 720px;
          height: 720px;
          right: -80px;
          top: -20px;
          background: transparent;
        }

        :global(
            [data-theme="dark"]
          )
          .mh-glow--left {
          background: radial-gradient(
            circle,
            rgba(
              37,
              103,
              169,
              0.22
            ),
            transparent 72%
          );
        }

        :global(
            [data-theme="dark"]
          )
          .mh-glow--right {
          background: radial-gradient(
            circle,
            rgba(
                82,
                166,
                236,
                0.28
              )
              0%,
            rgba(
                29,
                85,
                142,
                0.14
              )
              42%,
            transparent 72%
          );
        }

        .mh-content {
          position: relative;
          z-index: 8;
          max-width: 680px;
        }

        .mh-content h1 {
          max-width: 720px;
          margin: 0;
          color: #e3e8ef;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(3.15rem, 4.25vw, 5.15rem);
          font-weight: 760;
          line-height: 0.98;
          letter-spacing: -0.055em;
          overflow: visible;
          text-wrap: balance;
          text-shadow:
            0 2px 0 rgba(255, 255, 255, 0.82),
            0 14px 34px rgba(65, 42, 100, 0.16);
        }

        :global([data-theme="dark"]) .mh-content h1 {
          color: #f7f9ff;
          -webkit-text-stroke: 0;
          text-shadow:
            0 1px 0 rgba(255,255,255,0.05),
            0 16px 38px rgba(0,0,0,0.46);
        }

        .mh-changing {
          display: inline-block;
          min-width: 100%;
          min-height: 1.18em;
          line-height: 1.08;
          padding: 0.02em 0.08em 0.18em 0;
          overflow: visible;
          opacity: 0;
          transform: translateY(18px);
          background: linear-gradient(
            115deg,
            #091827 0%,
            #14263a 38%,
            #5f4b1f 70%,
            #d2aa3b 100%
          );
          background-size: 180% 100%;
          background-position: 0% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0;
          filter:
            blur(4px)
            drop-shadow(0 7px 14px rgba(9, 24, 39, 0.16));
          transition:
            opacity 0.36s ease,
            transform 0.36s ease,
            filter 0.36s ease;
          animation: lightHeadingShine 5.5s ease-in-out infinite;
        }

        .mh-changing--visible {
          opacity: 1;
          transform: translateY(0);
          filter:
            blur(0)
            drop-shadow(0 7px 14px rgba(9, 24, 39, 0.18));
        }

        :global([data-theme="dark"]) .mh-root .mh-changing {
          background: linear-gradient(
            110deg,
            #62ccff 0%,
            #92e4ff 48%,
            #d7f1fb 70%,
            #f2cf63 100%
          );
          background-size: 180% 100%;
          background-position: 0% 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0;
          filter:
            drop-shadow(0 10px 24px rgba(68, 178, 235, 0.24));
          animation: darkHeadingShine 5.5s ease-in-out infinite;
        }

        @keyframes lightHeadingShine {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes darkHeadingShine {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        .mh-description {
          max-width: 640px;
         
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: #40516b;
          line-height: 1.62;
          letter-spacing: 0.003em;
        }
          
          .mh-description strong {
  position: relative;
  display: block;
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  padding: 16px 28px;

  color: var(--muted);
  font: 760 clamp(1.05rem, 1.22vw, 1.2rem) / 1.62
    var(--font-sans), sans-serif;

  text-align: left !important;

  border-radius: 999px;

  background: radial-gradient(
    circle at 50% 50%,
    rgba(112, 215, 255, 0.12),
    transparent 72%
  );

  text-shadow: 0 0 18px rgba(112, 215, 255, 0.15);
}

        .mh-description span {
          color: #52627a;
          font-size: 0.96rem;
          font-weight: 620;
        }

        :global([data-theme="dark"]) .mh-description span {
          color: #b8c8d9;
        }

        .mh-actions {
          display: flex;
          align-items: center;
          gap: 17px;
          margin-top: 20px;
        }

        .mh-button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          padding: 0 23px;
          border-radius: 12px;
          font-family:
            var(--font-display),
            sans-serif;
          font-size: 0.84rem;
          font-weight: 820;
          transition:
            transform 0.25s ease,
            border-color 0.25s
              ease,
            box-shadow 0.25s
              ease,
            background 0.25s
              ease;
        }

        .mh-button--primary {
          position: relative;
          width: 234px;
          min-width: 0;
          min-height: 54px;
          padding: 0 23px;
          overflow: hidden;
          border-radius: 12px;
          color: #1c2340;
          background: linear-gradient(
            135deg,
            #fff1a6 0%,
            #f4d65c 18%,
            #d4af37 42%,
            #b8860b 62%,
            #f3d76a 82%,
            #c28f18 100%
          );
          border: 1px solid rgba(150, 103, 7, 0.65);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.72),
            inset 0 -2px 4px rgba(119, 77, 0, 0.2),
            0 8px 18px rgba(180, 133, 20, 0.24);
          font-weight: 600;
          letter-spacing: 0.01em;
          transition:
            transform 220ms ease,
            filter 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease;
        }

        .mh-button--primary::before {
          content: "";
          position: absolute;
          top: -40%;
          left: -70%;
          width: 45%;
          height: 180%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.62),
            transparent
          );
          transform: skewX(-20deg);
          animation: mhGoldButtonShine 6s ease-in-out infinite;
        }

        .mh-button--primary span {
          position: relative;
          z-index: 1;
          transition: transform 220ms ease;
        }

        .mh-button--primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.78),
            inset 0 -2px 4px rgba(119, 77, 0, 0.2),
            0 11px 24px rgba(180, 133, 20, 0.3);
        }

        .mh-button--primary:hover span {
          transform: translateX(3px);
        }

        .mh-button--primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.62),
            inset 0 -1px 3px rgba(119, 77, 0, 0.22),
            0 5px 12px rgba(180, 133, 20, 0.2);
        }

        .mh-button--primary:focus-visible {
          outline: 3px solid rgba(244, 214, 92, 0.42);
          outline-offset: 3px;
        }

        @keyframes mhGoldButtonShine {
          0%,
          72% {
            left: -70%;
          }

          100% {
            left: 140%;
          }
        }

        .mh-button--secondary {
          color: #1a2c49;
          background: rgba(
            255,
            255,
            255,
            0.62
          );
          border: 1px solid
            rgba(
              83,
              61,
              120,
              0.2
            );
          backdrop-filter: blur(
            14px
          );
          box-shadow:
            inset 0 1px 0 #fff,
            0 12px 28px
            rgba(
              74,
              55,
              109,
              0.12
            );
        }

        .mh-button--secondary:hover {
          transform: translateY(
            -4px
          );
          border-color: rgba(
            180,
            143,
            34,
            0.5
          );
          background: rgba(
            255,
            255,
            255,
            0.85
          );
        }

        :global(
            [data-theme="dark"]
          )
          .mh-button--secondary {
          color: #f2f7ff;
          background: rgba(
            12,
            40,
            70,
            0.68
          );
          border-color: rgba(
            101,
            182,
            238,
            0.25
          );
          box-shadow:
            inset 0 1px 0
            rgba(
              255,
              255,
              255,
              0.1
            ),
            0 15px 32px
            rgba(
              0,
              0,
              0,
              0.28
            );
        }

        .mh-metrics {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 11px;
          margin-top: 20px;
        }
          @property --metric-gold-angle {
            syntax: "<angle>";
            inherits: false;
            initial-value: 0deg;
}

        .mh-metrics article {
        --metric-gold-angle: 0deg;
          position: relative;
          isolation: isolate;
          min-height: 84px;
          overflow: hidden;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 12px;
          padding: 15px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 16px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.9),
              rgba(237, 227, 248, 0.76)
            );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            0 5px 0 rgba(121, 91, 31, 0.15),
            0 17px 32px rgba(68, 48, 103, 0.12);
          backdrop-filter: blur(16px);
          transform: perspective(760px) rotateX(2deg);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .mh-metrics article::before {
          content: "";
          position: absolute;
          inset: -70% -35%;
          background: linear-gradient(
            115deg,
            transparent 38%,
            rgba(244, 210, 102, 0.28) 48%,
            transparent 58%
          );
          transform: translateX(-55%) rotate(8deg);
          transition: transform 0.7s ease;
          pointer-events: none;
        }

        .mh-metrics article::after {
        content: "";

        position: absolute;
        z-index: 5;
        inset: 0;

        padding: 2px;
        border-radius: inherit;

        pointer-events: none;

        background: conic-gradient(
          from var(--metric-gold-angle),
          #b8860b 0deg,
          #d4af37 58deg,
          #f4e27a 92deg,
          #ffd95a 112deg,
          #d4af37 152deg,
          #b8860b 220deg,
          #d4af37 302deg,
          #f4e27a 338deg,
          #b8860b 360deg
        );

        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);

        -webkit-mask-composite: xor;

        mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);

        mask-composite: exclude;

        opacity: 0.9;

        filter: drop-shadow(
          0 0 7px rgba(212, 175, 55, 0.3)
        );

        animation: mhMetricGoldLoop 5.5s linear infinite;
      }

        .mh-metrics article:hover {
          transform: perspective(760px) translateY(-7px) rotateX(0) scale(1.025);
          border-color: rgba(215, 174, 55, 0.92);
          box-shadow:
            inset 0 1px 0 #fff,
            0 8px 0 rgba(121, 91, 31, 0.17),
            0 24px 42px rgba(68, 48, 103, 0.2),
            0 0 28px rgba(214, 176, 60, 0.16);
        }

        .mh-metrics article:hover::before {
          transform: translateX(55%) rotate(8deg);
        }

        .mh-metrics strong {
          position: relative;
          z-index: 1;
          min-width: 50px;
          color: #65499b;
          font-family: var(--font-display), sans-serif;
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1;
          text-shadow: 0 3px 0 rgba(91, 66, 128, 0.1);
        }

        .mh-metrics article > div {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mh-metrics b {
          color: #172b4b;
          font-size: 0.71rem;
          font-weight: 880;
          line-height: 1.2;
        }

        .mh-metrics span {
          color: #687187;
          font-size: 0.56rem;
          line-height: 1.4;
        }

        :global([data-theme="dark"]) .mh-metrics article {
          background:
            linear-gradient(
              145deg,
              rgba(57, 73, 91, 0.88),
              rgba(17, 31, 45, 0.88)
            );
          border-color: rgba(221, 184, 67, 0.7);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 5px 0 rgba(4, 10, 17, 0.5),
            0 19px 36px rgba(0, 0, 0, 0.32);
        }

        :global([data-theme="dark"]) .mh-metrics article::after {
          box-shadow: inset 0 0 0 1px rgba(255, 228, 126, 0.1);
        }

        :global([data-theme="dark"]) .mh-metrics article:hover {
          border-color: rgba(244, 210, 94, 0.96);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 8px 0 rgba(4, 10, 17, 0.44),
            0 26px 45px rgba(0, 0, 0, 0.45),
            0 0 34px rgba(231, 194, 72, 0.16);
        }

        :global([data-theme="dark"]) .mh-metrics strong {
          color: #f0cf61;
          text-shadow: 0 4px 18px rgba(240, 207, 97, 0.22);
        }

        :global([data-theme="dark"]) .mh-metrics b {
          color: #f6f8ff;
        }

        :global([data-theme="dark"]) .mh-metrics span {
          color: #b8c4d0;
        }

        .mh-visual {
          position: relative;
          height: 610px;
          min-width: 0;
          overflow: visible;
        }

        .mh-halo {
          position: absolute;
          z-index: 0;
          top: 46%;
          left: 50%;
          width: 720px;
          height: 610px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          border-radius: 44%;
          background: transparent;
          filter: none;
          animation: none;
        }

        .mh-halo::before,
        .mh-halo::after,
        .mh-halo i {
          display: none;
        }

        :global([data-theme="dark"]) .mh-root .mh-halo {
          display: none;
        }

        @keyframes lightVisualGlow {
          0%,
          100% {
            opacity: 0.78;
            transform: translate(-50%, -50%) scale(0.97);
          }

          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.04);
          }
        }

        @keyframes darkVisualGlow {
          0%,
          100% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(0.98);
          }

          50% {
            opacity: 0.68;
            transform: translate(-50%, -50%) scale(1.03);
          }
        }

        .mh-canvas {
          position: absolute;
          inset:
             -20px
              -55px
              -5px;
          z-index: 3;
          mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 91%,
            rgba(
                0,
                0,
                0,
                0.82
              )
              96%,
            transparent 100%
          );
        }

        .mh-canvas
          :global(canvas) {
          display: block;
          width: 100% !important;
          height: 100% !important;
          background: transparent !important;
          outline: none;
          touch-action: pan-y;
        }

        .mh-hint {
          position: absolute;
          z-index: 8;
          left: 50%;
          bottom: 20px;
          transform: translateX(
            -50%
          );
          color: #665775;
          font-size: 0.52rem;
          font-weight: 850;
          letter-spacing: 0.1em;
          white-space: nowrap;
          opacity: 0.65;
          pointer-events: none;
          animation: hintFloat
            2.8s ease-in-out
            infinite;
        }

        :global(
            [data-theme="dark"]
          )
          .mh-hint {
          color: #9fc4e2;
        }

        .mh-bottom-fade {
          position: absolute;
          z-index: 6;
          right: 0;
          bottom: 0;
          left: 0;
          height: 80px;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(
              222,
              209,
              238,
              0.95
            )
          );
        }

        :global(
            [data-theme="dark"]
          )
          .mh-bottom-fade {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(
              6,
              23,
              45,
              0.97
            )
          );
        }

        @keyframes haloPulse {
          0%,
          100% {
            opacity: 0.76;
            transform: translate(
                -50%,
                -50%
              )
              scale(0.96);
          }

          50% {
            opacity: 1;
            transform: translate(
                -50%,
                -50%
              )
              scale(1.04);
          }
        }

        @keyframes hintFloat {
          0%,
          100% {
            opacity: 0.45;
            transform: translateX(
                -50%
              )
              translateY(0);
          }

          50% {
            opacity: 0.9;
            transform: translateX(
                -50%
              )
              translateY(-4px);
          }
        }

        @media (
          max-width: 1180px
        ) {
          .mh-root {
            height: auto;
            min-height: 820px;
          }

          .mh-inner {
            grid-template-columns:
              minmax(
                420px,
                0.9fr
              )
              minmax(
                500px,
                1.1fr
              );
            gap: 18px;
            padding-inline: 35px;
          }

          .mh-content h1 {
            font-size: clamp(
              3.15rem,
              4.8vw,
              4.9rem
            );
          }

          .mh-metrics article {
            grid-template-columns: 1fr;
            align-content: center;
            gap: 7px;
          }

          .mh-canvas {
            inset:
              -30px
              -95px
              -15px;
          }
        }

        @media (
          max-width: 980px
        ) {
          .mh-root {
            min-height: 1210px;
          }

          .mh-inner {
            grid-template-columns: 1fr;
            padding:
              64px
              36px
              80px;
          }

          .mh-content {
            margin: 0 auto;
            text-align: center;
          }

          .mh-eyebrow,
          .mh-actions {
            justify-content: center;
          }

          .mh-description {
            margin-inline: auto;
          }

          .mh-visual {
            width: min(
              780px,
              100%
            );
            height: 670px;
            margin: 0 auto;
          }
        }

        @media (
          max-width: 700px
        ) {
          .mh-light-center-wash {
            width: 100%;
          }

          .mh-formula-bg--light .mh-formula:nth-of-type(3n) {
            display: none;
          }

          .mh-root {
            min-height: 1140px;
          }

          .mh-inner {
            padding:
              50px
              17px
              72px;
          }

          .mh-content h1 {
            font-size: 2.95rem;
          }

          .mh-actions {
            flex-direction: column;
          }

          .mh-button {
            width: min(
              360px,
              100%
            );
          }

          .mh-metrics {
            max-width: 390px;
            grid-template-columns: 1fr;
            margin-inline: auto;
          }

          .mh-metrics article {
            min-height: 84px;
            grid-template-columns:
              58px 1fr;
            text-align: left;
          }

          .mh-visual {
            height: 545px;
          }

          .mh-canvas {
            inset:
              -5px
              -145px
              -20px;
          }

          .mh-halo {
            width: 420px;
            height: 420px;
          }

          .mh-hint {
            bottom: 13px;
            font-size: 0.43rem;
          }
        }

        @media (
          max-width: 430px
        ) {
          .mh-content h1 {
            font-size: 2.58rem;
          }

          .mh-canvas {
            inset:
              0
              -188px
              -20px;
          }
        }

        :global([data-theme="dark"]) .mh-root .mh-changing {
          background: linear-gradient(110deg, #62ccff 0%, #92e4ff 48%, #d7f1fb 70%, #f2cf63 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0;
        }

          :global([data-theme="dark"]) .mh-root .mh-description strong {
            background: radial-gradient(
              ellipse at center,
              rgba(42, 63, 105, 0.78) 0%,
              rgba(28, 50, 85, 0.62) 38%,
              rgba(15, 38, 66, 0.38) 70%,
              rgba(9, 31, 52, 0) 100%
            ) !important;
          }

        :global([data-theme="dark"]) .mh-root .mh-description span {
          color: #bccbdd;
        }

        :global([data-theme="dark"]) .mh-root .mh-button--secondary {
          color: #f3f7ff;
          background: rgba(12, 33, 56, 0.78);
          border-color: rgba(217, 182, 75, 0.38);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 15px 32px rgba(0, 0, 0, 0.3);
        }

        :global([data-theme="dark"]) .mh-root .mh-metrics article {
          background: linear-gradient(145deg, rgba(18, 43, 70, 0.92), rgba(8, 25, 43, 0.9));
          border-color: rgba(221, 181, 66, 0.72);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 7px 0 rgba(2, 12, 23, 0.58), 0 20px 35px rgba(0, 0, 0, 0.34);
        }

        :global([data-theme="dark"]) .mh-root .mh-metrics strong {
          color: #71d8ff;
        }

        :global([data-theme="dark"]) .mh-root .mh-metrics b {
          color: #f5f8ff;
        }

        :global([data-theme="dark"]) .mh-root .mh-metrics span {
          color: #aebfd2;
        }

        :global([data-theme="dark"]) .mh-root .mh-hint {
          color: #9eb8d0;
        }

        :global([data-theme="dark"]) .mh-root .mh-bottom-fade {
          display: none;
        }

        :global([data-theme="light"]) .mh-root .mh-content h1 {
          color: #122c50;
          -webkit-text-stroke: 0;
        }

        @keyframes lightNavyDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(0.96);
            opacity: 0.72;
          }
          50% {
            transform: translate3d(-32px, 18px, 0) scale(1.05);
            opacity: 1;
          }
        }

        @keyframes lightRingFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translate3d(20px, -18px, 0) rotate(8deg);
            opacity: 0.85;
          }
        }

        @keyframes darkNavyDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(0.94);
            opacity: 0.62;
          }
          50% {
            transform: translate3d(-26px, 22px, 0) scale(1.06);
            opacity: 0.9;
          }
        }

        @keyframes darkRingFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translate3d(18px, -15px, 0) rotate(-7deg);
            opacity: 0.72;
          }
        }

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .mh-root::before,
          .mh-root::after,
          .mh-halo,
          .mh-hint,
          .mh-changing,
          .mh-button--primary,
          .mh-button--primary::before,
          .mh-formula,
          .mh-formula-stars,
          .mh-formula-orbit,
          .mh-formula-wave,
          .mh-formula-flare {
            animation: none;
            transition: none;
          }
        }


        /* Explore roadmap: moving dark-gold edge light only */
      @property --mh-roadmap-loop-angle {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }

      .mh-button--secondary {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }

      /*
        Only a small gold light travels around the edge.
        This does not create a permanent gold border.
      */
      .mh-button--secondary::after {
        content: "";

        position: absolute;
        z-index: 3;
        inset: 0;

        padding: 2px;
        border-radius: inherit;

        pointer-events: none;

        background: conic-gradient(
          from var(--mh-roadmap-loop-angle),

          transparent 0deg,
          transparent 280deg,

          rgba(96, 66, 0, 0) 288deg,
          #604200 304deg,
          #765407 318deg,
          #b8860b 330deg,
          #d4af37 338deg,
          #8a620d 348deg,

          transparent 360deg
        );

        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);

        -webkit-mask-composite: xor;

        mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);

        mask-composite: exclude;

        filter: drop-shadow(
          0 0 5px rgba(111, 79, 8, 0.42)
        );

        animation:
          mhRoadmapGoldLoop
          4s linear infinite;
      }

      @keyframes mhRoadmapGoldLoop {
        from {
          --mh-roadmap-loop-angle: 0deg;
        }

        to {
          --mh-roadmap-loop-angle: 360deg;
        }
      }

      /* Same full-width background as the 90-level journey text section */
      :global([data-theme="dark"]) .mh-root .mh-description strong {
        position: relative;
        z-index: 0;
        isolation: isolate;
        background: transparent !important;
      }
`}</style>
    </section>
  );
}
