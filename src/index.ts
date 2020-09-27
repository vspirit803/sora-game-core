/*
 * @Author: vspirit803
 * @Date: 2020-09-23 16:54:06
 * @LastEditTime: 2020-09-27 13:52:20
 * @LastEditors: vspirit803
 * @Description:
 */
import battles from '@assets/battles.json';
import characters from '@assets/characters.json';
import items from '@assets/items.json';
import skills from '@assets/skills.json';
import save from '@saves/sav001.json';

import { Game } from './Game';
import { ItemConfigurations } from './Item';
import { SkillConfiguration } from './Skill';

const game = Game.getInstence();
//加载配置
game.skillCenter.loadConfiguration(skills as Array<SkillConfiguration>);
game.backpack.loadConfigurations(items as ItemConfigurations);
game.characterCenter.loadConfiguration(characters);
game.battleCenter.loadConfiguration(battles);

//载入存档
game.loadSave(save);

const team = game.teamCenter.teams[0];
const battle = game.battleCenter.generateBattle('Battle00001', team);
battle.autoMode = true;
const promise = battle.start();

console.log('hello world');
promise.then(() => {
  console.log('battle end');
});
