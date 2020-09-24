/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 09:50:03
 * @LastEditors: vspirit803
 * @Description:
 */
import { Rarity } from '@src/Common';

import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';

/**
 * 消耗类物品
 */
export class ItemConsumable extends ItemBase {
  constructor({
    uuid,
    id = 'Consumable00000',
    name = '未命名消耗品',
    count = 1,
    rarity,
  }: { uuid?: string; id?: string; name?: string; rarity?: Rarity; count?: number } = {}) {
    super({ uuid, id, name, isStackable: true, type: ItemType.Consumable, rarity, count });
  }
}
