/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 14:35:36
 * @LastEditors: vspirit803
 * @Description:
 */
import { ItemEquipmentSave } from './ItemEquipmentSave';
import { ItemMaterialSave } from './ItemMaterialSave';
import { ItemSystemSave } from './ItemSystemSave';

/**
 * 背包存档接口
 */
export interface BackpackSave {
  materials: Array<ItemMaterialSave>;
  systemItems: Array<ItemSystemSave>;
  equipments: Array<ItemEquipmentSave>;
}
