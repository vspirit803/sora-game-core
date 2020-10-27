/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:01:24
 * @Description: 剧本单句 - 对话
 * @LastEditTime: 2020-10-23 16:05:23
 * @LastEditors: vspirit803
 */

import { Script } from './Script';
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';

export interface ScriptSentenceConfigurationConversation extends ScriptSentenceConfiguration {
  character: string;
  content: string;
  background?: string;
}

/**
 * 剧本单句 - 对话
 */
export class ScriptSentenceConversation extends ScriptSentence {
  character: string;
  content: string;
  background?: string;

  constructor({ uuid, type, character, content }: ScriptSentenceConfigurationConversation, script: Script) {
    super({ uuid, type }, script);

    this.character = character;
    this.content = content;
  }

  run() {
    this.script.chat(this.character, this.content, this.background);
  }
}
