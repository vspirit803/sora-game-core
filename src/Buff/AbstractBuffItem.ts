/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 16:20:40
 * @LastEditors: vspirit803
 */
import { Buff } from './Buff';

/**Buff的抽象基类 */
export abstract class AbstractBuffItem {
  buff: Buff;
  constructor(buff: Buff) {
    this.buff = buff;
  }

  abstract destroy(): void;
}
