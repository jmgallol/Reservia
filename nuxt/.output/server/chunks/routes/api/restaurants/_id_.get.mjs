globalThis.__timing__.logStart('Load chunks/routes/api/restaurants/_id_.get');import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { r as restaurants } from '../../../_/restaurants.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, statusMessage: "El id del restaurante no es v\xE1lido" });
  }
  const restaurant = restaurants.find((item) => item.id === id);
  if (!restaurant) {
    throw createError({ statusCode: 404, statusMessage: "Restaurante no encontrado" });
  }
  return restaurant;
});

export { _id__get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/restaurants/_id_.get');
//# sourceMappingURL=_id_.get.mjs.map
