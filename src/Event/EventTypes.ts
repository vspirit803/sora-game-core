/*
 * @Author: vspirit803
 * @Date: 2020-09-24 17:43:42
 * @Description: 事件类型
 * @LastEditTime: 2020-09-25 10:44:46
 * @LastEditors: vspirit803
 */

/**事件类型 */
export type EventTypes =
  /**战斗开始时 */
  | 'BattleStart'
  /**回合开始时 */
  | 'RoundStart'
  /**行动开始时 */
  | 'ActionStart'
  /**选择技能时 */
  | 'SkillSelect'
  /**施放技能时 */
  | 'Spelling'
  /**攻击时 */
  | 'Attacking'
  /**受到攻击时 */
  | 'Attacked'
  /**造成伤害时 */
  | 'Damaging'
  /**受到伤害时 */
  | 'Damaged'
  /**治疗时 */
  | 'Treating'
  /**受到治疗时 */
  | 'Treated'
  /**造成击杀时 */
  | 'Killing'
  /**受到击杀时 */
  | 'Killed'
  /**行动结束后 */
  | 'ActionEnd'
  /**回合结束后 */
  | 'RoundEnd'
  /**战斗胜利 */
  | 'BattleSuccess';
