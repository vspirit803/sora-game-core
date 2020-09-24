/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 15:48:28
 * @LastEditors: vspirit803
 * @Description: 装备
 */
import { CharacterNormal } from '@src/Character';
import { CharacterPropertyType } from '@src/Character/CharacterPropertyType';
import { Rarity } from '@src/Common';
import { ObjectId } from 'bson';

import { ItemBase } from './ItemBase';
import { ItemCenter } from './ItemCenter';
import { ItemEquipmentConfiguration } from './ItemEquipmentConfiguration';
import { ItemEquipmentProperty } from './ItemEquipmentProperty';
import { ItemEquipmentSave } from './ItemEquipmentSave';
import { ItemEquipmentType, ItemEquipmentTypes } from './ItemEquipmentType';
import { ItemType } from './ItemType';

function isEquipmentSave(equipment: ItemEquipmentConfiguration | ItemEquipmentSave): equipment is ItemEquipmentSave {
  return 'uuid' in equipment;
}

/**
 * 装备类物品
 */
export class ItemEquipment extends ItemBase {
  /**穿戴装备的角色 */
  wearer?: CharacterNormal;
  /**装备部位 */
  equipmentType: ItemEquipmentTypes;
  /**装备属性 */
  properties: { [propName in CharacterPropertyType]?: ItemEquipmentProperty };
  /**装备等级 */
  level: number;

  /**装备评分 */
  get score(): number {
    return Object.values(this.properties)
      .map((eachProperty) => eachProperty!.value / eachProperty!.max)
      .reduce((prev, curr) => prev * curr, 1);
  }

  constructor(equipmentConfiguration: ItemEquipmentConfiguration);
  constructor(equipmentSave: ItemEquipmentSave);
  constructor(equipment: ItemEquipmentConfiguration | ItemEquipmentSave) {
    let equipmentConfiguration: ItemEquipmentConfiguration;
    if (!isEquipmentSave(equipment)) {
      //参数为EquipmentConfiguration
      equipmentConfiguration = equipment;
    } else {
      //参数为EquipmentSave
      const id = equipment.id;
      const tempEquipmentConfiguration = ItemCenter.getInstence().equipmentsConfigurationMap.get(id);
      if (tempEquipmentConfiguration === undefined) {
        throw new Error(`装备[${id}]的配置不存在`);
      }
      equipmentConfiguration = tempEquipmentConfiguration;
    }
    const rarity = equipmentConfiguration.rarity as Rarity;
    const equipmentType = equipmentConfiguration.equipmentType;
    const properties: { [propName in CharacterPropertyType]?: ItemEquipmentProperty } = {};
    for (const eachEquipmentPropertyConfiguration in equipmentConfiguration.properties) {
      const { min, max } = equipmentConfiguration.properties[
        eachEquipmentPropertyConfiguration as CharacterPropertyType
      ]!;
      let value: number;
      if (!isEquipmentSave(equipment)) {
        //范围内随机取值
        value = Math.random() * (max - min) + min;
        //若为整数则取整
        if (Number.isInteger(min) && Number.isInteger(max)) {
          value = Math.round(value);
        }
      } else {
        //从存档读取数值
        value = equipment.properties[eachEquipmentPropertyConfiguration as CharacterPropertyType]!;
      }
      properties[eachEquipmentPropertyConfiguration as CharacterPropertyType] = { min, max, value };
    }

    const { id, name, level } = equipmentConfiguration;
    const uuid = isEquipmentSave(equipment) ? equipment.uuid : new ObjectId().toHexString();
    super({ uuid, id, name, isStackable: false, rarity, type: ItemType.Equipment });
    this.level = level;
    this.equipmentType = equipmentType;
    this.properties = properties;

    //存档,且有人佩戴
    if (isEquipmentSave(equipment) && equipment.wearerId) {
      // const wearer: CharacterNormal;
      // wearer.putOnEquipment(thisEquipment);
    }
  }

  /**设置wearer */
  setWearer(wearer: CharacterNormal | undefined): void {
    this.wearer = wearer;
  }

  generateSave(): ItemEquipmentSave {
    const properties = Object.fromEntries(Object.entries(this.properties).map(([key, value]) => [key, value!.value]));
    return {
      uuid: this.uuid,
      id: this.id,
      properties,
      count: 1,
      wearerId: this.wearer?.id,
    };
  }
}
