/*
 * @Author: vspirit803
 * @Date: 2020-09-24 08:41:10
 * @LastEditTime: 2020-09-24 09:30:36
 * @LastEditors: vspirit803
 * @Description: 队伍中心 单例模式
 */
import { SaveInterface } from '@src/Game';

import { TeamNormal } from './TeamNormal';
import { TeamSave } from './TeamSave';

/**
 * 队伍中心
 */
export class TeamCenter implements SaveInterface<Array<TeamSave>> {
  static instence: TeamCenter;
  static getInstence(): TeamCenter {
    if (!TeamCenter.instence) {
      TeamCenter.instence = new TeamCenter();
    }
    return TeamCenter.instence;
  }

  teams: Array<TeamNormal>;

  private constructor() {
    this.teams = [];
  }

  /**载入存档 */
  loadSave(saveData: Array<TeamSave>): void {
    this.teams = [];
    for (const eachTeam of saveData) {
      const memberIds = eachTeam.members.map((eachMember) => ({
        id: eachMember,
      }));
      const team = new TeamNormal({ name: eachTeam.name, members: memberIds });
      this.teams.push(team);
    }
  }

  /**生成存档 */
  generateSave(): Array<TeamSave> {
    return this.teams.map((eachTeam) => ({
      name: eachTeam.name,
      members: eachTeam.members.map((eachMember) => eachMember.id),
    }));
  }
}
