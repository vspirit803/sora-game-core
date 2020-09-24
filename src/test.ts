/*
 * @Author: vspirit803
 * @Date: 2020-09-24 08:46:02
 * @LastEditTime: 2020-09-24 09:03:06
 * @LastEditors: vspirit803
 * @Description:
 */
import { ObjectId } from 'bson';

import { CharacterCenter } from './Character';

class Single {
  static instence: Single;

  uuid: string;
  constructor() {
    this.uuid = new ObjectId().toHexString();
  }

  static getInstence(): Single {
    if (!Single.instence) {
      Single.instence = new Single();
    }
    return Single.instence;
  }
}
const a = Single.getInstence();
const b = Single.getInstence();

console.log(a === b);

const characterCenter = CharacterCenter.getInstence();

console.log('pause');
