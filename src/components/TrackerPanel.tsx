import type { Build, ChecklistGroup } from "../types";
import { ProgressBar } from "./ProgressBar";
import { generateChecklist } from "../utils/generateChecklist";

const groupLabels: Record<ChecklistGroup, string> = {
  weapons: "Weapons",
  spells: "Spells",
  stats: "Stats",
  gear: "Gear & Relics",
  beads: "Rosary Beads",
  prophecies: "Prophecies",
  optional: "Optional Upgrades",
};

interface TrackerPanelProps {
  build: Build;
  tracked: boolean;
  percent: number;
  completed: number;
  total: number;
  checklistState: Record<string, boolean>;
  onTrack: () => void;
  onUntrack: () => void;
  onToggle: (itemId: string) => void;
}

export function TrackerPanel({
  build,
  tracked,
  percent,
  completed,
  total,
  checklistState,
  onTrack,
  onUntrack,
  onToggle,
}: TrackerPanelProps) {
  if (!tracked) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
        <h2 className="ink-text mb-3 text-xl font-semibold">Progression Tracker</h2>
        <p className="mb-4 text-zinc-300">
          Start tracking this build to unlock the progression checklist.
        </p>
        <button
          type="button"
          onClick={onTrack}
          className="rounded-lg bg-red-700 px-4 py-2 font-medium text-zinc-100 transition hover:bg-red-600"
        >
          Track this build
        </button>
      </section>
    );
  }

  return (
    <section className="page-card relative rounded-xl p-6">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="ink-text text-xl font-semibold">Progression Tracker</h2>
        <p className="page-muted text-sm">
          {completed}/{total} complete
        </p>
        <button type="button" onClick={onUntrack} className="rounded-lg border border-zinc-600 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-red-500 hover:text-red-300">
          Untrack
        </button>
      </div>
      <div className="mb-6">
        <div className="page-muted mb-1 text-xs">{percent}% completion</div>
        <ProgressBar percent={percent} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {(Object.keys(groupLabels) as ChecklistGroup[]).map((group) => {
          const groupItems = generateChecklist(build).filter((item) => item.group === group);
          if (!groupItems.length) return null;
          return (
            <div key={group} className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <h3 className="mb-3 font-medium text-red-200 border-1-2 border-red-700 pl-2">{groupLabels[group]}</h3>
              <ul className="space-y-2">
                {groupItems.map((item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200">
                      <input
                        type="checkbox"
                        checked={Boolean(checklistState[item.id])}
                        onChange={() => onToggle(item.id)}
                        className="accent-red-700"
                      />
                      <span className={checklistState[item.id] ? "line-through text-zinc-500" : ""}>
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
