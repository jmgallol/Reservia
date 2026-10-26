globalThis.__timing__.logStart('Load chunks/build/_id_-B70M-3zl');import { u as useRoute$1, a as articles, b as useSeoMeta, N as NuxtLink } from '../virtual/entry.mjs';
import { D as DateFormatUtil } from './DateFormatUtil-BeryT2xx.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

//#endregion
//#region app/pages/blog/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const id = computed(() => String(route.params.id));
		const article = computed(() => articles.find((item) => item.id === id.value));
		useSeoMeta({
			title: () => `${article.value?.title} · Reservia`,
			description: () => article.value?.summary
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (unref(article)) {
				_push(`<article${ssrRenderAttrs(mergeProps({
					class: "mx-auto",
					style: { "max-width": "720px" }
				}, _attrs))}><p class="mb-1">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					class: "text-decoration-none small",
					to: "/blog"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`← Todos los artículos`);
						else return [createTextVNode("← Todos los artículos")];
					}),
					_: 1
				}, _parent));
				_push(`</p><h1 class="h2 fw-bold text-primary">${ssrInterpolate(unref(article).title)}</h1><p class="text-body-secondary small">${ssrInterpolate(unref(article).author)} · ${ssrInterpolate(unref(DateFormatUtil).formatLongDate(unref(article).publishedAt))}</p><!--[-->`);
				ssrRenderList(unref(article).paragraphs, (paragraph) => {
					_push(`<p>${ssrInterpolate(paragraph)}</p>`);
				});
				_push(`<!--]--></article>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region app/pages/blog/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };;globalThis.__timing__.logEnd('Load chunks/build/_id_-B70M-3zl');
//# sourceMappingURL=_id_-B70M-3zl.mjs.map
