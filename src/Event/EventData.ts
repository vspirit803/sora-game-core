import { Battle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';
import { SkillBattle } from '@src/Skill';

import { EventTypes } from './EventTypes';

export interface EventData {
  eventType: EventTypes;
  [propName: string]: unknown;
}
export interface EventDataBattleStart extends EventData {
  eventType: 'BattleStart';
  battle: Battle;
}

export interface EventDataRoundStart extends EventData {
  eventType: 'RoundStart';
  battle: Battle;
  round: number;
}

export interface EventDataActionStart extends EventData {
  eventType: 'ActionStart';
  source: CharacterBattle;
}

export interface EventDataSkillSelect extends EventData {
  eventType: 'SkillSelect';
  source: CharacterBattle;
  selectedSkill?: SkillBattle;
  selectedTarget?: CharacterBattle;
}

export interface EventDataSpelling extends EventData {
  eventType: 'Spelling';
  source: CharacterBattle;
  target: CharacterBattle;
}

export interface EventDataAttacking extends EventData {
  eventType: 'Attacking';
  source: CharacterBattle;
  target: CharacterBattle;
}

export interface EventDataAttacked extends EventData {
  eventType: 'Attacked';
  source: CharacterBattle;
  target: CharacterBattle;
}

export interface EventDataDamaging extends EventData {
  eventType: 'Damaging';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
  finalDamage?: number;
  actualDamage?: number;
  overflowDamage?: number;
  isCrit: boolean;
}

export interface EventDataDamaged extends EventData {
  eventType: 'Damaged';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
  finalDamage?: number;
  actualDamage?: number;
  overflowDamage?: number;
  isCrit: boolean;
}

/**治疗 */
export interface EventDataTreating extends EventData {
  eventType: 'Treating';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
  finalDamage?: number;
  actualDamage?: number;
  overflowDamage?: number;
  isCrit: boolean;
}

/**受到治疗 */
export interface EventDataTreated extends EventData {
  eventType: 'Treated';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
  finalDamage?: number;
  actualDamage?: number;
  overflowDamage?: number;
  isCrit: boolean;
}

export interface EventDataKilling extends EventData {
  eventType: 'Killing';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
}

export interface EventDataKilled extends EventData {
  eventType: 'Killed';
  source: CharacterBattle;
  target: CharacterBattle;
  damage: number;
}

export interface EventDataActionEnd extends EventData {
  eventType: 'ActionEnd';
  source: CharacterBattle;
}

export interface EventDataRoundEnd extends EventData {
  eventType: 'RoundEnd';
  battle: Battle;
  round: number;
}

export interface EventDataBattleSuccess extends EventData {
  eventType: 'BattleSuccess';
  battle: Battle;
  round: number;
  killed: Array<CharacterBattle>;
}
