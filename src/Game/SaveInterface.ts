/**
 * 存档相关接口
 */
export interface SaveInterface {
  /**
   * 载入存档
   * @param saveData 存档数据
   */
  loadSave(saveData: any): void;

  /**
   * 生成存档
   * @returns 存档数据
   */
  generateSave(): any;
}
