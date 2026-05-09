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
  weapons: string[];
  spells: string[];
  incenseBeadsRelicsItems: string[];
  pros: string[];
  cons: string[];
  notes: string;
  progressionChecklist: ChecklistItem[];
}
