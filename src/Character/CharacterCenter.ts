import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterNormal } from './CharacterNormal';
import { CharacterSave } from './CharacterSave';

/**
 * 角色中心
 */
export class CharacterCenter {
  /**角色配置映射 */
  static charactersConfigurationMap: Map<string, CharacterConfiguration> = new Map<string, CharacterConfiguration>();
  /**角色列表 */
  static characters: Array<CharacterNormal> = [];
  /**角色id到角色实例的映射 */
  static charactersMap: Map<string, CharacterNormal> = new Map<string, CharacterNormal>();

  /**
   * 将角色配置添加进列表
   * @param character 要添加的角色
   */
  static addCharacterConfiguration(character: CharacterConfiguration): void {
    CharacterCenter.charactersConfigurationMap.set(character.id, character);
  }

  /**
   * 将角色添加进列表
   * @param character 要添加的角色
   */
  static addCharacter(character: CharacterNormal): void {
    CharacterCenter.charactersMap.set(character.id, character);
    CharacterCenter.characters.push(character);
  }

  /**
   * 载入角色配置
   * @param characters 角色配置数组
   */
  static loadConfiguration(characters: Array<CharacterConfiguration>): void {
    for (const eachCharacter of characters) {
      CharacterCenter.addCharacterConfiguration(eachCharacter);
      if (eachCharacter.id.startsWith('Enemy')) {
        CharacterCenter.loadCharacter(eachCharacter.id);
      }
    }
  }

  /**
   * 载入角色存档
   * @param characters 角色存档数组
   */
  static loadSave(characters: Array<CharacterSave>): void {
    for (const eachCharacterSave of characters) {
      let eachCharacter = CharacterCenter.charactersMap.get(eachCharacterSave.id);
      if (eachCharacter === undefined) {
        eachCharacter = CharacterCenter.loadCharacter(eachCharacterSave.id);
      }
      eachCharacter.loadSave(eachCharacterSave);
    }
  }

  /**
   * 生成角色存档
   * @returns 角色存档数组Array<CharacterSave>
   */
  static generateSave(): Array<CharacterSave> {
    return CharacterCenter.characters.map((eachCharacter) => {
      const characterSave: CharacterSave = {
        uuid: eachCharacter.uuid,
        id: eachCharacter.id,
        level: eachCharacter.level,
      };
      // 名字与配置不同(改过名)时,才会保存名字
      if (eachCharacter.name !== CharacterCenter.charactersConfigurationMap.get(eachCharacter.id)!.name) {
        characterSave.name = eachCharacter.name;
      }
      return characterSave;
    });
  }

  /**
   * 用角色配置初始化角色
   * @param id 角色id
   */
  static loadCharacter(id: string): CharacterNormal {
    const characterConfiguration = CharacterCenter.charactersConfigurationMap.get(id);
    if (characterConfiguration === undefined) {
      throw Error(`id为[${id}]的角色配置不存在`);
    }
    const character = new CharacterNormal({
      // equipmentSlots: commonEquipmentSlotsConfiguration,
      ...characterConfiguration,
    });
    CharacterCenter.addCharacter(character);
    return character;
  }

  /**
   * 激活角色
   * @param id 角色id
   */
  static unlockCharacter(id: string): void {
    CharacterCenter.loadCharacter(id);
    console.log(`激活了id为[${id}]的角色`);
  }

  /**
   * 获取角色
   * @param id 角色id
   */
  static getCharacter(id: string): CharacterNormal {
    const character = CharacterCenter.charactersMap.get(id);
    if (character === undefined) {
      throw new Error(`id为${id}的角色未激活`);
    }
    return character;
  }
}
