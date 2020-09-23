import { TeamNormal } from './TeamNormal';
import { TeamSave } from './TeamSave';

/**
 * 队伍中心
 */
export class TeamCenter {
  static teams: Array<TeamNormal>;

  /**载入存档 */
  static loadSave(saveData: Array<TeamSave>): void {
    TeamCenter.teams = [];
    for (const eachTeam of saveData) {
      const memberIds = eachTeam.members.map((eachMember) => ({
        id: eachMember,
      }));
      const team = new TeamNormal({ name: eachTeam.name, members: memberIds });
      TeamCenter.teams.push(team);
    }
  }

  /**生成存档 */
  static generateSave(): Array<TeamSave> {
    return TeamCenter.teams.map((eachTeam) => ({
      name: eachTeam.name,
      members: eachTeam.members.map((eachMember) => eachMember.id),
    }));
  }
}
