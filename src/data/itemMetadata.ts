export interface ItemMetadata {
  gnosis?: string;
  location?: string;
  acquisition?: string;
}

const firearms: Record<string, ItemMetadata> = {
  "All-Seeing Eye": { gnosis: "Gnosis III" },
  Angelus: { gnosis: "Gnosis 0" },
  Basilisk: { gnosis: "Gnosis II"},
  Cricket: { gnosis: "Gnosis III" },
  Duelist: { gnosis: "Gnosis II" },
  Echo: { gnosis: "Gnosis 0" },
  "Falling Star": { gnosis: "Gnosis II" },
  Fatum: { acquisition: "Obtained by unsealing three Latent Orbs of Irongate Castle in the Apothecary of the Shrouded Hermitorium"},
  Frostbite: { gnosis: "Gnosis II" },
  Hailstorm: { gnosis: "Gnosis I" },
  Hangfire: { gnosis: "Gnosis I" },
  Hunger: { gnosis: "Gnosis 0" },
  Hypnosis: { gnosis: "Gnosis I" },
  Judgement: {location: "Found on an overturned bench in The Sanctuary of the Shrouded Hermitorium, after completing the labyrinth in Witch Mountain" },
  Koschei: { gnosis: "Gnosis II", acquisition: "Obtained from a quest that begins when picking up the Pile of Bones that appears next to the Workshop Mirror in the Shrouded Hermitorium" },
  Martyr: { gnosis: "Gnosis III", acquisition: "Found on on an altar near the reward chests in the final room of the Velmorne Witch Vault; requires Gnosis III and 15000 Witchfire to access" },
  Midas: { gnosis: "Gnosis III" },
  Nemesis: { gnosis: "Gnosis III" },
  Oracle: { location: "Found behind the small waterfall in the Depths of Velmorne underground, accessible by following the large waterfall downward, which lies north of the fountain in the Square of Echoes." },
  Psychopomp: { gnosis: "Gnosis I" },
  Ricochet: { gnosis: "Gnosis II" },
  Rotweaver: { location: "Found in the Dining Area of The Wailing Tower, lying on the Prophet's altar" },
  Striga: { gnosis: "Gnosis II", acquisition: "Found hidden behind a Mirage on the upper floor of the Gnosis Chamber, located in the cellar of The Sanctuary in the Shrouded Hermitorium; requires Gnosis II and 2500WhiteVolatileWitchfireIcon.png to dispel. Early Access only." },
  Tribunal: {location: "Shrouded Hermitorium", acquisition: "Obtained by conquering the trial of Torment VI" },
  Vulture: { gnosis: "Gnosis II" },
  Whisper: { gnosis: "Gnosis II" },
}

const spells: Record<string, ItemMetadata> = {
  "Blight Cyst": { gnosis: "Gnosis I" },
  "Burning Stake": { gnosis: "Gnosis III", location: "Irongate Castle" },
  Cornucopia: { gnosis: "Gnosis III" },
  "Cursed Bell": { gnosis: "Gnosis II" },
  Fireballs: { gnosis: "Gnosis 0" },
  Firebreath: { location: "Island of the Damned"},
  "Frost Cone": { gnosis: "Gnosis 0" },
  "Ice Sphere": { gnosis: "Gnosis III" },
  "Ice Stiletto": { gnosis: "Gnosis I" },
  "Iron Cross": { gnosis: "Gnosis II" },
  "Lightning Bolt": { gnosis: "Gnosis I" },
  Miasma: { gnosis: "Gnosis V" },
  "Rotten Fiend": { gnosis: "Gnosis III" },
  Shockwave: { gnosis: "Gnosis 0" },
  "Stigma Diabolicum": { gnosis: "Gnosis I" },
  Stormball: { gnosis: "Gnosis II" },
  Twinshade: { gnosis: "Gnosis V" },
}

const rings: Record<string, ItemMetadata> = {
  "Crown of Fire": { gnosis: "Gnosis II" },
  "Dynamo Ring": { gnosis: "Gnosis III" },
  "Meteor Ring": { gnosis: "Gnosis IV" },
  "Ring of Excreta": { gnosis: "Gnosis III" },
  "Ring of Obedience": {gnosis: "Gnosis IV" },
  "Ring of Thorns": { gnosis: "Gnosis III" },
  "Ring of Wings": { gnosis: "Gnosis III" },
  "Shadowmist Ring": { gnosis: "Gnosis IV" },
  "Static Ring": {location: "Shrouded Hermitorium", acquisition: "Obtained by conquering the trial of Torment V" },
}

const relics: Record<string, ItemMetadata> = {
  "Biting Tongue": { location: "Shrouded Hermitorium", acquisition: "Obtained by conquering the trial of Torment IV" },
  "Blood of a Banshee": { gnosis: "Gnosis IV" },
  "Book of Serpents": { gnosis: "Gnosis III" },
  "Braid of a Seductress": { location: "Irongate Castle" },
  "Eye of the Madwoman": { gnosis: "Gnosis III" },
  Kirfane: { gnosis: "Gnosis I", location: "Island of the Damned Witch Vault" },
  "Painted Tooth": { gnosis: "Gnosis IV" },
  Parasite: { gnosis: "Gnosis II", location: "Velmorne" },
  Scourage: { gnosis: "Gnosis IV" },
  "Severed Ear": { gnosis: "Gnosis III" },
}

const fetishes: Record<string, ItemMetadata> = {
  Balewort: { gnosis: "Gnosis IV" },
  Belladonna: { gnosis: "Gnosis III" },
  "Bittersweet Nightshade": { gnosis: "Gnosis III" },
  Henbane: { gnosis: "Gnosis IV" },
  Mandrake: { gnosis: "Gnosis I" },
  Monkshood: { gnosis: "Gnosis V" },
  Yew: { gnosis: "Gnosis V" },
}

const beads: Record<string, ItemMetadata> = {
  "Short Range Bead": { acquisition: "Dropped by the Dimacher in Irongate Castle" },
}

const incense: Record<string, ItemMetadata> = {
  
}

export const itemMetadata: Record<string, ItemMetadata> = {
  ...firearms,
  ...spells,
  ...beads,
  ...rings,
  ...relics,
  ...fetishes,
  ...incense,
};
