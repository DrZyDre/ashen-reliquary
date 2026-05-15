import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { builds } from "../data/builds";
import { itemMetadata } from "../data/itemMetadata";
import { TrackerPanel } from "../components/TrackerPanel";

interface BuildDetailPageProps {
  isTracked: (buildId: string) => boolean;
  getCompletion: (buildId: string) => { completed: number; total: number; percent: number };
  getChecklistState: (buildId: string) => Record<string, boolean>;
  onTrackBuild: (buildId: string) => void;
  onToggleChecklist: (buildId: string, itemId: string) => void;
}

export function BuildDetailPage({
  isTracked,
  getCompletion,
  getChecklistState,
  onTrackBuild,
  onToggleChecklist,
}: BuildDetailPageProps) {
  const { buildId } = useParams();
  const build = builds.find((entry) => entry.id === buildId);

  if (!build) return <Navigate to="/" replace />;

  const tracked = isTracked(build.id);
  const completion = getCompletion(build.id);
  const checklistState = getChecklistState(build.id);
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({});
  const [fetchedGnosis, setFetchedGnosis] = useState<Record<string, string | null>>({});

  const imageCandidates = useMemo(
    () => [...build.firearms, ...build.demonic, ...build.melee, ...build.lightSpell, ...build.heavySpell, ...build.prophecies, ...build.incense, ...build.rosaryBeads, ...build.relic, ...build.fetish, ...build.ring],
    [build],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      const resolved = await Promise.all(
        imageCandidates.map(async (item) => [item, await fetchWikiThumbnail(item)] as const),
      );

      if (cancelled) return;
      setImageUrls(Object.fromEntries(resolved));
    }

    loadImages();
    return () => {
      cancelled = true;
    };
  }, [imageCandidates]);

  useEffect(() => {
    let cancelled = false;

    const missingCandidates = imageCandidates.filter((item) => !itemMetadata[item]?.gnosis);
    if (!missingCandidates.length) return;

    async function loadGnosis() {
      const resolved = await Promise.all(
        missingCandidates.map(async (item) => [item, await fetchWikiGnosis(item)] as const),
      );
      if (cancelled) return;
      setFetchedGnosis((prev) => ({ ...prev, ...Object.fromEntries(resolved) }));
    }

    loadGnosis();
    return () => {
      cancelled = true;
    };
  }, [imageCandidates]);

  return (
    <section className="space-y-6">
      <Link to="/" className="inline-flex rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200">
        Back to builds
      </Link>

      <article className="page-card relative rounded-xl p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="ink-text text-2xl font-semibold">{build.name}</h2>
          <span className="rounded-full border border-red-900/60 bg-black/20 px-2 py-1 text-xs text-red-100">
            {build.difficulty}
          </span>
          <span className="rounded-full border border-red-900/60 bg-black/20 px-2 py-1 text-xs text-red-100">
            {build.beginnerFriendly ? "Beginner Friendly" : "Advanced"}
          </span>
        </div>
        <p className="page-muted mb-5">{build.playstyle}</p>

        <div className="mb-4 rounded-lg border border-red-900/30 bg-black/30 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-red-300/80">Apothecary Ledger</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(build.stats).map((entry) => {
            const parsed = parseStat(entry);

            return (
              <StatGlyph
                key={parsed.stat}
                stat={parsed.label}
                value={parsed.value}
              />
            );
          })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <BuildSection
            title="Weapons"
            items={[...build.firearms, ...build.demonic, ...build.melee]}
            iconFamily="Weapon"
            imageUrls={imageUrls}
            gnosisByItem={fetchedGnosis}
          />
          <BuildSection
            title="Spells"
            items={[...build.lightSpell, ...build.heavySpell]}
            iconFamily="Spell"
            imageUrls={imageUrls}
            gnosisByItem={fetchedGnosis}
          />
          <BuildSection
            title="Prophecies"
            items={build.prophecies}
            iconFamily="Prophecy"
            imageUrls={imageUrls}
            gnosisByItem={fetchedGnosis}
          />
          <BuildSection
            title="Incense / Relic / Fetish / Ring"
            items={[...build.incense, ...build.relic, ...build.fetish, ...build.ring]}
            iconFamily="Item"
            imageUrls={imageUrls}
            gnosisByItem={fetchedGnosis}
          />
          <BuildSection
            title="Rosary Beads"
            items={build.rosaryBeads}
            iconFamily="Item"
            imageUrls={imageUrls}
            gnosisByItem={fetchedGnosis}
          />
          {build.pros?.length ? (
            <BuildSection title="Pros" items={build.pros} />
          ) : null}

          {build.cons?.length ? (
            <BuildSection title="Cons" items={build.cons} />
          ) : null}
        </div>

        <div className="page-muted mt-4 rounded-lg border border-red-900/30 bg-black/30 p-4">
          {build.notes}
        </div>
      </article>

      <TrackerPanel
        build={build}
        tracked={tracked}
        percent={completion.percent}
        completed={completion.completed}
        total={completion.total}
        checklistState={checklistState}
        onTrack={() => onTrackBuild(build.id)}
        onToggle={(itemId) => onToggleChecklist(build.id, itemId)}
      />
    </section>
  );
}

