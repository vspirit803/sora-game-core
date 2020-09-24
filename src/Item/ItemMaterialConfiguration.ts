/*
 * @Author: vspirit803
 * @Date: 2020-09-24 14:00:05
 * @LastEditTime: 2020-09-24 15:18:57
 * @LastEditors: vspirit803
 * @Description:
 */
import { ItemConfiguration } from './ItemConfiguration';

/**
 * 材料配置接口
 */
export interface ItemMaterialConfiguration extends ItemConfiguration {
  isStackable: boolean;
  type: 'Material';
}
