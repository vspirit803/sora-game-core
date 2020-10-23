/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:01:24
 * @Description: 剧本单句 - 选择
 * @LastEditTime: 2020-10-23 16:07:18
 * @LastEditors: vspirit803
 */

import { Script } from './Script';
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';

/**
 * 剧本单句 - 选择 - 选项
 */
export interface ScriptSentenceSelectOption {
  text: string;
  target: string;
}

export interface ScriptSentenceConfigurationSelect extends ScriptSentenceConfiguration {
  options: Array<ScriptSentenceSelectOption>;
}

/**
 * 剧本单句 - 选择
 */
export class ScriptSentenceSelect extends ScriptSentence {
  options: Array<ScriptSentenceSelectOption>;

  constructor({ uuid, type, options }: ScriptSentenceConfigurationSelect, script: Script) {
    super({ uuid, type }, script);

    this.options = options;
  }

  run() {
    this.script.showOptions(this.options);
  }
}
