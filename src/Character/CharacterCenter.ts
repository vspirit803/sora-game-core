/*
 * @Author: vspirit803
 * @Date: 2020-09-23 16:57:06
 * @LastEditTime: 2020-09-25 17:03:58
 * @LastEditors: vspirit803
 * @Description: 角色中心 单例模式
 */
import { SaveInterface } from '@src/Game';

import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterNormal } from './CharacterNormal';
import { CharacterSave } from './CharacterSave';

/**
 * 角色中心
 */
export class CharacterCenter implements SaveInterface<Array<CharacterSave>> {
  static instence: CharacterCenter;
  static getInstence(): CharacterCenter {
    if (!CharacterCenter.instence) {
      CharacterCenter.instence = new CharacterCenter();
    }
    return CharacterCenter.instence;
  }

  /**角色配置映射 */
  charactersConfigurationMap: Map<string, CharacterConfiguration>;
  /**角色列表 */
  characters: Array<CharacterNormal>;
  /**角色id到角色实例的映射 */
  charactersMap: Map<string, CharacterNormal>;

  private constructor() {
    this.characters = [];
    this.charactersMap = new Map<string, CharacterNormal>();
    this.charactersConfigurationMap = new Map<string, CharacterConfiguration>();
  }

  /**
   * 将角色配置添加进列表
   * @param character 要添加的角色
   */
  addCharacterConfiguration(character: CharacterConfiguration): void {
    this.charactersConfigurationMap.set(character.id, character);
  }

  /**
   * 将角色添加进列表
   * @param character 要添加的角色
   */
  addCharacter(character: CharacterNormal): void {
    this.charactersMap.set(character.id, character);
    this.characters.push(character);
  }

  /**
   * 载入角色配置
   * @param characters 角色配置数组
   */
  loadConfiguration(characters: Array<CharacterConfiguration>): void {
    for (const eachCharacter of characters) {
      this.addCharacterConfiguration(eachCharacter);
      if (eachCharacter.id.startsWith('Enemy')) {
        this.loadCharacter(eachCharacter.id);
      }
    }
  }

  /**
   * 载入角色存档
   * @param characters 角色存档数组
   */
  loadSave(characters: Array<CharacterSave>): void {
    for (const eachCharacterSave of characters) {
      this.addCharacter(new CharacterNormal(eachCharacterSave));
    }
    // for (const eachCharacterSave of characters) {
    //   let eachCharacter = this.charactersMap.get(eachCharacterSave.id);
    //   if (eachCharacter === undefined) {
    //     eachCharacter = this.loadCharacter(eachCharacterSave.id);
    //   }
    //   eachCharacter.loadSave(eachCharacterSave);
    // }
  }

  /**
   * 生成角色存档
   * @returns 角色存档数组
   */
  generateSave(): Array<CharacterSave> {
    return this.characters
      .filter((eachCharacter) => eachCharacter.id.startsWith('Enemy'))
      .map((eachCharacter) => {
        const characterSave: CharacterSave = {
          uuid: eachCharacter.uuid,
          id: eachCharacter.id,
          level: eachCharacter.level,
        };
        // 名字与配置不同(改过名)时,才会保存名字
        if (eachCharacter.name !== this.charactersConfigurationMap.get(eachCharacter.id)!.name) {
          characterSave.name = eachCharacter.name;
        }
        return characterSave;
      });
  }

  /**
   * 用角色配置初始化角色
   * @param id 角色id
   */
  loadCharacter(id: string): CharacterNormal {
    const characterConfiguration = this.charactersConfigurationMap.get(id);
    if (characterConfiguration === undefined) {
      throw Error(`id为[${id}]的角色配置不存在`);
    }
    const character = new CharacterNormal({
      // equipmentSlots: commonEquipmentSlotsConfiguration,
      ...characterConfiguration,
    });
    this.addCharacter(character);
    return character;
  }

  /**
   * 激活角色
   * @param id 角色id
   */
  unlockCharacter(id: string): void {
    this.loadCharacter(id);
    console.log(`激活了id为[${id}]的角色`);
  }

  /**
   * 获取角色
   * @param id 角色id
   */
  getCharacter(id: string): CharacterNormal {
    const character = this.charactersMap.get(id);
    if (character === undefined) {
      throw new Error(`id为${id}的角色未激活`);
    }
    return character;
  }
}
