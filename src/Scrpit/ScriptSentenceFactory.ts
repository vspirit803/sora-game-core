/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:51:28
 * @Description:
 * @LastEditTime: 2020-10-23 16:22:59
 * @LastEditors: vspirit803
 */
import { Script } from './Script';
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';
import { ScriptSentenceConfigurationConversation, ScriptSentenceConversation } from './ScriptSentenceConversation';
import { ScriptSentenceConfigurationEnd, ScriptSentenceEnd } from './ScriptSentenceEnd';
import { ScriptSentenceConfigurationSelect, ScriptSentenceSelect } from './ScriptSentenceSelect';

export class ScriptSentenceFactory {
  static create(sentenceConfiguration: ScriptSentenceConfiguration, script: Script): ScriptSentence {
    switch (sentenceConfiguration.type) {
      case 'Conversation':
        return new ScriptSentenceConversation(sentenceConfiguration as ScriptSentenceConfigurationConversation, script);
      case 'Select':
        return new ScriptSentenceSelect(sentenceConfiguration as ScriptSentenceConfigurationSelect, script);
      case 'End':
        return new ScriptSentenceEnd(sentenceConfiguration as ScriptSentenceConfigurationEnd, script);
      default:
        throw `未知的sentence type:[${sentenceConfiguration.type}]`;
    }
  }
}
