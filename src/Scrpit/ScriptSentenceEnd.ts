/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:01:24
 * @Description: 剧本单句 - 结束
 * @LastEditTime: 2020-10-23 16:22:01
 * @LastEditors: vspirit803
 */

import { Script } from './Script';
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScriptSentenceConfigurationEnd extends ScriptSentenceConfiguration {}

/**
 * 剧本单句 - 选择
 */
export class ScriptSentenceEnd extends ScriptSentence {
  constructor({ uuid, type }: ScriptSentenceConfigurationEnd, script: Script) {
    super({ uuid, type }, script);
  }

  run() {
    this.script.end();
  }
}
