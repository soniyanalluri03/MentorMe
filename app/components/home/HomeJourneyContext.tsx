"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useHomeJourneyState } from "./useHomeJourneyState";

type HomeJourneyContextValue = ReturnType<typeof useHomeJourneyState>;

const HomeJourneyContext =
  createContext<HomeJourneyContextValue | null>(null);

export function HomeJourneyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const journey = useHomeJourneyState();

  return (
    <HomeJourneyContext.Provider value={journey}>
      {children}
    </HomeJourneyContext.Provider>
  );
}

export function useHomeJourney() {
  const context = useContext(HomeJourneyContext);

  if (!context) {
    throw new Error(
      "useHomeJourney must be used inside HomeJourneyProvider",
    );
  }

  return context;
}