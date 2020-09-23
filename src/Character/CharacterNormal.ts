import { UUID } from '@src/Common';
import { ObjectId } from 'bson';

import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { CharacterPropertyType } from './CharacterPropertyType';
import { CharacterSave } from './CharacterSave';

/**
 * 角色类(平常状态)
 */
export class CharacterNormal implements UUID {
  uuid: string;
  id: string;
  name: string;
  level: number;
  properties: { [propName in CharacterPropertyType]: CharacterPropertyNormal };

  constructor(character: CharacterConfiguration) {
    this.uuid = new ObjectId().toHexString();
    this.id = character.id;
    this.name = character.name;
    this.level = 0;

    const properties: { [propName in CharacterPropertyType]?: CharacterPropertyNormal } = {};

    for (const eachPropName in character.properties) {
      const eachProperty = character.properties[eachPropName as CharacterPropertyType];
      properties[eachPropName as CharacterPropertyType] = new CharacterPropertyNormal({
        character: this,
        property: eachProperty,
      });
    }
    this.properties = properties as { [propName in CharacterPropertyType]: CharacterPropertyNormal };
  }

  /**
   * 载入存档
   * @param eachCharacterSave 角色的存档数据
   */
  loadSave(eachCharacterSave: CharacterSave): void {
    this.level = eachCharacterSave.level;
    if (eachCharacterSave.name) {
      this.name = eachCharacterSave.name;
    }
  }

  // putOnEquipment(slot: EquipmentSlot, equipment: ItemEquipment): void {
  //   if (!slot.validEquipmentTypes.has(equipment.equipmentType)) {
  //     throw new Error(
  //       `try to put on Equipment[${equipment.equipmentType}] to Slot[${Array.from(slot.validEquipmentTypes).join(
  //         ',',
  //       )}]`,
  //     );
  //   }
  //   this.takeOffEquipment(slot);
  //   equipment.setWearer(this);
  //   for (const eachPropName in equipment.properties) {
  //     const eachProperty = equipment.properties[eachPropName];
  //     if (eachPropName in this.properties) {
  //       this.properties[eachPropName as CharacterPropertyType].equipmentValue += eachProperty.value;
  //     }
  //   }
  // }

  // takeOffEquipment(slot: EquipmentSlot): void {
  //   if (!slot.equipment) {
  //     return;
  //   }
  //   const equipment = slot.equipment;
  //   equipment.setWearer(undefined);
  //   for (const eachPropName in equipment.properties) {
  //     const eachProperty = equipment.properties[eachPropName];
  //     if (eachPropName in this.properties) {
  //       this.properties[eachPropName as CharacterPropertyType].equipmentValue -= eachProperty.value;
  //     }
  //   }
  // }
}
