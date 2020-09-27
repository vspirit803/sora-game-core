import { Battle } from '@src/Battle';
import { UUID } from '@src/Common';
import {
  EventDataAttacked,
  EventDataAttacking,
  EventDataDamaged,
  EventDataDamaging,
  EventDataKilled,
  EventDataKilling,
  EventDataSkillSelect,
  EventDataTreated,
  Listen,
  Listener,
  RemoveAllListeners,
} from '@src/Event';
import { FactionBattle } from '@src/Faction';
import { Skill } from '@src/Skill';
import { skillStore } from '@src/Skill/Skills';
import { Status } from '@src/Status';
import { TeamBattle } from '@src/Team';

import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { CharacterPropertyType } from './CharacterPropertyType';

/**
 * 角色类(战斗状态)
 */
@Listener()
export class CharacterBattle implements CharacterNormal, UUID {
  uuid: string;
  id: string;
  name: string;
  level: number;
  /**角色所处的队伍 */
  team: TeamBattle;
  /**角色所处的阵营 */
  faction: FactionBattle;
  /**角色所处的战斗 */
  battle: Battle;
  /**角色的属性(战斗模式) */
  properties: { [propName in CharacterPropertyType]: CharacterPropertyBattle };
  /**当前血量 */
  currHp: number;
  /**是否存活 */
  isAlive: boolean;
  /**是否被沉默 */
  isSilence: boolean;
  /**是否被眩晕 */
  isStunned: boolean;
  /**基本战斗事件订阅者 */
  baseBattleEventSubscribers: { [eventName: string]: any };
  /**状态数组 */
  statuses: Array<Status>;

  skills: Array<Skill>;

  constructor(character: CharacterNormal, team: TeamBattle) {
    this.id = character.id;
    this.name = character.name;
    this.level = character.level;
    this.id = character.id;
    this.uuid = character.uuid;
    this.skills = character.skills;

    this.team = team;
    this.faction = team.faction;
    this.battle = team.battle;

    const properties: { [propName in CharacterPropertyType]?: CharacterPropertyBattle } = {};
    for (const eachPropName in character.properties) {
      const eachProperty = character.properties[eachPropName as CharacterPropertyType];
      properties[eachPropName as CharacterPropertyType] = new CharacterPropertyBattle({
        character: this,
        property: eachProperty,
      });
    }
    this.properties = properties as { [propName in CharacterPropertyType]: CharacterPropertyBattle };
    this.currHp = this.properties.hp.battleValue;
    this.isAlive = true;
    this.isSilence = false;
    this.isStunned = false;
    this.baseBattleEventSubscribers = {};
    this.statuses = [];
  }

  /**是否玩家操控角色 */
  get isPlayerControl(): boolean {
    return this.faction === this.battle?.factions[0];
  }

  @Listen<EventDataAttacking>({ eventType: 'Attacking', priority: 2 })
  async onAttacking(data: EventDataAttacking) {
    const target = data.target;
    console.log(`[${this.name}]🗡️[${target.name}]`);
    await this.battle.eventCenter.trigger(this, {
      eventType: 'Attacked',
      source: this,
      target,
    });
  }

  @Listen<EventDataAttacked>({ eventType: 'Attacked', priority: 2 })
  async onAttacked(data: EventDataAttacked) {
    const attackSource: CharacterBattle = data.source;
    const target = data.target;
    const damage = Math.round(attackSource.properties.atk.battleValue) - target.properties.def.battleValue;
    const newHp = target.currHp > damage ? target.currHp - damage : 0;
    console.log(`[${target.name}]💔${damage} -> ${newHp}/${target.properties.hp.battleValue}`);
    target.currHp = newHp;
    if (target.currHp <= 0) {
      target.currHp = 0;
      await target.battle.eventCenter.trigger(target, {
        eventType: 'Killed',
        source: attackSource,
        target,
      });
    }
  }

  @Listen<EventDataDamaging>({ eventType: 'Damaging', priority: 2 })
  async onDamaging(data: EventDataDamaging) {
    const target = data.target;
    await target.battle.eventCenter.trigger(target, {
      ...data,
      eventType: 'Damaged',
    });
  }

