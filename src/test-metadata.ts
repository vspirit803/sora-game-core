/*
 * @Author: vspirit803
 * @Date: 2020-09-25 08:23:44
 * @Description:
 * @LastEditTime: 2020-09-25 09:53:34
 * @LastEditors: vspirit803
 */

import 'reflect-metadata';

function Listen(value: string): MethodDecorator {
  return (target, key, descriptor) => {
    if (typeof descriptor.value !== 'function') {
      throw Error('Listen装饰器只能用于方法');
    }
    Reflect.defineMetadata('testKey', value, descriptor.value);
  };
}

function Listener(value: string) {
  function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        const instence = super(args);

        const prototype = constructor.prototype;
        const methodNames = Object.getOwnPropertyNames(prototype).filter(
          (key) => key !== 'constructor' && typeof prototype[key] === 'function',
        );

        methodNames.forEach((each) => {
          const fn = prototype[each] as Function;
          console.log(Reflect.getMetadataKeys(fn));
          console.log(Reflect.getMetadata('testKey', fn));
        });
      }
    };
  }
  return classDecorator;
}

@Listener('test')
class Test {
  @Listen('我是a')
  a() {
    console.log('a');
  }

  @Listen('我是b')
  b() {
    console.log('b');
  }
}

const t = new Test();
const l = new Test();

console.log('pause');
