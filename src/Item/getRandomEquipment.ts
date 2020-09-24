/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 13:29:48
 * @LastEditors: vspirit803
 * @Description:
 */
import rarityRate from '@assets/ItemRarityRate.json';
import { Rarity } from '@src/Common';

import { ItemEquipment } from './ItemEquipment';
import { ItemEquipmentType } from './ItemEquipmentType';
import { ItemType } from './ItemType';

export function generateEquipment({
  id,
  name,
  equipmentType,
  rarity,
  level,
}: {
  id: string;
  name: string;
  equipmentType: ItemEquipmentType;
  rarity?: Rarity;
  level?: number;
}): ItemEquipment {
  if (rarity === undefined) {
    const r = Math.random();
    if (r < rarityRate.Immortal.stackRate) {
      rarity = Rarity.Immortal;
    } else if (r < rarityRate.Legendary.stackRate) {
      rarity = Rarity.Legendary;
    } else if (r < rarityRate.Mythical.stackRate) {
      rarity = Rarity.Mythical;
    } else if (r < rarityRate.Rare.stackRate) {
      rarity = Rarity.Rare;
    } else {
      rarity = Rarity.Common;
    }
  }

  if (level === undefined) {
    level = Math.round(Math.random() * 20) * 5;
  }
  const rarityRange = rarityRate as { [rarity: string]: { min: number; max: number } };
  equipmentType = ItemEquipmentType.Weapon;
  // const { min: minRatio, max: maxRatio } = { ...rarityRange[Rarity[rarity]] };
  const { min: minRatio, max: maxRatio } = { ...rarityRange[rarity] };
  const min = Math.round(Math.sin((0.01 * level - 0.5) * Math.PI + 1) * 500 * minRatio);
  const max = Math.round(Math.sin((0.01 * level - 0.5) * Math.PI + 1) * 500 * maxRatio);
  const value = Math.round((max - min) * Math.random()) + min;
  const properties = { atk: { min, max, value } };

  return new ItemEquipment({
    id,
    name,
    rarity,
    equipmentType,
    level,
    properties,
    type: ItemType.Equipment,
  });
}
