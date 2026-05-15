export interface ItemMetadata {
  gnosis?: string;
  location?: string;
  acquisition?: string;
  imageURL?: string;
}

const firearms: Record<string, ItemMetadata> = {
  "All-Seeing Eye": { gnosis: "Gnosis III" },
  Angelus: { gnosis: "Gnosis 0" },
  Basilisk: { gnosis: "Gnosis II"},
  Cricket: { gnosis: "Gnosis III" },
  Duelist: { gnosis: "Gnosis II" },
  Echo: { gnosis: "Gnosis 0" },
  "Falling Star": { gnosis: "Gnosis II" },
  Fatum: { 
    location: "Location: Apothecary - Shrouded Hermitorium", 
    acquisition: "Acquisition: Unseal 3 Irongate Castle Latent Orbs"
  },
  Frostbite: { gnosis: "Gnosis II" },
  Hailstorm: { gnosis: "Gnosis I" },
  Hangfire: { gnosis: "Gnosis I" },
  Hunger: { gnosis: "Gnosis 0" },
  Hypnosis: { gnosis: "Gnosis I" },
  Judgement: {
    location: "Location: Sanctuary - Shrouded Hermitorium",
    acquisition: "Complete the Witch Mountain labyrinth, then check the overturned bench"
  },
  Koschei: {
    gnosis: "Gnosis II",
    location: "Workshop Mirror — Shrouded Hermitorium",
    acquisition: "Pick up the Pile of Bones to begin the quest",
  },
  Martyr: {
    gnosis: "Gnosis III",
    location: "Final Room — Velmorne Witch Vault",
    acquisition: "Requires 15,000 Witchfire; found on the altar near reward chests",
  },
  Midas: { gnosis: "Gnosis III" },
  Nemesis: { gnosis: "Gnosis III" },
  Oracle: {
    location: "Depths of Velmorne — behind the small waterfall",
    acquisition: "Follow the large waterfall downward north of the Square of Echoes fountain",
  },
  Psychopomp: { gnosis: "Gnosis I" },
  Ricochet: { gnosis: "Gnosis II" },
  Rotweaver: {
    location: "Dining Area — The Wailing Tower, Island of the Damned",
    acquisition: "Found lying on the Prophet's altar",
  },
  Striga: {
    gnosis: "Gnosis II",
    location: "Gnosis Chamber — Sanctuary Cellar, Shrouded Hermitorium",
    acquisition: "Dispel the upper-floor Mirage with 2,500 White Volatile Witchfire; Early Access only",
  },
  Tribunal: {location: "Location: Shrouded Hermitorium", acquisition: "Acquisition: Conquer the trial of Torment VI" },
  Vulture: { gnosis: "Gnosis II" },
  Whisper: { gnosis: "Gnosis II" },
}

const spells: Record<string, ItemMetadata> = {
  "Blight Cyst": { gnosis: "Gnosis I" },
  "Burning Stake": { 
    gnosis: "Gnosis III", 
    location: "Location: Irongate Castle"
   },
  Cornucopia: { gnosis: "Gnosis III" },
  "Cursed Bell": { gnosis: "Gnosis II" },
  Fireballs: { gnosis: "Gnosis 0" },
  Firebreath: { location: "Location: Island of the Damned"},
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

const prophecies: Record<string, ItemMetadata> = {
  "Prophecy of Air Element": { 
    location: "Location: Astral Rift - The Wailing Tower, Island of the Damned", 
    acquisition: "Acquisition: Found within the Madman's Dream" 
  },
  "Prophecy of Dead Eyes": { 
    location: "Location: Dining Area - The Wailing Tower, Island of the Damned", 
    acquisition: "Acquisition: Trade 300 Divine Essence at the altar"
  },
  "Prophecy of Destruction": {
    location: "Location: Dining Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Trade 330 Divine Essence at the altar"
  },
  "Prophecy of Earth Element": {
    location: "Location: Astral Rift - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found within the Madman's Dream"
  },
  "Prophecy of Fire Element": {
    location: "Location: Astral Rift - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found within the Madman's Dream"
  },
  "Prophecy of Firearms": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquisition: Prophecy Study"
  },
  "Prophecy of Gunpowder": {
    location: "Location: Containment Floor - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found on northeast bench"
  },
  "Prophecy of Health": {
    location: "Location: Scholars' Cells - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found in northwest room on top of wooden box"
  },
  "Prophecy of Heaviness": {
    location: "Location: Dining Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Trade 150 Divine Essence at the altar"
  },
  "Prophecy of Lightness": {
    location: "Location: Astral Rift - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found within the Madman's Dream"
  },
  "Prophecy of Nimble Fingers": {
    location: "Location: Containment Floor - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found on wooden box in the northwest"
  },
  "Prophecy of Spells": {
    location: "Location: Tower Entry Chamber - Island of the Damned",
    acquisition: "Acquisition: Found next to a hole in the ground"
  },
  "Prophecy of Stamina": {
    location: "Location: Scholars' Cells - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found on ledge in the south tunnel"
  },
  "Prophecy of the Bull": {
    location: "Location: Dining Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Trade 200 Divine Essence at the altar"
  },
  "Prophecy of the Serpent": {
    location: "Location: Dining Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Trade 250 Divine Essence at the altar"
  },
  "Prophecy of Variety": {
    location: "Location: Intake Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found on broken support bridge"
  },
  "Prophecy of Water Element": {
    location: "Location: Astral Rift - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found within the Madman's Dream"
  },
  "Prophecy of Witchfire": {
    location: "Location: Intake Area - The Wailing Tower, Island of the Damned",
    acquisition: "Acquisition: Found in front of wooden door"
  },
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
  "Static Ring": {
    location: "Location: Shrouded Hermitorium", 
    acquisition: "Acquisition: Conquer the trial of Torment V" 
  },
}

const relics: Record<string, ItemMetadata> = {
  "Biting Tongue": { 
    location: "Location: Shrouded Hermitorium", 
    acquisition: "Acquistion: Conquer the trial of Torment IV" 
  },
  "Blood of a Banshee": { gnosis: "Gnosis IV" },
  "Book of Serpents": { gnosis: "Gnosis III" },
  "Braid of a Seductress": { location: "Location: Irongate Castle" },
  "Eye of the Madwoman": { gnosis: "Gnosis III" },
  Kirfane: { 
    gnosis: "Gnosis I", 
    location: "Location: Island of the Damned Witch Vault" 
  },
  "Painted Tooth": { gnosis: "Gnosis IV" },
  Parasite: { 
    gnosis: "Gnosis II", 
    location: "Location: Velmorne" 
  },
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
  "Short Range Bead": { 
    location:"Location: Irongate Castle", 
    acquisition: "Acquisition: Dropped by the Dimacher" 
  },
}

const incense: Record<string, ItemMetadata> = {

}

export const itemMetadata: Record<string, ItemMetadata> = {
  ...firearms,
  ...spells,
  ...prophecies,
  ...rings,
  ...relics,
  ...fetishes,
  ...beads,
  ...incense,
};
