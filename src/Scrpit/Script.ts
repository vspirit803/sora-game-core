/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:00:09
 * @Description:
 * @LastEditTime: 2020-10-23 16:42:29
 * @LastEditors: vspirit803
 */
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';
import { ScriptSentenceFactory } from './ScriptSentenceFactory';
import { ScriptSentenceSelectOption } from './ScriptSentenceSelect';

export interface ScriptConfiguration {
  sentences: Array<ScriptSentenceConfiguration>;
}

/**
 * 剧本
 */
export class Script {
  index: number;
  sentences: Array<ScriptSentence>;

  isEnd: boolean;

  constructor({ sentences }: ScriptConfiguration) {
    this.index = 0;
    this.sentences = sentences.map((each) => ScriptSentenceFactory.create(each, this));
    this.isEnd = this.sentences.length === 0;
  }

  get hasNext() {
    return !this.isEnd && this.index < this.sentences.length;
  }

  next() {
    if (this.hasNext) {
      this.sentences[this.index].run();
    } else {
      throw '剧本已经结束了';
    }
  }

  chat(character: string, content: string) {
    console.log(`${character}：“${content}”`);
    this.index++;
  }

  showOptions(options: Array<ScriptSentenceSelectOption>) {
    for (const eachOption of options) {
      console.log(`· [${eachOption.text}]`);
    }

    const selectedOption = options[Math.floor(Math.random() * options.length)];
    console.log(`选择了[${selectedOption.text}]`);
    this.selectOption(selectedOption);
  }

  selectOption(option: ScriptSentenceSelectOption) {
    const { target } = option;
    const index = this.sentences.findIndex((eachSentence) => eachSentence.uuid === target);
    if (index === -1) {
      throw `无效的选项目标:${target}`;
    }
    this.index = index;
  }

  end() {
    this.isEnd = true;
    console.log('剧本结束');
  }
}
