/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 16:20:50
 * @LastEditors: vspirit803
 */
import { EventData, EventListener, EventTypes } from '@src/Event';

import { AbstractBuffItem } from './AbstractBuffItem';
import { Buff } from './Buff';

/**
 * 事件Buff
 * 在特定时机触发事件
 */
export class EventBuffItem extends AbstractBuffItem {
  /**冷却时间 */
  cooldown: number;
  /**当前冷却时间 */
  currCooldown: number;
  /**事件订阅者 */
  listener: EventListener;
  /**触发事件 */
  eventType: EventTypes;
  /**触发事件的回调函数 */
  callback: (data: EventData) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
  constructor(
    buff: Buff,
    {
      cooldown = 0,
      currCooldown = 0,
      eventType,
      callback,
    }: {
      cooldown?: number;
      currCooldown?: number;
      // subscriber?: Subscriber;
      eventType: EventTypes;
      callback: (data: EventData) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  ) {
    super(buff);
    this.cooldown = cooldown;
    this.currCooldown = currCooldown;
    this.eventType = eventType;
    this.callback = callback;

    this.listener = this.buff.source.battle.eventCenter.listen({
      eventType,
      callback,
      filter: this.buff.target,
    });
  }

  destroy(): void {
    this.buff.source.battle.eventCenter.cancelListen(this.listener);
  }
}
