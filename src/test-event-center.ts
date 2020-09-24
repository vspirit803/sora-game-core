/*
 * @Author: vspirit803
 * @Date: 2020-09-24 08:46:02
 * @LastEditTime: 2020-09-24 17:48:14
 * @LastEditors: vspirit803
 * @Description:
 */
import { ObjectId } from 'bson';

import { UUID } from './Common';
import { EventCenter } from './Event/EventCenter';

class User implements UUID {
  uuid: string;
  name: string;
  constructor(name: string) {
    this.uuid = new ObjectId().toHexString();
    this.name = name;
  }
}
const a = new User('织田信长');
const b = new User('丰臣秀吉');

const eventCenter = EventCenter.getInstence();
eventCenter.listen({
  eventType: 'BattleStart',
  priority: 3,
  async callback() {
    console.log('BattleStart priority: 3');
  },
});

eventCenter.listen({
  eventType: 'BattleStart',
  filter: a,
  async callback() {
    console.log('BattleStart priority: default');
  },
});

eventCenter.listen({
  eventType: 'RoundStart',
  filter: [a, b],
  async callback() {
    console.log('RoundStart priority: default');
  },
});

const promise = eventCenter.trigger({ eventType: 'BattleStart', source: a });
eventCenter.trigger({ eventType: 'BattleStart', source: b });
eventCenter.trigger({ eventType: 'RoundStart', source: b });

promise.then(() => {
  console.log('pause');
});
