import type { Build, ChecklistItem } from "../types";

export function generateChecklist(build: Build): ChecklistItem[] {
  if (build.progressionChecklist?.length) {
    return build.progressionChecklist;
  }

  const items: ChecklistItem[] = [];

  build.firearms.forEach((name, i) =>
    items.push({ id: `fw${i}`, label: `Research ${name}`, group: "weapons" })
  );
  build.demonic.forEach((name, i) =>
    items.push({ id: `dm${i}`, label: `Research ${name}`, group: "weapons" })
  );
  build.melee.forEach((name, i) =>
    items.push({ id: `ml${i}`, label: `Obtain ${name}`, group: "weapons" })
  );
  [...build.lightSpell, ...build.heavySpell].forEach((name, i) =>
    items.push({ id: `sp${i}`, label: `Unlock ${name}`, group: "spells" })
  );
  if (build.stats) {
    Object.entries(build.stats).forEach(([stat, val]) => {
      if (val != null) {
        items.push({
          id: `st_${stat}`,
          label: `Reach ${stat.charAt(0).toUpperCase() + stat.slice(1)} ${val}`,
          group: "stats",
        });
      }
    });
  }
  [...build.relic, ...build.fetish, ...build.ring].forEach((name, i) =>
    items.push({ id: `gr${i}`, label: `Equip ${name}`, group: "gear" })
  );
  build.rosaryBeads.forEach((name, i) =>
    items.push({ id: `bd${i}`, label: `Equip ${name}`, group: "beads" })
  );
  build.incense.forEach((name, i) =>
    items.push({ id: `in${i}`, label: `Craft ${name}`, group: "gear" })
  );
  build.prophecies.filter((p) => p !== "Unslotted").forEach((name, i) =>
    items.push({ id: `pr${i}`, label: `Slot ${name}`, group: "prophecies" })
  );

  // Append any manually specified extras
  if (build.checklistExtras?.length) {
    items.push(...build.checklistExtras);
  }

  return items;
}