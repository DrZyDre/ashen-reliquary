/**
 * download-icons.mjs
 * 
 * Downloads item icons from the Witchfire wiki for every item in itemMetadata.ts.
 * Run from the project root: node scripts/download-icons.mjs
 * 
 * Icons are saved to: public/icons/<category>/<ItemName>.png
 * A manifest is written to: src/data/iconManifest.json
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = path.join(ROOT, "public", "icons");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "iconManifest.json");
const WIKI_API = "https://witchfire.wiki.gg/api.php";
const WIKI_IMAGES = "https://witchfire.wiki.gg/images";

// ── All items by category ────────────────────────────────────────────────────

const items = {
  firearms: ["All-Seeing Eye","Angelus","Basilisk","Buckler","Cricket","Duelist","Echo","Falling Star","Fatum","Fist","Frostbite","Hailstorm","Hangfire","Hunger","Hypnosis","Judgment","Katar","Koschei","Martyr","Midas","Morning Star","Nemesis","Oracle","Psychopomp","Ricochet","Rotweaver","Striga","Tribunal","Vulture","Whisper"],
  spells: ["Blight Cyst","Burning Stake","Cornucopia","Cursed Bell","Fireballs","Firebreath","Frost Cone","Ice Sphere","Ice Stiletto","Iron Cross","Lightning Bolt","Miasma","Rotten Fiend","Shockwave","Stigma Diabolicum","Stormball","Twinshade"],
  prophecies: ["Prophecy of Air Element","Prophecy of Dead Eyes","Prophecy of Destruction","Prophecy of Earth Element","Prophecy of Fire Element","Prophecy of Firearms","Prophecy of Gunpowder","Prophecy of Health","Prophecy of Heaviness","Prophecy of Lightness","Prophecy of Nimble Fingers","Prophecy of Spells","Prophecy of Stamina","Prophecy of the Bull","Prophecy of the Serpent","Prophecy of Variety","Prophecy of Water Element","Prophecy of Witchfire"],
  rings: ["Crown of Fire","Dynamo Ring","Meteor Ring","Ring of Excreta","Ring of Obedience","Ring of Thorns","Ring of Wings","Shadowmist Ring","Static Ring"],
  relics: ["Biting Tongue","Blood of a Banshee","Book of Serpents","Braid of a Seductress","Eye of the Madwoman","Kirfane","Painted Tooth","Parasite","Scourge","Severed Ear"],
  fetishes: ["Balewort","Belladonna","Bittersweet Nightshade","Henbane","Mandrake","Monkshood","Yew"],
  beads: ["Acute Ailment Bead","Adrenaline Bead","Ailment Immunity Bead","Ailment Power Bead I","Ammo Preservation Bead","Ammo Reserves Bead I","Blessed Aim Bead I","Blessed Fire Bead","Blessed Hits Bead","Brawler Bead","Crystal Spell Bead","Dash Range Bead","Demonic Ammo Bead","Divine Intervention Bead I","Elemental Duration Bead I","Elixir Bead I","Elixir Bead II","Free Arcana Bead","Healing Bead I","Health Bead I","Health Bead II","Immune Dash Bead","Incense Bead I","Light Spell Charge Bead","Long Range Bead","Madness Bead I","Melee Charge Bead","Melee Recharge Bead I","Metanoia Bead I","Providence Bead I","Quickdraw Bead","Resistance Bead","Short Range Bead","Spell Recharge Bead I","Sprint Bead","Stamina Bead I","Stamina Sigil Bead","Traps Bead","Triple Reward Bead","Vigor Bead I","Weapon Range Bead I"],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "AshenReliquary/1.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "AshenReliquary/1.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

/** Check if a URL exists without downloading the whole file */
function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: "HEAD", headers: { "User-Agent": "AshenReliquary/1.0" } }, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.end();
  });
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function scoreTitle(imageTitle, normalizedItem) {
  const t = normalize(imageTitle);
  let score = 0;
  if (t.includes(normalizedItem)) score += 50;
  if (t.includes("inventory")) score += 20;
  if (t.includes("icon")) score += 16;
  if (t.includes("weapon")) score += 10;
  if (t.includes("spell")) score += 10;
  if (t.includes("ring")) score += 8;
  if (t.includes("relic")) score += 8;
  if (t.includes("bead")) score += 8;
  if (t.includes("fetish")) score += 8;
  if (t.endsWith("png")) score += 4;
  return score;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Build the guessed direct image URL from the item name */
function guessDirectUrl(itemName) {
  const underscored = itemName.replace(/ /g, "_");
  return `${WIKI_IMAGES}/${underscored}.png`;
}

async function fetchIconUrl(itemName) {
  const norm = normalize(itemName);

  // 1. Try direct pageimages (fastest)
  try {
    const params = new URLSearchParams({ action: "query", titles: itemName, prop: "pageimages", pithumbsize: "96", format: "json", origin: "*" });
    const data = await fetchJson(`${WIKI_API}?${params}`);
    const pages = Object.values(data?.query?.pages ?? {});
    const thumb = pages[0]?.thumbnail?.source;
    if (thumb) return thumb;
  } catch {}

  // 2. Fall back to image list + scoring
  try {
    const params = new URLSearchParams({ action: "query", titles: itemName, prop: "images", imlimit: "50", format: "json", origin: "*" });
    const data = await fetchJson(`${WIKI_API}?${params}`);
    const pages = Object.values(data?.query?.pages ?? {});
    const images = pages[0]?.images ?? [];

    if (images.length) {
      const best = [...images]
        .map((img) => img.title)
        .filter(Boolean)
        .sort((a, b) => scoreTitle(b, norm) - scoreTitle(a, norm))[0];

      if (best) {
        const infoParams = new URLSearchParams({ action: "query", titles: best, prop: "imageinfo", iiprop: "url", format: "json", origin: "*" });
        const infoData = await fetchJson(`${WIKI_API}?${infoParams}`);
        const infoPages = Object.values(infoData?.query?.pages ?? {});
        const info = infoPages[0]?.imageinfo?.[0];
        const url = info?.thumburl ?? info?.url ?? null;
        if (url) return url;
      }
    }
  } catch {}

  // 3. Guess the direct image URL: Item_Name.png
  try {
    const guessed = guessDirectUrl(itemName);
    const exists = await checkUrl(guessed);
    if (exists) return guessed;
  } catch {}

  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const manifest = {};
  const results = { success: [], failed: [] };

  for (const [category, names] of Object.entries(items)) {
    const dir = path.join(ICONS_DIR, category);
    fs.mkdirSync(dir, { recursive: true });

    for (const name of names) {
      const safeName = name.replace(/[/\\?%*:|"<>]/g, "-");
      const dest = path.join(dir, `${safeName}.png`);

      // Skip if already downloaded successfully
      if (fs.existsSync(dest)) {
        console.log(`  ✓ [cached] ${name}`);
        manifest[name] = `/icons/${category}/${safeName}.png`;
        results.success.push(name);
        continue;
      }

      process.stdout.write(`  ↓ ${name} ... `);
      try {
        const url = await fetchIconUrl(name);
        if (!url) throw new Error("no URL found");

        await downloadFile(url, dest);
        manifest[name] = `/icons/${category}/${safeName}.png`;
        results.success.push(name);
        console.log("✓");
      } catch (err) {
        results.failed.push(name);
        console.log(`✗ (${err.message})`);
      }

      await sleep(300);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log("\n── Summary ──────────────────────────────────────────");
  console.log(`  ✓ Downloaded: ${results.success.length}`);
  console.log(`  ✗ Failed:     ${results.failed.length}`);
  if (results.failed.length) {
    console.log("\n  Failed items (add imageURL manually to itemMetadata.ts):");
    results.failed.forEach((n) => console.log(`    - ${n}`));
  }
  console.log(`\n  Manifest written to: src/data/iconManifest.json`);
  console.log("─────────────────────────────────────────────────────\n");
}

main().catch(console.error);
