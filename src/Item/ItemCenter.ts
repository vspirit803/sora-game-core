/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 16:11:21
 * @LastEditors: vspirit803
 * @Description: 物品中心 单例模式
 */
import { SaveInterface } from '@src/Game';

import { BackpackSave } from './BackpackSave';
import { ItemConfiguration } from './ItemConfiguration';
import { ItemEquipment } from './ItemEquipment';
import { ItemEquipmentConfiguration } from './ItemEquipmentConfiguration';
import { ItemMaterial } from './ItemMaterial';
import { ItemMaterialConfiguration } from './ItemMaterialConfiguration';
import { ItemSystem } from './ItemSystem';
import { ItemSystemConfiguration } from './ItemSystemConfiguration';

function isMaterialConfiguration(item: ItemConfiguration): item is ItemMaterialConfiguration {
  return item.type === 'Material';
}

function isSystemConfiguration(item: ItemConfiguration): item is ItemSystemConfiguration {
  return item.type === 'System';
}

function isEquipmentConfiguration(item: ItemConfiguration): item is ItemEquipmentConfiguration {
  return item.type === 'Equipment';
}

export type ItemConfigurations = {
  equipments: Array<ItemEquipmentConfiguration>;
  materials: Array<ItemMaterialConfiguration>;
  systemItems: Array<ItemSystemConfiguration>;
};

/**
 * 物品中心(背包)
 */
export class ItemCenter implements SaveInterface<BackpackSave> {
  static instence: ItemCenter;
  static getInstence(): ItemCenter {
    if (!ItemCenter.instence) {
      ItemCenter.instence = new ItemCenter();
    }
    return ItemCenter.instence;
  }

  equipments: Array<ItemEquipment>;
  materials: Array<ItemMaterial>;
  systemItems: Array<ItemSystem>;

  equipmentsConfigurationMap: Map<string, ItemEquipmentConfiguration>;
  materialsConfigurationMap: Map<string, ItemMaterialConfiguration>;
  systemsConfigurationMap: Map<string, ItemSystemConfiguration>;

  private constructor() {
    this.equipments = [];
    this.materials = [];
    this.systemItems = [];

    this.equipmentsConfigurationMap = new Map<string, ItemEquipmentConfiguration>();
    this.materialsConfigurationMap = new Map<string, ItemMaterialConfiguration>();
    this.systemsConfigurationMap = new Map<string, ItemSystemConfiguration>();
  }

  /**
   * 载入装备配置
   * @param equipments 装备配置数组
   */
  loadEquipmentsConfiguration(equipments: Array<ItemEquipmentConfiguration>): void {
    for (const eachEquipment of equipments) {
      this.equipmentsConfigurationMap.set(eachEquipment.id, eachEquipment);
    }
  }

  /**
   * 载入材料配置
   * @param materials 材料配置数组
   */
  loadMaterialsConfiguration(materials: Array<ItemMaterialConfiguration>): void {
    for (const eachMaterial of materials) {
      this.materialsConfigurationMap.set(eachMaterial.id, eachMaterial);
    }
  }

  /**
   * 载入系统物品配置
   * @param systemItems 材料配置数组
   */
  loadSystemsConfiguration(systemItems: Array<ItemSystemConfiguration>): void {
    for (const eachSystem of systemItems) {
      this.systemsConfigurationMap.set(eachSystem.id, eachSystem);
    }
  }

  loadConfigurations(configurations: ItemConfigurations): void {
    this.loadEquipmentsConfiguration(configurations.equipments);
    this.loadMaterialsConfiguration(configurations.materials);
    this.loadSystemsConfiguration(configurations.systemItems);
  }

  addItem(item: ItemConfiguration, count = 1): void {
    if (isMaterialConfiguration(item)) {
      if (item.isStackable) {
        //可叠加
        const existItem = this.materials.find((currItem) => {
          return currItem.id === item.id;
        });
        if (existItem) {
          //已经有该物品,增加数量
          existItem.count += count;
        } else {
          //没有该物品
          this.materials.push(new ItemMaterial(item));
        }
      } else {
        //没有该物品
        this.materials.push(new ItemMaterial(item));
      }
    } else if (isSystemConfiguration(item)) {
      if (item.isStackable) {
        //可叠加
        const existItem = this.systemItems.find((currItem) => {
          return currItem.id === item.id;
        });
        if (existItem) {
          //已经有该物品,增加数量
          existItem.count += count;
        } else {
          //没有该物品
          this.systemItems.push(new ItemSystem(item));
        }
      } else {
        //没有该物品
        this.systemItems.push(new ItemSystem(item));
      }
    } else if (isEquipmentConfiguration(item)) {
      for (let i = 0; i < count; i++) {
        this.equipments.push(new ItemEquipment(item));
      }
    }
  }

  loadSave(saveData: BackpackSave): void {
    this.equipments = saveData.equipments.map((eachEquipmentSave) => new ItemEquipment(eachEquipmentSave));
    this.materials = saveData.materials.map((eachMaterialSave) => new ItemMaterial(eachMaterialSave));
    this.systemItems = saveData.systemItems.map((eachSystemSave) => new ItemSystem(eachSystemSave));
  }

  generateSave(): BackpackSave {
    return {
      equipments: this.equipments.map((eachEquipment) => eachEquipment.generateSave()),
      materials: this.materials.map((eachMaterialSave) => eachMaterialSave.generateSave()),
      systemItems: this.systemItems.map((eachSystemSave) => eachSystemSave.generateSave()),
    };
  }
}
