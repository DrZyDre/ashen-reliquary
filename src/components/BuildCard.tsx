import { Link } from "react-router-dom";
import type { Build } from "../types";
import { ProgressBar } from "./ProgressBar";
 
interface BuildCardProps {
  build: Build;
  tracked: boolean;
  percent: number;
  featured?: boolean;
  wornClassName?: string;
  onTrack: () => void;
  onUntrack: () => void;
}
 
export function BuildCard({ build, tracked, percent, featured, wornClassName, onTrack, onUntrack }: BuildCardProps) {
  const allWeapons = [...build.firearms, ...build.demonic, ...build.melee];
 
  if (featured) {
    return (
      <article className="page-card relative rounded-xl p-6">
        <div className="mb-3">
          <span className="mb-2 inline-block rounded-full border border-amber-600/40 bg-amber-950/40 px-2.5 py-1 text-[10px] uppercase tracking-widest text-amber-300/80">
            Featured
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="ink-text text-2xl font-bold">{build.name}</h3>
            <span className="rounded-full border border-red-900/60 bg-black/20 px-2 py-1 text-xs text-red-100">
              {build.difficulty}
            </span>
            {build.beginnerFriendly && (
              <span className="rounded-full border border-green-900/50 bg-green-950/30 px-2 py-1 text-xs text-green-300/80">
                Beginner Friendly
              </span>
            )}
          </div>
        </div>
        <p className="page-muted mb-5 text-sm leading-relaxed">{build.playstyle}</p>
 
        <div className="mb-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-red-300/60">Weapons</p>
          <div className="flex flex-wrap gap-2">
            {allWeapons.map((weapon) => (
              <WeaponPill key={weapon} name={weapon} />
            ))}
          </div>
        </div>
 
        {(build.lightSpell.length > 0 || build.heavySpell.length > 0) && (
          <div className="mb-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-red-300/60">Spells</p>
            <div className="flex flex-wrap gap-2">
              {[...build.lightSpell, ...build.heavySpell].map((spell) => (
                <SpellPill key={spell} name={spell} />
              ))}
            </div>
          </div>
        )}
 
        <div className="mb-5">
          <div className="page-muted mb-1 flex justify-between text-xs">
            <span>Progression</span>
            <span>{percent}%</span>
          </div>
          <ProgressBar percent={percent} />
        </div>
 
        <div className="flex gap-2">
  {tracked ? (
    <button
      type="button"
      onClick={onUntrack}
      className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500 hover:text-red-300"
    >
      Untrack
    </button>
  ) : (
    <button
      type="button"
      onClick={onTrack}
      className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-red-600"
    >
      Track this build
    </button>
  )}
  <Link
    to={`/build/${build.id}`}
    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-100 transition hover:border-red-600"
  >
    View details
  </Link>
</div>
      </article>
    );
  }
 
  return (
    <article className={`page-card relative rounded-xl p-5 ${wornClassName ?? ""}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="ink-text text-xl font-semibold">{build.name}</h3>
        <span className="rounded-full border border-red-900/60 bg-black/20 px-2 py-1 text-xs text-red-100">
          {build.difficulty}
        </span>
      </div>
      <p className="page-muted mb-3 text-sm">{build.playstyle}</p>
 
      {allWeapons.length > 0 && (
        <div className="mb-4">
          <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-red-300/60">Weapons</p>
          <div className="flex flex-wrap gap-1.5">
            {allWeapons.map((weapon) => (
              <WeaponPill key={weapon} name={weapon} small />
            ))}
          </div>
        </div>
      )}
 
      <div className="mb-3">
        <div className="page-muted mb-1 flex justify-between text-xs">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <ProgressBar percent={percent} />
      </div>
 
      <div className="flex gap-2">
  {tracked ? (
    <button
      type="button"
      onClick={onUntrack}
      className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500 hover:text-red-300"
    >
      Untrack
    </button>
  ) : (
    <button
      type="button"
      onClick={onTrack}
      className="rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-red-600"
    >
      Track this build
    </button>
  )}
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
 
function WeaponPill({ name, small }: { name: string; small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-red-900/50 bg-red-950/40 text-red-100/90 ${
        small ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs"
      }`}
    >
      <span className="text-red-400/70">⚔</span>
      {name}
    </span>
  );
}
 
function SpellPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-purple-900/40 bg-purple-950/30 px-2 py-1 text-xs text-purple-200/80">
      <span className="text-purple-400/70">✦</span>
      {name}
    </span>
  );
}