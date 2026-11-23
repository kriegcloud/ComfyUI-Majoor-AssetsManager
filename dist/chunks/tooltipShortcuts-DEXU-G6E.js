import { An as e, Sn as t, Un as n, _n as r, an as i, dn as a, xn as o } from "./client-CpKyshuF.js";
import { a as s, n as c } from "./graphTraversal-DTdQWkn5.js";
import { T as l } from "./minimap-CcYrkLC7.js";
import { _ as u, a as d, c as f, d as p, f as ee, g as te, h as m, i as h, l as g, m as _, n as v, o as y, p as ne, r as re, s as ie, t as ae, u as oe } from "./mjr-primevue-C07IsEdU.js";
import { t as se } from "./mjr-vue-vendor-CEDOnn2t.js";
// ui/features/viewer/floatingViewerProgress.ts
var b = "progress-update", x = "__MJR_MFV_PROGRESS_SERVICE__";
function ce() {
	return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
}
function le(e, t) {
	if (typeof CustomEvent == "function") return new CustomEvent(e, { detail: t });
	let n = typeof Event == "function" ? new Event(e) : { type: e };
	return n.detail = t, n;
}
var ue = class {
	constructor(e, n = () => t()) {
		this.id = String(e || ""), this.promptApi = null, this.executedNodeIds = [], this.totalNodes = 0, this.currentlyExecuting = null, this.errorDetails = null, this._getApp = typeof n == "function" ? n : () => null;
	}
	setPrompt(e) {
		let t = e && typeof e == "object" ? e.output : null;
		this.promptApi = t && typeof t == "object" ? t : null, this.totalNodes = this.promptApi ? Object.keys(this.promptApi).length : 0;
	}
	getApiNode(e) {
		return this.promptApi?.[String(e)] || null;
	}
	getNodeLabel(e) {
		let t = this.getApiNode(e), n = t?._meta?.title || t?.class_type || "";
		if (!n) {
			let t = this._getApp?.(), r = c(s(t), e);
			n = r?.title || r?.type || "";
		}
		return String(n || "").trim();
	}
	markExecuted(e) {
		let t = String(e || "").trim();
		t && (this.executedNodeIds.includes(t) || this.executedNodeIds.push(t));
	}
	executing(e, t, n) {
		if (e == null) {
			this.currentlyExecuting = null;
			return;
		}
		let r = String(e || "").trim();
		if (r) {
			if (this.currentlyExecuting?.nodeId !== r) {
				this.currentlyExecuting != null && this.markExecuted(this.currentlyExecuting.nodeId), this.currentlyExecuting = {
					nodeId: r,
					nodeLabel: this.getNodeLabel(r),
					pass: 0
				};
				let e = this.getApiNode(r);
				this.currentlyExecuting.nodeLabel || (this.currentlyExecuting.nodeLabel = this.getNodeLabel(r)), e?.class_type === "UltimateSDUpscale" ? (--this.currentlyExecuting.pass, this.currentlyExecuting.maxPasses = -1) : e?.class_type === "IterativeImageUpscale" && (this.currentlyExecuting.maxPasses = Number(e?.inputs?.steps) || -1);
			}
			if (t != null) {
				let e = Number(t), r = Number(n);
				if (!Number.isFinite(e)) return;
				(!this.currentlyExecuting.step || e < Number(this.currentlyExecuting.step)) && (this.currentlyExecuting.pass += 1), this.currentlyExecuting.step = e, this.currentlyExecuting.maxSteps = Number.isFinite(r) ? r : null;
			}
		}
	}
	error(e) {
		this.errorDetails = e || null;
	}
}, S = class extends EventTarget {
	constructor({ getApi: e = (e) => o(e), getApp: r = () => t(), waitForApi: i = (e) => n(e) } = {}) {
		super(), this._getApi = e, this._getApp = r, this._waitForApi = i, this.promptsMap = /* @__PURE__ */ new Map(), this.currentExecution = null, this.lastQueueRemaining = 0, this._api = null, this._listenerEntries = [], this._initPromise = null, this._hydrations = /* @__PURE__ */ new Map();
	}
	getSnapshot() {
		return {
			queue: this.lastQueueRemaining,
			prompt: this.currentExecution
		};
	}
	getCurrentNodeId() {
		let e = this.currentExecution;
		return String(e?.errorDetails?.node_id || e?.currentlyExecuting?.nodeId || "").trim();
	}
	getOrMakePrompt(e) {
		let t = String(e || "").trim() || "unknown", n = this.promptsMap.get(t);
		return n || (n = new ue(t, this._getApp), this.promptsMap.set(t, n)), n;
	}
	async ensureInitialized({ api: e = null, app: t = null, timeoutMs: n = 0 } = {}) {
		return e && this._api === e ? e : !e && this._api ? this._api : (this._initPromise ||= this._ensureInitializedInternal({
			api: e,
			app: t,
			timeoutMs: n
		}).finally(() => {
			this._initPromise = null;
		}), this._initPromise);
	}
	async _ensureInitializedInternal({ api: e = null, app: t = null, timeoutMs: n = 0 } = {}) {
		let r = e || this._getApi?.(t) || null;
		if (!r && n > 0 && typeof this._waitForApi == "function") try {
			r = await this._waitForApi({
				app: t,
				timeoutMs: n
			});
		} catch (e) {
			console.debug?.(e);
		}
		return r ? (this._attachApi(r), r) : null;
	}
	_attachApi(e) {
		e && typeof e.addEventListener == "function" && this._api !== e && (this.dispose({ keepState: !0 }), this._api = e, this._attachApiListeners(e));
	}
	async _hydratePrompt(e, t) {
		let n = String(t?.id || "").trim();
		if (!n || n === "unknown" || t.promptApi || !e) return;
		if (this._hydrations.has(n)) return this._hydrations.get(n);
		let r = (async () => {
			let r = await this._findPromptInJob(e, n) || await this._findPromptInQueue(e, n) || await this._findPromptInHistory(e, n);
			if (r && !t.promptApi) {
				t.setPrompt({ output: r });
				let e = t.currentlyExecuting;
				e?.nodeId && (e.nodeLabel = t.getNodeLabel(e.nodeId) || e.nodeLabel), this.promptsMap.get(n) === t && this.dispatchProgressUpdate();
			}
		})().catch((e) => console.debug?.(e)).finally(() => this._hydrations.delete(n));
		return this._hydrations.set(n, r), r;
	}
	async _findPromptInJob(e, t) {
		if (typeof e.getJobDetail != "function") return null;
		try {
			let n = (await e.getJobDetail(t))?.workflow?.prompt;
			return n && typeof n == "object" && !Array.isArray(n) ? n : null;
		} catch (e) {
			return console.debug?.(e), null;
		}
	}
	async _fetchJson(e, t) {
		if (typeof e.fetchApi != "function") return null;
		let n = await e.fetchApi(t, { cache: "no-store" });
		return !n?.ok || typeof n.json != "function" ? null : n.json();
	}
	async _findPromptInQueue(e, t) {
		let n = await this._fetchJson(e, "/queue"), r = [...Array.isArray(n?.queue_running) ? n.queue_running : [], ...Array.isArray(n?.queue_pending) ? n.queue_pending : []];
		for (let e of r) if (Array.isArray(e) && String(e[1] || "") === t) return e[2] && typeof e[2] == "object" ? e[2] : null;
		return null;
	}
	async _findPromptInHistory(e, t) {
		let n = (await this._fetchJson(e, `/history/${encodeURIComponent(t)}`))?.[t]?.prompt;
		return Array.isArray(n) && n[2] && typeof n[2] == "object" ? n[2] : null;
	}
	_attachApiListeners(e) {
		this._attachListener(e, "status", (e) => {
			e?.detail?.exec_info && (this.lastQueueRemaining = Number(e.detail.exec_info.queue_remaining) || 0, this.dispatchProgressUpdate());
		}), this._attachListener(e, "execution_start", (t) => {
			let n = String(t?.detail?.prompt_id || t?.detail?.promptId || "").trim();
			n && (this.currentExecution = this.getOrMakePrompt(n), this.dispatchProgressUpdate(), this._hydratePrompt(e, this.currentExecution));
		}), this._attachListener(e, "executing", (e) => {
			this.currentExecution ||= this.getOrMakePrompt("unknown"), this.currentExecution.executing(e?.detail), e?.detail ?? (this.currentExecution = null), this.dispatchProgressUpdate();
		}), this._attachListener(e, "progress", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId), this.currentExecution.executing(t.node, t.value, t.max), this.dispatchProgressUpdate();
		}), this._attachListener(e, "execution_cached", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId);
			for (let e of Array.isArray(t.nodes) ? t.nodes : []) this.currentExecution.markExecuted(e);
			this.dispatchProgressUpdate();
		}), this._attachListener(e, "executed", (e) => {
			let t = e?.detail || {};
			if (!this.currentExecution) {
				let e = String(t.prompt_id || t.promptId || "").trim();
				e && (this.currentExecution = this.getOrMakePrompt(e));
			}
		}), this._attachListener(e, "execution_error", (e) => {
			let t = e?.detail || {};
			this.currentExecution ||= this.getOrMakePrompt(t.prompt_id || t.promptId), this.currentExecution?.error(t), this.dispatchProgressUpdate();
		});
		let t = () => {
			this.currentExecution && this.currentExecution.executing(null), this.currentExecution = null, this.dispatchProgressUpdate();
		};
		this._attachListener(e, "execution_success", t), this._attachListener(e, "execution_interrupted", t);
	}
	_attachListener(e, t, n) {
		e.addEventListener(t, n), this._listenerEntries.push({
			api: e,
			type: t,
			handler: n
		});
	}
	dispatchProgressUpdate() {
		this.dispatchEvent(le(b, this.getSnapshot()));
	}
	dispose({ keepState: e = !1 } = {}) {
		for (let { api: e, type: t, handler: n } of this._listenerEntries.splice(0)) try {
			e?.removeEventListener?.(t, n);
		} catch (e) {
			console.debug?.(e);
		}
		this._api = null, e || (this.promptsMap.clear(), this.currentExecution = null, this.lastQueueRemaining = 0);
	}
}, C = ce(), w = C[x] || new S();
C[x] || (C[x] = w);
function T(e = {}) {
	return w.ensureInitialized(e);
}
function E(e) {
	let t = Math.max(0, Number(e?.queue) || 0), n = e?.prompt || null;
	if (n?.errorDetails) return [
		String(n.errorDetails?.exception_type || "Execution error").trim(),
		String(n.errorDetails?.node_id || "").trim(),
		String(n.errorDetails?.node_type || "").trim()
	].filter(Boolean).join(" ");
	if (n?.currentlyExecuting) {
		let e = n.currentlyExecuting, r = `(${t}) `;
		if (!n.totalNodes) r += "??%";
		else {
			let e = n.executedNodeIds.length / n.totalNodes * 100;
			r += `${Math.round(e)}%`;
		}
		let i = "";
		if (e.step != null && e.maxSteps) {
			let t = Number(e.step) / Number(e.maxSteps) * 100;
			(e.pass > 1 || e.maxPasses != null) && (i += `#${e.pass}`, e.maxPasses && e.maxPasses > 0 && (i += `/${e.maxPasses}`), i += " - "), i += `${Math.round(t)}%`;
		}
		let a = String(e.nodeLabel || "").trim();
		return (a || i) && (r += ` - ${a || "Unknown node"}${i ? ` (${i})` : ""}`), r;
	}
	return t > 0 ? `(${t}) Running... in another tab` : "Idle";
}
function D(e) {
	let t = e?.prompt || null;
	if (t?.errorDetails) {
		let e = t?.errorDetails || {}, n = String(t?.currentlyExecuting?.nodeLabel || e?.node_type || e?.node_id || "Execution").trim(), r = e?.exception_message ?? e?.error ?? e?.message ?? e?.detail ?? e?.reason ?? "", i = (Array.isArray(r) ? r.map((e) => String(e || "").trim()).filter(Boolean).join(" | ") : String(r || "").trim()).replace(/\s+/g, " ").trim();
		return i ? `${n} - ${i}` : `${n} - Error`;
	}
	let n = t?.currentlyExecuting || null;
	if (!n) return "";
	let r = String(n.nodeLabel || n.nodeId || "Node").trim(), i = Number(n.step), a = Number(n.maxSteps);
	return Number.isFinite(i) && Number.isFinite(a) && a > 0 ? n.pass > 1 ? `${r} #${n.pass} - ${i}/${a}` : `${r} - ${i}/${a}` : r;
}
function O(e, t) {
	if (!e?._progressEl && !e?._mediaProgressEl) return;
	let n = t?.prompt || null, r = String(n?.errorDetails?.node_id || n?.currentlyExecuting?.nodeId || "").trim(), i = "0%", a = "0%", o = !!n?.errorDetails;
	if (n?.currentlyExecuting) {
		if (n.totalNodes > 0) {
			let e = n.executedNodeIds.length / n.totalNodes * 100;
			i = `${Math.max(2, Math.round(e * 100) / 100)}%`;
		}
		let e = Number(n.currentlyExecuting?.step), t = Number(n.currentlyExecuting?.maxSteps);
		Number.isFinite(e) && Number.isFinite(t) && t > 0 && (a = `${Math.max(0, Math.min(100, e / t * 100))}%`);
	} else o && (i = "100%", a = "100%");
	if (e._progressCurrentNodeId = r || null, e._progressEl && (e._progressNodesEl.style.width = i, e._progressStepsEl.style.width = a, e._progressTextEl.textContent = E(t), e._progressEl.classList.toggle("is-error", o), e._progressEl.classList.toggle("is-clickable", !!r), e._progressEl.title = r ? "Execution progress - click to center active node" : "Execution progress"), e._mediaProgressEl) {
		let n = D(t);
		e._mediaProgressTextEl.textContent = n, e._mediaProgressEl.title = n || "", e._mediaProgressEl.classList.toggle("is-error", o), e._mediaProgressEl.classList.toggle("is-visible", !!n);
	}
}
function k(e, n) {
	let r = String(n || "").trim();
	if (!r) return !1;
	try {
		return a(r, t());
	} catch (e) {
		return console.debug?.(e), !1;
	}
}
function A(e) {
	let t = document.createElement("div");
	t.className = "mjr-mfv-progress", t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite");
	let n = document.createElement("div");
	n.className = "mjr-mfv-progress-bar mjr-mfv-progress-bar--nodes";
	let r = document.createElement("div");
	r.className = "mjr-mfv-progress-bar mjr-mfv-progress-bar--steps";
	let i = document.createElement("div");
	i.className = "mjr-mfv-progress-overlay", i.setAttribute("aria-hidden", "true");
	let a = document.createElement("span");
	return a.className = "mjr-mfv-progress-text", a.textContent = "Idle", t.appendChild(n), t.appendChild(r), t.appendChild(i), t.appendChild(a), t.addEventListener("pointerdown", (t) => {
		t.button === 0 && k(e, e._progressCurrentNodeId) && (t.preventDefault(), t.stopPropagation());
	}), e._progressEl = t, e._progressNodesEl = n, e._progressStepsEl = r, e._progressTextEl = a, e._progressUpdateHandler && w.removeEventListener(b, e._progressUpdateHandler), e._progressUpdateHandler = (t) => {
		O(e, t?.detail || w.getSnapshot());
	}, w.addEventListener(b, e._progressUpdateHandler), T({ timeoutMs: 4e3 }).catch((e) => {
		console.debug?.(e);
	}), O(e, w.getSnapshot()), t;
}
function j(e) {
	let t = document.createElement("div");
	t.className = "mjr-mfv-media-progress", t.setAttribute("aria-hidden", "true");
	let n = document.createElement("span");
	return n.className = "mjr-mfv-media-progress-text", t.appendChild(n), e._mediaProgressEl = t, e._mediaProgressTextEl = n, O(e, w.getSnapshot()), t;
}
function M(e) {
	if (e?._progressUpdateHandler) try {
		w.removeEventListener(b, e._progressUpdateHandler);
	} catch (e) {
		console.debug?.(e);
	}
	e._progressUpdateHandler = null, e._progressCurrentNodeId = null, e._progressEl = null, e._progressNodesEl = null, e._progressStepsEl = null, e._progressTextEl = null, e._mediaProgressEl = null, e._mediaProgressTextEl = null;
}
// ui/utils/dom.ts
function N(e, t) {
	if (!t) return null;
	try {
		if (!e) return null;
		if (e instanceof Element && typeof e.closest == "function") return e.closest(t);
		let n = e?.parentElement;
		if (n && typeof n.closest == "function") return n.closest(t);
	} catch (e) {
		console.debug?.(e);
	}
	return null;
}
function P(e) {
	let t = String(e ?? "");
	try {
		if (typeof CSS?.escape == "function") return CSS.escape(t);
	} catch (e) {
		console.debug?.(e);
	}
	return t.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}
