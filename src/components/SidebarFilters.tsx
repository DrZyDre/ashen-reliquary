import type { Difficulty } from "../types";

interface SidebarFiltersProps {
  query: string;
  difficulty: Difficulty | "All";
  beginnerOnly: boolean;
  onQueryChange: (value: string) => void;
  onDifficultyChange: (value: Difficulty | "All") => void;
  onBeginnerToggle: (value: boolean) => void;
}

export function SidebarFilters({
  query,
  difficulty,
  beginnerOnly,
  onQueryChange,
  onDifficultyChange,
  onBeginnerToggle,
}: SidebarFiltersProps) {
  return (
    <aside className="page-card relative rounded-xl p-4">
      <h2 className="ink-text mb-4 text-lg font-semibold">Scry Filters</h2>
      <label className="mb-4 block">
        <span className="page-muted mb-1 block text-sm">Search builds</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Name, weapon, spell..."
          className="w-full rounded-lg border border-red-950/60 bg-black/40 px-3 py-2 text-zinc-100 outline-none focus:border-red-600"
        />
      </label>

      <label className="mb-4 block">
        <span className="page-muted mb-1 block text-sm">Difficulty</span>
        <select
          value={difficulty}
          onChange={(event) => onDifficultyChange(event.target.value as Difficulty | "All")}
          className="w-full rounded-lg border border-red-950/60 bg-black/40 px-3 py-2 text-zinc-100 outline-none focus:border-red-600"
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-red-100">
        <input
          type="checkbox"
          checked={beginnerOnly}
          onChange={(event) => onBeginnerToggle(event.target.checked)}
          className="accent-red-700"
        />
        Beginner friendly only
      </label>
    </aside>
  );
}
