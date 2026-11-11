import { useState, useEffect } from "react";

export interface ScarcityData {
  remainingCopies: number;
  hasDecreased: boolean;
  activeViewers: number;
  percentageClaimed: number;
  totalAllocation: number;
}

export function useScarcity(initialCopies: number = 24): ScarcityData {
  const [remainingCopies, setRemainingCopies] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("planner_remaining_copies");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 3) return parsed;
      }
    } catch (_) {}
    return initialCopies;
  });

  const [hasDecreased, setHasDecreased] = useState(false);
  const [activeViewers, setActiveViewers] = useState(42);

  const totalAllocation = 150;
  const claimedCopies = totalAllocation - remainingCopies;
  const percentageClaimed = Math.min(
    98,
    Math.round((claimedCopies / totalAllocation) * 100)
  );

  useEffect(() => {
    try {
      localStorage.setItem("planner_remaining_copies", String(remainingCopies));
    } catch (_) {}
  }, [remainingCopies]);

  useEffect(() => {
    const getRandomInterval = () =>
      Math.floor(Math.random() * (55000 - 32000 + 1)) + 32000;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextDecrement = () => {
      timeoutId = setTimeout(() => {
        setRemainingCopies((prev) => {
          if (prev > 4) {
            setHasDecreased(true);
            setTimeout(() => setHasDecreased(false), 2000);
            return prev - 1;
          }
          return prev;
        });

        setActiveViewers((prev) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          const next = prev + delta;
          return next >= 34 && next <= 58 ? next : 42;
        });

        scheduleNextDecrement();
      }, getRandomInterval());
    };

    scheduleNextDecrement();

    return () => clearTimeout(timeoutId);
  }, []);

  return {
    remainingCopies,
    hasDecreased,
    activeViewers,
    percentageClaimed,
    totalAllocation,
  };
}
