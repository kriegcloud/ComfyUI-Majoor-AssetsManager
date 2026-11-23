import { Gt as e, Zn as t, an as n, d as r, l as i, o as a, or as o, w as s } from "./client-CpKyshuF.js";
import { a as c, i as l, r as u } from "./floatingViewerManager-BmjWYMsw.js";
import { w as d } from "./minimap-Chxv025o.js";
import { i as f, r as p, t as ee } from "./events-1iwo5blr.js";
import { a as m, i as h, n as g, r as _, t as te } from "./TagsEditor-DMYc3sbe.js";
import { $ as ne, A as v, B as re, C as y, D as b, E as x, H as S, J as ie, K as C, M as w, O as T, P as E, Q as D, S as O, T as k, U as A, V as ae, W as j, X as M, Y as N, b as oe, gt as P, ht as F, j as I, k as L, lt as se, mt as R, ot as ce, pt as z, q as B, rt as le, st as V, w as ue, z as H } from "./mjr-primevue-C07IsEdU.js";
import { C as U, _ as W, a as de, b as fe, c as G, d as pe, f as me, g as he, h as ge, i as _e, l as ve, m as ye, n as be, o as K, p as xe, r as Se, s as q, t as Ce, u as we, v as Te, x as Ee, y as De } from "./genInfo-DSwpsIgd.js";
// ui/vue/components/viewer/FloatingViewerHost.vue
var Oe = /* @__PURE__ */ E({
	__name: "FloatingViewerHost",
	setup(e) {
		let t = V(null), n = null;
		return S(() => {
			n = c(t.value);
		}), A(() => {
			n?.(), n = null;
		}), (e, n) => (j(), L("div", {
			ref_key: "hostRef",
			ref: t,
			class: "mjr-viewer-runtime-host mjr-viewer-runtime-host--floating",
			style: {
				position: "fixed",
				inset: "0",
				"pointer-events": "none",
				overflow: "visible"
			}
		}, null, 512));
	}
}), ke = null, J = null;
function Y(e, t, n) {
	let r = e || document.createElement("canvas");
	return r.width !== t && (r.width = t), r.height !== n && (r.height = n), {
		c: r,
		ctx: r.getContext("2d", { willReadFrequently: !0 })
	};
}
function X(e) {
	return e ? e instanceof HTMLVideoElement ? {
		w: e.videoWidth || 0,
		h: e.videoHeight || 0
	} : e instanceof HTMLImageElement ? {
		w: e.naturalWidth || 0,
		h: e.naturalHeight || 0
	} : {
		w: e.width || 0,
		h: e.height || 0
	} : {
		w: 0,
		h: 0
	};
}
function Z(e) {
	return e ? e instanceof HTMLVideoElement ? e.readyState >= 2 && e.videoWidth > 0 : e instanceof HTMLImageElement ? e.complete && e.naturalWidth > 0 : e.width > 0 : !1;
}
function Ae(e, t = 256) {
	if (!Z(e)) return null;
	let { w: n, h: r } = X(e), i = Ee(n, r, t);
	if (!i.w || !i.h) return null;
	try {
		let { c: t, ctx: n } = Y(ke, i.w, i.h);
		return ke = t, n ? (n.clearRect(0, 0, i.w, i.h), n.drawImage(e, 0, 0, i.w, i.h), {
			data: n.getImageData(0, 0, i.w, i.h).data,
			width: i.w,
			height: i.h
		}) : null;
	} catch {
		return null;
	}
}
function je(e, t, n) {
	if (!Z(e)) return null;
	let { w: r, h: i } = X(e), a = Math.floor(t), o = Math.floor(n);
	if (a < 0 || o < 0 || a >= r || o >= i) return null;
	try {
		let { c: t, ctx: n } = Y(J, 1, 1);
		if (J = t, !n) return null;
		n.clearRect(0, 0, 1, 1), n.drawImage(e, a, o, 1, 1, 0, 0, 1, 1);
		let r = n.getImageData(0, 0, 1, 1).data;
		return [
			r[0],
			r[1],
			r[2],
			r[3]
		];
	} catch {
		return null;
	}
}
function Me(e, t, n, r, i) {
	if (!Z(t)) return !1;
	let a = e.getContext("2d");
	if (!a) return !1;
	let o = e.width / Math.max(1, i);
	try {
		return a.imageSmoothingEnabled = !1, a.fillStyle = "#111", a.fillRect(0, 0, e.width, e.height), a.drawImage(t, Math.floor(n - o / 2), Math.floor(r - o / 2), Math.ceil(o), Math.ceil(o), 0, 0, e.width, e.height), !0;
	} catch {
		return !1;
	}
}
async function Ne(e) {
	if (!Z(e)) return null;
	let { w: t, h: n } = X(e), r = document.createElement("canvas");
	r.width = t, r.height = n;
	try {
		return r.getContext("2d")?.drawImage(e, 0, 0), await new Promise((e) => r.toBlob(e, "image/png"));
	} catch {
		return null;
	}
}
// ui/features/viewer/studio/studioViewerState.ts
var Q = ce({
	open: !1,
	assets: [],
	index: 0,
	session: 0,
	compare: ""
});
function Pe(e = "") {
	let t = String(e || "").trim().toLowerCase();
	return t === "ab" ? "wipe" : t === "sidebyside" ? "side" : "";
}
function Fe(e, t = 0, n = "") {
	let r = (Array.isArray(e) ? e : []).filter(Boolean);
	return r.length ? (Q.assets = r, Q.index = Math.max(0, Math.min(Number(t) || 0, r.length - 1)), Q.compare = r.length > 1 ? Pe(n) : "", Q.session += 1, Q.open = !0, !0) : !1;
}
function Ie() {
	Q.open = !1;
}
function Le(e) {
	let t = Q.assets.length;
	t && (Q.index = (Math.floor(e) % t + t) % t);
}
function Re(e) {
	Le(Q.index + e);
}
// ui/vue/components/viewer/studio/StudioFxDefs.vue?vue&type=script&setup=true&lang.ts
var ze = {
	class: "mjr-studio-fx-defs",
	width: "0",
	height: "0",
	"aria-hidden": "true",
	focusable: "false"
}, Be = ["id"], Ve = ["href"], He = ["in"], Ue = ["slope"], We = ["slope"], Ge = ["slope"], Ke = {
	in: "mjrExposed",
	result: "mjrGamma"
}, qe = ["exponent"], Je = ["exponent"], Ye = ["exponent"], Xe = ["values"], Ze = /* @__PURE__ */ E({
	__name: "StudioFxDefs",
	props: {
		filterId: {},
		channel: {},
		exposure: {},
		gamma: {},
		subtractSrc: {}
	},
	setup(e) {
		let t = e, n = k(() => ve(t.channel)), r = k(() => ge(t.exposure)), i = k(() => W(t.gamma));
		return (t, a) => (j(), L("svg", ze, [x("defs", null, [x("filter", {
			id: e.filterId,
			x: "0",
			y: "0",
			width: "1",
			height: "1",
			filterUnits: "objectBoundingBox",
			primitiveUnits: "objectBoundingBox",
			"color-interpolation-filters": "sRGB"
		}, [
			e.subtractSrc ? (j(), L(y, { key: 0 }, [x("feImage", {
				href: e.subtractSrc,
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				preserveAspectRatio: "none",
				result: "mjrB"
			}, null, 8, Ve), a[0] ||= v("<feComponentTransfer in=\"mjrB\" result=\"mjrInvB\"><feFuncR type=\"table\" tableValues=\"1 0\"></feFuncR><feFuncG type=\"table\" tableValues=\"1 0\"></feFuncG><feFuncB type=\"table\" tableValues=\"1 0\"></feFuncB></feComponentTransfer><feComposite in=\"SourceGraphic\" in2=\"mjrInvB\" operator=\"arithmetic\" k1=\"0\" k2=\"1\" k3=\"1\" k4=\"-1\" result=\"mjrBase\"></feComposite>", 2)], 64)) : T("", !0),
			x("feComponentTransfer", {
				in: e.subtractSrc ? "mjrBase" : "SourceGraphic",
				result: "mjrExposed"
			}, [
				x("feFuncR", {
					type: "linear",
					slope: r.value
				}, null, 8, Ue),
				x("feFuncG", {
					type: "linear",
					slope: r.value
				}, null, 8, We),
				x("feFuncB", {
					type: "linear",
					slope: r.value
				}, null, 8, Ge)
			], 8, He),
			x("feComponentTransfer", Ke, [
				x("feFuncR", {
					type: "gamma",
					amplitude: "1",
					exponent: i.value,
					offset: "0"
				}, null, 8, qe),
				x("feFuncG", {
					type: "gamma",
					amplitude: "1",
					exponent: i.value,
					offset: "0"
				}, null, 8, Je),
				x("feFuncB", {
					type: "gamma",
					amplitude: "1",
					exponent: i.value,
					offset: "0"
				}, null, 8, Ye)
			]),
			n.value ? (j(), L("feColorMatrix", {
				key: 1,
				in: "mjrGamma",
				type: "matrix",
				values: n.value
			}, null, 8, Xe)) : T("", !0)
		], 8, Be)])]));
	}
}), Qe = ["viewBox"], $e = ["d", "fill"], et = [
	"x",
	"y",
	"width",
	"height"
], tt = [
	"x1",
	"y1",
	"x2",
	"y2"
], nt = [
	"x",
	"y",
	"width",
	"height"
], rt = /* @__PURE__ */ E({
	__name: "StudioGuides",
	props: {
		width: {},
		height: {},
		grid: {},
		aspect: {},
		maskOpacity: {}
	},
	setup(e) {
		let t = e, n = k(() => Te(t.width, t.height, t.grid)), r = k(() => G(t.width, t.height, t.aspect)), i = k(() => {
			let e = r.value;
			if (!e) return "";
			let { width: n, height: i } = t;
			return `M0 0H${n}V${i}H0Z M${e.x} ${e.y}V${e.y + e.h}H${e.x + e.w}V${e.y}Z`;
		}), a = k(() => t.width > 0 && t.height > 0 && (t.grid !== "off" || !!r.value));
		return (t, o) => a.value ? (j(), L("svg", {
			key: 0,
			class: "mjr-studio-guides",
			viewBox: `0 0 ${e.width} ${e.height}`,
			preserveAspectRatio: "none",
			"aria-hidden": "true"
		}, [
			i.value ? (j(), L("path", {
				key: 0,
				d: i.value,
				"fill-rule": "evenodd",
				fill: `rgba(0,0,0,${e.maskOpacity})`
			}, null, 8, $e)) : T("", !0),
			r.value ? (j(), L("rect", {
				key: 1,
				x: r.value.x,
				y: r.value.y,
				width: r.value.w,
				height: r.value.h,
				fill: "none",
				class: "mjr-studio-guides__mask-edge",
				"vector-effect": "non-scaling-stroke"
			}, null, 8, et)) : T("", !0),
			(j(!0), L(y, null, C(n.value.lines, (e, t) => (j(), L("line", {
				key: `l${t}`,
				x1: e.x1,
				y1: e.y1,
				x2: e.x2,
				y2: e.y2,
				class: "mjr-studio-guides__line",
				"vector-effect": "non-scaling-stroke"
			}, null, 8, tt))), 128)),
			(j(!0), L(y, null, C(n.value.rects, (e, t) => (j(), L("rect", {
				key: `r${t}`,
				x: e.x,
				y: e.y,
				width: e.w,
				height: e.h,
				fill: "none",
				class: "mjr-studio-guides__safe",
				"vector-effect": "non-scaling-stroke"
			}, null, 8, nt))), 128))
		], 8, Qe)) : T("", !0);
	}
}), it = ["src", "alt"], at = ["src"], ot = ["src"], st = {
	key: 0,
	class: "mjr-studio-stage__ab"
}, ct = { class: "is-sep" }, lt = {
	key: 1,
	class: "mjr-studio-stage__error"
}, ut = .05, dt = 32, ft = 16, pt = /* @__PURE__ */ E({
	__name: "StudioImageStage",
	props: {
		src: {},
		alt: { default: "" },
		checker: {
			type: Boolean,
			default: !1
		},
		mediaFilter: { default: "" },
		compareSrc: { default: null },
		compare: { default: "off" },
		wipe: { default: 50 }
	},
	emits: [
		"zoom",
		"loaded",
		"update:wipe",
		"dismiss"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = V(null), o = V(null), s = V(null), c = V({
			w: 0,
			h: 0
		}), l = V(1), u = V({
			x: 0,
			y: 0
		}), d = V(!0), f = V(!1), p = V(!1), ee = V(!1), m = null, h = null, g = k(() => !!r.compareSrc && r.compare !== "off"), _ = k(() => g.value && r.compare === "side"), te = k(() => g.value && (r.compare === "wipe" || r.compare === "wipeV")), v = k(() => g.value ? we(r.compare) : null), re = k(() => g.value && r.compare !== "subtract");
		function y() {
			return _.value ? c.value.w * 2 + ft : c.value.w;
		}
		function b() {
			let e = a.value?.getBoundingClientRect();
			return {
				w: e?.width || 0,
				h: e?.height || 0
			};
		}
		function ie() {
			let { w: e, h: t } = b();
			return !c.value.w || !c.value.h || !e || !t ? 1 : Math.min(e / y(), t / c.value.h);
		}
		function C() {
			d.value = !0, l.value = ie(), u.value = {
				x: _.value ? -((c.value.w + ft) / 2) * l.value : 0,
				y: 0
			}, i("zoom", l.value);
		}
		function w(e, t) {
			let n = Math.max(ut, Math.min(dt, e)), { w: r, h: a } = b(), o = t ? t.x - r / 2 : 0, s = t ? t.y - a / 2 : 0, c = n / l.value;
			u.value = {
				x: o - (o - u.value.x) * c,
				y: s - (s - u.value.y) * c
			}, l.value = n, d.value = !1, i("zoom", l.value);
		}
		function E(e) {
			w(l.value * e);
		}
		function D() {
			w(1), u.value = {
				x: 0,
				y: 0
			};
		}
		function A() {
			d.value ? D() : C();
		}
		function N(e) {
			e.preventDefault();
			let t = a.value?.getBoundingClientRect(), n = Math.exp(-e.deltaY * .0015);
			w(l.value * n, t ? {
				x: e.clientX - t.left,
				y: e.clientY - t.top
			} : void 0);
		}
		function I(e) {
			e.button === 0 && (m = {
				x: e.clientX,
				y: e.clientY,
				ox: u.value.x,
				oy: u.value.y,
				id: e.pointerId,
				t: Date.now()
			}, p.value = !0, e.currentTarget?.setPointerCapture?.(e.pointerId));
		}
		function se(e) {
			m && (u.value = {
				x: m.ox + e.clientX - m.x,
				y: m.oy + e.clientY - m.y
			}, Math.abs(e.clientX - m.x) + Math.abs(e.clientY - m.y) > 2 && (d.value = !1));
		}
		function ce(e) {
			let t = m;
			t && e.currentTarget?.releasePointerCapture?.(t.id), m = null, p.value = !1, t && e.type === "pointerup" && e.button === 0 && Math.hypot(e.clientX - t.x, e.clientY - t.y) <= 6 && Date.now() - t.t <= 600 && document.elementFromPoint(e.clientX, e.clientY) === a.value && i("dismiss");
		}
		function z(e) {
			let t = o.value?.getBoundingClientRect();
			if (!t || t.width <= 0 || t.height <= 0) return;
			let n = r.compare === "wipeV" ? (e.clientY - t.top) / t.height : (e.clientX - t.left) / t.width;
			i("update:wipe", Math.round(Math.max(0, Math.min(1, n)) * 1e3) / 10);
		}
		function le(e) {
			ee.value = !0, e.currentTarget?.setPointerCapture?.(e.pointerId), z(e);
		}
		function ue(e) {
			ee.value && z(e);
		}
		function H() {
			ee.value = !1;
		}
		function U(e) {
			let t = e.target;
			c.value = {
				w: t.naturalWidth,
				h: t.naturalHeight
			}, f.value = !1, i("loaded", {
				width: t.naturalWidth,
				height: t.naturalHeight
			}), C();
		}
		let W = k(() => ({
			width: `${c.value.w}px`,
			height: `${c.value.h}px`,
			transform: `translate(-50%, -50%) translate(${u.value.x}px, ${u.value.y}px) scale(${l.value})`,
			imageRendering: l.value >= 2 ? "pixelated" : "auto",
			"--mjr-inv-scale": String(1 / (l.value || 1))
		})), de = k(() => r.mediaFilter ? { filter: r.mediaFilter } : {}), fe = k(() => {
			if (v.value) return { mixBlendMode: v.value };
			if (te.value) {
				let e = Math.max(0, Math.min(100, r.wipe));
				return { clipPath: r.compare === "wipeV" ? `inset(${e}% 0 0 0)` : `inset(0 0 0 ${e}%)` };
			}
			return {};
		}), G = k(() => r.compare === "wipeV" ? { top: `${r.wipe}%` } : { left: `${r.wipe}%` });
		return M(() => r.src, () => {
			c.value = {
				w: 0,
				h: 0
			}, f.value = !1;
		}), M(_, () => {
			d.value && C();
		}), S(() => {
			try {
				h = new ResizeObserver(() => {
					d.value && C();
				}), a.value && h.observe(a.value);
			} catch (e) {
				console.debug?.(e);
			}
		}), ae(() => h?.disconnect()), t({
			zoomBy: E,
			fit: C,
			actualSize: D,
			toggleFitActual: A,
			getSource: () => s.value && !f.value ? s.value : null,
			getBox: () => o.value,
			naturalSize: () => ({ ...c.value })
		}), (t, n) => (j(), L("div", {
			ref_key: "stage",
			ref: a,
			class: R(["mjr-studio-stage", {
				"is-checker": e.checker,
				"is-dragging": p.value
			}]),
			onWheel: N,
			onPointerdown: I,
			onPointermove: se,
			onPointerup: ce,
			onPointercancel: ce,
			onDblclick: A
		}, [
			ne(x("div", {
				class: "mjr-studio-stage__box",
				style: F(W.value)
			}, [
				x("div", {
					ref_key: "box",
					ref: o,
					class: "mjr-studio-stage__layers",
					style: F(de.value)
				}, [(j(), L("img", {
					ref_key: "img",
					ref: s,
					key: e.src,
					class: "mjr-studio-stage__img",
					src: e.src,
					alt: e.alt,
					draggable: "false",
					onLoad: U,
					onError: n[0] ||= (e) => f.value = !0
				}, null, 40, it)), re.value && !_.value ? (j(), L("img", {
					key: `b:${e.compareSrc}`,
					class: "mjr-studio-stage__img is-b",
					src: e.compareSrc || "",
					alt: "",
					draggable: "false",
					style: F(fe.value)
				}, null, 12, at)) : T("", !0)], 4),
				B(t.$slots, "overlay", {
					width: c.value.w,
					height: c.value.h
				}),
				te.value ? (j(), L("div", {
					key: 0,
					class: R(["mjr-studio-stage__divider", {
						"is-vertical": e.compare === "wipeV",
						"is-active": ee.value
					}]),
					style: F(G.value),
					onPointerdown: O(le, ["stop"]),
					onPointermove: ue,
					onPointerup: H,
					onPointercancel: H,
					onDblclick: n[1] ||= O((e) => i("update:wipe", 50), ["stop"])
				}, [...n[2] ||= [x("span", { class: "mjr-studio-stage__divider-grip" }, null, -1)]], 38)) : T("", !0),
				re.value && _.value ? (j(), L("div", {
					key: 1,
					class: "mjr-studio-stage__side",
					style: F({
						left: `calc(100% + ${ft}px)`,
						filter: e.mediaFilter || void 0
					})
				}, [(j(), L("img", {
					key: `side:${e.compareSrc}`,
					class: "mjr-studio-stage__img",
					src: e.compareSrc || "",
					alt: "",
					draggable: "false"
				}, null, 8, ot))], 4)) : T("", !0)
			], 4), [[oe, !f.value]]),
			g.value ? (j(), L("div", st, [
				n[3] ||= x("span", null, "A", -1),
				x("span", ct, P(e.compare === "wipeV" ? "/" : "|"), 1),
				n[4] ||= x("span", null, "B", -1)
			])) : T("", !0),
			f.value ? (j(), L("div", lt, [n[5] ||= x("i", {
				class: "pi pi-image",
				"aria-hidden": "true"
			}, null, -1), x("span", null, P(e.alt), 1)])) : T("", !0)
		], 34));
	}
}), mt = /* @__PURE__ */ E({
	__name: "StudioModel3D",
	props: {
		asset: {},
		src: {}
	},
	setup(e) {
		let t = e, n = V(null), r = null;
		function i() {
			try {
				r?.querySelectorAll?.("canvas").forEach((e) => {
					e?._mjrProc?.destroy?.(), e._mjrProc = null;
				});
			} catch (e) {
				console.debug?.(e);
			}
			r?.remove(), r = null;
		}
		return S(() => {
			if (n.value && t.src) try {
				r = U(t.asset, t.src, {
					hostClassName: "mjr-model3d-host mjr-studio-model3d__host",
					canvasClassName: "mjr-model3d-render-canvas mjr-studio-model3d__canvas",
					hintText: "Rotate: left drag  Pan: right drag  Zoom: wheel or middle drag",
					disableViewerTransform: !0
				}), r && n.value.appendChild(r);
			} catch (e) {
				console.debug?.(e);
			}
		}), ae(i), (e, t) => (j(), L("div", {
			ref_key: "host",
			ref: n,
			class: "mjr-studio-model3d",
			onWheel: t[0] ||= O(() => {}, ["stop"]),
			onPointerdown: t[1] ||= O(() => {}, ["stop"]),
			onContextmenu: t[2] ||= O(() => {}, ["prevent"])
		}, null, 544));
	}
}), ht = {
	key: 0,
	class: "mjr-studio-probe",
	"aria-hidden": "true"
}, gt = ["width", "height"], _t = { class: "is-dim" }, vt = { class: "is-dim" }, yt = /* @__PURE__ */ E({
	__name: "StudioProbe",
	props: {
		getSource: { type: Function },
		getBox: { type: Function },
		probe: { type: Boolean },
		loupe: { type: Boolean },
		loupeSize: {},
		loupeZoom: {},
		mediaFilter: {}
	},
	setup(e) {
		let t = e, n = V(null), r = V(null), i = se(null), a = 0, o = null;
		function s() {
			a = 0;
			let e = o;
			o = null;
			let s = t.getBox(), c = t.getSource();
			if (!e || !s || !c) return;
			let l = s.getBoundingClientRect();
			if (!(e.clientX >= l.left && e.clientX <= l.right && e.clientY >= l.top && e.clientY <= l.bottom) || l.width <= 0 || l.height <= 0) {
				r.value = null, i.value = null;
				return;
			}
			let { w: u, h: d } = X(c), f = (e.clientX - l.left) / l.width * u, p = (e.clientY - l.top) / l.height * d;
			if (r.value = {
				x: e.clientX,
				y: e.clientY
			}, t.loupe && n.value && Me(n.value, c, f, p, t.loupeZoom), t.probe) {
				let e = je(c, f, p);
				i.value = e ? {
					x: Math.floor(f),
					y: Math.floor(p),
					...he(e[0], e[1], e[2], e[3])
				} : null;
			}
		}
		function c(e) {
			o = e, a ||= requestAnimationFrame(s);
		}
		return S(() => window.addEventListener("pointermove", c, { passive: !0 })), ae(() => {
			window.removeEventListener("pointermove", c), a && cancelAnimationFrame(a);
		}), (t, a) => r.value ? (j(), L("div", ht, [e.loupe ? (j(), L("div", {
			key: 0,
			class: "mjr-studio-probe__loupe",
			style: F({
				left: `${r.value.x + 18}px`,
				top: `${r.value.y + 18}px`,
				width: `${e.loupeSize}px`,
				height: `${e.loupeSize}px`
			})
		}, [x("canvas", {
			ref_key: "loupeCanvas",
			ref: n,
			width: e.loupeSize,
			height: e.loupeSize,
			style: F(e.mediaFilter ? { filter: e.mediaFilter } : void 0)
		}, null, 12, gt), a[0] ||= x("span", { class: "mjr-studio-probe__cross" }, null, -1)], 4)) : T("", !0), e.probe && i.value ? (j(), L("div", {
			key: 1,
			class: "mjr-studio-probe__chip",
			style: F({
				left: `${r.value.x + 18}px`,
				top: `${r.value.y + (e.loupe ? e.loupeSize + 26 : 18)}px`
			})
		}, [
			x("span", {
				class: "mjr-studio-probe__swatch",
				style: F({ background: i.value.hex })
			}, null, 4),
			x("span", null, P(i.value.hex), 1),
			x("span", _t, P(i.value.rgb), 1),
			x("span", vt, "L " + P(i.value.luma) + " · " + P(i.value.x) + "," + P(i.value.y), 1)
		], 4)) : T("", !0)])) : T("", !0);
	}
}), bt = {
	class: "mjr-studio-scopes",
	"aria-label": "Scopes"
}, xt = {
	key: 0,
	class: "mjr-studio-scopes__panel"
}, St = { class: "mjr-studio-scopes__label" }, Ct = {
	key: 1,
	class: "mjr-studio-scopes__panel"
}, wt = { class: "mjr-studio-scopes__label" }, Tt = /* @__PURE__ */ E({
	__name: "StudioScopes",
	props: {
		getSource: { type: Function },
		mode: {},
		tick: {}
	},
	setup(e) {
		let t = e, r = V(null), i = V(null);
		function a(e) {
			let t = r.value, n = t?.getContext("2d");
			if (!t || !n) return;
			let i = pe(e);
			n.clearRect(0, 0, t.width, t.height), n.globalCompositeOperation = "lighter";
			let a = (e, r) => {
				n.fillStyle = r;
				for (let r = 0; r < 256; r++) {
					let a = Math.min(1, e[r] / i.max) * t.height;
					n.fillRect(r / 256 * t.width, t.height - a, t.width / 256 + .5, a);
				}
			};
			a(i.r, "rgba(255,70,70,0.75)"), a(i.g, "rgba(70,255,90,0.75)"), a(i.b, "rgba(80,140,255,0.75)"), n.globalCompositeOperation = "source-over", n.strokeStyle = "rgba(255,255,255,0.85)", n.beginPath();
			for (let e = 0; e < 256; e++) {
				let r = t.height - Math.min(1, i.l[e] / i.max) * t.height;
				e === 0 ? n.moveTo(0, r) : n.lineTo(e / 255 * t.width, r);
			}
			n.stroke();
		}
		function o(e, t, n) {
			let r = i.value, a = r?.getContext("2d");
			if (!r || !a) return;
			let o = me(e, t, n, 256), s = a.createImageData(o.columns, 256);
			for (let e = 0; e < o.columns; e++) for (let t = 0; t < 256; t++) {
				let n = o.bins[e * 256 + t];
				if (!n) continue;
				let r = Math.min(255, 40 + n / o.max * 1200), i = ((255 - t) * o.columns + e) * 4;
				s.data[i] = 120, s.data[i + 1] = 255, s.data[i + 2] = 150, s.data[i + 3] = r;
			}
			r.width = o.columns, r.height = 256, a.putImageData(s, 0, 0);
		}
		function s() {
			if (t.mode === "off") return;
			let e = Ae(t.getSource(), 256);
			e && ((t.mode === "hist" || t.mode === "both") && a(e.data), (t.mode === "wave" || t.mode === "both") && o(e.data, e.width, e.height));
		}
		return M(() => [t.tick, t.mode], () => requestAnimationFrame(s)), S(s), (t, a) => (j(), L("div", bt, [e.mode === "hist" || e.mode === "both" ? (j(), L("div", xt, [x("span", St, P(z(n)("viewer.studio.histogram", "Histogram")), 1), x("canvas", {
			ref_key: "hist",
			ref: r,
			width: "256",
			height: "110"
		}, null, 512)])) : T("", !0), e.mode === "wave" || e.mode === "both" ? (j(), L("div", Ct, [x("span", wt, P(z(n)("viewer.studio.waveform", "Waveform")), 1), x("canvas", {
			ref_key: "wave",
			ref: i,
			width: "256",
			height: "256",
			class: "is-wave"
		}, null, 512)])) : T("", !0)]));
	}
}), Et = ["title"], Dt = { class: "mjr-studio-slider__head" }, Ot = { class: "mjr-studio-slider__value" }, kt = [
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow"
], $ = /* @__PURE__ */ E({
	__name: "StudioSlider",
	props: /*@__PURE__*/ H({
		label: {},
		min: {},
		max: {},
		step: { default: .01 },
		defaultValue: { default: void 0 },
		format: {
			type: Function,
			default: void 0
		}
	}, {
		modelValue: { required: !0 },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let t = e, n = N(e, "modelValue"), r = V(null), i = V(!1), a = k(() => (n.value - t.min) / (t.max - t.min) * 100), o = k(() => t.format ? t.format(n.value) : String(n.value));
		function s(e) {
			let n = Math.round((e - t.min) / t.step) * t.step + t.min;
			return Number(Math.max(t.min, Math.min(t.max, n)).toFixed(4));
		}
		function c(e) {
			let i = r.value?.getBoundingClientRect();
			if (!i || i.width <= 0) return;
			let a = Math.max(0, Math.min(1, (e.clientX - i.left) / i.width));
			n.value = s(t.min + a * (t.max - t.min));
		}
		function l(e) {
			i.value = !0, e.currentTarget?.setPointerCapture?.(e.pointerId), c(e);
		}
		function u(e) {
			i.value && c(e);
		}
		function d() {
			i.value = !1;
		}
		function f(e) {
			let r = e.shiftKey ? 10 : 1;
			if (e.key === "ArrowLeft" || e.key === "ArrowDown") n.value = s(n.value - t.step * r);
			else if (e.key === "ArrowRight" || e.key === "ArrowUp") n.value = s(n.value + t.step * r);
			else return;
			e.preventDefault(), e.stopPropagation();
		}
		function p() {
			t.defaultValue != null && (n.value = t.defaultValue);
		}
		return (t, i) => (j(), L("div", {
			class: "mjr-studio-slider",
			title: e.defaultValue == null ? void 0 : "Double-click to reset",
			onDblclick: p
		}, [x("div", Dt, [x("span", null, P(e.label), 1), x("span", Ot, P(o.value), 1)]), x("div", {
			ref_key: "track",
			ref: r,
			class: "mjr-studio-slider__track",
			role: "slider",
			tabindex: "0",
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": n.value,
			onPointerdown: l,
			onPointermove: u,
			onPointerup: d,
			onPointercancel: d,
			onKeydown: f
		}, [x("div", {
			class: "mjr-studio-slider__fill",
			style: F({ width: `${a.value}%` })
		}, null, 4), x("div", {
			class: "mjr-studio-slider__knob",
			style: F({ left: `${a.value}%` })
		}, null, 4)], 40, kt)], 40, Et));
	}
}), At = ["aria-label"], jt = {
	key: 0,
	class: "mjr-studio-rail__tag"
}, Mt = { class: "mjr-studio-rail__title" }, Nt = { class: "mjr-studio-seg" }, Pt = { class: "mjr-studio-rail__title" }, Ft = { class: "mjr-studio-rail__title" }, It = { class: "mjr-studio-seg" }, Lt = { class: "mjr-studio-rail__title" }, Rt = { class: "mjr-studio-seg is-wrap" }, zt = { class: "mjr-studio-rail__title" }, Bt = { class: "mjr-studio-seg is-wrap" }, Vt = { class: "mjr-studio-rail__title" }, Ht = { class: "mjr-studio-seg is-wrap" }, Ut = { class: "mjr-studio-rail__title" }, Wt = { class: "mjr-studio-rail__title" }, Gt = { class: "mjr-studio-seg is-wrap" }, Kt = { class: "mjr-studio-rail__b" }, qt = ["title"], Jt = { class: "mjr-studio-seg" }, Yt = /* @__PURE__ */ E({
	__name: "StudioToolRail",
	props: /*@__PURE__*/ H({
		isVideo: { type: Boolean },
		canAnalyse: { type: Boolean },
		canCompare: { type: Boolean },
		compareName: {}
	}, {
		tools: { required: !0 },
		toolsModifiers: {}
	}),
	emits: /*@__PURE__*/ H([
		"cycle-b",
		"pin-b",
		"swap",
		"copy"
	], ["update:tools"]),
	setup(e, { expose: t, emit: r }) {
		let i = N(e, "tools"), a = e, o = r, s = V(null), c = V(0), l = V(null), u = [
			{
				value: "rgb",
				label: "RGB"
			},
			{
				value: "r",
				label: "R"
			},
			{
				value: "g",
				label: "G"
			},
			{
				value: "b",
				label: "B"
			},
			{
				value: "a",
				label: "A"
			},
			{
				value: "l",
				label: "Luma"
			}
		], d = [
			{
				value: "off",
				label: "Off"
			},
			{
				value: "hist",
				label: "Histogram"
			},
			{
				value: "wave",
				label: "Waveform"
			},
			{
				value: "both",
				label: "Both"
			}
		], f = [
			{
				value: "off",
				label: "Off"
			},
			{
				value: "thirds",
				label: "Thirds"
			},
			{
				value: "golden",
				label: "Golden"
			},
			{
				value: "center",
				label: "Center"
			},
			{
				value: "safe",
				label: "Safe areas"
			}
		], p = [
			{
				value: "off",
				label: "Off"
			},
			{
				value: "16:9",
				label: "16:9"
			},
			{
				value: "9:16",
				label: "9:16"
			},
			{
				value: "1:1",
				label: "1:1"
			},
			{
				value: "4:3",
				label: "4:3"
			},
			{
				value: "2.39",
				label: "2.39"
			}
		], ee = k(() => q.filter((e) => !(a.isVideo && e.imageOnly))), m = k(() => Math.abs(i.value.exposure) > .001 || Math.abs(i.value.gamma - 1) > .001);
		function h(e, t) {
			if (s.value === e) {
				s.value = null;
				return;
			}
			let n = t.currentTarget, r = l.value?.getBoundingClientRect().top ?? 0;
			c.value = Math.max(0, (n?.getBoundingClientRect().top ?? r) - r), s.value = e;
		}
		function g() {
			let e = ye();
			i.value.exposure = e.exposure, i.value.gamma = e.gamma;
		}
		function _() {
			let e = ye();
			Object.assign(i.value, {
				...e,
				loupeSize: i.value.loupeSize,
				loupeZoom: i.value.loupeZoom
			}), s.value = null;
		}
		function te(e) {
			i.value.compare = i.value.compare === e ? "off" : e;
		}
		function ne(e) {
			s.value && (l.value?.contains(e.target) || (s.value = null));
		}
		S(() => {
			document.addEventListener("pointerdown", ne, !0);
		}), ae(() => {
			document.removeEventListener("pointerdown", ne, !0);
		});
		let v = (e) => `${e > 0 ? "+" : ""}${e.toFixed(2)} EV`, re = (e) => e.toFixed(2), E = (e) => `${Math.round(e * 100)}%`, A = (e) => `${e}×`, M = (e) => `${e}px`;
		function oe() {
			return s.value ? (s.value = null, !0) : !1;
		}
		return t({ closePanel: oe }), (t, r) => {
			let a = ie("MButton");
			return j(), L("div", {
				ref_key: "rail",
				ref: l,
				class: "mjr-studio-rail",
				onPointerdown: r[24] ||= O(() => {}, ["stop"]),
				onWheel: r[25] ||= O(() => {}, ["stop"]),
				onDblclick: r[26] ||= O(() => {}, ["stop"])
			}, [x("div", {
				class: "mjr-studio-rail__bar",
				role: "toolbar",
				"aria-label": z(n)("viewer.studio.tools", "Review tools")
			}, [
				e.canAnalyse ? (j(), L(y, { key: 0 }, [
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", {
							"is-on": i.value.channel !== "rgb",
							"is-open": s.value === "channels"
						}]),
						title: z(n)("viewer.studio.channels", "Channels"),
						onClick: r[0] ||= (e) => h("channels", e)
					}, {
						default: D(() => [r[27] ||= x("i", {
							class: "pi pi-palette",
							"aria-hidden": "true"
						}, null, -1), i.value.channel === "rgb" ? T("", !0) : (j(), L("span", jt, P(i.value.channel.toUpperCase()), 1))]),
						_: 1
					}, 8, ["class", "title"]),
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", {
							"is-on": m.value,
							"is-open": s.value === "exposure"
						}]),
						title: z(n)("viewer.studio.exposure", "Exposure / gamma"),
						onClick: r[1] ||= (e) => h("exposure", e)
					}, {
						default: D(() => [...r[28] ||= [x("i", {
							class: "pi pi-bolt",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["class", "title"]),
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", {
							"is-on": i.value.zebra,
							"is-open": s.value === "zebra"
						}]),
						title: z(n)("viewer.studio.zebra", "Zebra highlights (Z)"),
						onClick: r[2] ||= (e) => h("zebra", e)
					}, {
						default: D(() => [...r[29] ||= [x("i", {
							class: "pi pi-exclamation-triangle",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["class", "title"]),
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", {
							"is-on": i.value.scopes !== "off",
							"is-open": s.value === "scopes"
						}]),
						title: z(n)("viewer.studio.scopes", "Scopes (S)"),
						onClick: r[3] ||= (e) => h("scopes", e)
					}, {
						default: D(() => [...r[30] ||= [x("i", {
							class: "pi pi-chart-bar",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["class", "title"]),
					r[31] ||= x("span", { class: "mjr-studio-rail__sep" }, null, -1)
				], 64)) : T("", !0),
				w(a, {
					type: "button",
					class: R(["mjr-studio-rail__btn", {
						"is-on": i.value.grid !== "off",
						"is-open": s.value === "grid"
					}]),
					title: z(n)("viewer.studio.grid", "Guides (G)"),
					onClick: r[4] ||= (e) => h("grid", e)
				}, {
					default: D(() => [...r[32] ||= [x("i", {
						class: "pi pi-th-large",
						"aria-hidden": "true"
					}, null, -1)]]),
					_: 1
				}, 8, ["class", "title"]),
				w(a, {
					type: "button",
					class: R(["mjr-studio-rail__btn", {
						"is-on": i.value.aspect !== "off",
						"is-open": s.value === "aspect"
					}]),
					title: z(n)("viewer.studio.aspect", "Aspect ratio mask"),
					onClick: r[5] ||= (e) => h("aspect", e)
				}, {
					default: D(() => [...r[33] ||= [x("i", {
						class: "pi pi-stop",
						"aria-hidden": "true"
					}, null, -1)]]),
					_: 1
				}, 8, ["class", "title"]),
				e.canAnalyse ? (j(), L(y, { key: 1 }, [
					r[36] ||= x("span", { class: "mjr-studio-rail__sep" }, null, -1),
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", { "is-on": i.value.probe }]),
						title: z(n)("viewer.studio.probe", "Pixel probe (P)"),
						onClick: r[6] ||= (e) => i.value.probe = !i.value.probe
					}, {
						default: D(() => [...r[34] ||= [x("i", {
							class: "pi pi-map-marker",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["class", "title"]),
					w(a, {
						type: "button",
						class: R(["mjr-studio-rail__btn", {
							"is-on": i.value.loupe,
							"is-open": s.value === "loupe"
						}]),
						title: z(n)("viewer.studio.loupe", "Loupe (L) - right-click for settings"),
						onClick: r[7] ||= (e) => i.value.loupe = !i.value.loupe,
						onContextmenu: r[8] ||= O((e) => h("loupe", e), ["prevent"])
					}, {
						default: D(() => [...r[35] ||= [x("i", {
							class: "pi pi-search-plus",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["class", "title"])
				], 64)) : T("", !0),
				e.canCompare ? (j(), L(y, { key: 2 }, [r[38] ||= x("span", { class: "mjr-studio-rail__sep" }, null, -1), w(a, {
					type: "button",
					class: R(["mjr-studio-rail__btn", {
						"is-on": i.value.compare !== "off",
						"is-open": s.value === "compare"
					}]),
					title: z(n)("viewer.studio.compareTool", "Compare A/B (C)"),
					onClick: r[9] ||= (e) => h("compare", e)
				}, {
					default: D(() => [...r[37] ||= [x("i", {
						class: "pi pi-clone",
						"aria-hidden": "true"
					}, null, -1)]]),
					_: 1
				}, 8, ["class", "title"])], 64)) : T("", !0),
				r[41] ||= x("span", { class: "mjr-studio-rail__sep" }, null, -1),
				e.canAnalyse ? (j(), b(a, {
					key: 3,
					type: "button",
					class: "mjr-studio-rail__btn",
					title: z(n)("viewer.studio.copy", "Copy image / frame to clipboard"),
					onClick: r[10] ||= (e) => o("copy")
				}, {
					default: D(() => [...r[39] ||= [x("i", {
						class: "pi pi-copy",
						"aria-hidden": "true"
					}, null, -1)]]),
					_: 1
				}, 8, ["title"])) : T("", !0),
				w(a, {
					type: "button",
					class: "mjr-studio-rail__btn",
					title: z(n)("viewer.studio.resetTools", "Reset all tools (R)"),
					onClick: _
				}, {
					default: D(() => [...r[40] ||= [x("i", {
						class: "pi pi-refresh",
						"aria-hidden": "true"
					}, null, -1)]]),
					_: 1
				}, 8, ["title"])
			], 8, At), s.value ? (j(), L("div", {
				key: 0,
				class: "mjr-studio-rail__panel",
				style: F({ top: `${c.value}px` }),
				role: "dialog"
			}, [s.value === "channels" ? (j(), L(y, { key: 0 }, [x("div", Mt, P(z(n)("viewer.studio.channels", "Channels")), 1), x("div", Nt, [(j(), L(y, null, C(u, (e) => w(a, {
				key: e.value,
				type: "button",
				class: R({ "is-on": i.value.channel === e.value }),
				onClick: (t) => i.value.channel = e.value
			}, {
				default: D(() => [I(P(e.label), 1)]),
				_: 2
			}, 1032, ["class", "onClick"])), 64))])], 64)) : s.value === "exposure" ? (j(), L(y, { key: 1 }, [
				x("div", Pt, P(z(n)("viewer.studio.exposure", "Exposure / gamma")), 1),
				w($, {
					modelValue: i.value.exposure,
					"onUpdate:modelValue": r[11] ||= (e) => i.value.exposure = e,
					label: z(n)("viewer.studio.ev", "Exposure"),
					min: -5,
					max: 5,
					step: .05,
					"default-value": 0,
					format: v
				}, null, 8, ["modelValue", "label"]),
				w($, {
					modelValue: i.value.gamma,
					"onUpdate:modelValue": r[12] ||= (e) => i.value.gamma = e,
					label: z(n)("viewer.studio.gamma", "Gamma"),
					min: .1,
					max: 3,
					step: .01,
					"default-value": 1,
					format: re
				}, null, 8, ["modelValue", "label"]),
				w(a, {
					type: "button",
					class: "mjr-studio-btn is-text",
					onClick: g
				}, {
					default: D(() => [I(P(z(n)("viewer.studio.reset", "Reset")), 1)]),
					_: 1
				})
			], 64)) : s.value === "zebra" ? (j(), L(y, { key: 2 }, [
				x("div", Ft, P(z(n)("viewer.studio.zebra", "Zebra highlights (Z)")), 1),
				x("div", It, [w(a, {
					type: "button",
					class: R({ "is-on": !i.value.zebra }),
					onClick: r[13] ||= (e) => i.value.zebra = !1
				}, {
					default: D(() => [...r[42] ||= [I("Off", -1)]]),
					_: 1
				}, 8, ["class"]), w(a, {
					type: "button",
					class: R({ "is-on": i.value.zebra }),
					onClick: r[14] ||= (e) => i.value.zebra = !0
				}, {
					default: D(() => [...r[43] ||= [I("On", -1)]]),
					_: 1
				}, 8, ["class"])]),
				w($, {
					modelValue: i.value.zebraThreshold,
					"onUpdate:modelValue": r[15] ||= (e) => i.value.zebraThreshold = e,
					label: z(n)("viewer.studio.threshold", "Threshold"),
					min: .5,
					max: 1,
					step: .01,
					"default-value": .95,
					format: E
				}, null, 8, ["modelValue", "label"])
			], 64)) : s.value === "scopes" ? (j(), L(y, { key: 3 }, [x("div", Lt, P(z(n)("viewer.studio.scopes", "Scopes (S)")), 1), x("div", Rt, [(j(), L(y, null, C(d, (e) => w(a, {
				key: e.value,
				type: "button",
				class: R({ "is-on": i.value.scopes === e.value }),
				onClick: (t) => i.value.scopes = e.value
			}, {
				default: D(() => [I(P(e.label), 1)]),
				_: 2
			}, 1032, ["class", "onClick"])), 64))])], 64)) : s.value === "grid" ? (j(), L(y, { key: 4 }, [x("div", zt, P(z(n)("viewer.studio.grid", "Guides (G)")), 1), x("div", Bt, [(j(), L(y, null, C(f, (e) => w(a, {
				key: e.value,
				type: "button",
				class: R({ "is-on": i.value.grid === e.value }),
				onClick: (t) => i.value.grid = e.value
			}, {
				default: D(() => [I(P(e.label), 1)]),
				_: 2
			}, 1032, ["class", "onClick"])), 64))])], 64)) : s.value === "aspect" ? (j(), L(y, { key: 5 }, [
				x("div", Vt, P(z(n)("viewer.studio.aspect", "Aspect ratio mask")), 1),
				x("div", Ht, [(j(), L(y, null, C(p, (e) => w(a, {
					key: e.value,
					type: "button",
					class: R({ "is-on": i.value.aspect === e.value }),
					onClick: (t) => i.value.aspect = e.value
				}, {
					default: D(() => [I(P(e.label), 1)]),
					_: 2
				}, 1032, ["class", "onClick"])), 64))]),
				w($, {
					modelValue: i.value.maskOpacity,
					"onUpdate:modelValue": r[16] ||= (e) => i.value.maskOpacity = e,
					label: z(n)("viewer.studio.opacity", "Opacity"),
					min: 0,
					max: 1,
					step: .05,
					"default-value": .65,
					format: E
				}, null, 8, ["modelValue", "label"])
			], 64)) : s.value === "loupe" ? (j(), L(y, { key: 6 }, [
				x("div", Ut, P(z(n)("viewer.studio.loupeTitle", "Loupe")), 1),
				w($, {
					modelValue: i.value.loupeZoom,
					"onUpdate:modelValue": r[17] ||= (e) => i.value.loupeZoom = e,
					label: z(n)("viewer.studio.magnification", "Magnification"),
					min: 2,
					max: 32,
					step: 1,
					"default-value": 8,
					format: A
				}, null, 8, ["modelValue", "label"]),
				w($, {
					modelValue: i.value.loupeSize,
					"onUpdate:modelValue": r[18] ||= (e) => i.value.loupeSize = e,
					label: z(n)("viewer.studio.size", "Size"),
					min: 80,
					max: 320,
					step: 10,
					"default-value": 140,
					format: M
				}, null, 8, ["modelValue", "label"])
			], 64)) : s.value === "compare" ? (j(), L(y, { key: 7 }, [
				x("div", Wt, P(z(n)("viewer.studio.compareTool", "Compare A/B (C)")), 1),
				x("div", Gt, [(j(!0), L(y, null, C(ee.value, (e) => (j(), b(a, {
					key: e.value,
					type: "button",
					class: R({ "is-on": i.value.compare === e.value }),
					onClick: (t) => te(e.value)
				}, {
					default: D(() => [I(P(e.label), 1)]),
					_: 2
				}, 1032, ["class", "onClick"]))), 128))]),
				x("div", Kt, [
					r[46] ||= x("span", { class: "mjr-studio-rail__b-label" }, "B", -1),
					w(a, {
						type: "button",
						class: "mjr-studio-btn",
						title: z(n)("viewer.studio.prevB", "Previous B"),
						onClick: r[19] ||= (e) => o("cycle-b", -1)
					}, {
						default: D(() => [...r[44] ||= [x("i", {
							class: "pi pi-chevron-left",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["title"]),
					x("span", {
						class: "mjr-studio-rail__b-name",
						title: e.compareName
					}, P(e.compareName || "—"), 9, qt),
					w(a, {
						type: "button",
						class: "mjr-studio-btn",
						title: z(n)("viewer.studio.nextB", "Next B"),
						onClick: r[20] ||= (e) => o("cycle-b", 1)
					}, {
						default: D(() => [...r[45] ||= [x("i", {
							class: "pi pi-chevron-right",
							"aria-hidden": "true"
						}, null, -1)]]),
						_: 1
					}, 8, ["title"])
				]),
				x("div", Jt, [w(a, {
					type: "button",
					title: z(n)("viewer.studio.pinB", "Use the current asset as B (B)"),
					onClick: r[21] ||= (e) => o("pin-b")
				}, {
					default: D(() => [r[47] ||= x("i", {
						class: "pi pi-bookmark",
						"aria-hidden": "true"
					}, null, -1), I(" " + P(z(n)("viewer.studio.pinBShort", "Set B")), 1)]),
					_: 1
				}, 8, ["title"]), w(a, {
					type: "button",
					title: z(n)("viewer.studio.swap", "Swap A and B (X)"),
					onClick: r[22] ||= (e) => o("swap")
				}, {
					default: D(() => [r[48] ||= x("i", {
						class: "pi pi-arrow-right-arrow-left",
						"aria-hidden": "true"
					}, null, -1), I(" " + P(z(n)("viewer.studio.swapShort", "Swap")), 1)]),
					_: 1
				}, 8, ["title"])]),
				i.value.compare === "wipe" || i.value.compare === "wipeV" ? (j(), b($, {
					key: 0,
					modelValue: i.value.wipe,
					"onUpdate:modelValue": r[23] ||= (e) => i.value.wipe = e,
					label: z(n)("viewer.studio.wipe", "Wipe"),
					min: 0,
					max: 100,
					step: 1,
					"default-value": 50,
					format: (e) => `${e}%`
				}, null, 8, [
					"modelValue",
					"label",
					"format"
				])) : T("", !0)
			], 64)) : T("", !0)], 4)) : T("", !0)], 544);
		};
	}
}), Xt = /* @__PURE__ */ E({
	__name: "StudioZebra",
	props: {
		getSource: { type: Function },
		threshold: {},
		tick: {}
	},
	setup(e) {
		let t = e, n = V(null), r = 0;
		function i() {
			let e = n.value, i = Ae(t.getSource(), 480);
			if (!e || !i) return;
			e.width = i.width, e.height = i.height, r = (r + 1) % 8;
			let a = xe(i.data, i.width, i.height, t.threshold, r);
			e.getContext("2d")?.putImageData(new ImageData(a, i.width, i.height), 0, 0);
		}
		return M(() => [t.tick, t.threshold], i), S(i), (e, t) => (j(), L("canvas", {
			ref_key: "canvas",
			ref: n,
			class: "mjr-studio-zebra",
			"aria-hidden": "true"
		}, null, 512));
	}
}), Zt = ["aria-label"], Qt = { class: "mjr-studio__header" }, $t = { class: "mjr-studio__nav" }, en = { class: "mjr-studio__counter" }, tn = { class: "mjr-studio__title" }, nn = ["title"], rn = { class: "mjr-studio__summary" }, an = { class: "mjr-studio__actions" }, on = ["title"], sn = { class: "mjr-studio__body" }, cn = {
	key: 4,
	class: "mjr-studio__unsupported"
}, ln = { class: "mjr-studio__review" }, un = { class: "mjr-studio__review-row" }, dn = { class: "mjr-studio__label" }, fn = {
	class: "mjr-studio__tabs",
	role: "tablist"
}, pn = { class: "mjr-studio__tab-body" }, mn = ["aria-label"], hn = ["src"], gn = {
	key: 1,
	class: "pi pi-file",
	"aria-hidden": "true"
}, _n = {
	key: 2,
	class: "pi pi-play mjr-studio__thumb-badge",
	"aria-hidden": "true"
}, vn = /* @__PURE__ */ E({
	__name: "StudioViewer",
	setup(c) {
		let l = V(null), u = V(null), p = V(null), ne = V(null), v = V(!0), S = V("generation"), E = V(!1), A = V(1), N = se(null), oe = se(null), F = null, B = k(() => Q.assets[Q.index] ?? null), H = k(() => N.value ?? B.value), U = k(() => K(B.value)), W = k(() => B.value ? t(B.value) : ""), G = k(() => Q.assets.length), pe = k(() => Se(H.value)), me = k(() => de(H.value, oe.value)), he = k(() => Number(oe.value?.frame_count) || null), ge = k(() => Number(H.value?.rating) || 0), ve = k(() => Array.isArray(H.value?.tags) ? H.value.tags : []), xe = k(() => {
			let { start: e, end: t } = _e(G.value, Q.index);
			return Q.assets.slice(e, t).map((t, n) => ({
				asset: t,
				index: e + n
			}));
		}), q = ce(ye()), we = `mjr-studio-fx-${Math.random().toString(36).slice(2, 9)}`, Te = V(null), Ee = V(0), Oe = null, ke = -1, J = k(() => U.value === "image" || U.value === "video"), Y = k(() => {
			if (!J.value) return null;
			let e = Te.value, t = Q.assets, n = Q.index;
			return e != null && e !== n && t[e] && K(t[e]) === U.value ? e : fe(t, n, 1, (e) => K(e) === U.value);
		}), X = k(() => Y.value != null), Z = k(() => Y.value == null ? null : Q.assets[Y.value]), Ae = k(() => q.compare !== "off" && !!Z.value), je = k(() => Ae.value && Z.value ? t(Z.value) : null), Me = k(() => Ae.value && q.compare === "subtract" && U.value === "image" ? je.value : null), Pe = k(() => J.value && (De(q) || Me.value) ? `url(#${we})` : ""), Fe = k(() => J.value && (q.zebra || q.scopes !== "off"));
		function ze() {
			return U.value === "image" ? u.value?.getSource?.() ?? null : U.value === "video" ? p.value?.getSource?.() ?? null : null;
		}
		function Be() {
			return U.value === "image" ? u.value?.getBox?.() ?? null : U.value === "video" ? p.value?.getBox?.() ?? null : null;
		}
		function Ve() {
			Ee.value += 1;
		}
		function He() {
			Oe && clearInterval(Oe), Oe = null;
		}
		M([
			Fe,
			U,
			() => Q.open
		], ([e, t, n]) => {
			He(), e && n && t === "video" && (ke = -1, Oe = setInterval(() => {
				let e = ze()?.currentTime ?? -1;
				e !== ke && (ke = e, Ve());
			}, 120));
		}, { immediate: !0 }), M(Fe, (e) => {
			e && re(Ve);
		});
		function Ue(e) {
			let t = Y.value ?? Q.index, n = fe(Q.assets, t, e, (e, t) => t !== Q.index && K(e) === U.value);
			n != null && (Te.value = n);
		}
		function We() {
			Te.value = Q.index;
			let e = fe(Q.assets, Q.index, 1, (e) => K(e) === U.value);
			e != null && Le(e), q.compare === "off" && (q.compare = "wipe");
		}
		function Ge() {
			let e = Y.value;
			e != null && (Te.value = Q.index, Le(e));
		}
		function Ke() {
			X.value && (q.compare = q.compare === "off" ? "wipe" : "off");
		}
		async function qe() {
			let t = await Ne(ze()), r = window.ClipboardItem;
			if (!t || !r || !navigator.clipboard?.write) e(n("viewer.studio.copyFailed", "Could not copy this image"), "error");
			else try {
				await navigator.clipboard.write([new r({ "image/png": t })]), e(n("viewer.studio.copied", "Copied to clipboard"), "success");
			} catch (t) {
				console.debug?.(t), e(n("viewer.studio.copyFailed", "Could not copy this image"), "error");
			}
		}
		let Je = [
			"off",
			"hist",
			"wave",
			"both"
		], Ye = [
			"off",
			"thirds",
			"golden",
			"center",
			"safe"
		];
		function Xe(e, t) {
			return e[(e.indexOf(t) + 1) % e.length];
		}
		M(() => Q.session, () => {
			Te.value = null, q.compare = Q.compare || "off", re(() => {
				let e = document.activeElement;
				e && l.value?.contains(e) && ot(e) && e.blur(), l.value?.focus?.({ preventScroll: !0 });
			});
		}, { immediate: !0 });
		async function Qe(e) {
			if (F?.abort(), N.value = null, oe.value = null, !e) return;
			let t = typeof AbortController < "u" ? new AbortController() : null;
			F = t;
			try {
				let n = await Ce(e, {
					getAssetMetadata: a,
					getFileMetadataScoped: i,
					signal: t?.signal
				});
				F === t && B.value === e && (N.value = n && typeof n == "object" ? n : e);
			} catch (e) {
				console.debug?.(e);
			}
			let n = K(e);
			if ((n === "video" || n === "audio") && e?.id != null) try {
				let n = await r(e.id, t ? { signal: t.signal } : {});
				F === t && n?.ok && (oe.value = n.data || null);
			} catch (e) {
				console.debug?.(e);
			}
		}
		M(B, (e) => void Qe(e), { immediate: !0 }), M(() => Q.open, async (e) => {
			e ? (await re(), l.value?.focus?.(), window.addEventListener("keydown", st, !0)) : (window.removeEventListener("keydown", st, !0), He(), p.value?.release?.(), F?.abort(), document.fullscreenElement && l.value?.contains(document.fullscreenElement) && document.exitFullscreen?.());
		}, { immediate: !0 }), ae(() => {
			window.removeEventListener("keydown", st, !0), He(), F?.abort();
		});
		function $e() {
			let e = B.value;
			Ie(), e?.id != null && window.dispatchEvent(new CustomEvent(f, { detail: { assetId: String(e.id) } }));
		}
		function et() {
			document.fullscreenElement ? document.exitFullscreen?.() : l.value?.requestFullscreen?.();
		}
		let tt = V(!1);
		async function nt() {
			let e = H.value;
			if (e && !tt.value) {
				tt.value = !0;
				try {
					await d(e);
				} finally {
					tt.value = !1;
				}
			}
		}
		function it() {
			if (!W.value) return;
			let e = document.createElement("a");
			e.href = W.value, e.download = String(B.value?.filename || ""), e.click();
		}
		async function at(t) {
			let r = B.value;
			if (!r) return;
			let i = Math.max(0, Math.min(5, t)), a = await s(r, i);
			a?.ok ? (r.rating = i, N.value = N.value ? {
				...N.value,
				rating: i
			} : r, window.dispatchEvent(new CustomEvent(ee, { detail: {
				assetId: r.id == null ? "" : String(r.id),
				rating: i
			} }))) : e(a?.error || n("toast.ratingUpdateFailed", "Rating update failed"), "error");
		}
		function ot(e) {
			return !!e?.closest?.("input, textarea, select, [contenteditable='true']");
		}
		function st(e) {
			if (!Q.open) return;
			if (ot(e.target)) {
				e.key === "Escape" && e.target?.blur?.();
				return;
			}
			let t = U.value === "video" || U.value === "audio", n = e.key, r = n.length === 1 ? n.toLowerCase() : n, i = !e.ctrlKey && !e.metaKey && !e.altKey, a = J.value && i, o = !0;
			n === "Escape" && ne.value?.closePanel?.() || (n === "Escape" ? $e() : r === "c" && (e.ctrlKey || e.metaKey) && J.value ? qe() : n === "ArrowLeft" && !e.shiftKey ? Re(-1) : n === "ArrowRight" && !e.shiftKey ? Re(1) : n === "ArrowLeft" && e.shiftKey && t ? p.value?.seekBy?.(-5) : n === "ArrowRight" && e.shiftKey && t ? p.value?.seekBy?.(5) : n === "Home" ? Le(0) : n === "End" ? Le(G.value - 1) : n === " " && t ? p.value?.togglePlay?.() : n === "," && t ? p.value?.stepFrame?.(-1) : n === "." && t ? p.value?.stepFrame?.(1) : (n === "i" || n === "I") && t ? p.value?.setLoopA?.() : (n === "o" || n === "O") && t ? p.value?.setLoopB?.() : (n === "u" || n === "U") && t ? p.value?.clearLoop?.() : (n === "m" || n === "M") && t ? p.value?.toggleMute?.() : n === "]" && t ? p.value?.cycleRate?.(1) : n === "[" && t ? p.value?.cycleRate?.(-1) : n === "Tab" ? v.value = !v.value : n === "f" || n === "F" ? et() : (n === "+" || n === "=") && U.value === "image" ? u.value?.zoomBy?.(1.25) : n === "-" && U.value === "image" ? u.value?.zoomBy?.(.8) : n === "0" && U.value === "image" && e.altKey ? u.value?.fit?.() : /^[0-5]$/.test(n) && !e.ctrlKey && !e.metaKey && !e.altKey ? at(Number(n)) : r === "c" && i && X.value ? Ke() : r === "b" && i && X.value ? We() : r === "x" && i && Ae.value ? Ge() : r === "z" && a ? q.zebra = !q.zebra : r === "s" && a ? q.scopes = Xe(Je, q.scopes) : r === "g" && i && J.value ? q.grid = Xe(Ye, q.grid) : r === "p" && a ? q.probe = !q.probe : r === "l" && a ? q.loupe = !q.loupe : r === "r" && a ? Object.assign(q, ye(), {
				loupeSize: q.loupeSize,
				loupeZoom: q.loupeZoom
			}) : o = !1), o && (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation?.());
		}
		function ct(e) {
			return o(e, 192) || "";
		}
		return (e, t) => {
			let r = ie("MButton");
			return j(), b(ue, { to: "body" }, [z(Q).open ? (j(), L("div", {
				key: 0,
				ref_key: "overlay",
				ref: l,
				class: R(["mjr-assets-manager mjr-studio", { "is-inspector-closed": !v.value }]),
				role: "dialog",
				"aria-modal": "true",
				"aria-label": z(n)("viewer.studio.title", "Viewer"),
				tabindex: "-1"
			}, [
				x("header", Qt, [
					x("div", $t, [
						w(r, {
							type: "button",
							class: "mjr-studio-btn",
							title: z(n)("viewer.studio.prev", "Previous (←)"),
							disabled: G.value < 2,
							onClick: t[0] ||= (e) => z(Re)(-1)
						}, {
							default: D(() => [...t[14] ||= [x("i", {
								class: "pi pi-chevron-left",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["title", "disabled"]),
						x("span", en, P(z(Q).index + 1) + " / " + P(G.value), 1),
						w(r, {
							type: "button",
							class: "mjr-studio-btn",
							title: z(n)("viewer.studio.next", "Next (→)"),
							disabled: G.value < 2,
							onClick: t[1] ||= (e) => z(Re)(1)
						}, {
							default: D(() => [...t[15] ||= [x("i", {
								class: "pi pi-chevron-right",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["title", "disabled"])
					]),
					x("div", tn, [x("span", {
						class: "mjr-studio__filename",
						title: H.value?.filepath || H.value?.filename
					}, P(H.value?.filename), 9, nn), x("span", rn, P(pe.value), 1)]),
					x("div", an, [
						U.value === "image" ? (j(), L(y, { key: 0 }, [
							x("span", {
								class: "mjr-studio-chip",
								title: z(n)("viewer.studio.zoomHint", "Wheel to zoom, double-click for fit / 100 %")
							}, P(Math.round(A.value * 100)) + "%", 9, on),
							w(r, {
								type: "button",
								class: "mjr-studio-btn",
								title: z(n)("viewer.studio.fit", "Fit"),
								onClick: t[2] ||= (e) => u.value?.fit()
							}, {
								default: D(() => [...t[16] ||= [x("i", {
									class: "pi pi-arrows-alt",
									"aria-hidden": "true"
								}, null, -1)]]),
								_: 1
							}, 8, ["title"]),
							w(r, {
								type: "button",
								class: "mjr-studio-btn is-text",
								title: z(n)("viewer.studio.actualSize", "Actual size"),
								onClick: t[3] ||= (e) => u.value?.actualSize()
							}, {
								default: D(() => [...t[17] ||= [I("1:1", -1)]]),
								_: 1
							}, 8, ["title"]),
							w(r, {
								type: "button",
								class: R(["mjr-studio-btn", { "is-on": E.value }]),
								title: z(n)("viewer.studio.checker", "Transparency checkerboard"),
								onClick: t[4] ||= (e) => E.value = !E.value
							}, {
								default: D(() => [...t[18] ||= [x("i", {
									class: "pi pi-th-large",
									"aria-hidden": "true"
								}, null, -1)]]),
								_: 1
							}, 8, ["class", "title"])
						], 64)) : T("", !0),
						X.value ? (j(), b(r, {
							key: 1,
							type: "button",
							class: R(["mjr-studio-btn", { "is-on": Ae.value }]),
							title: z(n)("viewer.studio.compare", "Compare A/B (C)"),
							onClick: Ke
						}, {
							default: D(() => [...t[19] ||= [x("i", {
								class: "pi pi-clone",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["class", "title"])) : T("", !0),
						w(r, {
							type: "button",
							class: "mjr-studio-btn mjr-open-workflow-btn",
							disabled: !H.value || tt.value,
							"aria-busy": tt.value,
							title: z(n)("tooltip.openAssetWorkflow", "Open this media's saved workflow or execution settings in a new ComfyUI tab"),
							onClick: nt
						}, {
							default: D(() => [...t[20] ||= [x("i", {
								class: "pi pi-sitemap",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, [
							"disabled",
							"aria-busy",
							"title"
						]),
						w(r, {
							type: "button",
							class: "mjr-studio-btn",
							title: z(n)("viewer.studio.download", "Download"),
							onClick: it
						}, {
							default: D(() => [...t[21] ||= [x("i", {
								class: "pi pi-download",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["title"]),
						w(r, {
							type: "button",
							class: R(["mjr-studio-btn", { "is-on": v.value }]),
							title: z(n)("viewer.studio.inspector", "Generation info (Tab)"),
							onClick: t[5] ||= (e) => v.value = !v.value
						}, {
							default: D(() => [...t[22] ||= [x("i", {
								class: "pi pi-info-circle",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["class", "title"]),
						w(r, {
							type: "button",
							class: "mjr-studio-btn",
							title: z(n)("viewer.studio.fullscreen", "Fullscreen (F)"),
							onClick: et
						}, {
							default: D(() => [...t[23] ||= [x("i", {
								class: "pi pi-window-maximize",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["title"]),
						w(r, {
							type: "button",
							class: "mjr-studio-btn is-close",
							title: z(n)("viewer.studio.close", "Close (Esc)"),
							onClick: $e
						}, {
							default: D(() => [...t[24] ||= [x("i", {
								class: "pi pi-times",
								"aria-hidden": "true"
							}, null, -1)]]),
							_: 1
						}, 8, ["title"])
					])
				]),
				x("main", sn, [x("section", { class: R(["mjr-studio__stage", { "has-rail": J.value }]) }, [
					Pe.value ? (j(), b(Ze, {
						key: 0,
						"filter-id": we,
						channel: z(q).channel,
						exposure: z(q).exposure,
						gamma: z(q).gamma,
						"subtract-src": Me.value
					}, null, 8, [
						"channel",
						"exposure",
						"gamma",
						"subtract-src"
					])) : T("", !0),
					U.value === "image" ? (j(), b(pt, {
						ref_key: "imageStage",
						ref: u,
						key: `img:${W.value}`,
						wipe: z(q).wipe,
						"onUpdate:wipe": t[6] ||= (e) => z(q).wipe = e,
						src: W.value,
						alt: B.value?.filename,
						checker: E.value,
						"media-filter": Pe.value,
						"compare-src": je.value,
						compare: z(q).compare,
						class: R({ "is-probing": z(q).probe || z(q).loupe }),
						onZoom: t[7] ||= (e) => A.value = e,
						onLoaded: Ve,
						onDismiss: $e
					}, {
						overlay: D(({ width: e, height: t }) => [z(q).zebra ? (j(), b(Xt, {
							key: 0,
							"get-source": ze,
							threshold: z(q).zebraThreshold,
							tick: Ee.value
						}, null, 8, ["threshold", "tick"])) : T("", !0), w(rt, {
							width: e,
							height: t,
							grid: z(q).grid,
							aspect: z(q).aspect,
							"mask-opacity": z(q).maskOpacity
						}, null, 8, [
							"width",
							"height",
							"grid",
							"aspect",
							"mask-opacity"
						])]),
						_: 1
					}, 8, [
						"wipe",
						"src",
						"alt",
						"checker",
						"media-filter",
						"compare-src",
						"compare",
						"class"
					])) : U.value === "video" || U.value === "audio" ? (j(), b(be, {
						ref_key: "player",
						ref: p,
						key: `media:${W.value}`,
						wipe: z(q).wipe,
						"onUpdate:wipe": t[8] ||= (e) => z(q).wipe = e,
						src: W.value,
						kind: U.value,
						fps: me.value,
						"frame-count": he.value,
						filename: B.value?.filename,
						"media-filter": Pe.value,
						"compare-src": je.value,
						compare: z(q).compare,
						class: R({ "is-probing": z(q).probe || z(q).loupe }),
						"light-dismiss": "",
						onDismiss: $e
					}, {
						overlay: D(({ width: e, height: t }) => [z(q).zebra ? (j(), b(Xt, {
							key: 0,
							"get-source": ze,
							threshold: z(q).zebraThreshold,
							tick: Ee.value
						}, null, 8, ["threshold", "tick"])) : T("", !0), w(rt, {
							width: e,
							height: t,
							grid: z(q).grid,
							aspect: z(q).aspect,
							"mask-opacity": z(q).maskOpacity
						}, null, 8, [
							"width",
							"height",
							"grid",
							"aspect",
							"mask-opacity"
						])]),
						_: 1
					}, 8, [
						"wipe",
						"src",
						"kind",
						"fps",
						"frame-count",
						"filename",
						"media-filter",
						"compare-src",
						"compare",
						"class"
					])) : U.value === "model3d" ? (j(), b(mt, {
						key: `3d:${W.value}`,
						asset: B.value,
						src: W.value
					}, null, 8, ["asset", "src"])) : (j(), L("div", cn, [t[25] ||= x("i", {
						class: "pi pi-file",
						"aria-hidden": "true"
					}, null, -1), x("span", null, P(z(n)("viewer.studio.unsupported", "No preview for this file type.")), 1)])),
					J.value ? (j(), b(Yt, {
						key: 5,
						ref_key: "toolRail",
						ref: ne,
						tools: z(q),
						"onUpdate:tools": t[9] ||= (e) => le(q) ? q.value = e : q = e,
						"is-video": U.value === "video",
						"can-analyse": J.value,
						"can-compare": X.value,
						"compare-name": Z.value?.filename,
						onCycleB: Ue,
						onPinB: We,
						onSwap: Ge,
						onCopy: qe
					}, null, 8, [
						"tools",
						"is-video",
						"can-analyse",
						"can-compare",
						"compare-name"
					])) : T("", !0),
					J.value && z(q).scopes !== "off" ? (j(), b(Tt, {
						key: 6,
						"get-source": ze,
						mode: z(q).scopes,
						tick: Ee.value
					}, null, 8, ["mode", "tick"])) : T("", !0),
					J.value && (z(q).probe || z(q).loupe) ? (j(), b(yt, {
						key: 7,
						"get-source": ze,
						"get-box": Be,
						probe: z(q).probe,
						loupe: z(q).loupe,
						"loupe-size": z(q).loupeSize,
						"loupe-zoom": z(q).loupeZoom,
						"media-filter": Me.value ? "" : Pe.value
					}, null, 8, [
						"probe",
						"loupe",
						"loupe-size",
						"loupe-zoom",
						"media-filter"
					])) : T("", !0)
				], 2), v.value && H.value ? (j(), L("aside", {
					key: 0,
					class: "mjr-studio__inspector",
					onKeydown: t[13] ||= O(() => {}, ["stop"])
				}, [
					x("div", ln, [x("div", un, [x("span", dn, P(z(n)("sidebar.rating", "Rating")), 1), (j(), b(g, {
						key: `r:${H.value.id}`,
						asset: H.value,
						"model-value": ge.value,
						size: 40
					}, null, 8, ["asset", "model-value"]))]), (j(), b(te, {
						key: `t:${H.value.id}`,
						asset: H.value,
						"model-value": ve.value,
						autofocus: !1
					}, null, 8, ["asset", "model-value"]))]),
					x("nav", fn, [
						w(r, {
							type: "button",
							role: "tab",
							class: R({ "is-active": S.value === "generation" }),
							onClick: t[10] ||= (e) => S.value = "generation"
						}, {
							default: D(() => [I(P(z(n)("viewer.studio.tabGeneration", "Generation")), 1)]),
							_: 1
						}, 8, ["class"]),
						w(r, {
							type: "button",
							role: "tab",
							class: R({ "is-active": S.value === "workflow" }),
							onClick: t[11] ||= (e) => S.value = "workflow"
						}, {
							default: D(() => [I(P(z(n)("viewer.studio.tabWorkflow", "Workflow")), 1)]),
							_: 1
						}, 8, ["class"]),
						w(r, {
							type: "button",
							role: "tab",
							class: R({ "is-active": S.value === "file" }),
							onClick: t[12] ||= (e) => S.value = "file"
						}, {
							default: D(() => [I(P(z(n)("viewer.studio.tabFile", "File")), 1)]),
							_: 1
						}, 8, ["class"])
					]),
					x("div", pn, [S.value === "generation" ? (j(), b(h, {
						key: `g:${H.value.id}`,
						asset: H.value
					}, null, 8, ["asset"])) : S.value === "workflow" ? (j(), b(_, {
						key: `w:${H.value.id}`,
						asset: H.value
					}, null, 8, ["asset"])) : (j(), b(m, {
						key: `f:${H.value.id}`,
						asset: H.value
					}, null, 8, ["asset"]))])
				], 32)) : T("", !0)]),
				G.value > 1 ? (j(), L("footer", {
					key: 0,
					class: "mjr-studio__filmstrip",
					role: "listbox",
					"aria-label": z(n)("viewer.studio.filmstrip", "Filmstrip")
				}, [(j(!0), L(y, null, C(xe.value, (e) => (j(), b(r, {
					key: `${e.index}:${e.asset?.id ?? e.asset?.filename}`,
					type: "button",
					role: "option",
					class: R(["mjr-studio__thumb", { "is-current": e.index === z(Q).index }]),
					"aria-selected": e.index === z(Q).index,
					title: e.asset?.filename,
					onClick: (t) => z(Le)(e.index)
				}, {
					default: D(() => [ct(e.asset) ? (j(), L("img", {
						key: 0,
						src: ct(e.asset),
						alt: "",
						loading: "lazy",
						draggable: "false"
					}, null, 8, hn)) : (j(), L("i", gn)), z(K)(e.asset) === "video" ? (j(), L("i", _n)) : T("", !0)]),
					_: 2
				}, 1032, [
					"class",
					"aria-selected",
					"title",
					"onClick"
				]))), 128))], 8, mn)) : T("", !0)
			], 10, Zt)) : T("", !0)]);
		};
	}
}), yn = /* @__PURE__ */ E({
	__name: "ViewerPortal",
	emits: ["ready"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			let t = e?.detail || {}, n = Array.isArray(t?.assets) ? t.assets.filter(Boolean) : t?.asset ? [t.asset] : [];
			n.length && Fe(n, Math.max(0, Math.min(Number(t?.index) || 0, n.length - 1)), String(t?.mode || "").trim().toLowerCase()) && (t.handled = !0);
		}
		return S(() => {
			try {
				u();
			} catch (e) {
				console.debug?.(e);
			}
			try {
				window.addEventListener(p.OPEN_VIEWER, r);
			} catch (e) {
				console.debug?.(e);
			}
			n("ready");
		}), A(() => {
			try {
				window.removeEventListener(p.OPEN_VIEWER, r);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				l();
			} catch (e) {
				console.debug?.(e);
			}
		}), (e, t) => (j(), L(y, null, [w(vn), w(Oe)], 64));
	}
});
export { yn as default };
