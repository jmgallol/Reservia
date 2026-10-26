globalThis.__timing__.logStart('Load chunks/build/blog-V8s8uhDl');import { b as useSeoMeta, a as articles, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DateFormatUtil } from './DateFormatUtil-BeryT2xx.mjs';
import { defineComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
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

//#region app/pages/blog/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useSeoMeta({
			title: "Blog · Reservia",
			description: "Artículos sobre cómo sacar provecho de un dashboard de reservas."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(_attrs)}><h1 class="h2 mb-3 text-primary">Blog</h1><ul class="list-group shadow-sm"><!--[-->`);
			ssrRenderList(unref(articles), (article) => {
				_push(`<li class="list-group-item list-group-item-action position-relative py-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					class: "stretched-link text-decoration-none fw-semibold",
					to: `/blog/${article.id}`
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(article.title)}`);
						else return [createTextVNode(toDisplayString(article.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`<span class="text-body-secondary d-block small">${ssrInterpolate(article.author)} · ${ssrInterpolate(unref(DateFormatUtil).formatLongDate(article.publishedAt))}</span></li>`);
			});
			_push(`<!--]--></ul></section>`);
		};
	}
});
//#endregion
//#region app/pages/blog/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_default = index_vue_vue_type_script_setup_true_lang_default;

export { blog_default as default };;globalThis.__timing__.logEnd('Load chunks/build/blog-V8s8uhDl');
//# sourceMappingURL=blog-V8s8uhDl.mjs.map
