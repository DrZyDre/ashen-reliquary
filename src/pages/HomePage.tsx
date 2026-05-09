import { useMemo, useState } from "react";
import { builds } from "../data/builds";
import type { Difficulty } from "../types";
import { BuildCard } from "../components/BuildCard";
import { SidebarFilters } from "../components/SidebarFilters";

const wornVariants = ["page-worn-1", "page-worn-2", "page-worn-3", "page-worn-4"];

interface HomePageProps {
  isTracked: (buildId: string) => boolean;
  getCompletionPercent: (buildId: string) => number;
  onTrackBuild: (buildId: string) => void;
}

export function HomePage({ isTracked, getCompletionPercent, onTrackBuild }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);

  const filteredBuilds = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return builds.filter((build) => {
      const searchBlob = [
        build.name,
        build.playstyle,
        ...build.firearms,
        ...build.demonic,
        ...build.melee,
        ...build.lightSpell,
        ...build.heavySpell,
        ...build.incense,
        ...build.rosaryBeads,
        ...build.relic,
        ...build.fetish,
        ...build.ring
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalized.length === 0 || searchBlob.includes(normalized);
      const matchesDifficulty = difficulty === "All" || build.difficulty === difficulty;
      const matchesBeginner = !beginnerOnly || build.beginnerFriendly;

      return matchesQuery && matchesDifficulty && matchesBeginner;
    });
  }, [query, difficulty, beginnerOnly]);

  return (
    <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <SidebarFilters
        query={query}
        difficulty={difficulty}
        beginnerOnly={beginnerOnly}
        onQueryChange={setQuery}
        onDifficultyChange={setDifficulty}
        onBeginnerToggle={setBeginnerOnly}
      />

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-100">Build Archive</h2>
          <p className="text-sm text-zinc-400">{filteredBuilds.length} results</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredBuilds.map((build, index) => (
            <BuildCard
              key={build.id}
              build={build}
              tracked={isTracked(build.id)}
              percent={getCompletionPercent(build.id)}
              wornClassName={wornVariants[index % wornVariants.length]}
              onTrack={() => onTrackBuild(build.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
