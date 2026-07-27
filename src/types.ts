export type Difficulty = "Easy" | "Moderate" | "Hard";

export type ChecklistGroup =
  | "weapons"
  | "spells"
  | "stats"
  | "gear"
  | "beads"
  | "prophecies"
  | "optional";

export interface ChecklistItem {
  id: string;
  label: string;
  group: ChecklistGroup;
  optional?: boolean;
}

export interface BuildCredit {
  name: string;
  url: string;
}

export interface Build {
  id: string;
  name: string;
  playstyle: string;
  difficulty: Difficulty;
  beginnerFriendly: boolean;
  stats?: {
    flesh: number | null;
    blood: number | null;
    mind: number | null;
    witchery: number | null;
    arsenal: number | null;
    faith: number | null;
  };
  firearms: string[];
  demonic: string[];
  melee: string[];
  lightSpell: string[];
  heavySpell: string[];
  prophecies: string[];
  incense: string[];
  rosaryBeads: string[];
  relic: string[];
  fetish: string[];
  ring: string[];
  pros?: string[];
  cons?: string[];
  notes?: string;
  version?: string;
  credit?: BuildCredit;
  checklistExtras?: ChecklistItem[];
  progressionChecklist?: ChecklistItem[];
}
