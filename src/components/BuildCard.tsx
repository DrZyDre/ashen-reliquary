import { Link } from "react-router-dom";
import type { Build } from "../types";
import { ProgressBar } from "./ProgressBar";

interface BuildCardProps {
  build: Build;
  tracked: boolean;
  percent: number;
  wornClassName?: string;
  onTrack: () => void;
}

export function BuildCard({ build, tracked, percent, wornClassName, onTrack }: BuildCardProps) {
  return (
    <article className={`page-card relative rounded-xl p-5 ${wornClassName ?? ""}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="ink-text text-xl font-semibold">{build.name}</h3>
        <span className="rounded-full border border-red-900/60 bg-black/20 px-2 py-1 text-xs text-red-100">
          {build.difficulty}
        </span>
      </div>
      <p className="page-muted mb-2 text-sm">{build.playstyle}</p>
      <p className="mb-4 text-xs text-red-100/80">
        Beginner friendly: {build.beginnerFriendly ? "Yes" : "No"}
      </p>

      <div className="mb-3">
        <div className="page-muted mb-1 flex justify-between text-xs">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <ProgressBar percent={percent} />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onTrack}
          disabled={tracked}
          className="rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
        >
          {tracked ? "Tracked" : "Track this build"}
        </button>
        <Link
          to={`/build/${build.id}`}
          className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-100 transition hover:border-red-600"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
