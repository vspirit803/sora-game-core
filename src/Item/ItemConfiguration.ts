/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 15:02:52
 * @LastEditors: vspirit803
 * @Description:
 */

import { ItemTypes } from './ItemType';

/**
 * 物品配置接口
 */
export interface ItemConfiguration {
  /**配置id */
  id: string;
  /**名称 */
  name: string;
  /**类别 */
  type: ItemTypes;
  /**能否堆叠 */
  isStackable?: boolean;
  /**稀有度 */
  rarity: string;
}
