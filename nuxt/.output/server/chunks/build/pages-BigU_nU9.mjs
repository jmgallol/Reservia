globalThis.__timing__.logStart('Load chunks/build/pages-BigU_nU9');import { b as useSeoMeta, N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useSeoMeta({
			title: "Inicio · Reservia",
			description: "Mini versión de Reservia: blog, restaurantes y herramientas para tus reservas."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "p-5 mb-4 bg-primary-subtle border border-primary-subtle rounded-3 shadow-sm text-center" }, _attrs))}><h1 class="display-5 fw-bold text-primary">Reservia</h1><p class="lead text-body-secondary">Mini versión del proyecto, utilizando Nuxt.</p><div class="d-flex flex-wrap justify-content-center gap-2">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "btn text-bg-primary",
				to: "/restaurants"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Ver restaurantes`);
					else return [createTextVNode("Ver restaurantes")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "btn btn-outline-dark",
				to: "/blog"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Leer el blog`);
					else return [createTextVNode("Leer el blog")];
				}),
				_: 1
			}, _parent));
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };;globalThis.__timing__.logEnd('Load chunks/build/pages-BigU_nU9');
//# sourceMappingURL=pages-BigU_nU9.mjs.map
