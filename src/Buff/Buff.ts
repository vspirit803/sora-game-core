/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 16:19:50
 * @LastEditors: vspirit803
 */
import { CharacterBattle } from '@src/Character';

import { AbstractBuffItem } from './AbstractBuffItem';

/**能否驱散 */
type Dispellable =
  | 'NEVER' //无法驱散
  | 'DEATH_DISPEL' //死亡驱散
  | 'STRONG_DISPEL' //强驱散
  | 'BASIC_DISPEL'; //基础驱散

/**
 * 状态
 */
export class Buff {
  /**状态的来源角色 */
  source: CharacterBattle;
  /**状态的目标角色 */
  target: CharacterBattle;
  /**持续时间 */
  duration: number | 'forever';
  /**可驱散性 */
  dispellable: Dispellable;
  /**子Buff数组 */
  buffItems: Array<AbstractBuffItem>;
  constructor({
    source,
    target,
    duration = 'forever',
    dispellable = 'DEATH_DISPEL',
    buffs = [],
  }: {
    source: CharacterBattle;
    target: CharacterBattle;
    duration?: number | 'forever';
    dispellable?: Dispellable;
    buffs?: Array<AbstractBuffItem>;
  }) {
    this.source = source;
    this.target = target;
    this.duration = duration;
    this.dispellable = dispellable;
    this.buffItems = buffs;
  }

  addBuffs(...buffs: Array<AbstractBuffItem>): void {
    this.buffItems.push(...buffs);
  }

  destroy(): void {
    this.buffItems.forEach((eachBuff) => eachBuff.destroy());
  }

  afterRound(): void {
    if (this.duration !== 'forever') {
      this.duration--;
      if (this.duration === 0) {
        // todo
        // buff到期
      }
    }
  }
}
