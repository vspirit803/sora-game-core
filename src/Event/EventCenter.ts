/*
 * @Author: vspirit803
 * @Date: 2020-09-24 16:31:12
 * @Description:
 * @LastEditTime: 2020-09-27 09:11:38
 * @LastEditors: vspirit803
 */
import { UUID } from '@src/Common';

import { EventData } from './EventData';

export class EventListener<T extends EventData = EventData> {
  eventType: T['type'];
  priority: number;
  filters: Array<string>;
  callback: (eventData: T) => Promise<any>;
  timestamp: number;

  constructor({
    eventType,
    priority,
    filters,
    callback,
  }: {
    eventType: T['type'];
    priority: number;
    filters: Array<string>;
    callback: (eventData: T) => Promise<any>;
  }) {
    this.eventType = eventType;
    this.priority = priority;
    this.filters = filters;
    this.callback = callback;

    this.timestamp = Date.now();
  }
}

export class EventCenter {
  static instence: EventCenter;
  static getInstence(): EventCenter {
    if (!EventCenter.instence) {
      EventCenter.instence = new EventCenter();
    }
    return EventCenter.instence;
  }

  listeners: Array<EventListener>;

  public constructor() {
    this.listeners = [];
  }

  listen<T extends EventData>({
    eventType,
    priority = 5,
    filter,
    callback,
  }: {
    eventType: T['type'];
    priority?: number;
    filter?: UUID | Array<UUID>;
    callback: (eventData: T) => Promise<void>;
  }): EventListener<T> {
    let filters: Array<string>;
    if (filter === undefined) {
      filters = [];
    } else if (!Array.isArray(filter)) {
      filters = [filter.uuid];
    } else {
      filters = filter.map((each) => each.uuid);
    }

    const listener = new EventListener({ eventType, priority, filters, callback });
    this.listeners.push((listener as unknown) as EventListener);
    return listener;
  }

  cancelListen(listener: EventListener) {
    this.listeners = this.listeners.filter((eachListener) => eachListener !== listener);
  }

  async trigger<T extends EventData>(source: UUID, eventData: T): Promise<void> {
    const eventType = eventData.eventType;
    const reachableListeners = this.listeners
      .filter((eachListener) => eachListener.eventType === eventType)
      //listener不过滤或过滤器包含当前发布者
      .filter((eachListener) => eachListener.filters.length === 0 || eachListener.filters.includes(source.uuid));

    const sortedListeners = reachableListeners.sort((a, b) =>
      a.priority !== b.priority ? b.priority - a.priority : a.timestamp - b.timestamp,
    );

    for (let i = 0; i < sortedListeners.length; i++) {
      const eachListener = sortedListeners[i];
      await eachListener.callback(eventData);
    }
  }
}
