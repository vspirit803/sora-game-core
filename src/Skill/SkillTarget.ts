/*
 * @Author: vspirit803
 * @Date: 2021-03-09 09:48:06
 * @Description:
 * @LastEditTime: 2021-03-10 17:15:55
 * @LastEditors: vspirit803
 */
export type SkillTargetType = number;

export const NO_TARGET = 1 << 0; //无目标
export const SELF = 1 << 1; //自身
export const TEAM_MATE = 1 << 2; //队友
export const ENEMY = 1 << 3; //敌人
export const ALIVE = 1 << 4; //存活
export const DEAD = 1 << 5; //死亡
