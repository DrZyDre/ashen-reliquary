import { useCallback, useEffect, useMemo, useState } from "react";
import type { Build } from "../types";
import { generateChecklist } from "../utils/generateChecklist";

const STORAGE_KEY = "ashen-reliquary-tracked-builds";

type ProgressState = Record<string, Record<string, boolean>>;

export function useTrackedBuilds() {
  const [trackedBuilds, setTrackedBuilds] = useState<ProgressState>({});

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as ProgressState;
      setTrackedBuilds(parsed);
    } catch {
      setTrackedBuilds({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedBuilds));
  }, [trackedBuilds]);

  const isTracked = useCallback(
    (buildId: string) => Boolean(trackedBuilds[buildId]),
    [trackedBuilds],
  );

  const trackBuild = useCallback((build: Build) => {
    setTrackedBuilds((prev) => {
      if (prev[build.id]) return prev;
      const initial = Object.fromEntries(
        generateChecklist(build).map((item) => [item.id, false]),
      );
      return { ...prev, [build.id]: initial };
    });
  }, []);

  const toggleChecklistItem = useCallback((buildId: string, itemId: string) => {
    setTrackedBuilds((prev) => {
      const current = prev[buildId];
      if (!current) return prev;
      return {
        ...prev,
        [buildId]: {
          ...current,
          [itemId]: !current[itemId],
        },
      };
    });
  }, []);

  const getCompletion = useCallback(
    (build: Build) => {
      const items = generateChecklist(build); // assign once
      const checklist = trackedBuilds[build.id];
      if (!checklist) return { completed: 0, total: items.length, percent: 0 };
      const total = items.length;
      const completed = items.filter((item) => checklist[item.id]).length;
      const percent = total ? Math.round((completed / total) * 100) : 0;
      return { completed, total, percent };
    },
    [trackedBuilds],
  );

  const trackedCount = useMemo(() => Object.keys(trackedBuilds).length, [trackedBuilds]);

  const untrackBuild = useCallback((buildId: string) => {
    setTrackedBuilds((prev) => {
      const next = { ...prev };
      delete next[buildId];
      return next;
    });
  }, []);

  return {
    trackedBuilds,
    trackedCount,
    isTracked,
    trackBuild,
    untrackBuild,
    toggleChecklistItem,
    getCompletion,
  };
}
