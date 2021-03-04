/*
 * @Author: vspirit803
 * @Date: 2021-03-04 15:29:36
 * @Description:
 * @LastEditTime: 2021-03-04 16:19:03
 * @LastEditors: vspirit803
 */
/*
 * @Author: vspirit803
 * @Date: 2021-02-22 15:24:27
 * @Description:
 * @LastEditTime: 2021-03-04 15:33:58
 * @LastEditors: vspirit803
 */
import { AbstractBuffItem } from './AbstractBuffItem';
import { Buff } from './Buff';

/**
 * 状态Buff
 * 给角色赋予部分状态,如眩晕,沉默等
 */
export class StatusBuffItem extends AbstractBuffItem {
  // constructor(status: Status) {
  //   super(status);
  // }

  /**buff的取消 */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy(): void {}
}
