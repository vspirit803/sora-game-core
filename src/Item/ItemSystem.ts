/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-25 13:57:15
 * @LastEditors: vspirit803
 * @Description:
 */
import { Rarity } from '@src/Common';

import { ItemBase } from './ItemBase';
import { ItemCenter } from './ItemCenter';
import { ItemSystemConfiguration } from './ItemSystemConfiguration';
import { ItemSystemSave } from './ItemSystemSave';
import { ItemType } from './ItemType';

function isItemSystemSave(system: ItemSystemConfiguration | ItemSystemSave): system is ItemSystemSave {
  return 'uuid' in system;
}

/**
 * 系统物品
 */
export class ItemSystem extends ItemBase {
  constructor(systemConfiguration: ItemSystemConfiguration);
  constructor(systemSave: ItemSystemSave);
  constructor(systemItem: ItemSystemConfiguration | ItemSystemSave) {
    let systemConfiguration: ItemSystemConfiguration;
    if (isItemSystemSave(systemItem)) {
      systemConfiguration = ItemCenter.getInstence().systemsConfigurationMap.get(systemItem.id)!;
    } else {
      systemConfiguration = systemItem;
    }

    const { id, name, rarity } = systemConfiguration;
    const uuid = isItemSystemSave(systemItem) ? systemItem.uuid : undefined;
    const count = isItemSystemSave(systemItem) ? systemItem.count : undefined;
    super({ uuid, id, name, isStackable: true, type: ItemType.System, rarity: rarity as Rarity, count });
  }

  generateSave(): ItemSystemSave {
    return {
      uuid: this.uuid,
      id: this.id,
      count: this.count,
    };
  }
}
