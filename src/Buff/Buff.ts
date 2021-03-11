/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-11 13:54:53
 * @LastEditors: vspirit803
 */
import { CharacterBattle } from '@src/Character';
import { EventData, EventListener } from '@src/Event';
import { ObjectId } from 'bson';

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
  uuid: string;
  /**buff名称 */
  name: string;
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

  roundCounter: EventListener<EventData>;

  constructor({
    name = '无名buff',
    source,
    target,
    duration = 'forever',
    dispellable = 'DEATH_DISPEL',
    buffs = [],
  }: {
    name?: string;
    source: CharacterBattle;
    target: CharacterBattle;
    duration?: number | 'forever';
    dispellable?: Dispellable;
    buffs?: Array<AbstractBuffItem>;
  }) {
    this.uuid = new ObjectId().toHexString();
    this.name = name;
    this.source = source;
    this.target = target;
    this.duration = duration;
    this.dispellable = dispellable;
    this.buffItems = buffs;

    this.roundCounter = target.battle.eventCenter.listen({
      eventType: 'ActionEnd',
      callback: async () => this.afterRound(),
      filter: target,
      priority: 1,
    });
  }

  addBuffs(...buffs: Array<AbstractBuffItem>): void {
    this.buffItems.push(...buffs);
  }

  destroy(): void {
    this.buffItems.forEach((eachBuff) => eachBuff.destroy());
    this.target.battle.eventCenter.cancelListen(this.roundCounter);
    this.target.buffs = this.target.buffs.filter((each) => each !== this);
  }

  afterRound(): void {
    if (this.duration !== 'forever') {
      this.duration--;
      if (this.duration === 0) {
        // todo
        // buff到期
        this.destroy();
      }
    }
  }
}
