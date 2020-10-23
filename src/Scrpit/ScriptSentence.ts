/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:01:24
 * @Description: 剧本单句
 * @LastEditTime: 2020-10-23 16:07:09
 * @LastEditors: vspirit803
 */

import { UUID } from '@src/Common';

import { Script } from './Script';

export interface ScriptSentenceConfiguration {
  uuid: string;
  type: string;
}

/**
 * 剧本单句
 */
export abstract class ScriptSentence implements UUID {
  script: Script;
  uuid: string;
  type: string;

  constructor({ uuid, type }: { uuid: string; type: string }, script: Script) {
    this.script = script;

    this.uuid = uuid;
    this.type = type;
  }

  abstract run(): void;
}
