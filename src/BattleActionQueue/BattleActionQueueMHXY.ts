/*
 * @Author: vspirit803
 * @Date: 2020-09-25 16:55:01
 * @Description:
 * @LastEditTime: 2020-09-25 16:56:58
 * @LastEditors: vspirit803
 */
import { Battle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';

import { BattleActionQueueBase } from './BattleActionQueueBase';

/**
 * 战斗行动序列(梦幻西游型,每个回合所有角色按速度快慢依次行动)
 */
export class BattleActionQueueMHXY implements BattleActionQueueBase {
  battle: Battle;
  roundCount: number;
  private actionQueue: Array<CharacterBattle>;

  constructor(battle: Battle) {
    this.battle = battle;
    this.actionQueue = new Array<CharacterBattle>(0);
    this.roundCount = 0;
  }

  getNext(): CharacterBattle {
    let nextCharacter: CharacterBattle;
    do {
      if (this.actionQueue.length === 0) {
        //该回合已行动完毕,应该开始下一个回合
        if (this.roundCount) {
          this.battle.eventCenter.trigger(this.battle, { eventType: 'RoundEnd', roundCount: this.roundCount });
        }

        this.actionQueue.push(
          ...this.battle.characters
            .filter((eachCharacter) => {
              return eachCharacter.isAlive;
            })
            .sort((a, b) => {
              //速度从大到小排序
              return b.properties.speed.battleValue - a.properties.speed.battleValue;
            }),
        );
        //回合开始
        this.battle.eventCenter.trigger(this.battle, {
          eventType: 'RoundStart',
          roundCount: this.roundCount,
        });
        this.roundCount++;
      }
      nextCharacter = this.actionQueue.shift()!;
    } while (!nextCharacter.isAlive);
    return nextCharacter;
  }
}
