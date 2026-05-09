import fs from "node:fs/promises";

const filePath = new URL("../src/data/itemMetadata.ts", import.meta.url);
const source = await fs.readFile(filePath, "utf8");

const itemRegex = /^\s{2}"?([^"\n]+?)"?\s*:\s*\{(?:\s*gnosis:\s*"([^"]+)")?\s*\},?$/gm;
const items = [];
let match;
while ((match = itemRegex.exec(source))) {
  items.push({ name: match[1], existing: match[2] ?? null });
}

function cleanWikiText(value) {
  return value
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/{{[^}]+}}/g, "")
    .replace(/''+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractGnosisValue(text) {
  if (!text) return null;

  const direct = text.match(/gnosis[^a-z0-9]{0,12}(0|I{1,4}|V)\b/i);
  if (direct?.[1]) return `Gnosis ${direct[1].toUpperCase()}`;

  const linked = text.match(/gnosis[_\s#-]*(0|I{1,4}|V)\b/i);
  if (linked?.[1]) return `Gnosis ${linked[1].toUpperCase()}`;

  const romanAnywhere = text.match(/\bGnosis\s*(0|I{1,4}|V)\b/i);
  if (romanAnywhere?.[1]) return `Gnosis ${romanAnywhere[1].toUpperCase()}`;

  return null;
}

async function fetchWikiGnosis(itemName) {
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

    const data = await response.json();
    const raw = data?.parse?.wikitext?.["*"];
    if (!raw) return null;

    const acquisitionMatch = raw.match(
      /==\s*Acquisition\s*==([\s\S]*?)(?:\n==\s*[^=]+?\s*==|$)/i,
    );
    const acquisitionSection = acquisitionMatch?.[1] ?? "";
    const acquisitionGnosis = extractGnosisValue(acquisitionSection);
    if (acquisitionGnosis) return acquisitionGnosis;

    const infobox = raw.match(/\|\s*gnosis\s*=\s*([^\n\r|]+)/i);
    if (!infobox?.[1]) return null;
    const cleaned = cleanWikiText(infobox[1]);
    if (!cleaned) return null;

    const normalized = extractGnosisValue(cleaned);
    return normalized ?? cleaned;
  } catch {
    // continue to rendered-html fallback below
  }

  try {
    const safeTitle = encodeURIComponent(itemName.replace(/\s+/g, "_"));
    const response = await fetch(`https://witchfire.wiki.gg/wiki/${safeTitle}`);
    if (!response.ok) return null;
    const html = await response.text();

    const acquisitionBlock =
      html.match(/<h2[^>]*>\s*<span[^>]*>\s*Acquisition\s*<\/span>[\s\S]*?(?=<h2|$)/i)?.[0] ?? html;
    const plain = acquisitionBlock
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ");
    const parsed = extractGnosisValue(plain);
    return parsed;
  } catch {
    return null;
  }
}

const resolved = new Map();
for (const item of items) {
  const gnosis = await fetchWikiGnosis(item.name);
  const existing =
    item.existing && item.existing.toLowerCase() !== "unknown" ? item.existing : null;
  resolved.set(item.name, gnosis ?? existing ?? "No Gnosis requirement listed");
}

const sorted = [...resolved.entries()].sort((a, b) => a[0].localeCompare(b[0]));
const lines = sorted.map(([name, gnosis]) => {
  const key = /^[A-Za-z0-9]+$/.test(name) ? name : `"${name}"`;
  return `  ${key}: { gnosis: "${gnosis}" },`;
});

const output =
  `export interface ItemMetadata {\n` +
  `  gnosis?: string;\n` +
  `}\n\n` +
  `export const itemMetadata: Record<string, ItemMetadata> = {\n` +
  lines.join("\n") +
  `\n};\n`;

await fs.writeFile(filePath, output, "utf8");
console.log(`Updated ${sorted.length} items.`);
