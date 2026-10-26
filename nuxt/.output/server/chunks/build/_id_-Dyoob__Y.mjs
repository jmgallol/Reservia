globalThis.__timing__.logStart('Load chunks/build/_id_-Dyoob__Y');import { u as useRoute$1, c as createError$2, b as useSeoMeta, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useFetch } from './fetch-Dw9Nrv0H.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

//#region app/pages/restaurants/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const id = useRoute$1().params.id;
		const { data: restaurant, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/restaurants/${id}`, "$UnaHkt7N9O")), __temp = await __temp, __restore(), __temp);
		if (error.value) throw createError$2({
			statusCode: error.value.statusCode,
			statusMessage: error.value.statusMessage,
			fatal: true
		});
		useSeoMeta({
			title: () => `${restaurant.value?.name} · Reservia`,
			description: () => restaurant.value?.description
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (unref(restaurant)) {
				_push(`<article${ssrRenderAttrs(_attrs)}><p class="mb-1">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					class: "text-decoration-none small",
					to: "/restaurants"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`← Todos los restaurantes`);
						else return [createTextVNode("← Todos los restaurantes")];
					}),
					_: 1
				}, _parent));
				_push(`</p><h1 class="h2">${ssrInterpolate(unref(restaurant).name)}</h1><p class="lead mb-2">${ssrInterpolate(unref(restaurant).category)} · ★ ${ssrInterpolate(unref(restaurant).averageRating)}</p><p>${ssrInterpolate(unref(restaurant).description)}</p><dl class="row mb-0"><dt class="col-sm-3">Ubicación</dt><dd class="col-sm-9">${ssrInterpolate(unref(restaurant).address)}, ${ssrInterpolate(unref(restaurant).city)}</dd><dt class="col-sm-3">Horario</dt><dd class="col-sm-9">${ssrInterpolate(unref(restaurant).openingTime)} – ${ssrInterpolate(unref(restaurant).closingTime)}</dd></dl></article>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region app/pages/restaurants/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/restaurants/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };;globalThis.__timing__.logEnd('Load chunks/build/_id_-Dyoob__Y');
//# sourceMappingURL=_id_-Dyoob__Y.mjs.map
