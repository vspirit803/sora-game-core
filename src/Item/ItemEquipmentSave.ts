/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 13:51:38
 * @LastEditors: vspirit803
 * @Description:
 */
import { CharacterPropertyType } from '@src/Character/CharacterPropertyType';

import { ItemSave } from './ItemSave';

/**
 * 装备存档
 */
export interface ItemEquipmentSave extends ItemSave {
  /**穿戴装备的角色id */
  wearerId?: string;
  /**
   * 装备属性
   * 只保存属性实际值
   */
  properties: { [propName in CharacterPropertyType]?: number };
}
