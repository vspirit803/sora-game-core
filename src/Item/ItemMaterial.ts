/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 14:08:33
 * @LastEditors: vspirit803
 * @Description:
 */
import { Rarity } from '@src/Common';

import { ItemBase } from './ItemBase';
import { ItemCenter } from './ItemCenter';
import { ItemMaterialConfiguration } from './ItemMaterialConfiguration';
import { ItemMaterialSave } from './ItemMaterialSave';
import { ItemType } from './ItemType';

function isItemMaterialSave(material: ItemMaterialSave | ItemMaterialConfiguration): material is ItemMaterialSave {
  return 'uuid' in material;
}

/**
 * 材料类物品
 */
export class ItemMaterial extends ItemBase {
  constructor(materialSave: ItemMaterialSave);
  constructor(materialConfiguration: ItemMaterialConfiguration);
  constructor(material: ItemMaterialSave | ItemMaterialConfiguration) {
    let materialConfiguration: ItemMaterialConfiguration;
    if (isItemMaterialSave(material)) {
      materialConfiguration = ItemCenter.getInstence().materialsConfigurationMap.get(material.id)!;
    } else {
      materialConfiguration = material;
    }

    const { id, name, rarity } = materialConfiguration;
    const uuid = isItemMaterialSave(material) ? material.uuid : undefined;
    const count = isItemMaterialSave(material) ? material.count : undefined;
    super({ uuid, id, name, isStackable: true, type: ItemType.Material, rarity: rarity as Rarity, count });
  }

  generateSave(): ItemMaterialSave {
    return {
      uuid: this.uuid,
      id: this.id,
      count: this.count,
    };
  }
}
