/*
 * @Author: vspirit803
 * @Date: 2020-09-25 16:55:01
 * @Description:
 * @LastEditTime: 2020-09-25 16:55:09
 * @LastEditors: vspirit803
 */
import { Battle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';

/**
 * 战斗行动序列(基类)
 */
export interface BattleActionQueueBase {
  battle: Battle;
  roundCount: number;

  getNext(): CharacterBattle;
}
