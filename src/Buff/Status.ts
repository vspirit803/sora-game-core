/*
 * @Author: vspirit803
 * @Date: 2021-03-04 17:13:51
 * @Description: 状态定义
 * @LastEditTime: 2021-03-04 17:25:17
 * @LastEditors: vspirit803
 */

export type Status = number;

export const STUNNED = 1 << 0; //眩晕
export const SILENCE = 1 << 1; //沉默
export const SLEEP = 1 << 2; //睡眠
export const INVISIBILITY = 1 << 3; //隐身
