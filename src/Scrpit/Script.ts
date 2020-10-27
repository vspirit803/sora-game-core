/*
 * @Author: vspirit803
 * @Date: 2020-10-23 15:00:09
 * @Description:
 * @LastEditTime: 2020-10-27 16:12:10
 * @LastEditors: vspirit803
 */
import { ScriptSentence, ScriptSentenceConfiguration } from './ScriptSentence';
import { ScriptSentenceFactory } from './ScriptSentenceFactory';
import { ScriptSentenceSelectOption } from './ScriptSentenceSelect';

export interface ScriptConfiguration {
  name: string;
  sentences: Array<ScriptSentenceConfiguration>;
}

/**
 * 剧本
 */
export class Script {
  name: string;
  sentences: Array<ScriptSentence>;
  index: number;
  currBackground: string;
  isEnd: boolean;

  constructor({ name, sentences }: ScriptConfiguration) {
    this.name = name;
    this.sentences = sentences.map((each) => ScriptSentenceFactory.create(each, this));
    this.index = 0;
    this.isEnd = this.sentences.length === 0;
    this.currBackground = '';

    console.log(`==========初始化剧本【${this.name}】完成==========`);
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

  chat(character: string, content: string, background?: string) {
    if (background && background !== this.currBackground) {
      console.log(`背景切换为${background}`);
      this.currBackground = background;
    }
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
    console.log('==========剧本结束==========');
  }
}
