import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { m as t, o as n } from "./events-DXdLblY2.js";
import { h as r } from "./Viewer-BkYWLmB5.js";
import { b as i, c as a, h as o, l as s, s as c, t as l } from "./SidebarWorkflowSection-DvOLlR6w.js";
import { A as u, D as d, E as f, G as p, J as m, N as h, O as g, T as _, V as v, dt as y, ft as b, k as x, lt as S, rt as ee } from "./mjr-primevue-BOf2ACk_.js";
//#region ui/vue/components/viewer/ViewerMetadataBlock.vue?vue&type=script&setup=true&lang.ts
var C = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "10px",
	"margin-bottom": "14px"
} }, w = {
	key: 0,
	style: {
		"font-size": "12px",
		"font-weight": "600",
		"letter-spacing": "0.02em",
		color: "rgba(255,255,255,0.86)"
	}
}, T = {
	key: 2,
	style: {
		padding: "10px 12px",
		"border-radius": "10px",
		border: "1px solid rgba(33,150,243,0.35)",
		background: "rgba(33,150,243,0.08)",
		color: "rgba(255,255,255,0.86)",
		"white-space": "pre-wrap"
	}
}, E = { style: {
	"font-size": "12px",
	"font-weight": "700",
	"margin-bottom": "6px"
} }, D = { style: {
	"font-size": "12px",
	opacity: "0.88"
} }, O = { style: {
	"font-size": "12px",
	"font-weight": "700",
	"margin-bottom": "6px"
} }, k = { style: {
	"font-size": "12px",
	opacity: "0.9"
} }, A = {
	key: 7,
	style: {
		padding: "10px 12px",
		"border-radius": "10px",
		border: "1px solid rgba(255,255,255,0.12)",
		background: "rgba(255,255,255,0.06)",
		color: "rgba(255,255,255,0.72)"
	}
}, j = {
	key: 8,
	style: {
		border: "1px solid rgba(255,255,255,0.10)",
		"border-radius": "10px",
		background: "rgba(255,255,255,0.04)",
		overflow: "hidden"
	}
}, M = { style: {
	cursor: "pointer",
	padding: "10px 12px",
	color: "rgba(255,255,255,0.78)",
	"user-select": "none"
} }, te = { style: {
	margin: "0",
	padding: "10px 12px",
	"max-height": "280px",
	overflow: "auto",
	"font-size": "11px",
	"line-height": "1.35",
	color: "rgba(255,255,255,0.86)"
} }, N = /* @__PURE__ */ h({
	__name: "ViewerMetadataBlock",
	props: {
		title: {},
		asset: {},
		loading: { type: Boolean },
		onRetry: { type: [Function, null] }
	},
	setup(e) {
		let r = e, o = ee(!1);
		async function h() {
			if (!o.value) {
				o.value = !0;
				try {
					await i(r.asset || null);
				} finally {
					o.value = !1;
				}
			}
		}
		function N(e) {
			try {
				if (!e || typeof e != "object") return null;
				let t = e?.metadata_raw;
				return t && typeof t == "object" && t.geninfo_status && typeof t.geninfo_status == "object" ? t.geninfo_status : e?.geninfo_status && typeof e.geninfo_status == "object" ? e.geninfo_status : null;
			} catch {
				return null;
			}
		}
		function P(e) {
			let t = e?.metadata_raw ?? null;
			if (!t) return null;
			if (typeof t == "object") return t;
			if (typeof t != "string") return null;
			let n = t.trim();
			if (!n) return null;
			try {
				let e = JSON.parse(n);
				return e && typeof e == "object" ? e : null;
			} catch {
				return null;
			}
		}
		function F(e) {
			try {
				let t = Object.entries(e || {});
				if (!t.length) return !1;
				let n = 0;
				for (let [, e] of t.slice(0, 50)) if (e && typeof e == "object" && (e.inputs && typeof e.inputs == "object" && (n += 1), n >= 2)) return !0;
			} catch {
				return !1;
			}
			return !1;
		}
		function I(e) {
			let t = P(e), n = e?.workflow || e?.Workflow || e?.comfy_workflow || t?.workflow || t?.Workflow || t?.comfy_workflow || null;
			if (!n) return null;
			if (typeof n == "object") return n;
			if (typeof n != "string") return null;
			let r = n.trim();
			if (!r) return null;
			try {
				return JSON.parse(r);
			} catch {
				return null;
			}
		}
		function L(e) {
			let t = P(e), n = e?.prompt || e?.Prompt || t?.prompt || t?.Prompt || null;
			if (!n) return null;
			if (typeof n == "object") return F(n) ? n : null;
			if (typeof n != "string") return null;
			let r = n.trim();
			if (!r) return null;
			try {
				let e = JSON.parse(r);
				return F(e) ? e : null;
			} catch {
				return null;
			}
		}
		function R(e) {
			return !!(I(e) || L(e));
		}
		function z(e) {
			let t = e || {}, n = t.generation_time || t.file_creation_time || t.mtime || t.created_at;
			return !!(t.width && t.height || t.duration && t.duration > 0 || n || t.size && t.size > 0 || t.size_bytes && t.size_bytes >= 0 || t.metadata_raw?.raw_ffprobe || t.id != null || t.job_id || t.file_info?.job_id || t.source_node_id || t.file_info?.source_node_id || t.source_node_type || t.file_info?.source_node_type || t.workflow_id || t.file_info?.workflow_id || t.user_metadata?.workflow?.id || t.metadata?.workflow_id);
		}
		function B(e) {
			if (e == null) return "";
			let t = typeof e == "string" ? e : JSON.stringify(e, null, 2);
			return t ? t.length > 4e4 ? `${t.slice(0, 4e4)}\n...(truncated)` : t : "";
		}
		function V() {
			typeof r.onRetry == "function" && r.onRetry();
		}
		let H = _(() => N(r.asset)), U = _(() => a(r.asset)), W = _(() => U.value.kind !== "empty"), G = _(() => z(r.asset)), K = _(() => n.WORKFLOW_MINIMAP_ENABLED !== !1 && R(r.asset)), q = _(() => H.value && typeof H.value == "object" && H.value.kind === "fetch_error"), J = _(() => B(r.asset?.metadata_raw)), Y = _(() => !r.loading && !q.value && !G.value && !W.value && !K.value), X = _(() => {
			if (!q.value) return "";
			let e = String(H.value?.message || H.value?.error || "Failed to load generation data."), n = String(H.value?.code || H.value?.stage || "").trim();
			return n ? t("viewer.metadataErrorWithCode", "{message}\n\nCode: {code}\nClick to retry.", {
				message: e,
				code: n
			}) : t("viewer.metadataErrorRetry", "{message}\n\nClick to retry.", { message: e });
		});
		return (e, n) => {
			let i = p("MButton");
			return v(), x("div", C, [
				r.title ? (v(), x("div", w, b(r.title), 1)) : g("", !0),
				r.asset ? (v(), d(i, {
					key: 1,
					type: "button",
					class: "mjr-icon-btn mjr-open-workflow-btn",
					disabled: o.value,
					"aria-busy": o.value,
					title: S(t)("tooltip.openAssetWorkflow", "Open this media’s saved workflow or execution settings in a new ComfyUI tab"),
					onClick: h
				}, {
					default: m(() => [u(b(S(t)("btn.openAssetWorkflow", "Open workflow")), 1)]),
					_: 1
				}, 8, [
					"disabled",
					"aria-busy",
					"title"
				])) : g("", !0),
				r.loading ? (v(), x("div", T, [f("div", E, b(S(t)("status.loading", "Loading")), 1), f("div", D, b(S(t)("viewer.loadingGenerationData", "Loading generation data...")), 1)])) : g("", !0),
				q.value ? (v(), x("div", {
					key: 3,
					style: y([{
						padding: "10px 12px",
						"border-radius": "10px",
						border: "1px solid rgba(244,67,54,0.35)",
						background: "rgba(244,67,54,0.08)",
						color: "rgba(255,255,255,0.9)",
						"white-space": "pre-wrap"
					}, { cursor: r.onRetry ? "pointer" : "default" }]),
					onClick: V
				}, [f("div", O, b(S(t)("viewer.errorLoadingMetadata", "Error Loading Metadata")), 1), f("div", k, b(X.value), 1)], 4)) : g("", !0),
				G.value ? (v(), d(s, {
					key: 4,
					asset: r.asset
				}, null, 8, ["asset"])) : g("", !0),
				W.value ? (v(), d(c, {
					key: 5,
					asset: r.asset
				}, null, 8, ["asset"])) : g("", !0),
				K.value ? (v(), d(l, {
					key: 6,
					asset: r.asset
				}, null, 8, ["asset"])) : g("", !0),
				Y.value ? (v(), x("div", A, b(S(t)("viewer.noGenerationDataFile", "No generation data found for this file.")), 1)) : g("", !0),
				J.value ? (v(), x("details", j, [f("summary", M, b(S(t)("msg.rawMetadata", "Raw metadata")), 1), f("pre", te, b(J.value), 1)])) : g("", !0)
			]);
		};
	}
}), P = /* @__PURE__ */ e({
	buildViewerMetadataBlocks: () => ae,
	ensureViewerMetadataAsset: () => $
}), F = (e, t = null) => {
	let n = r(e);
	return n === void 0 ? t : n;
}, I = n?.VIEWER_GENINFO_TTL_MS ?? 3e4, L = n?.VIEWER_GENINFO_ERROR_TTL_MS ?? 8e3, R = n?.VIEWER_GENINFO_MAX_ENTRIES ?? 300, z = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), H = (e, t, n) => {
	try {
		let r = Date.now();
		for (let [n, i] of e.entries()) {
			if (!i) {
				e.delete(n);
				continue;
			}
			r - (i.at || 0) > t && e.delete(n);
		}
		if (e.size <= n) return;
		let i = Array.from(e.entries()).sort((e, t) => (e?.[1]?.at || 0) - (t?.[1]?.at || 0)), a = e.size - n;
		for (let t = 0; t < a; t++) {
			let n = i[t]?.[0];
			n != null && e.delete(n);
		}
	} catch (e) {
		console.debug?.(e);
	}
}, U = (e, t, n) => {
	try {
		let r = e.get(t);
		return r ? Date.now() - (r.at || 0) > n ? (e.delete(t), null) : r.data ?? null : null;
	} catch {
		return null;
	}
}, W = (e, t, n, r, i) => {
	try {
		e.set(t, {
			at: Date.now(),
			data: n
		}), H(e, r, i);
	} catch (e) {
		console.debug?.(e);
	}
}, G = (e) => {
	try {
		let t = e?.id;
		if (t != null) return `id:${t}`;
		let n = Z(e);
		if (n) return `fp:${n}`;
		let r = String(e?.filename || e?.name || "").trim(), i = String(e?.subfolder || "").trim(), a = String(e?.source || e?.type || "output").trim().toLowerCase();
		if (r) return `name:${a}:${i}:${r}`;
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}, K = (e) => {
	try {
		if (!e || typeof e != "object") return null;
		let t = e?.metadata_raw;
		return t && typeof t == "object" && t.geninfo_status && typeof t.geninfo_status == "object" ? t.geninfo_status : e?.geninfo_status && typeof e.geninfo_status == "object" ? e.geninfo_status : null;
	} catch {
		return null;
	}
}, q = (e, t) => {
	try {
		if (!e || typeof e != "object" || !t || typeof t != "object") return;
		try {
			e.geninfo_status = t;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			let n = e.metadata_raw;
			if (n && typeof n == "object") {
				n.geninfo_status = t, e.metadata_raw = n;
				return;
			}
			if (typeof n == "string") return;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			e.metadata_raw = { geninfo_status: t };
		} catch (e) {
			console.debug?.(e);
		}
	} catch (e) {
		console.debug?.(e);
	}
}, J = (e) => {
	try {
		if (!e || typeof e != "object") return !1;
		if (e.geninfo && typeof e.geninfo == "object" && Object.keys(e.geninfo).length || e.prompt != null || e.workflow != null || e.metadata != null || e.exif != null) return !0;
		let t = e.metadata_raw;
		if (t && typeof t == "object") {
			for (let e of [
				"geninfo",
				"GenInfo",
				"generation",
				"prompt",
				"Prompt",
				"negative_prompt",
				"workflow",
				"Workflow",
				"comfy_workflow",
				"geninfo_status"
			]) if (t[e] != null) return !0;
			return !1;
		}
		if (typeof t == "string") {
			let e = t.trim();
			if (!e || e === "{}" || e === "null" || e === "[]" || e === "{{}}") return !1;
			for (let t of [
				"Negative prompt:",
				"\"prompt\"",
				"\"negative_prompt\"",
				"\"geninfo\"",
				"\"workflow\"",
				"\"comfy_workflow\""
			]) if (e.includes(t)) return !0;
			return !1;
		}
		return !1;
	} catch {
		return !1;
	}
}, Y = (e) => {
	let t = typeof e == "string" ? e.trim() : "";
	if (!t || t.includes("\n")) return !1;
	if (/^[A-Za-z]:[\\/]/.test(t)) return !0;
	let n = t.replace(/\\/g, "/");
	return /(?:^|\/)[^/\n]+\.(?:png|jpe?g|webp|gif|bmp|tiff?|avif|heic|heif|apng|hdr|svg|mp4|webm|mov|mkv|avi|m4v|mp3|wav|flac|ogg)$/i.test(n);
}, X = (e) => {
	try {
		if (!e || typeof e != "object") return !1;
		if (e.geninfo && typeof e.geninfo == "object" && Object.keys(e.geninfo).length) return !0;
		if (e.metadata_raw && typeof e.metadata_raw == "object") {
			let t = e.metadata_raw;
			if (t.geninfo || t.GenInfo || t.generation || t.parameters || typeof t.prompt == "string" && t.prompt.trim() && !Y(t.prompt) || t.prompt && typeof t.prompt == "object") return !0;
			let n = t.raw_ffprobe?.format?.tags || t.ffprobe?.format?.tags || null;
			if (n && typeof n == "object") {
				let e = n.prompt || n["comfyui:prompt"] || n.comfy_prompt;
				if (e && !Y(e)) return !0;
			}
		}
		return !!(e.prompt && typeof e.prompt == "object" || typeof e.prompt == "string" && e.prompt.trim() && !Y(e.prompt));
	} catch {
		return !1;
	}
}, Z = (e) => {
	let t = e?.filepath || e?.path || e?.file_info?.filepath || e?.file_info?.path || e?.filePath || null;
	return typeof t == "string" && t.trim() || null;
}, ne = (e) => {
	try {
		if (String(e?.mime || e?.mimetype || e?.type || "").toLowerCase().startsWith("video/")) return !0;
		let t = (Z(e) || String(e?.filename || e?.name || "")).split(".").pop()?.toLowerCase?.() || "";
		return [
			"mp4",
			"webm",
			"mov",
			"mkv",
			"avi",
			"m4v",
			"gif"
		].includes(t);
	} catch {
		return !1;
	}
}, Q = (e) => {
	if (!e) return null;
	if (typeof e == "object") return e;
	if (typeof e != "string") return null;
	let t = e.trim();
	return t ? F(() => {
		let e = JSON.parse(t);
		return e && typeof e == "object" ? e : null;
	}, null) : null;
}, re = (e) => {
	try {
		if (!ne(e) || e?.geninfo || e?.prompt || e?.workflow || e?.metadata) return;
		let t = Q(e?.metadata_raw) || {};
		if (t.geninfo_status) return;
		if (e?.geninfo_status) {
			t.geninfo_status = e.geninfo_status, e.metadata_raw = t;
			return;
		}
		t.geninfo_status = { kind: "media_pipeline" }, e.metadata_raw = t;
	} catch (e) {
		console.debug?.(e);
	}
}, ie = (e, t) => {
	let n = t && typeof t == "object" ? t : null;
	if (!n) return e;
	try {
		e.prompt = e.prompt ?? n.prompt;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e.workflow = e.workflow ?? n.workflow;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e.geninfo = e.geninfo ?? n.geninfo;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e.geninfo_status = e.geninfo_status ?? n.geninfo_status;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e.exif = e.exif ?? n.exif;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		e.ffprobe = e.ffprobe ?? n.ffprobe;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		if (e.metadata_raw == null) e.metadata_raw = n;
		else {
			let t = Q(e.metadata_raw);
			if (t && typeof t == "object") {
				for (let e of [
					"geninfo_status",
					"workflow",
					"prompt",
					"geninfo"
				]) (t[e] == null && n[e] != null || e === "prompt" && Y(t[e]) && n[e] != null) && (t[e] = n[e]);
				n.raw_ffprobe && t.raw_ffprobe == null && (t.raw_ffprobe = n.raw_ffprobe), n.ffprobe && t.ffprobe == null && (t.ffprobe = n.ffprobe), e.metadata_raw = t;
			}
		}
	} catch (e) {
		console.debug?.(e);
	}
	return e;
};
async function $(e, { getAssetMetadata: t, getFileMetadataScoped: n, metadataCache: r, signal: i } = {}) {
	if (!e || typeof e != "object") return e;
	let a = e?.id ?? null, o = G(e), s = e, c = o ? U(z, o, I) : null;
	if (c && typeof c == "object") return {
		...e,
		...c
	};
	let l = o ? U(B, o, L) : null;
	if (l) {
		try {
			q(s, l);
		} catch (e) {
			console.debug?.(e);
		}
		return s;
	}
	if (o && V.has(o)) try {
		let e = V.get(o);
		if (e && typeof e.then == "function") return await e;
	} catch (e) {
		console.debug?.(e);
	}
	let u = async () => {
		let c = a == null ? null : F(() => r?.getCached?.(a)?.data || null, null);
		c && typeof c == "object" && (s = {
			...e,
			...c
		});
		let l = !!(s?.has_generation_data || s?.has_workflow || s?.has_generation || s?.has_generation_info), u = !!(s?.geninfo || s?.prompt || s?.workflow || s?.metadata), d = null;
		if (a != null && (!X(s) || l && !u)) {
			let e = await F(() => t?.(a, i ? { signal: i } : {}), null);
			e?.ok && e.data && typeof e.data == "object" ? (s = {
				...s,
				...e.data
			}, F(() => r?.setCached?.(a, e.data))) : e && e?.code !== "ABORTED" && (d = {
				kind: "fetch_error",
				stage: "asset",
				code: e?.code || "FETCH_ERROR",
				message: e?.error || "Failed to load asset metadata"
			});
		}
		if (!X(s)) try {
			let e = String(s?.source || s?.type || "output").trim().toLowerCase() || "output", t = String(s?.filename || s?.name || s?.file_info?.filename || "").trim(), r = String(s?.subfolder || s?.file_info?.subfolder || "").trim(), a = String(s?.root_id || s?.rootId || s?.file_info?.root_id || "").trim(), o = String(s?.filepath || s?.path || s?.file_info?.filepath || "").trim();
			if (t) {
				let c = await F(() => n?.({
					type: e,
					filename: t,
					subfolder: r,
					root_id: a,
					filepath: o
				}, i ? { signal: i } : {}), null);
				c?.ok && c.data ? s = ie({ ...s }, c.data) : c && c?.code !== "ABORTED" && (d = {
					kind: "fetch_error",
					stage: "file_scoped",
					code: c?.code || "FETCH_ERROR",
					message: c?.error || "Failed to extract file metadata"
				});
			}
		} catch (e) {
			console.debug?.(e);
		}
		if (re(s), !J(s) && d) {
			let e = K(s);
			e && e.kind === "media_pipeline" || q(s, d);
		}
		return X(s) && o ? W(z, o, s, I, R) : d && o && W(B, o, d, L, R), s;
	};
	if (o) {
		let e = () => {
			try {
				V.delete(o);
			} catch (e) {
				console.debug?.(e);
			}
		};
		try {
			i?.addEventListener?.("abort", e, { once: !0 });
		} catch (e) {
			console.debug?.(e);
		}
		let t = u().finally(() => {
			try {
				i?.removeEventListener?.("abort", e);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				V.delete(o);
			} catch (e) {
				console.debug?.(e);
			}
		});
		return V.set(o, t), await t;
	}
	return await u();
}
function ae({ title: e, asset: t, ui: n } = {}) {
	let r = document.createElement("div");
	try {
		let { app: i } = o(N, {
			title: e,
			asset: t,
			loading: !!n?.loading,
			onRetry: typeof n?.onRetry == "function" ? n.onRetry : null
		});
		return i.mount(r), r._mjrDispose = () => {
			try {
				i.unmount();
			} catch (e) {
				console.debug?.(e);
			}
		}, r;
	} catch (e) {
		console.debug?.(e);
	}
	let i = document.createElement("div");
	if (i.style.cssText = "display:flex; flex-direction:column; gap:10px; margin-bottom: 14px;", e) {
		let t = document.createElement("div");
		t.textContent = e, t.style.cssText = "font-size: 12px; font-weight: 600; letter-spacing: 0.02em; color: rgba(255,255,255,0.86);", i.appendChild(t);
	}
	let a = t?.metadata_raw;
	if (a != null) {
		let e = document.createElement("details");
		e.style.cssText = "border: 1px solid rgba(255,255,255,0.10); border-radius: 10px; background: rgba(255,255,255,0.04); overflow: hidden;";
		let t = document.createElement("summary");
		t.textContent = "Raw metadata", t.style.cssText = "cursor: pointer; padding: 10px 12px; color: rgba(255,255,255,0.78); user-select: none;";
		let n = document.createElement("pre");
		n.style.cssText = "margin:0; padding: 10px 12px; max-height: 280px; overflow:auto; font-size: 11px; line-height: 1.35; color: rgba(255,255,255,0.86);";
		let r = typeof a == "string" ? a : JSON.stringify(a, null, 2);
		r.length > 4e4 && (r = `${r.slice(0, 4e4)}\n...(truncated)`), n.textContent = r, e.appendChild(t), e.appendChild(n), i.appendChild(e);
	}
	return i;
}
//#endregion
export { P as n, $ as t };
