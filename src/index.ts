/*
 * @Author: vspirit803
 * @Date: 2020-09-23 16:54:06
 * @LastEditTime: 2020-09-24 16:03:09
 * @LastEditors: vspirit803
 * @Description:
 */
import characters from '@assets/characters.json';
import items from '@assets/items.json';
import save from '@saves/sav001.json';

import { Game } from './Game';
import { ItemConfigurations } from './Item';

const game = Game.getInstence();
//加载配置
game.characterCenter.loadConfiguration(characters);
game.backpack.loadConfigurations(items as ItemConfigurations);

//载入存档
game.loadSave(save);

console.log('hello world');
