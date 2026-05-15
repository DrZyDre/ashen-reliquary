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
  Tribunal: {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquisition: Conquer the trial of Torment VI" 
  },
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
  "Acute Ailment Bead": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Unseal 3 Velmorne Latent Orbs",
  },
  "Adrenaline Bead": {
    location: "Location: Profane Study - Shrouded Hermitorium",
    acquisition: "Acquistion: Conquer the trial of Torment III",
  },
  "Ailment Immunity Bead": {
    location: "Location: Widow's Lair - Velmorne",
    acquisition: "Acquistion: Dropped by the Widow",
  },
  "Aliment Power Bead I": {
    location: "Location: Shipwreck - Island of the Damned",
    acquisition: "Acquistion: Found in cave",
  },
  "Ammo Preservation Bead": {
    location: "Location: Barren Cliff - Outskirts",
    acquisition: "Acquistion: Dropped by the Holy Sister",
  },
  "Ammo Reserves Bead I": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Found on top of Rosary Desk",
  },
  "Blessed Aim Bead I": {
    location: "Location: Endless Rift - Scarlet Coast",
    acquisition: "Acquistion: Jump down rift, found in a cave",
  },
  "Blessed Fire Bead": {
    location: "Location: Witch Vault - Velmorne",
    acquisition: "Acquistion: Found in chest in final chamber",
  },
  "Blessed Hits Bead": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Brawler Bead": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Unseal the first Latent Orb of Island of the Damned",
  },
  "Crystal Spell Bead": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Unseal the first Latent Orb of Scarlet Coast",
  },
  "Dash Range Bead": {
    location: "Location: Velmorne",
    acquisition: "Acquistion: Found atop the broken tower",
  },
  "Demonic Ammo Bead": {
    location: "Location: Marketplace - Irongate Castle",
    acquisition: "Acquistion: Found on a market stand, inside wooden box",
  },
  "Divine Intervention Bead I": {
    location: "Location: Town Square - Irongate Castle",
    acquisition: "Acquistion: Found next to the gallows",
  },
  "Elemental Duration Bead I": {
    location: "Location: Scarlet Coast",
    acquisition: "Acquistion: Dropped by the Drowned Captain",
  },
  "Elixir Bead I": {
    location: "Location: Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Dropped by the Warden of the Dead",
  },
  "Elixir Bead II": {
    location: "Location: Edge of the Abyss - Witch Mountain",
    acquisition: "Acquistion: Found in second rising green gate, in a basket on a rope",
  },
  "Free Arcana Bead": {
    location: "Location: Witch Vault - Island of the Damned",
    acquisition: "Acquistion: Found in chest in the final chamber",
  },
  "Healing Bead I": {
    location: "Location: Outer Circle - Island of the Damned",
    acquisition: "Acquistion: Found on the south side",
  },
  "Health Bead I": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Found on top of Rosary Desk",
  },
  "Health Bead II": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Immune Dash Bead": {
    location: "Location: Shrouded Hermitorium",
    acquisition: "Acquistion: Unseal 2 Irongate Castle Latent Orbs",
  },
  "Incense Bead I": {
    location: "Location: Edge of the Abyss - Witch Mountain",
    acquisition: "Acquistion: Found behind the first rising green gate on a corpse",
  },
  "Light Spell Charge Bead": {
    location: "Location: Witch Vault - Scarlet Coast",
    acquisition: "Acquistion: Found in chest at the end",
  },
  "Long Range Bead": {
    location: "Location: Thieve's Hollow - Velmorne",
    acquisition: "Acquistion: Found on a wooden plank extending from a destroyed tower",
  },
  "Madness Bead I": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Melee Charge Bead": {
    location: "Location: Witch Vault - Irongate Castle",
    acquisition: "Acquistion: Found in a chest in the final vault",
  },
  "Melee Recharge Bead I": {
    location: "Location: Testing Ground - Shrouded Hermitorium",
    acquisition: "Acquistion: Found in the passageway beneath the destroyed building",
  },
  "Metanoia Bead I": {
    location: "Location: Velmorne",
    acquisition: "Acquistion: Dropped by the Sepulcher",
  },
  "Providence Bead I": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Quickdraw Bead": {
    location: "Location: Profane Study - Shrouded Hermitorium",
    acquisition: "Acquistion: Conquer the trial of Torment I",
  },
  "Resistance Bead": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Short Range Bead": { 
    location:"Location: Irongate Castle", 
    acquisition: "Acquisition: Dropped by the Dimacher" 
  },
  "Spell Recharge Bead I": {
    location: "Location: East of Shipwreck Beach - Scarlet Coast",
    acquisition: "Acquistion: Found on top a cliff tower",
  },
  "Sprint Bead": {
    location: "Location: Waterfall Bridge / Mechant's Gate - Irongate Castle",
    acquisition: "Acquistion: Found inside cave between both areas",
  },
  "Stamina Bead I": {
    location: "Location: Shattered Land / Docking Piers - Island of the Damned",
    acquisition: "Acquistion: Found atop collapsed tower between both areas",
  },
  "Stamina Sigil Bead": {
    location: "Location: Island of the Damned / Scarlet Coast / Velmorne / Irongate Castle",
    acquisition: "Acquistion: Found in locked Supply Chests",
  },
  "Traps Bead": {
    location: "Location: The Tangles - Velmorne",
    acquisition: "Acquistion: Found on a rooftop",
  },
  "Triple Reward Bead": {
    location: "Location: Island of the Damned",
    acquisition: "Acquistion: Dropped by Bonsaire, The Illuminated",
  },
  "Vigor Bead I": {
    location: "Location: Irongate Castle",
    acquisition: "Acquistion: Dropped by Fallen Liberator",
  },
  "Weapon Range Bead I": {
    location: "Location: Shipwreck Beach - Scarlet Coast",
    acquisition: "Acquistion: Found next to pier, inside rowboat",
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
