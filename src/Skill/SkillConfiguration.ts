import { SkillData } from './SkillData';
import { SkillTargetType } from './SkillTarget';
import { SkillType } from './SkillType';

/*
 * @Author: vspirit803
 * @Date: 2020-09-25 10:47:53
 * @Description:
 * @LastEditTime: 2021-03-10 17:10:26
 * @LastEditors: vspirit803
 */
export interface SkillConfiguration {
  /**技能id */
  id: string;
  /**技能名称 */
  name: string;
  /**技能类型 */
  type: SkillType;
  /**技能等级数据 */
  levels: Array<SkillData>;
  /**技能描述 */
  description: string;
  /**技能消耗 */
  cost?: number;
  /**技能效果 */
  effects?: Array<unknown>;
  /**技能冷却时间 */
  cooldown?: number;
  /**技能可选目标 */
  target?: SkillTargetType;
}
