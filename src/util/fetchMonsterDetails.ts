import type { Stub } from "./sreTypes";

interface ArmorClass {
  desc?: string;
  type: string;
  value: number;
}

interface Speed {
  burrow?: string;
  climb?: string;
  fly?: string;
  hover?: boolean;
  swim?: string;
  walk?: string;
}

interface Senses {
  blindsight?: string;
  darkvision?: string;
  passive_perception: number;
  tremorsense?: string;
  truesight?: string;
}

interface Damage {
  damage_dice: string;
  damage_type: Stub;
}

interface Action {
  actions: Action[];
  attack_bonus?: number;
  damage?: Damage[];
  desc: string;
  name: string;
}

interface Proficiency {
  proficiency: Stub;
  value: number;
}

interface Usage {
  type: string;
  times?: number;
  rest_types?: string[];
}

interface SpellcastingSpell {
  name: string;
  level: number;
  url: string;
  usage: Usage;
}

interface Spellcasting {
  ability: Stub;
  dc: number;
  components_required: string[];
  spells: SpellcastingSpell[];
}

interface Dc {
  dc_type: Stub;
  dc_value: number;
  success_type: string;
}

interface SpecialAbility {
  dc?: Dc;
  desc: string;
  name: string;
  usage?: Usage;
  damage: Damage[];
  spellcasting?: Spellcasting;
}

export interface MonsterDetails extends Stub {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  actions: Action[];
  legendary_actions: Action[];
  reactions: Action[];

  alignment: string;
  armor_class: ArmorClass[];
  challenge_rating: number;
  condition_immunities: Stub[];
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
  forms: unknown[];
  hit_dice: string;
  hit_points: number;
  hit_points_roll: string;
  image: string;
  languages: string;
  proficiencies: Proficiency[];
  proficiency_bonus: number;
  senses: Senses;
  size: string;
  special_abilities: SpecialAbility[];
  speed: Speed;
  type: string;
  updated_at: string;
  xp: number;
}

export async function fetchMonsterDetails(index: string): Promise<MonsterDetails | string> {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`);
    
    if (!response.ok) {
      return `Failed to fetch monster from SRE API: ${response.statusText}`;
    }
    
    return response.json();
  } catch (e) {
    return `Unknown error occurred fetching monster ${index}: ${e instanceof Error && e.message ? `: ${e.message}` : ''}`;
  }
}