  @Listen<EventDataDamaged>({ eventType: 'Damaged', priority: 2 })
  async onDamaged(data: EventDataDamaged) {
    const source = data.source;
    const target = data.target;
    const damage = data.damage;
    /**计算减伤和保底后的伤害 */
    const finalDamage = Math.round(
      Math.max(0.1 * source.properties.atk.battleValue, damage - target.properties.def.battleValue),
    );
    const actualDamage = Math.min(target.currHp, finalDamage); //真正造成的伤害
    const overflowDamage = finalDamage - actualDamage; //溢出伤害
    const newHp = target.currHp - actualDamage;
    console.log(`[${target.name}]💔${actualDamage} -> ${newHp}/${target.properties.hp.battleValue}`);
    data.actualDamage = actualDamage;
    data.finalDamage = finalDamage;
    data.overflowDamage = overflowDamage;
    target.currHp = newHp;
    if (target.currHp <= 0) {
      target.currHp = 0;
      target.battle.eventCenter.trigger(target, { ...data, eventType: 'Killed' });
    }
  }

  @Listen<EventDataTreated>({ eventType: 'Treated', priority: 2 })
  async onTreated(data: EventDataTreated) {
    const target = data.target;
    const damage = data.damage;
    /**计算减伤和保底后的治疗 */
    const finalDamage = Math.round(Math.max(20, damage));
    const actualDamage = Math.min(target.properties.hp.battleValue - target.currHp, finalDamage); //真正造成的治疗
    const overflowDamage = finalDamage - actualDamage; //溢出治疗
    const newHp = target.currHp + actualDamage;
    console.log(`[${target.name}]♥${actualDamage} -> ${newHp}/${target.properties.hp.battleValue}`);
    data.actualDamage = actualDamage;
    data.finalDamage = finalDamage;
    data.overflowDamage = overflowDamage;
    target.currHp = newHp;
  }

  @Listen<EventDataKilling>({ eventType: 'Killing', priority: 2 })
  async onKilling(data: EventDataKilling) {
    const target = data.target;
    console.log(`[${this.name}]🗡️☠[${target.name}]`);
  }

  @Listen<EventDataKilled>({ eventType: 'Killed', priority: 2 })
  async onKilled(data: EventDataKilled) {
    const killSource = data.source;
    console.log(`[${this.name}]☠`);
    this.isAlive = false;
    this.battle.eventCenter.trigger(killSource, { eventType: 'Killing', source: killSource, target: this });
    while (this.statuses.length) {
      const eachStatus = this.statuses.pop()!;
      eachStatus.destroy();
    }
    this.unSubscribeBaseBattleEvent();
  }

  /**移除订阅基本的战斗事件 */
  @RemoveAllListeners
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unSubscribeBaseBattleEvent(): void {}

  async action(): Promise<void> {
    console.log(`轮到${this.name}行动了`);
    const availableTargets = this.enemies.filter((eachCharacter) => eachCharacter.isAlive);
    let target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    let skill = this.skills[0];

    if (this.isPlayerControl && this.battle.fireTarget) {
      target = this.battle.fireTarget;
    }

    if (!this.battle.autoMode && this.isPlayerControl) {
      const skillSelectData: EventDataSkillSelect = {
        eventType: 'SkillSelect',
        source: this,
        selectedSkill: undefined,
        selectedTarget: undefined,
      };

      await this.battle.eventCenter.trigger(this, skillSelectData);
      const { selectedSkill, selectedTarget } = skillSelectData;
      target = selectedTarget ?? target;
      skill = selectedSkill ?? skill;
    }

    await skillStore[skill.id](skill, this, target);
    await this.battle.eventCenter.trigger(this, { eventType: 'ActionEnd', source: this });
  }

  get enemies(): Array<CharacterBattle> {
    return this.battle.characters.filter((eachCharacter) => eachCharacter.faction !== this.faction);
  }
}
