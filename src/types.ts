export type Difficulty = "Easy" | "Moderate" | "Hard";

export type ChecklistGroup =
  | "weapons"
  | "spells"
  | "stats"
  | "gear"
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
    flesh: number;
    blood: number;
    mind: number;
    witchery: number;
    arsenal: number;
    faith: number;
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
  notes: string;
  credit?: BuildCredit;
  progressionChecklist: ChecklistItem[];
}
