/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 16:17:56
 * @LastEditors: vspirit803
 */
import { CharacterPropertyType } from '@src/Character/CharacterPropertyType';

import { AbstractBuffItem } from './AbstractBuffItem';
import { Buff } from './Buff';

/**
 * 属性Buff
 * 给角色的数值属性进行增减
 */
export class PropertyBuffItem extends AbstractBuffItem {
  /**属性名称 */
  name: CharacterPropertyType;
  /**属性百分比加成 */
  percent: number;
  /**属性固定值加成 */
  value: number;
  constructor(buff: Buff, { name, percent, value }: { name: CharacterPropertyType; percent: number; value: number }) {
    super(buff);
    this.name = name;
    this.percent = percent;
    this.value = value;

    this.buff.source.properties[this.name].extraPercent += this.percent;
    this.buff.source.properties[this.name].extraValue += this.value;
  }

  /**buff的取消 */
  destroy(): void {
    this.buff.source.properties[this.name].extraPercent -= this.percent;
    this.buff.source.properties[this.name].extraValue -= this.value;
  }
}
