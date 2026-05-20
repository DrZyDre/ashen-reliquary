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
 
  const featuredBuild = builds[0];
 
  const filteredBuilds = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return builds.filter((build) => {
      if (build.id === featuredBuild.id) return false;
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
        ...build.ring,
      ]
        .join(" ")
        .toLowerCase();
 
      const matchesQuery = normalized.length === 0 || searchBlob.includes(normalized);
      const matchesDifficulty = difficulty === "All" || build.difficulty === difficulty;
      const matchesBeginner = !beginnerOnly || build.beginnerFriendly;
 
      return matchesQuery && matchesDifficulty && matchesBeginner;
    });
  }, [query, difficulty, beginnerOnly, featuredBuild.id]);
 
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden rounded-2xl px-8 py-12">
        <div className="hero-embers" aria-hidden="true" />
        <div className="relative z-10">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-red-400/70">
            Witchfire Build Companion
          </p>
          <h1 className="font-reliquary mb-3 text-4x1 font-bold tracking-tight sm:text-5xl">
            Ashen Reliquary
          </h1>
          <p className="page-muted max-w-xl text-base leading-relaxed">
            A curated archive of Witchfire builds. Browse weapon loadouts, track your progression,
            and prepare your preyer for the trials ahead.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="stat-pill">
              <span className="text-red-300/60">✦</span>
              <span className="text-red-100">{builds.length} Builds Catalogued</span>
            </div>
            <div className="stat-pill">
              <span className="text-red-300/60">⚔</span>
              <span className="text-red-100">
                {[...new Set(builds.flatMap((b) => [...b.firearms, ...b.demonic, ...b.melee]))].length} Weapons Indexed
              </span>
            </div>
            <div className="stat-pill">
              <span className="text-red-300/60">✧</span>
              <span className="text-red-100">
                {[...new Set(builds.flatMap((b) => [...b.lightSpell, ...b.heavySpell]))].length} Spells Indexed
              </span>
            </div>
          </div>
        </div>
      </div>
 
      {/* Featured Build */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-red-400/70">Featured Build</p>
        <BuildCard
          build={featuredBuild}
          tracked={isTracked(featuredBuild.id)}
          percent={getCompletionPercent(featuredBuild.id)}
          featured
          onTrack={() => onTrackBuild(featuredBuild.id)}
        />
      </div>
 
      {/* Build Archive */}
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
    </div>
  );
}