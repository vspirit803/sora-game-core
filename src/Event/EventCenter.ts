/*
 * @Author: vspirit803
 * @Date: 2020-09-24 16:31:12
 * @Description:
 * @LastEditTime: 2020-09-24 17:44:29
 * @LastEditors: vspirit803
 */
import { UUID } from '@src/Common';

import { EventTypes } from './EventTypes';

interface EventData {
  [propName: string]: unknown;
}

class EventListener {
  eventType: EventTypes;
  priority: number;
  filters: Array<string>;
  callback: (eventData: EventData) => Promise<any>;
  timestamp: number;

  constructor({
    eventType,
    priority,
    filters,
    callback,
  }: {
    eventType: EventTypes;
    priority: number;
    filters: Array<string>;
    callback: (eventData: EventData) => Promise<any>;
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

  private constructor() {
    this.listeners = [];
  }

  listen({
    eventType,
    priority = 5,
    filter,
    callback,
  }: {
    eventType: EventTypes;
    priority?: number;
    filter?: UUID | Array<UUID>;
    callback: (eventData: EventData) => Promise<any>;
  }): EventListener {
    let filters: Array<string>;
    if (filter === undefined) {
      filters = [];
    } else if (!Array.isArray(filter)) {
      filters = [filter.uuid];
    } else {
      filters = filter.map((each) => each.uuid);
    }

    const listener = new EventListener({ eventType, priority, filters, callback });
    this.listeners.push(listener);
    return listener;
  }

  cancelListen(listener: EventListener) {
    this.listeners = this.listeners.filter((eachListener) => eachListener !== listener);
  }

  async trigger({ eventType, source }: { eventType: EventTypes; source: UUID }) {
    const reachableListeners = this.listeners
      .filter((eachListener) => eachListener.eventType === eventType)
      //listener不过滤或过滤器包含当前发布者
      .filter((eachListener) => eachListener.filters.length === 0 || eachListener.filters.includes(source.uuid));

    const sortedListeners = reachableListeners.sort((a, b) =>
      a.priority !== b.priority ? b.priority - a.priority : a.timestamp - b.timestamp,
    );

    for (let i = 0; i < sortedListeners.length; i++) {
      const eachListener = sortedListeners[i];
      await eachListener.callback({});
    }
  }
}
