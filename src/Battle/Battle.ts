/*
 * @Author: vspirit803
 * @Date: 2020-09-25 10:40:51
 * @Description:
 * @LastEditTime: 2020-09-29 11:28:29
 * @LastEditors: vspirit803
 */
import { BattleActionQueueBase, BattleActionQueueMHXY } from '@src/BattleActionQueue';
import { CharacterBattle } from '@src/Character';
import { UUID } from '@src/Common';
import { Condition } from '@src/Condition';
import { EventCenter } from '@src/Event';
import { FactionBattle } from '@src/Faction';
import { TeamBattle, TeamNormal } from '@src/Team';
import { ObjectId } from 'bson';

import { BattleConfiguration } from './BattleConfiguration';

/**
 * 战斗(战斗状态)
 */
export class Battle implements UUID {
  uuid: string;
  name: string;
  /**
   * 阵营,每个阵营都是互为敌人
   * 玩家所在的队伍固定为factions[0]的teams[0]
   */
  factions: Array<FactionBattle>;
  eventCenter: EventCenter;
  successCondition: Condition;
  battleActionQueue: BattleActionQueueBase;

  endFlag: boolean;

  /**
   * 自动模式
   */
  autoMode: boolean;
  /**集火目标 */
  fireTarget?: CharacterBattle;

  setFireTarget(fireTarget: CharacterBattle): void {
    this.fireTarget = fireTarget;
  }

  constructor(battleConfiguration: BattleConfiguration, playerTeam: TeamNormal, successCondition?: Condition) {
    this.uuid = new ObjectId().toHexString();
    this.name = battleConfiguration.name ?? '未留下名字的战斗';
    this.eventCenter = new EventCenter();
    this.successCondition = successCondition ?? new Condition();
    this.autoMode = false;
    this.endFlag = false;
    this.factions = battleConfiguration.factions.map(
      (eachFactionConfiguration) => new FactionBattle(eachFactionConfiguration, this),
    );
    this.factions[0].setPlayerTeam(new TeamBattle(playerTeam, this.factions[0]));
    this.battleActionQueue = new BattleActionQueueMHXY(this);
  }

  get characters(): Array<CharacterBattle> {
    return this.factions
      .map((eachFaction) => {
        return eachFaction.characters;
      })
      .reduce((prev, curr) => {
        return [...prev, ...curr];
      }, []);
  }

  async start(): Promise<void> {
    await this.eventCenter.trigger(this, { eventType: 'BattleStart' });

    while (!this.endFlag) {
      const character = this.battleActionQueue.getNext();
      this.eventCenter.trigger(character, { eventType: 'ActionStart', source: character });

      await character.action();

      if (this.successCondition.isCompleted) {
        await this.eventCenter.trigger(this, {
          eventType: 'BattleSuccess',
          battle: this,
          round: this.battleActionQueue.roundCount,
          killed: this.characters
            .filter((eachCharacter) => eachCharacter.faction !== this.factions[0])
            .filter((eachCharacter) => !eachCharacter.isAlive),
        });
        break;
      }

      if (!this.factions[0].isAlive) {
        //所有友军死亡
        console.log('输了');
        break;
      }
    }
    this.cancelAllListeners();
  }

  end() {
    this.endFlag = true;
  }

  cancelAllListeners() {
    this.characters.forEach((each) => each.unSubscribeBaseBattleEvent());
    this.eventCenter.listeners.forEach((eachListener) => this.eventCenter.cancelListen(eachListener));
  }
}
