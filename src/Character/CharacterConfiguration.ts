import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';
import { CharacterPropertyType } from './CharacterPropertyType';

/**
 * 角色配置
 */
export interface CharacterConfiguration {
  id: string;
  name: string;
  skills: Array<string>;
  properties: { [propName in CharacterPropertyType]: CharacterPropertyConfiguration };
}
