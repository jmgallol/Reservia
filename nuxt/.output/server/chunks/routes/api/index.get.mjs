globalThis.__timing__.logStart('Load chunks/routes/api/index.get');import { c as defineEventHandler } from '../../_/nitro.mjs';
import { r as restaurants } from '../../_/restaurants.mjs';
import 'unhead/server';
import 'vue';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const index_get = defineEventHandler(async () => {
  return restaurants;
});

export { index_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/index.get');
//# sourceMappingURL=index.get.mjs.map
