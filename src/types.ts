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

export interface Build {
  id: string;
  name: string;
  playstyle: string;
  difficulty: Difficulty;
  beginnerFriendly: boolean;
  statSpread: string[];
  firearms: string[];
  demonic: string[];
  melee: string[];
  lightSpell: string[];
  heavySpell: string[];
  incense: string[];
  rosaryBeads: string[];
  relic: string[];
  fetish: string[];
  ring: string[];
  pros: string[];
  cons: string[];
  notes: string;
  progressionChecklist: ChecklistItem[];
}
