/*
 * @Author: vspirit803
 * @Date: 2020-09-27 10:36:03
 * @Description:
 * @LastEditTime: 2020-10-23 14:05:49
 * @LastEditors: vspirit803
 */
import 'reflect-metadata';

import { CharacterBattle } from '@src/Character';
import { EventDataDamaging } from '@src/Event';

import { SkillData } from './SkillData';

function DefineSkill(key: any): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(key, descriptor.value!, target);
    return;
  };
}

export class SkillStore {
  static instence: SkillStore;
  static getInstence(): SkillStore {
    if (!SkillStore.instence) {
      SkillStore.instence = new SkillStore();
    }
    return SkillStore.instence;
  }

  getHandler(id: string): (skillData: SkillData, source: CharacterBattle, target: CharacterBattle) => Promise<void> {
    const handler = Reflect.getMetadata(id, this);
    if (typeof handler !== 'function') {
      throw new Error(`技能[${id}]的处理函数不存在`);
    }
    return handler;
  }

  @DefineSkill('S00000')
  async skill00000(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const ratio = skillData.ratio;
    const isCrit = Math.random() < source.properties.critRate.battleValue;
    const damage = Math.round(
      source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
    );
    await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
  }

  @DefineSkill('S00001')
  async skill00001(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const ratio = skillData.ratio;
    const isCrit = Math.random() < source.properties.critRate.battleValue;
    const damage = Math.round(
      source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
    );
    await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
  }

  //地狱之手 茨木大招
  @DefineSkill('S00003')
  async skill00003(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const ratio = skillData.ratio;
    const isCrit = Math.random() < source.properties.critRate.battleValue;
    const damage = Math.round(
      source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
    );
    await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
  }

  //窒碍短匕
  @DefineSkill('S00004')
  async skill00004(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const ratio = skillData.ratio;
    const isCrit = Math.random() < source.properties.critRate.battleValue;
    const damage = Math.round(
      source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
    );
    await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
  }

  //幻影突袭
  @DefineSkill('S00005')
  async skill00005(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const { ratio, times } = skillData;
    for (let i = 0; i < times; i++) {
      const isCrit = Math.random() < source.properties.critRate.battleValue;
      const damage = Math.round(
        source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
      );
      await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
    }
  }

  //恩赐解脱
  @DefineSkill('S00007')
  async skill00007(skillData: SkillData, source: CharacterBattle, target: CharacterBattle) {
    const battle = source.battle;
    const ratio = skillData.ratio;
    const isCrit = Math.random() < source.properties.critRate.battleValue;
    const damage = Math.round(
      source.properties.atk.battleValue * (isCrit ? source.properties.critMultiplier.battleValue : 1) * ratio,
    );
    await battle.eventCenter.trigger(source, { eventType: 'Damaging', source, target, damage, isCrit });
  }
}
