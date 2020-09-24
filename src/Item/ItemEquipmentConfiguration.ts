/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 15:46:14
 * @LastEditors: vspirit803
 * @Description:
 */
import { CharacterPropertyType } from '@src/Character/CharacterPropertyType';

import { ItemConfiguration } from './ItemConfiguration';
import { ItemEquipmentPropertyConfiguration } from './ItemEquipmentPropertyConfiguration';
import { ItemEquipmentTypes } from './ItemEquipmentType';

/**
 * 装备配置接口
 */
export interface ItemEquipmentConfiguration extends ItemConfiguration {
  type: 'Equipment';
  /**装备类别 */
  equipmentType: ItemEquipmentTypes;
  /**装备等级 */
  level: number;
  /**装备属性 */
  properties: { [propName in CharacterPropertyType]?: ItemEquipmentPropertyConfiguration };
}
