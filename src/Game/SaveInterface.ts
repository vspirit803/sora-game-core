/*
 * @Author: vspirit803
 * @Date: 2020-09-23 17:32:45
 * @LastEditTime: 2020-09-24 09:27:08
 * @LastEditors: vspirit803
 * @Description: 存档泛型接口
 */
/**
 * 存档相关接口
 */
export interface SaveInterface<T> {
  /**
   * 载入存档
   * @param saveData 存档数据
   */
  loadSave(saveData: T): void;

  /**
   * 生成存档
   * @returns 存档数据
   */
  generateSave(): T;
}
