import characters from '@assets/characters.json';
import save from '@saves/sav001.json';

import { CharacterCenter } from './Character';

CharacterCenter.loadConfiguration(characters);
CharacterCenter.loadSave(save.characters);

console.log('hello world');
