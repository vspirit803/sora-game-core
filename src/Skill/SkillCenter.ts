/*
 * @Author: vspirit803
 * @Date: 2020-09-27 10:17:29
 * @Description: 技能中心 单例模式
 * @LastEditTime: 2020-09-27 10:47:40
 * @LastEditors: vspirit803
 */
import { SkillConfiguration } from './SkillConfiguration';

/**
 * 技能中心
 */
export class SkillCenter {
  static instence: SkillCenter;
  static getInstence(): SkillCenter {
    if (!SkillCenter.instence) {
      SkillCenter.instence = new SkillCenter();
    }
    return SkillCenter.instence;
  }

  /**技能配置映射 */
  skillConfigurationMap: Map<string, SkillConfiguration>;

  private constructor() {
    this.skillConfigurationMap = new Map<string, SkillConfiguration>();
  }

  /**
   * 载入技能配置
   * @param skills 技能配置数组
   */
  loadConfiguration(skills: Array<SkillConfiguration>): void {
    for (const eachSkill of skills) {
      this.skillConfigurationMap.set(eachSkill.id, eachSkill);
    }
  }
}
