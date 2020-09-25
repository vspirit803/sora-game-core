/*
 * @Author: vspirit803
 * @Date: 2020-09-24 08:46:02
 * @LastEditTime: 2020-09-25 16:46:33
 * @LastEditors: vspirit803
 * @Description:
 */
import { ObjectId } from 'bson';

import { UUID } from './Common';
import { EventDataActionEnd, EventDataBattleStart } from './Event';
import { EventCenter } from './Event/EventCenter';
import { Listen, Listener } from './Event/EventDecorators';

@Listener()
class User implements UUID {
  uuid: string;
  name: string;
  constructor(name: string) {
    this.uuid = new ObjectId().toHexString();
    this.name = name;
  }

  @Listen<EventDataBattleStart>({ eventType: 'BattleStart', filterFunction: () => undefined })
  async onBattleStart(eventData: EventDataBattleStart) {
    // console.log(eventData.battle);
    console.log(this.name);
    console.log('onBattleStart');
  }

  @Listen<EventDataActionEnd>({
    eventType: 'ActionEnd',
  })
  async onActionEnd(eventData: EventDataActionEnd) {
    console.log(this.name);
    console.log('onActionEnd');
  }
}
const a = new User('织田信长');
const b = new User('丰臣秀吉');

// const eventCenter = EventCenter.getInstence();
// eventCenter.listen({
//   eventType: 'BattleStart',
//   priority: 3,
//   async callback() {
//     console.log('BattleStart priority: 3');
//   },
// });

// eventCenter.listen({
//   eventType: 'BattleStart',
//   filter: a,
//   async callback() {
//     console.log('BattleStart priority: default');
//   },
// });

// eventCenter.listen({
//   eventType: 'RoundStart',
//   filter: [a, b],
//   async callback() {
//     console.log('RoundStart priority: default');
//   },
// });

// const promise = eventCenter.trigger({ uuid: '123' }, { eventType: 'BattleStart', source: a });
// eventCenter.trigger({ uuid: '123' }, { eventType: 'BattleStart', source: b });
// eventCenter.trigger({ uuid: '123' }, { eventType: 'RoundStart', source: b });

// promise.then(() => {
//   console.log('pause');
// });

const eventCenter = EventCenter.getInstence();

eventCenter.trigger(a, { eventType: 'ActionEnd' });
eventCenter.trigger({ uuid: '123' }, { eventType: 'BattleStart' });

console.log('pause');
