/*
 * @Author: vspirit803
 * @Date: 2020-09-24 08:41:10
 * @LastEditTime: 2020-09-24 14:55:52
 * @LastEditors: vspirit803
 * @Description:
 */

// import { BattleCenter } from '@src/Battle';
import packageJson from '@src/../package.json';
import { CharacterCenter } from '@src/Character';
import { ItemCenter } from '@src/Item';
// import { MapCenter } from '@src/Map';
// import { SkillFactory } from '@src/Skill';
// import { TaskCenter } from '@src/Task';
import { TeamCenter } from '@src/Team';

import { GameSave } from './GameSave';

/**
 * 游戏的实例
 */
export class Game {
  static instence: Game;
  static getInstence(): Game {
    if (!Game.instence) {
      Game.instence = new Game();
    }
    return Game.instence;
  }

  /**角色中心 */
  characterCenter: CharacterCenter;
  // /**任务中心  */
  // taskCenter: TaskCenter;
  /**背包 */
  backpack: ItemCenter;
  // /**战斗中心 */
  // battleCenter: BattleCenter;
  // /**地图中心 */
  // mapCenter: MapCenter;
  /**队伍中心 */
  teamCenter: TeamCenter;

  private constructor() {
    this.characterCenter = CharacterCenter.getInstence();
    this.teamCenter = TeamCenter.getInstence();
    this.backpack = ItemCenter.getInstence();
  }

  /**
   * 载入存档
   * @param gameSave 存档数据
   */
  loadSave(gameSave: GameSave): void {
    this.characterCenter.loadSave(gameSave.characters);
    this.backpack.loadSave(gameSave.backpack);
    // Game.mapCenter.loadSave(gameSave.maps);
    this.teamCenter.loadSave(gameSave.teams);
  }

  generateSave(): GameSave {
    return {
      version: packageJson.version,
      characters: this.characterCenter.generateSave(),
      backpack: this.backpack.generateSave(),
      // maps: Game.mapCenter.generateSave(),
      teams: this.teamCenter.generateSave(),
    };
  }
}
