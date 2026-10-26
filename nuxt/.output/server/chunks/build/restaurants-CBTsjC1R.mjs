globalThis.__timing__.logStart('Load chunks/build/restaurants-CBTsjC1R');import { b as useSeoMeta, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useFetch } from './fetch-Dw9Nrv0H.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'unhead/server';
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
import '../routes/renderer.mjs';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';

//#region app/pages/restaurants/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: restaurants } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/restaurants", "$09N4Dlm5gZ")), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: "Restaurantes · Reservia",
			description: "Explora los restaurantes disponibles para reservar en Reservia."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(_attrs)}><h1 class="h2 mb-3 text-primary">Restaurantes</h1><ul class="list-group shadow-sm"><!--[-->`);
			ssrRenderList(unref(restaurants), (restaurant) => {
				_push(`<li class="list-group-item list-group-item-action position-relative py-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					class: "stretched-link text-decoration-none fw-semibold",
					to: `/restaurants/${restaurant.id}`
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(restaurant.name)}`);
						else return [createTextVNode(toDisplayString(restaurant.name), 1)];
					}),
					_: 2
				}, _parent));
				_push(`<span class="text-body-secondary d-block small">${ssrInterpolate(restaurant.category)} · ${ssrInterpolate(restaurant.city)}</span></li>`);
			});
			_push(`<!--]--></ul></section>`);
		};
	}
});
//#endregion
//#region app/pages/restaurants/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/restaurants/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var restaurants_default = index_vue_vue_type_script_setup_true_lang_default;

export { restaurants_default as default };;globalThis.__timing__.logEnd('Load chunks/build/restaurants-CBTsjC1R');
//# sourceMappingURL=restaurants-CBTsjC1R.mjs.map