async function F(e) {
	try {
		return navigator?.clipboard?.writeText ? (await navigator.clipboard.writeText(String(e ?? "")), !0) : !1;
	} catch {
		return !1;
	}
}
// ui/vue/majoorPrimeVue.ts
var I = {
	Button: ee,
	Checkbox: p,
	InputText: oe,
	Textarea: g,
	Select: ie,
	ToggleButton: y,
	Badge: ne,
	Tag: d,
	Dialog: h,
	Menu: re,
	Listbox: v,
	Tree: ae,
	VirtualScroller: f
};
function L(e) {
	return e.use(te, {
		ripple: !1,
		unstyled: !0,
		zIndex: { overlay: 10100 }
	}), e.use(m), e.use(_), Object.entries(I).forEach(([t, n]) => {
		e.component(`M${t}`, n);
	}), e;
}
// ui/vue/createVueApp.ts
function R(e, t = void 0) {
	let n = se(), r = u(e, t);
	return r.use(n), L(r), {
		app: r,
		pinia: n
	};
}
var z = /* @__PURE__ */ new Map();
function B(e, t, n) {
	try {
		window.dispatchEvent(new CustomEvent("mjr:keepalive-attached", { detail: {
			mountKey: String(e || "_mjrVueApp"),
			host: t || null,
			container: n || null
		} }));
	} catch {}
}
function V(e) {
	let t = document.createElement("div");
	return t.dataset.mjrKeepAliveHost = String(e || "_mjrVueApp"), t.style.height = "100%", t.style.width = "100%", t.style.minHeight = "0", t.style.display = "flex", t.style.flexDirection = "column", t.style.overflow = "hidden", t;
}
function H(e, t) {
	e && t && (e.style.height = "100%", e.style.minHeight = "0", e.style.display = "flex", e.style.flexDirection = "column", e.style.overflow = "hidden", (e.firstChild !== t || e.childNodes.length !== 1) && (e.replaceChildren(t), B(t?.dataset?.mjrKeepAliveHost, t, e)));
}
function U(e, t, n = "_mjrVueApp", { attachIfExists: r = !0 } = {}) {
	if (!e) return !1;
	let i = z.get(n), a = !1;
	if (!i) {
		let e = V(n), { app: r } = R(t);
		r.mount(e), i = {
			app: r,
			host: e,
			container: null
		}, z.set(n, i), a = !0;
	}
	return (a || r) && (H(e, i.host), i.container = e), a;
}
function de(e = "_mjrVueApp") {
	return z.has(e);
}
function fe(e, t = "_mjrVueApp") {
	let n = z.get(t);
	if (n?.app) {
		try {
			n.app.unmount();
		} catch {}
		try {
			n.host?.remove?.();
		} catch {}
		z.delete(t);
	}
}
// ui/features/viewer/workflowSidebar/widgetAdapters.ts
function pe(e, t, n = null) {
	switch (String(e?.type || "").toLowerCase()) {
		case "number":
		case "int":
		case "float": return he(e, t, n);
		case "combo": return ge(e, t, n);
		case "text":
		case "string":
		case "customtext": return _e(e, t, n);
		case "toggle":
		case "boolean": return ve(e, t, n);
		default: return ye(e);
	}
}
function W(t, n, i = null) {
	if (!t) return !1;
	let a = String(t.type || "").toLowerCase();
	if (a === "number" || a === "int" || a === "float") {
		let e = Number(n);
		if (Number.isNaN(e)) return !1;
		let r = t.options ?? {}, i = r.min ?? -Infinity, o = r.max ?? Infinity, s = Math.min(o, Math.max(i, e));
		(a === "int" || r.precision === 0 || r.round === 1) && (s = Math.round(s)), t.value = s;
	} else t.value = a === "toggle" || a === "boolean" ? !!n : n;
	try {
		let n = r(), o = i ?? t?.parent ?? null, s = t.value;
		t.callback?.(t.value, n, o, null, t), (a === "number" || a === "int" || a === "float") && (t.value = s), me(t), e(o);
	} catch (e) {
		console.debug?.("[MFV] writeWidgetValue", e);
	}
	return !0;
}
function me(e) {
	let t = String(e.value ?? ""), n = e?.inputEl ?? e?.element ?? e?.el ?? e?.cachedDeepestByFrame?.widget?.inputEl ?? e?.cachedDeepestByFrame?.widget?.element ?? e?.cachedDeepestByFrame?.widget?.el ?? null;
	n != null && "value" in n && n.value !== t && (n.value = t);
}
function he(e, t, n = null) {
	let r = document.createElement("input");
	r.type = "number", r.className = "mjr-ws-input", r.value = e.value ?? "";
	let i = e.options ?? {}, a = String(e?.type || "").toLowerCase() === "int" || i.precision === 0 || i.round === 1;
	if (i.min != null && (r.min = String(i.min)), i.max != null && (r.max = String(i.max)), a) r.step = "1";
	else {
		let e = i.precision;
		r.step = e == null ? "any" : String(10 ** -e);
	}
	return r.addEventListener("input", () => {
		let i = r.value;
		i === "" || i === "-" || i === "." || i.endsWith(".") || (W(e, i, n), t?.(e.value));
	}), r.addEventListener("change", () => {
		W(e, r.value, n) && (r.value = String(e.value), t?.(e.value));
	}), r;
}
function ge(e, t, n = null) {
	let r = document.createElement("select");
	r.className = "mjr-ws-input";
	let i = e.options?.values ?? [];
	if (typeof i == "function") try {
		i = i() ?? [];
	} catch {
		i = [];
	}
	Array.isArray(i) || (i = []);
	for (let t of i) {
		let n = document.createElement("option"), i = typeof t == "string" ? t : t?.content ?? t?.value ?? t?.text ?? String(t);
		n.value = i, n.textContent = i, i === String(e.value) && (n.selected = !0), r.appendChild(n);
	}
	return r.addEventListener("change", () => {
		W(e, r.value, n) && t?.(e.value);
	}), r;
}
function _e(e, t, n = null) {
	let r = document.createElement("div");
	r.className = "mjr-ws-text-wrapper";
	let i = document.createElement("textarea");
	i.className = "mjr-ws-input mjr-ws-textarea", i.value = e.value ?? "", i.rows = 2;
	let a = () => {
		i.style.height = "auto", i.style.height = i.scrollHeight + "px";
	};
	return i.addEventListener("change", () => {
		W(e, i.value, n) && t?.(e.value);
	}), i.addEventListener("input", () => {
		W(e, i.value, n), t?.(e.value), a();
	}), r.appendChild(i), r._mjrAutoFit = a, i._mjrAutoFit = a, requestAnimationFrame(a), r;
}
function ve(e, t, n = null) {
	let r = document.createElement("label");
	r.className = "mjr-ws-toggle-label";
	let i = document.createElement("input");
	return i.type = "checkbox", i.className = "mjr-ws-checkbox", i.checked = !!e.value, i.addEventListener("change", () => {
		W(e, i.checked, n) && t?.(e.value);
	}), r.appendChild(i), r;
}
function ye(e) {
	let t = document.createElement("input");
	return t.type = "text", t.className = "mjr-ws-input mjr-ws-readonly", t.value = e.value == null ? "" : String(e.value), t.readOnly = !0, t.tabIndex = -1, t;
}
// ui/app/settings/MajoorSettingsDialog.ts
var G = "mjr-settings-dialog", K = "mjr-settings-dialog-style", q = "mjr:settings-dialog-visibility", J = null, be = {
	Cards: {
		icon: "pi pi-th-large",
		label: "Cards"
	},
	Badges: {
		icon: "pi pi-tags",
		label: "Badges"
	},
	Grid: {
		icon: "pi pi-table",
		label: "Grid"
	},
	Sidebar: {
		icon: "pi pi-window-maximize",
		label: "Sidebar"
	},
	Viewer: {
		icon: "pi pi-images",
		label: "Viewer"
	},
	"Floating Viewer": {
		icon: "pi pi-window-maximize",
		label: "Floating Viewer"
	},
	"Generated Feed": {
		icon: "pi pi-bolt",
		label: "Generated Feed"
	},
	Search: {
		icon: "pi pi-search",
		label: "Search"
	},
	Scanning: {
		icon: "pi pi-sync",
		label: "Scanning"
	},
	Security: {
		icon: "pi pi-shield",
		label: "Security"
	},
	Advanced: {
		icon: "pi pi-cog",
		label: "Advanced"
	},
	Remote: {
		icon: "pi pi-cloud",
		label: "Remote"
	},
	General: {
		icon: "pi pi-sliders-h",
		label: "General"
	}
};
function xe() {
	if (typeof document > "u" || document.getElementById(K)) return;
	let e = document.createElement("style");
	e.id = K, e.textContent = `
#${G} {
    position: fixed;
    inset: 0;
    z-index: 10080;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.48);
    color: var(--fg-color, #ddd);
    font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
}
#${G}[hidden] { display: none; }
#${G} .mjr-settings-panel {
    width: min(860px, calc(100vw - 32px));
    max-height: min(780px, calc(100vh - 32px));
    display: grid;
    grid-template-rows: auto auto 1fr;
    background: var(--comfy-menu-bg, #252525);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
    overflow: hidden;
}
#${G} .mjr-settings-head,
#${G} .mjr-settings-tools {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}
#${G} .mjr-settings-title {
    font-weight: 700;
    font-size: 14px;
    flex: 1;
}
#${G} .mjr-settings-close,
#${G} .mjr-settings-reset {
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    color: inherit;
    border-radius: 6px;
    min-height: 30px;
    padding: 0 10px;
    cursor: pointer;
}
#${G} .mjr-settings-close {
    width: 30px;
    padding: 0;
}
#${G} .mjr-settings-search {
    flex: 1;
    min-width: 160px;
    height: 30px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.22);
    color: inherit;
    padding: 0 10px;
}
#${G} .mjr-settings-body {
    overflow: auto;
    padding: 12px;
}
#${G} .mjr-settings-stack {
    display: grid;
    gap: 10px;
}
#${G} .mjr-settings-group {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.035);
    overflow: hidden;
}
#${G} .mjr-settings-group summary {
    min-height: 42px;
    display: grid;
    grid-template-columns: 28px 1fr auto 18px;
    align-items: center;
    gap: 10px;
    padding: 8px 11px;
    cursor: pointer;
    user-select: none;
    background: rgba(255, 255, 255, 0.045);
}
#${G} .mjr-settings-group summary::-webkit-details-marker {
    display: none;
}
#${G} .mjr-settings-group-icon {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.07);
    color: var(--input-text, #fff);
}
#${G} .mjr-settings-group-title {
    color: var(--input-text, #fff);
    font-weight: 700;
}
#${G} .mjr-settings-group-meta {
    opacity: 0.68;
    font-size: 12px;
}
#${G} .mjr-settings-chevron {
    transition: transform 0.16s ease;
}
#${G} details[open] > summary .mjr-settings-chevron {
    transform: rotate(90deg);
}
#${G} .mjr-settings-group-body {
    padding: 4px 11px 11px;
}
#${G} .mjr-settings-subgroup {
    margin-top: 8px;
}
#${G} .mjr-settings-subgroup-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0 2px;
    color: var(--input-text, #fff);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    opacity: 0.86;
}
#${G} .mjr-settings-subgroup-title::after {
    content: "";
    height: 1px;
    flex: 1;
    background: rgba(255, 255, 255, 0.10);
}
#${G} .mjr-settings-row {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(180px, 280px);
    align-items: center;
    gap: 16px;
    padding: 9px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
}
#${G} .mjr-settings-name {
    font-weight: 600;
    color: var(--p-primary-color, var(--comfy-accent, #8ab4f8));
}
#${G} .mjr-settings-tip {
    margin-top: 2px;
    opacity: 0.72;
    font-size: 12px;
}
#${G} input,
#${G} select {
    min-height: 30px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.22);
    color: inherit;
    padding: 0 8px;
}
#${G} input[type="checkbox"] {
    justify-self: end;
    width: 18px;
    min-height: 18px;
}
#${G} input[type="color"] {
    padding: 2px;
    width: 56px;
    justify-self: end;
}
@media (max-width: 620px) {
    #${G} .mjr-settings-row {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}
`, document.head.appendChild(e);
}
function Se(e) {
	return String(e || "").replace(/^\s*Majoor:\s*/i, "").trim();
}
function Ce(e) {
	let t = Array.isArray(e?.category) ? e.category : [];
	return String(t[1] || "General").trim() || "General";
}
function we(e) {
	return (Array.isArray(e?.category) ? e.category : []).slice(2).filter(Boolean).join(" / ") || "General";
}
function Y(e) {
	return be[e] || {
		icon: "pi pi-sliders-h",
		label: e || "General"
	};
}
function Te(e, t) {
	return !t || [
		e?.id,
		e?.name,
		e?.tooltip,
		...Array.isArray(e?.category) ? e.category : []
	].join(" ").toLowerCase().includes(t);
}
function X(e, t) {
	if (typeof e?.onChange == "function") {
		e.defaultValue = t;
		try {
			let n = e.onChange(t);
			n && typeof n.catch == "function" && n.catch((e) => {
				console.error?.("[Majoor] settings change failed", e);
			});
		} catch (e) {
			console.error?.("[Majoor] settings change failed", e);
		}
	}
}
function Ee(e) {
	let t = String(e?.type || "text").toLowerCase(), n = e?.defaultValue, r;
	if (t === "boolean") return r = document.createElement("input"), r.type = "checkbox", r.checked = !!n, r.addEventListener("change", () => X(e, r.checked)), r;
	if (t === "combo") {
		r = document.createElement("select");
		for (let t of e?.options || []) {
			let e = document.createElement("option"), n = t && typeof t == "object" ? t.value ?? t.text ?? t.label : t;
			e.value = String(n ?? ""), e.textContent = String(t && typeof t == "object" ? t.text ?? t.label ?? t.value : t), r.appendChild(e);
		}
		return r.value = String(n ?? ""), r.addEventListener("change", () => X(e, r.value)), r;
	}
	if (r = document.createElement("input"), r.type = t === "color" ? "color" : t === "number" ? "number" : t === "password" ? "password" : "text", e?.attrs && typeof e.attrs == "object") for (let [t, n] of Object.entries(e.attrs)) n != null && r.setAttribute(t, String(n));
	r.value = String(n ?? "");
	let i = t === "color" ? "input" : "change";
	return r.addEventListener(i, () => {
		X(e, t === "number" ? Number(r.value) : r.value);
	}), r;
}
function De(e, t, n = "") {
	e.replaceChildren();
	let r = document.createElement("div");
	r.className = "mjr-settings-stack", e.appendChild(r);
	let i = /* @__PURE__ */ new Map();
	for (let e of t || []) {
		if (!Te(e, n)) continue;
		let t = Ce(e), r = we(e);
		i.has(t) || i.set(t, /* @__PURE__ */ new Map());
		let a = i.get(t);
		a.has(r) || a.set(r, []), a.get(r).push(e);
	}
	for (let [e, t] of i.entries()) {
		let i = Array.from(t.values()).flat(), a = Y(e), o = document.createElement("details");
		o.className = "mjr-settings-group", o.open = !!n;
		let s = document.createElement("summary"), c = document.createElement("span");
		c.className = "mjr-settings-group-icon";
		let l = document.createElement("i");
		l.className = a.icon, l.setAttribute("aria-hidden", "true"), c.appendChild(l);
		let u = document.createElement("span");
		u.className = "mjr-settings-group-title", u.textContent = a.label || e;
		let d = document.createElement("span");
		d.className = "mjr-settings-group-meta", d.textContent = `${i.length} setting${i.length === 1 ? "" : "s"}`;
		let f = document.createElement("i");
		f.className = "pi pi-chevron-right mjr-settings-chevron", f.setAttribute("aria-hidden", "true"), s.append(c, u, d, f), o.appendChild(s);
		let p = document.createElement("div");
		p.className = "mjr-settings-group-body";
		for (let [e, n] of t.entries()) {
			let t = document.createElement("section");
			t.className = "mjr-settings-subgroup";
			let r = document.createElement("div");
			r.className = "mjr-settings-subgroup-title", r.textContent = e, t.appendChild(r);
			for (let e of n) {
				let n = document.createElement("label");
				n.className = "mjr-settings-row";
				let r = document.createElement("div"), i = document.createElement("div");
				if (i.className = "mjr-settings-name", i.textContent = Se(e?.name) || e?.id || "Setting", r.appendChild(i), e?.tooltip) {
					let t = document.createElement("div");
					t.className = "mjr-settings-tip", t.textContent = String(e.tooltip), r.appendChild(t);
				}
				n.appendChild(r), n.appendChild(Ee(e)), t.appendChild(n);
			}
			p.appendChild(t);
		}
		o.appendChild(p), r.appendChild(o);
	}
}
function Oe() {
	xe();
	let e = document.createElement("div");
	e.id = G, e.hidden = !0, e.addEventListener("click", (t) => {
		t.target === e && Z();
	});
	let t = document.createElement("div");
	t.className = "mjr-settings-panel", t.setAttribute("role", "dialog"), t.setAttribute("aria-modal", "true");
	let n = document.createElement("div");
	n.className = "mjr-settings-head";
	let r = document.createElement("div");
	r.className = "mjr-settings-title", r.textContent = i("settings.majoor.title", "Majoor Assets Manager Settings");
	let a = document.createElement("button");
	a.type = "button", a.className = "mjr-settings-close", a.textContent = "X", a.setAttribute("aria-label", i("btn.close", "Close")), a.addEventListener("click", Z), n.append(r, a);
	let o = document.createElement("div");
	o.className = "mjr-settings-tools";
	let s = document.createElement("input");
	s.type = "search", s.className = "mjr-settings-search", s.placeholder = i("placeholder.searchSettings", "Search settings"), o.appendChild(s);
	let c = document.createElement("div");
	return c.className = "mjr-settings-body", t.append(n, o, c), e.appendChild(t), document.body.appendChild(e), {
		body: c,
		root: e,
		search: s
	};
}
function Z() {
	if (J?.root) {
		J.root.hidden = !0;
		try {
			window.dispatchEvent(new CustomEvent(q, { detail: { open: !1 } }));
		} catch (e) {
			console.debug?.(e);
		}
	}
}
function ke(e = t()) {
	if (typeof document > "u") return !1;
	J?.root?.isConnected || (J = Oe());
	let n = l(e), r = () => De(J.body, n, String(J.search.value || "").trim().toLowerCase());
	J.search.oninput = r, J.search.value = "", r(), J.root.hidden = !1;
	try {
		window.dispatchEvent(new CustomEvent(q, { detail: { open: !0 } }));
	} catch (e) {
		console.debug?.(e);
	}
	return setTimeout(() => J?.search?.focus?.(), 0), !0;
}
// ui/app/openMajoorSettings.ts
function Q(e = t()) {
	return ke(e);
}
try {
	typeof window < "u" && (window.MajoorAssetsManager = window.MajoorAssetsManager || {}, window.MajoorAssetsManager.openSettings = Q);
} catch (e) {
	console.debug?.(e);
}
// ui/utils/tooltipShortcuts.ts
function $(e, t) {
	let n = String(e || "").trim(), r = String(t || "").trim();
	if (!r) return n;
	if (!n) return r;
	if (r.length === 1) {
		let e = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		if (RegExp(`\\(${e}\\)|\\b${e}\\b`, "i").test(n)) return n;
	} else if (n.toLowerCase().includes(r.toLowerCase())) return n;
	return `${n} (${r})`;
}
function Ae(e, t, n, { setAriaLabel: r = !0, ariaLabel: i = null } = {}) {
	if (!e) return "";
	let a = $(t, n);
	if (e.title = a, r) {
		let r = i ?? t;
		e.setAttribute("aria-label", $(r, n));
	}
	return a;
}
export { T as _, pe as a, de as c, F as d, N as f, M as g, A as h, q as i, U as l, j as m, Ae as n, W as o, P as p, Q as r, R as s, $ as t, fe as u, w as v };
