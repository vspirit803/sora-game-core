/*
 * @Author: vspirit803
 * @Date: 2020-09-23 16:57:06
 * @Description:
 * @LastEditTime: 2020-09-27 10:42:15
 * @LastEditors: vspirit803
 */
import { UUID } from '@src/Common';
import { SkillNormal } from '@src/Skill';
import { ObjectId } from 'bson';

import { CharacterCenter } from './CharacterCenter';
import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { CharacterPropertyType } from './CharacterPropertyType';
import { CharacterSave } from './CharacterSave';

function isCharacterSave(character: CharacterConfiguration | CharacterSave): character is CharacterSave {
  return 'uuid' in character;
}

/**
 * 角色类(平常状态)
 */
export class CharacterNormal implements UUID {
  uuid: string;
  id: string;
  name: string;
  level: number;
  properties: { [propName in CharacterPropertyType]: CharacterPropertyNormal };
  skills: Array<SkillNormal>;

  constructor(characterConfiguration: CharacterConfiguration);
  constructor(characterSave: CharacterSave);
  constructor(character: CharacterConfiguration | CharacterSave) {
    let characterConfiguration: CharacterConfiguration;
    if (isCharacterSave(character)) {
      characterConfiguration = CharacterCenter.getInstence().charactersConfigurationMap.get(character.id)!;
    } else {
      characterConfiguration = character;
    }

    this.uuid = new ObjectId().toHexString();
    this.id = character.id;
    this.name = character.name ?? characterConfiguration.name;
    this.level = isCharacterSave(character) ? character.level : 0;

    const properties: { [propName in CharacterPropertyType]?: CharacterPropertyNormal } = {};
    for (const eachPropName in characterConfiguration.properties) {
      const eachProperty = characterConfiguration.properties[eachPropName as CharacterPropertyType];
      properties[eachPropName as CharacterPropertyType] = new CharacterPropertyNormal({
        character: this,
        property: eachProperty,
      });
    }
    this.properties = properties as { [propName in CharacterPropertyType]: CharacterPropertyNormal };

    // this.skills = characterConfiguration.skills.map((eachId) => SkillFactory.getSkill(eachId));
    this.skills = characterConfiguration.skills.map((eachId) => new SkillNormal({ owner: this, id: eachId }));
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
