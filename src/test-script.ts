/*
 * @Author: vspirit803
 * @Date: 2020-10-23 16:01:10
 * @Description: 剧本测试
 * @LastEditTime: 2020-10-23 16:03:31
 * @LastEditors: vspirit803
 */
import scriptConfiguration from '@assets/scripts/script001.json';

import { Script } from './Scrpit/Script';

const script = new Script(scriptConfiguration);

while (script.hasNext) {
  script.next();
}
