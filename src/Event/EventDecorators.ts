import 'reflect-metadata';

import { UUID } from '@src/Common';

import { EventCenter } from './EventCenter';
import { EventData } from './EventData';
import { EventTypes } from './EventTypes';

/*
 * @Author: vspirit803
 * @Date: 2020-09-25 14:06:27
 * @Description: 监听事件的装饰器
 * @LastEditTime: 2020-09-25 17:12:28
 * @LastEditors: vspirit803
 */

interface ListenOptions<T> {
  /**
   * 事件类型
   */
  eventType: T;
  /**
   * 默认取当前对象(若实现了UUID接口)
   * this绑定至当前对象
   * 需用(this as XXX) 强转this类型
   * */
  filterFunction?: () => UUID | Array<UUID> | undefined;
  /**
   * 优先级
   */
  priority?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type MyMethodDecorator<T> = (
  target: Record<string, any>,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => void | TypedPropertyDescriptor<T>;

export function Listen<T extends EventData>({
  eventType,
  priority,
  filterFunction,
}: ListenOptions<T['eventType']> & ThisType<any>): MyMethodDecorator<(eventData: T) => Promise<void>> {
  return (target, key, descriptor: TypedPropertyDescriptor<(eventData: T) => Promise<void>>) => {
    if (typeof descriptor.value !== 'function') {
      throw Error('Listen装饰器只能用于方法');
    }
    const existed = Reflect.getMetadata(eventType, target) ?? [];
    Reflect.defineMetadata(eventType, [...existed, { callback: descriptor.value, priority, filterFunction }], target);
  };
}

export function Listener(value?: string) {
  function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const eventNames: Array<EventTypes> = Reflect.getMetadataKeys(this);
        for (const eachEvent of eventNames) {
          const listeners: Array<{
            callback: (eventData: EventData) => Promise<void>;
            priority?: number;
            filterFunction?: () => UUID | Array<UUID>;
          }> = Reflect.getMetadata(eachEvent, this);
          for (const eachListener of listeners) {
            const { priority, filterFunction, callback } = eachListener;
            let filter: UUID | Array<UUID> | undefined;
            if (filterFunction) {
              filter = filterFunction.call(this);
            } else if (Reflect.ownKeys(this).includes('uuid')) {
              filter = (this as unknown) as UUID;
            }
            EventCenter.getInstence().listen({
              eventType: eachEvent,
              priority,
              filter,
              callback: callback.bind(this),
            });
          }
        }
      }
    };
  }
  return classDecorator;
}
