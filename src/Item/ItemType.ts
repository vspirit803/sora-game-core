/*
 * @Author: vspirit803
 * @Date: 2020-09-24 09:39:24
 * @LastEditTime: 2020-09-24 15:02:42
 * @LastEditors: vspirit803
 * @Description:
 */
export enum ItemType {
  System = 'System', //系统物品,如金币,经验值等
  Equipment = 'Equipment', //装备
  Consumable = 'Consumable', //消耗品
  Task = 'Task', //任务物品
  Material = 'Material', //材料
}

export type ItemTypes = 'System' | 'Equipment' | 'Consumable' | 'Task' | 'Material';
