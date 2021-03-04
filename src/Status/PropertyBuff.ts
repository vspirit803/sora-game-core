/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 10:45:00
 * @LastEditors: vspirit803
 */
import { CharacterPropertyType } from '@src/Character/CharacterPropertyType';

import { Buff } from './Buff';
import { Status } from './Status';

/**
 * Buff - 属性Buff
 */
export class PropertyBuff extends Buff {
  /**属性名称 */
  name: CharacterPropertyType;
  /**属性百分比加成 */
  percent: number;
  /**属性固定值加成 */
  value: number;
  constructor(
    status: Status,
    { name, percent = 0, value = 0 }: { name: CharacterPropertyType; percent?: number; value?: number },
  ) {
    super(status);
    this.name = name;
    this.percent = percent;
    this.value = value;
    this.init();
  }

  /**buff初始化 */
  init(): void {
    this.status.source.properties[this.name].extraPercent += this.percent;
    this.status.source.properties[this.name].extraValue += this.value;
  }

  /**buff的取消 */
  destroy(): void {
    this.status.source.properties[this.name].extraPercent -= this.percent;
    this.status.source.properties[this.name].extraValue -= this.value;
  }
}