function BuildSection({
  title,
  items,
  iconFamily,
  imageUrls,
  gnosisByItem,
}: {
  title: string;
  items: string[];
  iconFamily?: string;
  imageUrls?: Record<string, string | null>;
  gnosisByItem?: Record<string, string | null>;
}) {
  return (
    <section className="rounded-lg border border-red-900/30 bg-black/30 p-4">
      <h3 className="mb-2 font-medium text-red-200">{title}</h3>
      <ul className="space-y-2 text-sm text-red-50/90">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            {iconFamily ? (
              <span className="inline-flex h-11 w-11 overflow-hidden rounded-md border border-red-900/50 bg-zinc-950/80 shadow-[0_0_12px_rgba(127,29,29,0.35)]">
                {imageUrls?.[item] ? (
                  <img
                    src={imageUrls[item] ?? ""}
                    alt={item}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="inline-flex h-full w-full items-center justify-center text-base text-red-100">
                    {getItemGlyph(inferFamily(item, iconFamily))}
                  </span>
                )}
              </span>
            ) : null}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className={iconFamily ? "text-[15px]" : ""}>
                  {iconFamily ? item : `- ${item}`}
                </span>

                {resolveGnosis(item, gnosisByItem ?? {}) ? (
                  <span className="rounded border border-red-900/50 bg-red-950/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-red-200/90">
                    {resolveGnosis(item, gnosisByItem ?? {})}
                  </span>
                ) : null}
              </div>
              {itemMetadata[item]?.location ? (
                <p className="rounded border border-red-900/50 bg-red-950/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-red-200/90">
                  {itemMetadata[item]?.location}
                </p>
              ) : null}

              {itemMetadata[item]?.acquisition ? (
                <p className="rounded border border-red-900/50 bg-red-950/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-red-200/90">
                  {itemMetadata[item]?.acquisition}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const statLabels: Record<string, string> = {
  flesh: "Flesh",
  blood: "Blood",
  mind: "Mind",
  witchery: "Witchery",
  arsenal: "Arsenal",
  faith: "Faith",
};

function parseStat([stat, value]: [string, number | null | undefined]) {
  return {
    stat,
    label: statLabels[stat] ?? stat,
    value: value == null ? "—" : value.toString(),
  };
}

function StatGlyph({ stat, value }: { stat: string; value: string }) {
  const icon = getStatIcon(stat);
  return (
    <div className="rounded-lg border border-red-900/35 bg-zinc-950/50 p-3">
      <div className="mb-1 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-800/60 bg-black/35 text-sm text-red-100">
          {icon}
        </span>
        <span className="text-sm text-red-100">{stat}</span>
      </div>
      <p className="text-lg font-semibold text-red-200">{value}</p>
    </div>
  );
}

function getStatIcon(stat: string) {
  const key = stat.toLowerCase();

  if (key.includes("flesh")) return "♥";
  if (key.includes("blood")) return "⬥";
  if (key.includes("mind")) return "◈";
  if (key.includes("witchery")) return "✦";
  if (key.includes("arsenal")) return "⚔";
  if (key.includes("faith")) return "☥";

  return "●";
}

function inferFamily(item: string, fallbackFamily = "Item") {
  const lower = item.toLowerCase();
  if (lower.includes("ring")) return "Ring";
  if (lower.includes("bead")) return "Bead";
  if (lower.includes("relic")) return "Relic";
  if (
    lower.includes("mandrake") ||
    lower.includes("monkshood") ||
    lower.includes("yew") ||
    lower.includes("henbane") ||
    lower.includes("belladonna") ||
    lower.includes("balewort")
  ) {
    return "Fetish";
  }
  return fallbackFamily;
}

function getItemGlyph(family: string) {
  const lower = family.toLowerCase();
  if (lower === "weapon") return "\u2694";
  if (lower === "spell") return "\u2727";
  if (lower === "prophecy") return "✧";
  if (lower === "ring") return "\u25ce";
  if (lower === "relic") return "\u26b1";
  if (lower === "bead") return "\u2234";
  if (lower === "fetish") return "\u2620";
  return "\u2736";
}

function resolveGnosis(item: string, fetched: Record<string, string | null>) {
  return itemMetadata[item]?.gnosis ?? fetched[item] ?? null;
}

async function fetchWikiThumbnail(itemName: string): Promise<string | null> {
  try {
    const directParams = new URLSearchParams({
      action: "query",
      titles: itemName,
      prop: "pageimages",
      pithumbsize: "96",
      format: "json",
      origin: "*",
    });

    const directResponse = await fetch(`https://witchfire.wiki.gg/api.php?${directParams.toString()}`);
    if (directResponse.ok) {
      const directData = (await directResponse.json()) as {
        query?: { pages?: Record<string, { thumbnail?: { source?: string } }> };
      };
      const directPages = directData.query?.pages ?? {};
      const directFirst = Object.values(directPages)[0];
      if (directFirst?.thumbnail?.source) return directFirst.thumbnail.source;
    }

    const imagesParams = new URLSearchParams({
      action: "query",
      titles: itemName,
      prop: "images",
      imlimit: "50",
      format: "json",
      origin: "*",
    });

    const imagesResponse = await fetch(`https://witchfire.wiki.gg/api.php?${imagesParams.toString()}`);
    if (!imagesResponse.ok) return null;

    const imagesData = (await imagesResponse.json()) as {
      query?: { pages?: Record<string, { images?: Array<{ title?: string }> }> };
    };
    const pages = imagesData.query?.pages ?? {};
    const firstPage = Object.values(pages)[0];
    const imageTitles = (firstPage?.images ?? [])
      .map((image) => image.title)
      .filter((title): title is string => Boolean(title));
    if (!imageTitles.length) return null;

    const normalizedItem = normalizeForMatch(itemName);
    const rankedImage = [...imageTitles].sort((a, b) => {
      return scoreImageTitle(b, normalizedItem) - scoreImageTitle(a, normalizedItem);
    })[0];

    const infoParams = new URLSearchParams({
      action: "query",
      titles: rankedImage,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*",
    });

    const infoResponse = await fetch(`https://witchfire.wiki.gg/api.php?${infoParams.toString()}`);
    if (!infoResponse.ok) return null;
    const infoData = (await infoResponse.json()) as {
      query?: {
        pages?: Record<string, { imageinfo?: Array<{ thumburl?: string; url?: string }> }>;
      };
    };
    const infoPages = infoData.query?.pages ?? {};
    const infoFirst = Object.values(infoPages)[0];
    const imageInfo = infoFirst?.imageinfo?.[0];
    return imageInfo?.thumburl ?? imageInfo?.url ?? null;
  } catch {
    return null;
  }
}

function normalizeForMatch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scoreImageTitle(imageTitle: string, normalizedItem: string) {
  const normalizedTitle = normalizeForMatch(imageTitle);
  let score = 0;

  if (normalizedTitle.includes(normalizedItem)) score += 50;
  if (normalizedTitle.includes("inventory")) score += 20;
  if (normalizedTitle.includes("icon")) score += 16;
  if (normalizedTitle.includes("weapon")) score += 10;
  if (normalizedTitle.includes("spell")) score += 10;
  if (normalizedTitle.includes("ring")) score += 8;
  if (normalizedTitle.includes("relic")) score += 8;
  if (normalizedTitle.includes("bead")) score += 8;
  if (normalizedTitle.includes("fetish")) score += 8;
  if (normalizedTitle.endsWith("png")) score += 4;

  return score;
}

async function fetchWikiGnosis(itemName: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      action: "parse",
      page: itemName,
      prop: "wikitext",
      format: "json",
      origin: "*",
    });

    const response = await fetch(`https://witchfire.wiki.gg/api.php?${params.toString()}`);
    if (!response.ok) return null;

    const data = (await response.json()) as { parse?: { wikitext?: { "*": string } } };
    const raw = data.parse?.wikitext?.["*"];
    if (!raw) return null;

    const acquisitionMatch = raw.match(
      /==\s*Acquisition\s*==([\s\S]*?)(?:\n==\s*[^=]+?\s*==|$)/i,
    );
    const acquisitionSection = acquisitionMatch?.[1] ?? "";
    const acquisitionGnosis = extractGnosisValue(acquisitionSection);
    if (acquisitionGnosis) return acquisitionGnosis;

    const match = raw.match(/\|\s*gnosis\s*=\s*([^\n\r|]+)/i);
    if (!match?.[1]) return null;

    const cleaned = cleanWikiText(match[1]);
    return cleaned.length ? cleaned : null;
  } catch {
    return null;
  }
}

function cleanWikiText(value: string) {
  return value
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/{{[^}]+}}/g, "")
    .replace(/''+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractGnosisValue(text: string) {
  if (!text) return null;

  const direct = text.match(/gnosis[^a-z0-9]{0,12}(0|I{1,3}|IV)\b/i);
  if (direct?.[1]) return `Gnosis ${direct[1].toUpperCase()}`;

  const linked = text.match(/gnosis[_\s#-]*(0|I{1,3}|IV)\b/i);
  if (linked?.[1]) return `Gnosis ${linked[1].toUpperCase()}`;

  const romanAnywhere = text.match(/\bGnosis\s*(0|I{1,3}|IV)\b/i);
  if (romanAnywhere?.[1]) return `Gnosis ${romanAnywhere[1].toUpperCase()}`;

  return null;
}
