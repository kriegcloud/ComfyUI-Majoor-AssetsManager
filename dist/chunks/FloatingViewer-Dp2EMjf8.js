import { Zt as e, g as t, y as n } from "./viewerRuntimeHosts-hxZR_B5C.js";
import { C as r, H as i, I as a, M as o, O as s, P as c, R as l, S as u, V as d, it as f, j as p, m, mt as h, o as g, r as _, v, w as y, x as b } from "./events-DXdLblY2.js";
import { a as x, i as S, o as C, s as w } from "./graphTraversal-C94Q5bJN.js";
import { _ as T, g as E, m as D, n as ee, p as O, r as k, w as A } from "./Viewer-BkYWLmB5.js";
import { a as j, c as M, i as N, n as te, o as P, r as F, y as I } from "./SidebarWorkflowSection-DvOLlR6w.js";
import { a as ne, c as re, i as L, l as R, o as z, r as ie, s as ae, t as oe } from "./openMajoorSettings-L5sqXIIh.js";
import { a as se, n as ce, r as le } from "./model3dRenderer-JLnYDjnt.js";
import { i as ue, o as de, r as fe, t as pe } from "./geninfoParser-Bwtqk4p6.js";
import { t as me } from "./genInfo-BJJurQEA.js";
//#region ui/features/viewer/floatingViewerConstants.ts
var B = Object.freeze({
	SIMPLE: "simple",
	AB: "ab",
	SIDE: "side",
	GRID: "grid",
	GRAPH: "graph"
}), he = .25, ge = 8e-4, _e = 30;
function ve(e) {
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "0:00";
	let n = Math.floor(t), r = Math.floor(n / 3600), i = Math.floor(n % 3600 / 60), a = n % 60;
	return r > 0 ? `${r}:${String(i).padStart(2, "0")}:${String(a).padStart(2, "0")}` : `${i}:${String(a).padStart(2, "0")}`;
}
function ye(e) {
	try {
		let t = e?.play?.();
		t && typeof t.catch == "function" && t.catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
}
function be(e, t) {
	let n = Math.floor(Number(e) || 0), r = Math.max(0, Math.floor(Number(t) || 0));
	return n < 0 ? 0 : r > 0 && n > r ? r : n;
}
function xe(e, t) {
	let n = Number(e?.currentTime || 0), r = Number(t) > 0 ? Number(t) : _e;
	return Math.max(0, Math.floor(n * r));
}
function Se(e, t) {
	let n = Number(e?.duration || 0), r = Number(t) > 0 ? Number(t) : _e;
	return !Number.isFinite(n) || n <= 0 ? 0 : Math.max(0, Math.floor(n * r));
}
function Ce(e, t, n) {
	let r = Number(n) > 0 ? Number(n) : _e, i = be(t, Se(e, r)) / r;
	try {
		e.currentTime = Math.max(0, i);
	} catch (e) {
		console.debug?.(e);
	}
}
function we(e) {
	return e instanceof HTMLMediaElement;
}
function Te(e, t) {
	return String(e || "").toLowerCase() === "video" || t instanceof HTMLVideoElement;
}
function Ee(e, t) {
	return String(e || "").toLowerCase() === "audio" || t instanceof HTMLAudioElement;
}
function De(e) {
	let t = String(e || "").toLowerCase();
	return t === "gif" || t === "animated-image";
}
function Oe(e) {
	try {
		let t = Number(e?.naturalWidth || e?.width || 0), n = Number(e?.naturalHeight || e?.height || 0);
		if (!(t > 0 && n > 0)) return "";
		let r = document.createElement("canvas");
		r.width = t, r.height = n;
		let i = r.getContext("2d");
		return i ? (i.drawImage(e, 0, 0, t, n), r.toDataURL("image/png")) : "";
	} catch (e) {
		return console.debug?.(e), "";
	}
}
function ke(e, t = null, { kind: n = "" } = {}) {
	if (!e || e._mjrSimplePlayerMounted) return e?.parentElement || null;
	e._mjrSimplePlayerMounted = !0;
	let r = O(t) || _e, i = we(e), a = Te(n, e), o = Ee(n, e), s = De(n), c = document.createElement("div");
	c.className = "mjr-mfv-simple-player", c.tabIndex = 0, c.setAttribute("role", "group"), c.setAttribute("aria-label", "Media player"), o && c.classList.add("is-audio"), s && c.classList.add("is-animated-image");
	let l = document.createElement("div");
	l.className = "mjr-mfv-simple-player-controls";
	let u = document.createElement("input");
	u.type = "range", u.className = "mjr-mfv-simple-player-seek", u.min = "0", u.max = "1000", u.step = "1", u.value = "0", u.setAttribute("aria-label", "Seek"), i || (u.disabled = !0, u.classList.add("is-disabled"));
	let d = document.createElement("div");
	d.className = "mjr-mfv-simple-player-row";
	let f = document.createElement("button");
	f.type = "button", f.className = "mjr-icon-btn mjr-mfv-simple-player-btn", f.setAttribute("aria-label", "Play/Pause");
	let p = document.createElement("i");
	p.className = "pi pi-pause", p.setAttribute("aria-hidden", "true"), f.appendChild(p);
	let m = document.createElement("button");
	m.type = "button", m.className = "mjr-icon-btn mjr-mfv-simple-player-btn", m.setAttribute("aria-label", "Step back");
	let h = document.createElement("i");
	h.className = "pi pi-step-backward", h.setAttribute("aria-hidden", "true"), m.appendChild(h);
	let g = document.createElement("button");
	g.type = "button", g.className = "mjr-icon-btn mjr-mfv-simple-player-btn", g.setAttribute("aria-label", "Step forward");
	let _ = document.createElement("i");
	_.className = "pi pi-step-forward", _.setAttribute("aria-hidden", "true"), g.appendChild(_);
	let v = document.createElement("div");
	v.className = "mjr-mfv-simple-player-time", v.textContent = "0:00 / 0:00";
	let y = document.createElement("div");
	y.className = "mjr-mfv-simple-player-frame", y.textContent = "F: 0", a || (y.style.display = "none");
	let b = document.createElement("button");
	b.type = "button", b.className = "mjr-icon-btn mjr-mfv-simple-player-btn", b.setAttribute("aria-label", "Mute/Unmute");
	let x = document.createElement("i");
	if (x.className = "pi pi-volume-up", x.setAttribute("aria-hidden", "true"), b.appendChild(x), a || (m.disabled = !0, g.disabled = !0, m.classList.add("is-disabled"), g.classList.add("is-disabled")), d.appendChild(m), d.appendChild(f), d.appendChild(g), d.appendChild(v), d.appendChild(y), d.appendChild(b), l.appendChild(u), l.appendChild(d), c.appendChild(e), o) {
		let e = document.createElement("div");
		e.className = "mjr-mfv-simple-player-audio-backdrop", e.textContent = String(t?.filename || "Audio"), c.appendChild(e);
	}
	c.appendChild(l);
	try {
		e instanceof HTMLMediaElement && (e.controls = !1, e.playsInline = !0, e.loop = !0, e.muted = !0, e.autoplay = !0);
	} catch (e) {
		console.debug?.(e);
	}
	let S = s ? String(e?.src || "") : "", C = !1, w = "", T = null, E = null, D = () => {
		if (i) {
			p.className = e.paused ? "pi pi-play" : "pi pi-pause";
			return;
		}
		if (s) {
			p.className = C ? "pi pi-play" : "pi pi-pause";
			return;
		}
		p.className = "pi pi-play";
	}, ee = () => {
		if (e instanceof HTMLMediaElement) {
			x.className = e.muted ? "pi pi-volume-off" : "pi pi-volume-up";
			return;
		}
		x.className = "pi pi-volume-off", b.disabled = !0, b.classList.add("is-disabled");
	}, k = () => {
		if (!a || !(e instanceof HTMLVideoElement)) return;
		let t = xe(e, r), n = Se(e, r);
		y.textContent = n > 0 ? `F: ${t}/${n}` : `F: ${t}`;
	}, A = () => {
		let e = Math.max(0, Math.min(100, Number(u.value) / 1e3 * 100));
		u.style.setProperty("--mjr-seek-pct", `${e}%`);
	}, j = () => {
		if (!i) {
			v.textContent = s ? "Animated" : "Preview", u.value = "0", A();
			return;
		}
		let t = Number(e.currentTime || 0), n = Number(e.duration || 0);
		if (Number.isFinite(n) && n > 0) {
			let e = Math.max(0, Math.min(1, t / n));
			u.value = String(Math.round(e * 1e3)), v.textContent = `${ve(t)} / ${ve(n)}`;
		} else u.value = "0", v.textContent = `${ve(t)} / 0:00`;
		A();
	}, M = () => {
		try {
			let t = e;
			E != null && typeof t?.cancelVideoFrameCallback == "function" && t.cancelVideoFrameCallback(E);
		} catch (e) {
			console.debug?.(e);
		}
		E = null;
		try {
			T != null && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(T);
		} catch (e) {
			console.debug?.(e);
		}
		T = null;
	}, N = () => {
		T = null, E = null;
		try {
			k(), j();
		} catch (e) {
			console.debug?.(e);
		}
		if (i && !e?.paused) {
			try {
				let t = e;
				if (typeof t?.requestVideoFrameCallback == "function") {
					E = t.requestVideoFrameCallback(N);
					return;
				}
			} catch (e) {
				console.debug?.(e);
			}
			try {
				typeof requestAnimationFrame == "function" && (T = requestAnimationFrame(N));
			} catch (e) {
				console.debug?.(e);
			}
		}
	}, te = () => {
		M(), i && !e?.paused && N();
	}, P = (e) => {
		try {
			e?.stopPropagation?.();
		} catch {}
	}, F = (t) => {
		P(t);
		try {
			i ? e.paused ? ye(e) : e.pause?.() : s && (C ? (e.src = S ? `${S}${S.includes("?") ? "&" : "?"}mjr_anim=${Date.now()}` : e.src, C = !1) : (w ||= Oe(e), w && (e.src = w), C = !0));
		} catch (e) {
			console.debug?.(e);
		}
		D();
	}, I = (t, n) => {
		if (P(n), a && e instanceof HTMLVideoElement) {
			try {
				e.pause?.();
			} catch (e) {
				console.debug?.(e);
			}
			Ce(e, xe(e, r) + t, r), D(), k(), j();
		}
	}, ne = (t) => {
		if (P(t), e instanceof HTMLMediaElement) {
			try {
				e.muted = !e.muted;
			} catch (e) {
				console.debug?.(e);
			}
			ee();
		}
	}, re = (t) => {
		if (P(t), !i) return;
		A();
		let n = Number(e.duration || 0);
		if (!Number.isFinite(n) || n <= 0) return;
		let r = Math.max(0, Math.min(1, Number(u.value) / 1e3));
		try {
			e.currentTime = n * r;
		} catch (e) {
			console.debug?.(e);
		}
		k(), j();
	}, L = (e) => P(e), R = (e) => {
		try {
			if (e?.target?.closest?.("button, input, textarea, select")) return;
			c.focus?.({ preventScroll: !0 });
		} catch (e) {
			console.debug?.(e);
		}
	}, z = (e) => {
		let t = String(e?.key || "");
		if (!(!t || e?.altKey || e?.ctrlKey || e?.metaKey)) {
			if (t === " " || t === "Spacebar") {
				e.preventDefault?.(), F(e);
				return;
			}
			if (t === "ArrowLeft") {
				if (!a) return;
				e.preventDefault?.(), I(-1, e);
				return;
			}
			if (t === "ArrowRight") {
				if (!a) return;
				e.preventDefault?.(), I(1, e);
			}
		}
	};
	try {
		c._mjrSimplePlayerHandleKeydown = z;
	} catch (e) {
		console.debug?.(e);
	}
	f.addEventListener("click", F), m.addEventListener("click", (e) => I(-1, e)), g.addEventListener("click", (e) => I(1, e)), b.addEventListener("click", ne), u.addEventListener("input", re), l.addEventListener("pointerdown", L), l.addEventListener("click", L), l.addEventListener("dblclick", L), c.addEventListener("pointerdown", R), c.addEventListener("keydown", z), e instanceof HTMLMediaElement && (e.addEventListener("play", () => {
		D(), te();
	}, { passive: !0 }), e.addEventListener("pause", () => {
		M(), D(), k(), j();
	}, { passive: !0 }), e.addEventListener("ended", () => {
		M(), D(), k(), j();
	}, { passive: !0 }), e.addEventListener("timeupdate", () => {
		k(), j();
	}, { passive: !0 }), e.addEventListener("seeked", () => {
		k(), j();
	}, { passive: !0 }), e.addEventListener("loadedmetadata", () => {
		k(), j();
	}, { passive: !0 })), ye(e), D(), ee(), k(), j(), te();
	try {
		c._mjrSimplePlayerDestroy = M, c._mjrMediaControlsHandle = { destroy: M };
	} catch (e) {
		console.debug?.(e);
	}
	return c;
}
//#endregion
//#region ui/features/viewer/floatingViewerMedia.ts
var Ae = /* @__PURE__ */ new Set([
	".mp4",
	".webm",
	".mov",
	".avi",
	".mkv",
	".m4v"
]), je = /* @__PURE__ */ new Set([
	".mp3",
	".wav",
	".flac",
	".ogg",
	".m4a",
	".aac",
	".opus",
	".wma"
]);
function Me(e) {
	try {
		let t = String(e || "").trim(), n = t.lastIndexOf(".");
		return n >= 0 ? t.slice(n).toLowerCase() : "";
	} catch {
		return "";
	}
}
function V(e) {
	let t = String(e?.kind || "").toLowerCase();
	if (t === "video") return "video";
	if (t === "audio") return "audio";
	if (t === "model3d") return "model3d";
	let n = String(e?.type || "").toLowerCase(), r = String(e?.asset_type || e?.media_type || n).toLowerCase();
	if (r === "video") return "video";
	if (r === "audio") return "audio";
	if (r === "model3d") return "model3d";
	let i = String(e?.mime || e?.mimetype || e?.content_type || "").trim().toLowerCase();
	if (i.startsWith("video/")) return "video";
	if (i.startsWith("audio/")) return "audio";
	if (i.startsWith("image/gif")) return "gif";
	let a = Me(e?.filename || "");
	return a === ".gif" ? "gif" : Ae.has(a) ? "video" : je.has(a) ? "audio" : ce.has(a) ? "model3d" : "image";
}
function Ne(e) {
	return e ? e.url ? String(e.url) : e.filename && e.id == null ? h(e.filename, e.subfolder || "", e.type || "output") : e.filename && f(e) || "" : "";
}
function H(e = "No media  -  select assets in the grid") {
	let t = document.createElement("div");
	return t.className = "mjr-mfv-empty", t.textContent = e, t;
}
function U(e, t) {
	let n = document.createElement("div");
	return n.className = `mjr-mfv-label label-${t}`, n.textContent = e, n;
}
function Pe(e) {
	if (e && typeof e.play == "function") try {
		let t = e.play();
		t && typeof t.catch == "function" && t.catch(() => {});
	} catch (e) {
		console.debug?.(e);
	}
}
function Fe(e) {
	if (e && typeof e.play == "function") try {
		let t = e.play();
		t && typeof t.catch == "function" && t.catch(() => {
			try {
				e.muted = !0, Pe(e);
			} catch (e) {
				console.debug?.(e);
			}
		});
	} catch (e) {
		console.debug?.(e);
	}
}
function Ie(e, t) {
	let n = e && e.nodeType === 1 ? e : e?.parentElement || null;
	for (; n && n !== t;) {
		try {
			let e = window.getComputedStyle?.(n), t = /(auto|scroll|overlay)/.test(String(e?.overflowY || "")), r = /(auto|scroll|overlay)/.test(String(e?.overflowX || ""));
			if (t || r) return n;
		} catch (e) {
			console.debug?.(e);
		}
		n = n.parentElement || null;
	}
	return null;
}
function Le(e, t, n) {
	if (!e) return !1;
	if (Math.abs(Number(n) || 0) >= Math.abs(Number(t) || 0)) {
		let t = Number(e.scrollTop || 0), r = Math.max(0, Number(e.scrollHeight || 0) - Number(e.clientHeight || 0));
		if (n < 0 && t > 0 || n > 0 && t < r) return !0;
	}
	let r = Number(e.scrollLeft || 0), i = Math.max(0, Number(e.scrollWidth || 0) - Number(e.clientWidth || 0));
	return t < 0 && r > 0 || t > 0 && r < i;
}
function Re(e) {
	if (e) try {
		let t = e.querySelectorAll?.("video, audio");
		if (!t || !t.length) return;
		for (let e of t) try {
			e.pause?.();
		} catch (e) {
			console.debug?.(e);
		}
	} catch (e) {
		console.debug?.(e);
	}
}
function W(e, { fill: t = !1, controls: n = !0, initialMuted: r = !1, initialPlaybackRate: i = 1 } = {}) {
	let a = Ne(e);
	if (!a) return null;
	let o = V(e), s = `mjr-mfv-media mjr-mfv-media--fit-height${t ? " mjr-mfv-media--fill" : ""}`, c = Me(e?.filename || "") === ".webp" && Number(e?.duration ?? e?.metadata_raw?.duration ?? 0) > 0, l = (r, a) => {
		if (!n) return r;
		let o = document.createElement("div");
		if (o.className = `mjr-mfv-player-host${t ? " mjr-mfv-player-host--fill" : ""}`, a === "audio") {
			o.classList.add("mjr-mfv-player-host--audio");
			let t = document.createElement("div");
			t.className = "mjr-mfv-player-audio-backdrop", t.textContent = String(e?.filename || "Audio"), o.appendChild(t);
		}
		o.appendChild(r);
		try {
			o.tabIndex = -1, o.addEventListener("pointerdown", (e) => {
				try {
					if (e?.target?.closest?.("button, input, textarea, select, a, [contenteditable='true']")) return;
					o.focus?.({ preventScroll: !0 });
				} catch (e) {
					console.debug?.(e);
				}
			});
		} catch (e) {
			console.debug?.(e);
		}
		let s = k(r, {
			variant: "viewer",
			hostEl: o,
			mediaKind: a,
			initialFps: O(e) || void 0,
			initialFrameCount: D(e, O(e)) || void 0,
			initialPlaybackRate: i
		});
		try {
			s && (o._mjrMediaControlsHandle = s);
		} catch (e) {
			console.debug?.(e);
		}
		return o;
	};
	if (o === "audio") {
		let e = document.createElement("audio");
		e.className = s, e.src = a, e.controls = !1, e.autoplay = !0, e.preload = "metadata", e.loop = !0, e.muted = r, e.playbackRate = i;
		let t = r ? () => Pe(e) : () => Fe(e);
		try {
			e.addEventListener("loadedmetadata", t, { once: !0 });
		} catch (e) {
			console.debug?.(e);
		}
		return t(), l(e, "audio");
	}
	if (o === "video") {
		let t = document.createElement("video");
		t.className = s, t.src = a, t.controls = !1, t.loop = !0, t.preload = "metadata", t.muted = e?._isPreview ? !0 : r, t.playbackRate = i, t.autoplay = !0, t.playsInline = !0;
		let n = t.muted ? () => Pe(t) : () => Fe(t);
		try {
			t.addEventListener("loadedmetadata", n, { once: !0 });
		} catch (e) {
			console.debug?.(e);
		}
		return n(), l(t, "video");
	}
	if (o === "model3d") return le(e, a, {
		hostClassName: `mjr-model3d-host mjr-mfv-model3d-host${t ? " mjr-mfv-model3d-host--fill" : ""}`,
		canvasClassName: `mjr-mfv-media mjr-model3d-render-canvas${t ? " mjr-mfv-media--fill" : ""}`,
		hintText: "Rotate: left drag  Pan: right drag  Zoom: wheel or middle drag",
		disableViewerTransform: !0,
		pauseDuringExecution: !!g.FLOATING_VIEWER_PAUSE_DURING_EXECUTION
	});
	let u = document.createElement("img");
	return u.className = s, u.src = a, u.alt = String(e?.filename || ""), u.draggable = !1, (o === "gif" || c) && ke(u, e, { kind: o === "gif" ? "gif" : "animated-image" }) || u;
}
function ze(e, t, n, r, i, a) {
	e.beginPath(), typeof e.roundRect == "function" ? e.roundRect(t, n, r, i, a) : (e.moveTo(t + a, n), e.lineTo(t + r - a, n), e.quadraticCurveTo(t + r, n, t + r, n + a), e.lineTo(t + r, n + i - a), e.quadraticCurveTo(t + r, n + i, t + r - a, n + i), e.lineTo(t + a, n + i), e.quadraticCurveTo(t, n + i, t, n + i - a), e.lineTo(t, n + a), e.quadraticCurveTo(t, n, t + a, n), e.closePath());
}
function Be(e, t, n, r) {
	e.save(), e.font = "bold 10px system-ui, sans-serif";
	let i = e.measureText(t).width;
	e.fillStyle = "rgba(0,0,0,0.58)", ze(e, n, r, i + 10, 18, 4), e.fill(), e.fillStyle = "#fff", e.fillText(t, n + 5, r + 13), e.restore();
}
//#endregion
//#region ui/features/viewer/workflowSidebar/NodeWidgetRenderer.ts
var Ve = /* @__PURE__ */ new Set([
	"imageupload",
	"button",
	"hidden"
]), He = /\bnote\b|markdown/i;
function Ue(e) {
	return He.test(String(e?.type || ""));
}
function We(e) {
	let t = e?.properties ?? {};
	if (typeof t.text == "string") return t.text;
	if (typeof t.value == "string") return t.value;
	if (typeof t.markdown == "string") return t.markdown;
	let n = e?.widgets?.[0];
	return n != null && n.value != null ? String(n.value) : "";
}
function Ge(e, t) {
	let n = e?.properties;
	n && ("text" in n ? n.text = t : "value" in n ? n.value = t : "markdown" in n ? n.markdown = t : n.text = t);
	let r = e?.widgets?.[0];
	r && (r.value = t);
}
var Ke = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, qe = /^[0-9a-f]{20,}$/i;
function Je(...e) {
	for (let t of e) {
		let e = String(t || "").trim();
		if (e) return e;
	}
	return "";
}
function Ye(e) {
	return Ke.test(e) || qe.test(e);
}
function Xe(e) {
	return Je(e?.title, e?.properties?.title, e?.properties?.name, e?.properties?.label, e?.name);
}
function Ze(e, { isSubgraph: t = !1 } = {}) {
	let n = String(e?.type || "").trim(), r = Xe(e);
	return (t || Ye(n)) && r ? r : Ye(n) ? "Subgraph" : n || r || `Node #${e?.id}`;
}
function Qe(e, t, { isSubgraph: n = !1 } = {}) {
	let r = String(e?.type || "").trim(), i = Xe(e);
	return n && r && !Ye(r) && r !== t ? r : i && i !== r && i !== t ? i : "";
}
var $e = class {
	_node;
	_onLocate;
	_onToggle;
	_collapsible;
	_expanded;
	_depth;
	_isSubgraph;
	_childCount;
	_el;
	_header;
	_body;
	_toggleBtn;
	_inputMap;
	_autoFits;
	_noteTextarea;
	_subgraphHeaderTitle;
	_mjrTreeItemEl;
	constructor(e, t = {}) {
		this._node = e, this._onLocate = t.onLocate ?? null, this._onToggle = typeof t.onToggle == "function" ? t.onToggle : null, this._collapsible = !!t.collapsible, this._expanded = t.expanded !== !1, this._depth = t.depth ?? 0, this._isSubgraph = !!t.isSubgraph, this._childCount = Math.max(0, Number(t.childCount) || 0), this._el = null, this._header = null, this._body = null, this._toggleBtn = null, this._inputMap = /* @__PURE__ */ new Map(), this._autoFits = [], this._noteTextarea = null, this._subgraphHeaderTitle = "";
	}
	get el() {
		return this._el ||= this._render(), this._el;
	}
	syncFromGraph() {
		if (this._noteTextarea) {
			if ((this._el?.ownerDocument || document)?.activeElement !== this._noteTextarea) {
				let e = We(this._node);
				this._noteTextarea.value !== e && (this._noteTextarea.value = e, this._noteTextarea._mjrAutoFit?.());
			}
			return;
		}
		if (!this._node?.widgets) return;
		let e = (this._el?.ownerDocument || document)?.activeElement || null;
		for (let t of this._node.widgets) {
			let n = this._inputMap.get(t.name), r = et(n);
			if (!r) continue;
			if (r.type === "checkbox") {
				let e = !!t.value;
				r.checked !== e && (r.checked = e);
				continue;
			}
			let i = t.value == null ? "" : String(t.value);
			String(r.value ?? "") !== i && (e && r === e || (r.value = i, n?._mjrAutoFit?.(), r?._mjrAutoFit?.()));
		}
	}
	dispose() {
		this._el?.remove(), this._el = null, this._autoFits = [], this._inputMap.clear();
	}
	setExpanded(e) {
		this._expanded = !!e, this._applyExpandedState(), this._expanded && this._autoFits?.length && requestAnimationFrame(() => {
			for (let e of this._autoFits) e();
		}), this._onToggle?.(this._expanded);
	}
	_render() {
		let e = this._node, t = document.createElement("section");
		t.className = "mjr-ws-node", t.dataset.nodeId = String(e.id ?? ""), this._isSubgraph && (t.classList.add("mjr-ws-node--subgraph"), t.dataset.subgraph = "true", t.dataset.childCount = String(this._childCount)), this._depth > 0 && (t.dataset.depth = String(this._depth), t.classList.add("mjr-ws-node--nested"));
		let n = document.createElement("div");
		if (n.className = "mjr-ws-node-header", this._collapsible) {
			this._header = n;
			let e = document.createElement("button");
			e.type = "button", e.className = "mjr-icon-btn mjr-ws-node-toggle", e.title = this._expanded ? "Collapse node" : "Expand node", e.addEventListener("click", (e) => {
				e.stopPropagation(), this.setExpanded(!this._expanded);
			}), n.appendChild(e), this._toggleBtn = e, n.addEventListener("click", (e) => {
				e.target?.closest?.("button") || this.setExpanded(!this._expanded);
			}), n.title = this._expanded ? "Collapse node" : "Expand node";
		}
		let r = document.createElement("div");
		r.className = "mjr-ws-node-title-wrap";
		let i = document.createElement("span");
		i.className = "mjr-ws-node-type";
		let a = Ze(e, { isSubgraph: this._isSubgraph });
		i.textContent = a, r.appendChild(i);
		let o = Qe(e, a, { isSubgraph: this._isSubgraph });
		if (o) {
			let e = document.createElement("span");
			e.className = "mjr-ws-node-title", e.textContent = o, r.appendChild(e);
		}
		if (n.appendChild(r), this._isSubgraph) {
			let e = document.createElement("span");
			e.className = "mjr-ws-node-kind", e.title = `${this._childCount} inner node${this._childCount === 1 ? "" : "s"}`;
			let t = document.createElement("i");
			t.className = "pi pi-sitemap", t.setAttribute("aria-hidden", "true"), e.appendChild(t);
			let r = document.createElement("span");
			r.textContent = "Subgraph", e.appendChild(r);
			let i = document.createElement("span");
			i.className = "mjr-ws-node-kind-count", i.textContent = String(this._childCount), e.appendChild(i), n.appendChild(e), this._subgraphHeaderTitle = `${a} | Subgraph | ${this._childCount} inner node${this._childCount === 1 ? "" : "s"}`, n.title = this._subgraphHeaderTitle;
		}
		let s = document.createElement("button");
		s.type = "button", s.className = "mjr-icon-btn mjr-ws-locate", s.title = "Locate on canvas", s.innerHTML = "<i class=\"pi pi-map-marker\" aria-hidden=\"true\"></i>", s.addEventListener("click", (e) => {
			e.stopPropagation(), this._locateNode();
		}), n.appendChild(s), t.appendChild(n);
		let c = document.createElement("div");
		if (c.className = "mjr-ws-node-body", Ue(e)) {
			let n = document.createElement("textarea");
			n.className = "mjr-ws-input mjr-ws-textarea mjr-ws-note-textarea", n.value = We(e), n.rows = 4;
			let r = () => {
				n.style.height = "auto", n.style.height = n.scrollHeight + "px";
			};
			return n.addEventListener("input", () => {
				Ge(e, n.value);
				let t = e?.widgets?.[0], i = t?.inputEl ?? t?.element ?? t?.el ?? null;
				i != null && "value" in i && i.value !== n.value && (i.value = n.value), r();
				try {
					l(e);
				} catch {}
			}), n._mjrAutoFit = r, this._noteTextarea = n, this._autoFits.push(r), c.appendChild(n), this._body = c, t.appendChild(c), this._el = t, this._applyExpandedState(), requestAnimationFrame(r), t;
		}
		let u = e.widgets ?? [], d = !1;
		for (let t of u) {
			let n = String(t.type || "").toLowerCase();
			if (Ve.has(n) || t.hidden || t.options?.hidden) continue;
			d = !0;
			let r = n === "text" || n === "string" || n === "customtext", i = document.createElement("div");
			i.className = r ? "mjr-ws-widget-row mjr-ws-widget-row--block" : "mjr-ws-widget-row";
			let a = document.createElement("label");
			a.className = "mjr-ws-widget-label", a.textContent = t.name || "";
			let o = document.createElement("div");
			o.className = "mjr-ws-widget-input";
			let s = ie(t, () => {}, e);
			o.appendChild(s), this._inputMap.set(t.name, s);
			let l = s._mjrAutoFit ?? s.querySelector?.("textarea")?._mjrAutoFit;
			l && this._autoFits.push(l), i.appendChild(a), i.appendChild(o), c.appendChild(i);
		}
		if (!d) {
			let e = document.createElement("div");
			e.className = "mjr-ws-node-empty", e.textContent = "No editable parameters", c.appendChild(e);
		}
		return this._body = c, t.appendChild(c), this._el = t, this._applyExpandedState(), t;
	}
	_applyExpandedState() {
		if (this._el && this._body) {
			if (this._el.classList.toggle("is-collapsible", this._collapsible), this._el.classList.toggle("is-collapsed", this._collapsible && !this._expanded), this._toggleBtn) {
				let e = this._expanded ? "pi pi-chevron-down" : "pi pi-chevron-right";
				this._toggleBtn.textContent = "";
				let t = document.createElement("i");
				t.className = e, t.setAttribute("aria-hidden", "true"), this._toggleBtn.appendChild(t), this._toggleBtn.title = this._expanded ? "Collapse node" : "Expand node", this._toggleBtn.setAttribute("aria-expanded", String(this._expanded));
			}
			if (this._header) {
				let e = this._expanded ? "Collapse node" : "Expand node";
				this._header.title = this._subgraphHeaderTitle ? `${this._subgraphHeaderTitle} | ${e}` : e;
			}
		}
	}
	_locateNode() {
		if (this._onLocate) {
			this._onLocate();
			return;
		}
		let e = this._node;
		if (e) try {
			r(e, {
				select: !1,
				focusCanvas: !1
			});
		} catch (e) {
			console.debug?.("[MFV sidebar] locateNode error", e);
		}
	}
};
function et(e) {
	return e ? e.classList?.contains?.("mjr-ws-text-wrapper") ? e.querySelector?.("textarea") ?? e : e : null;
}
//#endregion
//#region ui/features/viewer/workflowSidebar/WorkflowNodesTab.ts
var tt = class {
	_searchQuery;
	_expandedNodeIds;
	_expandedChildrenIds;
	_renderers;
	_el;
	_searchInput;
	_list;
	_lastNodeSig;
	_lastSelectedId;
	constructor() {
		this._searchQuery = "", this._expandedNodeIds = /* @__PURE__ */ new Set(), this._expandedChildrenIds = /* @__PURE__ */ new Set(), this._renderers = [], this._el = this._build(), this._lastNodeSig = "", this._lastSelectedId = "";
	}
	get el() {
		return this._el;
	}
	refresh() {
		this._maybeRebuildList();
		for (let e of this._renderers) e.syncFromGraph();
	}
	forceRebuild() {
		this._lastNodeSig = "", this._maybeRebuildList();
	}
	dispose() {
		for (let e of this._renderers) e.dispose();
		this._renderers = [], this._el?.remove?.();
	}
	_build() {
		let e = document.createElement("div");
		e.className = "mjr-ws-nodes-tab";
		let t = document.createElement("div");
		t.className = "mjr-ws-search-wrap";
		let n = document.createElement("i");
		n.className = "pi pi-search mjr-ws-search-icon", n.setAttribute("aria-hidden", "true"), t.appendChild(n), this._searchInput = document.createElement("input"), this._searchInput.type = "text", this._searchInput.className = "mjr-ws-search", this._searchInput.placeholder = "Search nodes...", this._searchInput.addEventListener("input", () => {
			this._searchQuery = this._searchInput.value, this.forceRebuild();
		}), t.appendChild(this._searchInput);
		let r = document.createElement("button");
		return r.type = "button", r.className = "mjr-ws-search-clear", r.title = "Clear search", r.innerHTML = "<i class=\"pi pi-times\" aria-hidden=\"true\"></i>", r.addEventListener("click", () => {
			this._searchInput.value = "", this._searchQuery = "", this.forceRebuild();
		}), t.appendChild(r), e.appendChild(t), this._list = document.createElement("div"), this._list.className = "mjr-ws-nodes-list", e.appendChild(this._list), e;
	}
	_syncCanvasSelection() {
		let e = lt()[0] || "", t = null;
		for (let n of this._renderers) {
			let r = String(n._node?.id ?? "") === e;
			n.el?.classList?.toggle("is-selected-from-graph", r), r && (t = n);
		}
		if (!e) {
			this._lastSelectedId = "";
			return;
		}
		if (e !== this._lastSelectedId && (this._lastSelectedId = e, t)) {
			t._expanded || t.setExpanded(!0);
			try {
				let e = t._mjrTreeItemEl || t.el;
				this._openTreeBranch(e);
				let n = e?.parentElement;
				n && n.firstElementChild !== e && n.insertBefore(e, n.firstElementChild), t.el?.scrollIntoView({
					block: "start",
					inline: "nearest"
				});
			} catch (e) {
				console.debug?.("[MFV] promote selected node failed", e);
			}
		}
	}
	_maybeRebuildList() {
		let e = it(nt()), t = (this._searchQuery || "").toLowerCase().trim(), n = t ? at(e, t) : e, r = ot(n);
		if (r === this._lastNodeSig) {
			this._syncCanvasSelection();
			return;
		}
		this._lastNodeSig = r;
		for (let e of this._renderers) e.dispose();
		if (this._renderers = [], this._list.innerHTML = "", !n.length) {
			let t = document.createElement("div");
			t.className = "mjr-ws-sidebar-empty", t.textContent = e.length ? "No nodes match your search" : "No nodes in workflow", this._list.appendChild(t);
			return;
		}
		this._renderItems(n, this._list, 0, null), this._syncCanvasSelection();
	}
	_renderItems(e, t, n, r) {
		for (let { node: i, children: a } of e) {
			let e = String(i?.id ?? ""), o = a.length, s = document.createElement("div");
			s.className = "mjr-ws-tree-item", s.dataset.nodeId = e, s._mjrNodeId = e, s._mjrParentTreeItem = r || null, o > 0 && s.classList.add("mjr-ws-tree-item--subgraph"), n > 0 && s.classList.add("mjr-ws-tree-item--nested");
			let c = new $e(i, {
				collapsible: !0,
				expanded: this._expandedNodeIds.has(e),
				depth: n,
				isSubgraph: o > 0,
				childCount: o,
				onLocate: () => ct(i),
				onToggle: (t) => {
					if (t) {
						this._expandedNodeIds = /* @__PURE__ */ new Set([e]);
						for (let e of this._renderers) e !== c && e.setExpanded(!1);
					} else this._expandedNodeIds.delete(e);
				}
			});
			if (c._mjrTreeItemEl = s, this._renderers.push(c), s.appendChild(c.el), o > 0) {
				let t = this._expandedChildrenIds.has(e), r = document.createElement("button");
				r.type = "button", r.className = "mjr-ws-children-toggle", n > 0 && r.classList.add("mjr-ws-children-toggle--nested"), st(r, o, t);
				let i = document.createElement("div");
				i.className = "mjr-ws-children", i.hidden = !t, s._mjrChildrenToggle = r, s._mjrChildrenEl = i, s._mjrChildCount = o, this._renderItems(a, i, n + 1, s), r.addEventListener("click", () => {
					this._setTreeItemChildrenOpen(s, i.hidden);
				}), s.appendChild(r), s.appendChild(i);
			}
			t.appendChild(s);
		}
	}
	_setTreeItemChildrenOpen(e, t) {
		if (!e?._mjrChildrenEl || !e?._mjrChildrenToggle) return;
		let n = String(e._mjrNodeId || "");
		e._mjrChildrenEl.hidden = !t, n && (t ? this._expandedChildrenIds.add(n) : this._expandedChildrenIds.delete(n)), st(e._mjrChildrenToggle, Number(e._mjrChildCount) || 0, t);
	}
	_openTreeBranch(e) {
		let t = e || null;
		for (; t;) {
			let e = t._mjrParentTreeItem || null;
			e && this._setTreeItemChildrenOpen(e, !0), t = e;
		}
		this._setTreeItemChildrenOpen(e, !0);
	}
};
function nt() {
	try {
		return s();
	} catch {
		return null;
	}
}
function rt(e) {
	return C(e);
}
function it(e, t = /* @__PURE__ */ new Set()) {
	if (!e || t.has(e)) return [];
	t.add(e);
	let n = S(e), r = [];
	for (let e of n) {
		if (!e) continue;
		let n = rt(e).flatMap((e) => it(e, t));
		r.push({
			node: e,
			children: n
		});
	}
	return r;
}
function at(e, t) {
	let n = [];
	for (let { node: r, children: i } of e) {
		let e = (r.type || "").toLowerCase().includes(t) || (r.title || "").toLowerCase().includes(t), a = at(i, t);
		(e || a.length > 0) && n.push({
			node: r,
			children: a
		});
	}
	return n;
}
function ot(e) {
	let t = [];
	function n(e) {
		for (let { node: r, children: i } of e) t.push(r.id), t.push("["), n(i), t.push("]");
	}
	return n(e), t.join(",");
}
function st(e, t, n) {
	let r = n ? "pi-chevron-down" : "pi-chevron-right";
	e.textContent = "";
	let i = document.createElement("i");
	i.className = `pi ${r}`, i.setAttribute("aria-hidden", "true"), e.appendChild(i);
	let a = document.createElement("span");
	a.textContent = `${t} inner node${t === 1 ? "" : "s"}`, e.appendChild(a), e.setAttribute("aria-expanded", String(n));
}
function ct(e) {
	try {
		r(e);
	} catch (e) {
		console.debug?.("[MFV] _focusNode", e);
	}
}
function lt() {
	try {
		return o();
	} catch (e) {
		console.debug?.("[MFV] _getSelectedNodeIds", e);
	}
	return [];
}
//#endregion
//#region ui/features/viewer/workflowGraphMap/workflowGraphMapData.ts
var ut = /* @__PURE__ */ new Map(), dt = null;
async function ft(e) {
	let t = Array.from(new Set(mt(e).map((e) => G(e)).filter(Boolean)));
	if (t.length && t.filter((e) => !ut.has(e)).length) try {
		dt ||= u("/object_info").then((e) => e?.ok ? e.json() : null).then((e) => {
			if (e && typeof e == "object") for (let [t, n] of Object.entries(e)) ut.set(String(t), n);
			return e;
		}).catch(() => null), await dt;
	} catch {}
}
function pt(e) {
	let t = Pt(e), n = Ft(e);
	for (let e of t) {
		let t = It(K(e));
		if (t) return zt(t, n), Rt(t), t;
	}
	return null;
}
function mt(e, t = null) {
	let n = t?.includeSubgraphs !== !1, r = Array.isArray(e?.nodes) ? e.nodes.filter(Boolean) : [];
	if (!n) return r;
	let i = [...r], a = J(e);
	for (let n of r) {
		let r = Qt(e, n, a);
		r && i.push(...mt(r, t));
	}
	return i;
}
function ht(e, t, n = null) {
	let r = n?.includeSubgraphs !== !1, i = String(t ?? "");
	if (!i) return null;
	if (!r) return (Array.isArray(e?.nodes) ? e.nodes : []).find((e) => String(e?.id ?? e?.ID ?? "") === i) || null;
	if (i.includes("::")) return $t(e, i.split("::").filter(Boolean));
	let a = (Array.isArray(e?.nodes) ? e.nodes : []).find((e) => String(e?.id ?? e?.ID ?? "") === i) || null;
	if (a) return a;
	for (let t of Array.isArray(e?.nodes) ? e.nodes : []) {
		let n = Qt(e, t, J(e)), r = n ? ht(n, i) : null;
		if (r) return r;
	}
	return null;
}
function gt(e) {
	return N(e);
}
function G(e) {
	return j(e);
}
function _t(e) {
	return P(e);
}
function vt(e) {
	let t = yt(e), n = e?.properties && typeof e.properties == "object" ? e.properties : null;
	if (Array.isArray(e?._mjrSubgraphProxyParams)) for (let n of e._mjrSubgraphProxyParams) {
		let e = String(n?.label || n?.key || "").trim();
		e && !t.some(([t]) => String(t) === e) && t.push([e, n?.value]);
	}
	if (n) for (let [e, r] of Object.entries(n)) Et(e) || r != null && typeof r != "object" && t.push([e, r]);
	return t.slice(0, 160);
}
function yt(e) {
	let t = [], n = e?._mjrPromptInputs && typeof e._mjrPromptInputs == "object" ? e._mjrPromptInputs : null, r = e?.inputs && typeof e.inputs == "object" ? e.inputs : null;
	if (n && !Array.isArray(n)) for (let [e, r] of Object.entries(n)) Tt(r) || t.push([e, r]);
	if (r && !Array.isArray(r)) for (let [e, n] of Object.entries(r)) Tt(n) || t.some(([t]) => String(t) === String(e)) || t.push([e, n]);
	for (let { label: n, value: r } of bt(e)) t.some(([e]) => String(e) === String(n)) || t.push([n, r]);
	return t;
}
function bt(e) {
	let t = e?.widgets_values;
	if (xt(t)) return Object.entries(t).map(([e, t], n) => ({
		label: e,
		value: t,
		index: n
	}));
	let n = St(t), r = Array.isArray(e?.widgets) ? e.widgets : [], i = kt(Dt(e)), a = wt(e);
	return n.map((t, n) => {
		let o = Nt(e, n, t);
		return {
			label: a[n] || r[n]?.name || r[n]?.label || i[n] || o || `param ${n + 1}`,
			value: t,
			index: n
		};
	});
}
function xt(e) {
	return !(!e || typeof e != "object" || Array.isArray(e) || Ct(e));
}
function St(e) {
	if (Array.isArray(e)) return e;
	if (!Ct(e)) return [];
	let t = Math.max(0, Math.floor(Number(e.length) || 0)), n = [];
	for (let r = 0; r < t; r += 1) n.push(e[r]);
	return n;
}
function Ct(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return !1;
	let t = Number(e.length);
	return !(!Number.isFinite(t) || t < 0);
}
function wt(e) {
	let t = (Array.isArray(e?.inputs) ? e.inputs : []).filter(At), n = [], r = /* @__PURE__ */ new Set(), i = (e) => {
		let t = `${String(e?.name || "")}\u0000${String(e?.label || "")}\u0000${String(e?.link ?? "")}`;
		r.has(t) || (r.add(t), n.push(e));
	};
	for (let e of t) i(e);
	return n.map((e) => String(e?.label || e?.localized_name || e?.name || e?.widget?.name || e?.widget?.label || "").trim());
}
function Tt(e) {
	return Array.isArray(e) && e.length === 2 && String(e[0] ?? "").trim() !== "" && Number.isFinite(Number(e[1]));
}
function Et(e) {
	let t = q(String(e ?? "").trim());
	return !t || t === "cnr_id" || t === "ver" || t === "node_name_for_s&r" || t === "subgraph_name" || t === "subgraph_id" || t === "enabletabs" || t === "tabwidth" || t === "tabxoffset" || t === "hassecondtab" || t === "secondtabtext" || t === "secondtaboffset" || t === "secondtabwidth" || t.startsWith("ue_");
}
function Dt(e) {
	let t = G(e);
	return t && ut.get(t) || null;
}
function Ot(e) {
	let t = e?.input_order;
	if (t && typeof t == "object") return [...Array.isArray(t.required) ? t.required : [], ...Array.isArray(t.optional) ? t.optional : []].filter(Boolean);
	let n = e?.input;
	return n && typeof n == "object" ? ["required", "optional"].flatMap((e) => n[e] && typeof n[e] == "object" ? Object.keys(n[e]) : []).filter(Boolean) : [];
}
function kt(e) {
	let t = e?.input;
	if (!t || typeof t != "object") return Ot(e);
	let n = [];
	for (let e of ["required", "optional"]) {
		let r = t[e];
		if (r && typeof r == "object") for (let [e, t] of Object.entries(r)) jt(t) && n.push(e);
	}
	return n.length ? n : Ot(e);
}
function At(e) {
	return !e || typeof e != "object" ? !1 : !!(e.widget === !0 || e.widget && typeof e.widget == "object" || typeof e.widget == "string" && e.widget.trim() || e.widget_index != null || e.widgetIndex != null);
}
function jt(e) {
	let t = Array.isArray(e) ? e : [], n = t[0], r = t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) ? t[1] : null;
	return r?.forceInput === !0 || r?.rawLink === !0 ? !1 : r?.widgetType && String(r.widgetType).trim() ? !0 : Mt(n);
}
function Mt(e) {
	if (Array.isArray(e)) return !0;
	let t = String(e || "").trim().toUpperCase();
	return t ? t === "INT" || t === "FLOAT" || t === "STRING" || t === "BOOLEAN" || t === "BOOL" || t === "COMBO" || t === "ENUM" : !1;
}
function Nt(e, t, n) {
	let r = G(e), i = gt(e), a = `${r} ${i}`.toLowerCase(), o = String(n ?? "").toLowerCase();
	if (a.includes("ksamplerselect")) return "sampler_name";
	if (a.includes("ksampler")) return [
		"seed",
		"control_after_generate",
		"steps",
		"cfg",
		"sampler_name",
		"scheduler",
		"denoise"
	][t] || null;
	if (a.includes("manualsigmas")) return "sigmas";
	if (a.includes("randomnoise")) return t === 0 ? "noise_seed" : t === 1 ? "control_after_generate" : null;
	if (a.includes("cfgguider")) return "cfg";
	if (a.includes("loraloadermodelonly")) return t === 0 ? "lora_name" : t === 1 ? "strength_model" : null;
	if (a.includes("resizeimagesbylongeredge")) return "longer_edge";
	if (a.includes("vaedecodetiled")) return [
		"tile_size",
		"overlap",
		"temporal_size",
		"temporal_overlap"
	][t] || null;
	if (a.includes("textencoderloader") || a.includes("text encoder loader")) {
		if (t === 0) return "text_encoder";
		if (t === 1) return "ckpt_name";
		if (t === 2) return "device";
	}
	if (/primitive(?:int|float|string|boolean)|constant/.test(a) && t === 0) {
		let e = q(i);
		return e && e !== q(r) ? e : "value";
	}
	if (a.includes("cliptext") || a.includes("prompt")) return t === 0 ? "text" : null;
	if (o.includes(".safetensors") || o.includes(".ckpt")) return "model";
	if (typeof n == "number") {
		if (a.includes("sampler") && t === 0) return "seed";
		if (a.includes("sampler") && t === 1) return "steps";
		if (a.includes("latent") && t === 0) return "width";
		if (a.includes("latent") && t === 1) return "height";
	}
	return null;
}
function Pt(e) {
	let t = K(e?.metadata_raw), n = K(e?.metadata);
	return [
		e?.workflow,
		e?.Workflow,
		e?.comfy_workflow,
		e?.workflow_json,
		e?.template,
		e?.Template,
		e?.comfy_template,
		e?.subgraph,
		e?.Subgraph,
		e?.comfy_subgraph,
		t?.workflow,
		t?.Workflow,
		t?.comfy_workflow,
		t?.workflow_json,
		t?.template,
		t?.Template,
		t?.comfy_template,
		t?.subgraph,
		t?.Subgraph,
		t?.comfy_subgraph,
		t?.comfyui,
		t?.ComfyUI,
		n?.workflow,
		n?.Workflow,
		n?.comfy_workflow,
		n?.workflow_json,
		n?.template,
		n?.Template,
		n?.comfy_template,
		n?.subgraph,
		n?.Subgraph,
		n?.comfy_subgraph,
		e?.prompt,
		t?.prompt,
		t?.Prompt,
		n?.prompt,
		n?.Prompt
	].filter((e) => e != null);
}
function Ft(e) {
	let t = K(e?.metadata_raw), n = K(e?.metadata), r = [
		e?.prompt,
		e?.Prompt,
		t?.prompt,
		t?.Prompt,
		n?.prompt,
		n?.Prompt
	];
	for (let e of r) {
		let t = K(e);
		if (t && typeof t == "object" && !Array.isArray(t)) return t;
	}
	return null;
}
function K(e) {
	if (!e) return null;
	if (typeof e == "object") return e;
	if (typeof e != "string") return null;
	let t = e.trim();
	if (!t || !/^[{[]/.test(t)) return null;
	try {
		return JSON.parse(t);
	} catch {
		return null;
	}
}
function It(e) {
	if (!e || typeof e != "object") return null;
	if (Array.isArray(e.nodes)) return e;
	let t = Lt(e);
	if (t) return t;
	if (e.prompt && typeof e.prompt == "object") return F(e.prompt);
	let n = F(e);
	return n && Array.isArray(n.nodes) ? n : null;
}
function Lt(e) {
	for (let t of [
		"workflow",
		"Workflow",
		"template",
		"Template",
		"subgraph",
		"Subgraph",
		"graph",
		"lgraph"
	]) {
		let n = e?.[t];
		if (n && typeof n == "object" && Array.isArray(n.nodes)) return n;
	}
	return null;
}
function Rt(e, t = /* @__PURE__ */ new WeakSet()) {
	if (!e || typeof e != "object" || t.has(e)) return;
	t.add(e);
	let n = J(e);
	for (let r of Array.isArray(e?.nodes) ? e.nodes : []) {
		Wt(r, n);
		let i = Qt(e, r, n);
		i && (Gt(r, i), Rt(i, t));
	}
}
function zt(e, t) {
	if (!e || typeof e != "object" || !t || typeof t != "object") return;
	let n = Vt(t);
	n.length && Bt(e, n, /* @__PURE__ */ new WeakSet());
}
function Bt(e, t, n) {
	if (!e || typeof e != "object" || n.has(e)) return;
	n.add(e);
	let r = J(e);
	for (let i of Array.isArray(e?.nodes) ? e.nodes : []) {
		let a = Ht(i, t);
		a?.inputs && typeof a.inputs == "object" && !Array.isArray(a.inputs) && (i._mjrPromptInputs = a.inputs);
		let o = Qt(e, i, r);
		o && Bt(o, t, n);
	}
}
function Vt(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) return [];
	let t = [];
	for (let [n, r] of Object.entries(e)) {
		if (!r || typeof r != "object" || Array.isArray(r)) continue;
		let e = String(r.class_type || r.type || "").trim(), i = r.inputs;
		if (!e || !i || typeof i != "object" || Array.isArray(i)) continue;
		let a = String(n).split(":").pop() || String(n);
		t.push({
			id: String(n),
			leafId: a,
			classType: e,
			inputs: i
		});
	}
	return t;
}
function Ht(e, t) {
	let n = String(e?.id ?? e?.ID ?? "").trim(), r = Ut(G(e));
	if (!n || !r) return null;
	let i = t.find((e) => e.id === n && Ut(e.classType) === r);
	if (i) return i;
	let a = t.filter((e) => e.leafId === n && Ut(e.classType) === r);
	return a.length === 1 ? a[0] : null;
}
function Ut(e) {
	return String(e || "").trim().toLowerCase();
}
function Wt(e, t) {
	if (!e || typeof e != "object") return;
	let n = Zt(e).find((e) => t.has(String(e)));
	if (!n) return;
	let r = t.get(String(n)), i = String(r?.name || r?.title || e?.subgraph?.name || e?.subgraph_instance?.name || "").trim();
	if (!i) return;
	let a = e?.properties && typeof e.properties == "object" ? e.properties : e.properties = {};
	String(a.subgraph_name || "").trim() || (a.subgraph_name = i), String(a.subgraph_id || "").trim() || (a.subgraph_id = n);
}
function Gt(e, t) {
	let n = Array.isArray(e?.properties?.proxyWidgets) ? e.properties.proxyWidgets : [];
	if (!n.length || !Array.isArray(t?.nodes)) return;
	let r = new Map(t.nodes.filter(Boolean).map((e) => [String(e?.id ?? e?.ID ?? ""), e])), i = Kt(e), a = qt(t), o = [];
	for (let e = 0; e < n.length; e += 1) {
		let t = n[e], s = Array.isArray(t) ? t[0] : t?.nodeId ?? t?.node_id ?? t?.id, c = Array.isArray(t) ? t[1] : t?.widget ?? t?.name ?? t?.widgetName, l = r.get(String(s ?? ""));
		if (!l) continue;
		let u = vt(l);
		if (!u.length) continue;
		let d = u.find(([e]) => q(e) === q(c)) || u.find(([e]) => q(e) === "value") || (u.length === 1 ? u[0] : null);
		if (!d) continue;
		let f = `${String(s)}:${Jt(t, c, d[0])}`, p = a.get(f) || a.get(String(s)) || Yt(l, d[0], c);
		(!i.size || i.has(q(p))) && o.push({
			label: p,
			value: d[1],
			innerNodeId: s,
			widgetName: c
		});
	}
	o.length && (e._mjrSubgraphProxyParams = o);
}
function Kt(e) {
	let t = Array.isArray(e?.inputs) ? e.inputs : [], n = /* @__PURE__ */ new Set();
	for (let e of t) {
		if (!At(e)) continue;
		let t = String(e?.label || e?.localized_name || e?.name || "").trim();
		t && n.add(q(t));
	}
	return n;
}
function qt(e) {
	let t = Array.isArray(e?.inputs) ? e.inputs : [], n = Array.isArray(e?.links) ? e.links : [], r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let n = Array.isArray(e) ? e[1] : e?.origin_id ?? e?.originId ?? e?.from;
		if (String(n) !== "-10") continue;
		let i = Number(Array.isArray(e) ? e[2] : e?.origin_slot ?? e?.originSlot ?? e?.fromSlot), a = Array.isArray(e) ? e[3] : e?.target_id ?? e?.targetId ?? e?.to, o = Number(Array.isArray(e) ? e[4] : e?.target_slot ?? e?.targetSlot ?? e?.toSlot), s = Number.isFinite(i) ? t[i] : null, c = String(s?.label || s?.localized_name || s?.name || "").trim();
		c && a != null && q(c) !== "value" && (r.set(String(a), c), Number.isFinite(o) && r.set(`${String(a)}:${o}`, c));
	}
	return r;
}
function Jt(e, t, n) {
	if (e && typeof e == "object" && !Array.isArray(e)) {
		let t = e.target_slot ?? e.targetSlot ?? e.slot;
		if (Number.isFinite(Number(t))) return Number(t);
	}
	return 0;
}
function Yt(e, t, n) {
	let r = String(gt(e) || "").trim(), i = String(t || n || "").trim();
	return r && i && q(i) !== "value" ? `${r} ${i}` : r || i || "param";
}
function q(e) {
	return String(e ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}
function J(e) {
	let t = [
		...Array.isArray(e?.definitions?.subgraphs) ? e.definitions.subgraphs : [],
		...Array.isArray(e?.subgraphs) ? e.subgraphs : [],
		...Array.isArray(e?.rootGraph?.subgraphs) ? e.rootGraph.subgraphs : []
	], n = /* @__PURE__ */ new Map();
	for (let e of t) for (let t of Xt(e)) t != null && n.set(String(t), e);
	return n;
}
function Xt(e) {
	let t = e?.properties && typeof e.properties == "object" ? e.properties : {};
	return [
		e?.id,
		e?.name,
		e?.title,
		e?.type,
		e?.uuid,
		e?.workflowId,
		e?.workflow_id,
		t.subgraph_id,
		t.subgraphId
	].filter((e) => e != null && String(e).trim());
}
function Zt(e) {
	let t = e?.properties && typeof e.properties == "object" ? e.properties : {};
	return [
		e?.type,
		e?.class_type,
		e?.subgraph_id,
		e?.subgraphId,
		t.subgraph_id,
		t.subgraphId,
		t.subgraph_name
	].filter((e) => e != null && String(e).trim());
}
function Qt(e, t, n = J(e)) {
	let r = [
		t?.subgraph,
		t?._subgraph,
		t?.subgraph?.graph,
		t?.subgraph?.lgraph,
		t?.properties?.subgraph,
		t?.subgraph_instance,
		t?.subgraph_instance?.graph,
		t?.inner_graph,
		t?.subgraph_graph,
		...Zt(t).map((e) => n.get(String(e)))
	];
	for (let e of r) if (e && typeof e == "object" && Array.isArray(e.nodes)) return e;
	return Array.isArray(t?.nodes) ? { nodes: t.nodes } : null;
}
function $t(e, t) {
	let n = e, r = null;
	for (let e = 0; e < t.length; e += 1) {
		let i = String(t[e] ?? "").trim();
		if (!i || (r = (Array.isArray(n?.nodes) ? n.nodes : []).find((e) => String(e?.id ?? e?.ID ?? "") === i) || null, !r)) return null;
		if (e >= t.length - 1) break;
		let a = Qt(n, r, J(n));
		if (!a) return null;
		n = a;
	}
	return r;
}
//#endregion
//#region ui/features/viewer/workflowGraphMap/workflowGraphMapActions.ts
async function en(e) {
	if (!e) return !1;
	let t = JSON.stringify(ln(e), null, 2);
	return A(t);
}
async function tn(e) {
	return A(nn(e));
}
function nn(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	if (typeof e == "number" || typeof e == "boolean") return String(e);
	try {
		return JSON.stringify(e, null, 2);
	} catch {
		return String(e);
	}
}
function rn(e) {
	return c(e);
}
function an(e) {
	let t = s();
	if (!e || !t || typeof t.add != "function") return !1;
	let n = String(e?.type || e?.class_type || e?.comfyClass || "").trim(), r = null;
	try {
		r = b(n);
	} catch (e) {
		console.debug?.("[MFV Graph Map] createNode failed", e);
	}
	if (!r) return !1;
	try {
		let t = typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
		return un(t, e), delete t.id, Array.isArray(t.pos) && (t.pos = [Number(t.pos[0] || 0) + 32, Number(t.pos[1] || 0) + 32]), typeof r.configure == "function" ? r.configure(t) : Object.assign(r, t), v(r);
	} catch (e) {
		return console.debug?.("[MFV Graph Map] import node failed", e), !1;
	}
}
function on(e) {
	let t = sn();
	if (!e || !t) return {
		ok: !1,
		count: 0,
		reason: "no-target"
	};
	let n = cn(e), r = Array.isArray(t.widgets) ? t.widgets : [];
	if (!n.length || !r.length) return {
		ok: !1,
		count: 0,
		reason: "no-widgets"
	};
	let a = /* @__PURE__ */ new Map();
	r.forEach((e, t) => {
		for (let n of fn(e)) a.has(n) || a.set(n, {
			widget: e,
			index: t
		});
	});
	let o = mn(G(e)), s = mn(t?.type || t?.comfyClass || t?.class_type), c = !!(o && s && o === s), l = /* @__PURE__ */ new Set(), u = 0;
	for (let e of n) {
		let n = pn(e.label), i = n ? a.get(n) : null, o = e.index;
		if ((!i || l.has(i.index)) && c && typeof o == "number" && Number.isInteger(o)) {
			let e = r[o];
			e && (i = {
				widget: e,
				index: o
			});
		}
		i && !l.has(i.index) && L(i.widget, Y(e.value), t) && (l.add(i.index), u += 1);
	}
	return i(), {
		ok: u > 0,
		count: u,
		reason: u > 0 ? "ok" : "no-match",
		targetNode: t
	};
}
function sn() {
	return y() || null;
}
function cn(e) {
	let t = vt(e);
	return Array.isArray(t) && t.length ? t.map(([e, t]) => ({
		label: e,
		value: t
	})) : bt(e);
}
function ln(e) {
	let t = typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
	return un(t, e), t;
}
function un(e, t) {
	let n = t?._mjrPromptInputs && typeof t._mjrPromptInputs == "object" ? t._mjrPromptInputs : null;
	if (n) {
		let r = dn(t, n);
		r && (e.widgets_values = r);
	}
	delete e._mjrPromptInputs, delete e._mjrSubgraphProxyParams;
}
function dn(e, t) {
	let n = mn(G(e)), r = bt(e), i = new Map(r.map((e) => [pn(e.label), e.value]));
	if (n.includes("ksamplerselect")) return t.sampler_name == null ? null : [Y(t.sampler_name)];
	if (n.includes("ksampler")) {
		let e = t.control_after_generate ?? i.get("control_after_generate") ?? r[1]?.value;
		return [
			Y(t.seed),
			Y(e),
			Y(t.steps),
			Y(t.cfg),
			Y(t.sampler_name),
			Y(t.scheduler),
			Y(t.denoise)
		];
	}
	return null;
}
function fn(e) {
	return [
		e?.name,
		e?.label,
		e?.options?.name,
		e?.options?.label
	].map(pn).filter(Boolean);
}
function pn(e) {
	return String(e ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}
function mn(e) {
	return String(e ?? "").trim().toLowerCase();
}
function Y(e) {
	if (typeof e != "object" || !e) return e;
	try {
		return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
	} catch {
		return e;
	}
}
//#endregion
//#region ui/features/viewer/workflowGraphMap/WorkflowGraphMapPanel.ts
var hn = 64, gn = class {
	constructor({ large: e = !1 } = {}) {
		this._asset = null, this._workflow = null, this._selectedNodeId = "", this._renderInfo = null, this._resizeObserver = null, this._resizeObservedTarget = null, this._resizeObserverWindow = null, this._large = !!e, this._view = {
			zoom: 1,
			centerX: null,
			centerY: null
		}, this._drag = null, this._previewMedia = null, this._previewKey = "", this._subgraphDisplayMode = "expand", this._modeButtons = /* @__PURE__ */ new Map(), this._el = this._build();
	}
	get el() {
		return this._el;
	}
	setAsset(e) {
		this._asset !== e && (this._asset = e || null, this._workflow = pt(this._asset), this._selectedNodeId = "", this._view = {
			zoom: 1,
			centerX: null,
			centerY: null
		}, this.refresh(), ft(this._workflow).then(() => this.refresh()).catch(() => {}));
	}
	refresh() {
		this._ensureResizeObserver(), this._el?.isConnected && (this._renderCanvas(), this._renderDetails());
	}
	dispose() {
		this._disposePreviewMedia(), this._resizeObserver?.disconnect?.(), this._resizeObserver = null, this._el?.remove?.();
	}
	_build() {
		let e = document.createElement("div");
		e.className = "mjr-wgm", this._large && (e.className += " mjr-wgm--large");
		let t = document.createElement("div");
		return t.className = "mjr-wgm-map-wrap", this._mapWrap = t, this._large ? (this._canvas = document.createElement("canvas"), this._canvas.className = "mjr-wgm-canvas", this._canvas.addEventListener?.("click", (e) => this._handleCanvasClick(e)), this._canvas.addEventListener?.("wheel", (e) => this._handleWheel(e), { passive: !1 }), this._canvas.addEventListener?.("dblclick", (e) => this._handleCanvasDblClick(e)), this._canvas.addEventListener?.("pointerdown", (e) => this._handlePointerDown(e)), t.appendChild(this._canvas)) : (this._preview = document.createElement("div"), this._preview.className = "mjr-wgm-preview", t.appendChild(this._preview)), e.appendChild(t), this._status = document.createElement("div"), this._status.className = "mjr-wgm-status", e.appendChild(this._status), this._large && (this._toolbar = document.createElement("div"), this._toolbar.className = "mjr-wgm-toolbar", this._toolbar.appendChild(this._makeModeButton("Expand subgraphs", "expand")), this._toolbar.appendChild(this._makeModeButton("Host nodes only", "host")), e.appendChild(this._toolbar), this._syncModeButtons()), this._details = document.createElement("div"), this._details.className = "mjr-wgm-details", e.appendChild(this._details), this._ensureResizeObserver(), e;
	}
	_ensureResizeObserver() {
		let e = this._mapWrap;
		if (!e) return;
		let t = X(e), n = t?.ResizeObserver || globalThis.ResizeObserver;
		if (typeof n == "function" && !(this._resizeObserver && this._resizeObservedTarget === e && this._resizeObserverWindow === t)) {
			try {
				this._resizeObserver?.disconnect?.();
			} catch (e) {
				console.debug?.(e);
			}
			try {
				this._resizeObserver = new n(() => this.refresh()), this._resizeObserver.observe(e), this._resizeObservedTarget = e, this._resizeObserverWindow = t;
			} catch (e) {
				console.debug?.(e), this._resizeObserver = null, this._resizeObservedTarget = null, this._resizeObserverWindow = null;
			}
		}
	}
	_renderCanvas() {
		if (!this._large) {
			this._renderPreview();
			return;
		}
		let e = this._canvas;
		if (!e) return;
		let t = e.getBoundingClientRect(), n = Math.max(1, Math.floor(t.width || e.clientWidth || 1)), r = Math.max(1, Math.floor(t.height || e.clientHeight || 1)), i = X(e), a = Math.max(1, Math.min(2, Number(i?.devicePixelRatio) || 1)), o = Math.floor(n * a), s = Math.floor(r * a);
		(e.width !== o || e.height !== s) && (e.width = o, e.height = s);
		let c = e.getContext?.("2d");
		if (c && c.setTransform(a, 0, 0, a, 0, 0), !this._workflow) {
			c?.clearRect?.(0, 0, n, r), this._renderInfo = null;
			return;
		}
		this._renderInfo = te(e, this._workflow, {
			showNodeLabels: !0,
			showViewport: !1,
			expandSubgraphs: this._subgraphDisplayMode !== "host",
			view: {
				hoveredNodeId: this._selectedNodeId || null,
				zoom: this._view.zoom,
				centerX: this._view.centerX,
				centerY: this._view.centerY
			}
		}), this._renderInfo?.resolvedView && (this._view.centerX = this._renderInfo.resolvedView.centerX, this._view.centerY = this._renderInfo.resolvedView.centerY, this._view.zoom = this._renderInfo.resolvedView.zoom);
	}
	_renderDetails() {
		let e = this._subgraphDisplayMode !== "host", t = mt(this._workflow, { includeSubgraphs: e }).length;
		if (!this._workflow) {
			this._status.textContent = this._large ? "No workflow graph in selected image" : "Selected asset - no workflow graph", _n(this._details);
			return;
		}
		this._status.textContent = this._large ? this._selectedNodeId ? `${t} nodes (${this._subgraphDisplayMode}) - selected #${this._selectedNodeId}` : `${t} nodes (${this._subgraphDisplayMode}) - select a node` : `${t} nodes - graph opened in viewer`;
		let n = ht(this._workflow, this._selectedNodeId, { includeSubgraphs: e });
		if (!n) {
			let e = document.createElement("div");
			e.className = "mjr-ws-sidebar-empty", e.textContent = this._large ? "Click a node in the graph map" : "Use the large Graph Map in the viewer to select nodes", _n(this._details, e);
			return;
		}
		let r = document.createElement("div");
		r.className = "mjr-wgm-node-title", r.textContent = gt(n);
		let i = document.createElement("div");
		i.className = "mjr-wgm-node-meta", i.textContent = `#${this._selectedNodeId} ${_t(n) || G(n) || "Node"}`;
		let a = this._buildBreadcrumb(n), o = document.createElement("div");
		o.className = "mjr-wgm-actions", o.appendChild(this._makeAction("Copy node", "pi pi-copy", () => en(n))), o.appendChild(this._makeAction("Import node", "pi pi-plus-circle", () => an(n))), o.appendChild(this._makeAction("Import workflow", "pi pi-download", () => rn(this._workflow))), o.appendChild(this._makeAction("Transfer params to selected canvas node", "pi pi-arrow-right-arrow-left", () => on(n)?.ok));
		let s = this._buildNodeVisual(n);
		_n(this._details, r, i, a, s, o);
	}
	_makeModeButton(e, t) {
		let n = document.createElement("button");
		return n.type = "button", n.className = "mjr-wgm-mode", n.textContent = String(e), n.addEventListener?.("click", () => this._setSubgraphDisplayMode(t)), this._modeButtons.set(t, n), n;
	}
	_buildBreadcrumb(e) {
		let t = document.createElement("div");
		t.className = "mjr-wgm-breadcrumb";
		let n = ["Workflow"], r = String(e?._mjrSubgraphName || "").trim(), i = String(this._selectedNodeId || "");
		(r || i.includes("::")) && n.push(r || String(i.split("::")[0] || "Subgraph")), n.push(gt(e));
		for (let e = 0; e < n.length; e += 1) {
			if (e > 0) {
				let e = document.createElement("span");
				e.className = "mjr-wgm-breadcrumb-sep", e.textContent = "/", t.appendChild(e);
			}
			let r = document.createElement("span");
			r.className = "mjr-wgm-breadcrumb-item", r.textContent = n[e], t.appendChild(r);
		}
		return t;
	}
	_setSubgraphDisplayMode(e) {
		(e === "expand" || e === "host") && this._subgraphDisplayMode !== e && (this._subgraphDisplayMode = e, e === "host" && String(this._selectedNodeId || "").includes("::") && (this._selectedNodeId = ""), this._syncModeButtons(), this.refresh());
	}
	_syncModeButtons() {
		for (let [e, t] of this._modeButtons.entries()) t.classList?.toggle?.("is-active", e === this._subgraphDisplayMode);
	}
	_buildNodeVisual(e) {
		let t = document.createElement("section");
		t.className = "mjr-wgm-node-visual", t.classList.add(`is-${Dn(e)}`);
		let n = document.createElement("div");
		n.className = "mjr-wgm-node-visual-header";
		let r = document.createElement("span");
		r.className = "mjr-wgm-node-visual-type", r.textContent = _t(e) || G(e) || "Node";
		let i = document.createElement("span");
		i.className = "mjr-wgm-node-visual-id", i.textContent = `#${String(e?.id ?? this._selectedNodeId ?? "")}`, n.append(r, i);
		let a = document.createElement("div");
		a.className = "mjr-wgm-node-ports";
		let o = this._buildPortColumn("Inputs", e?.inputs, "in"), s = this._buildPortColumn("Outputs", e?.outputs, "out");
		a.append(o, s);
		let c = document.createElement("div");
		c.className = "mjr-wgm-node-widgets";
		let l = document.createElement("div");
		l.className = "mjr-wgm-node-widgets-title", l.textContent = "Widgets", c.appendChild(l);
		let u = En(e);
		if (u.length) {
			for (let e of u.slice(0, 12)) {
				let t = document.createElement("div");
				t.className = "mjr-wgm-node-widget", t.tabIndex = 0, t.role = "button";
				let n = String(e?.label || e?.key || "value");
				t.title = `Copy ${n}`;
				let r = document.createElement("span");
				r.className = "mjr-wgm-node-widget-key", r.textContent = n;
				let i = document.createElement("span");
				i.className = "mjr-wgm-node-widget-value";
				let a = yn(e?.value);
				i.textContent = a, bn(e?.value, a) && t.classList.add("is-multiline"), xn(n) && t.classList.add("is-text-field"), t.append(r, i), t.addEventListener("click", () => this._copyParam(t, e?.value)), t.addEventListener("keydown", (n) => {
					(n.key === "Enter" || n.key === " ") && (n.preventDefault?.(), this._copyParam(t, e?.value));
				}), c.appendChild(t);
			}
			if (u.length > 12) {
				let e = document.createElement("div");
				e.className = "mjr-wgm-node-widget-more", e.textContent = `+${u.length - 12} more values`, c.appendChild(e);
			}
		} else {
			let e = document.createElement("div");
			e.className = "mjr-wgm-node-widget-empty", e.textContent = "No widget values", c.appendChild(e);
		}
		return t.append(n, a, c), t;
	}
	_buildPortColumn(e, t, n) {
		let r = document.createElement("div");
		r.className = "mjr-wgm-node-ports-col";
		let i = document.createElement("div");
		i.className = "mjr-wgm-node-ports-title", i.textContent = String(e), r.appendChild(i);
		let a = document.createElement("div");
		a.className = "mjr-wgm-node-ports-list";
		let o = Sn(t).slice(0, 8);
		if (o.length) for (let e of o) {
			let t = document.createElement("div");
			t.className = "mjr-wgm-node-port";
			let r = document.createElement("span");
			r.className = `mjr-wgm-node-port-dot is-${n}`;
			let i = document.createElement("span");
			i.className = "mjr-wgm-node-port-name";
			let o = wn(e);
			if (i.textContent = o.label, t.append(r, i), o.type) {
				let e = document.createElement("span");
				e.className = "mjr-wgm-node-port-type", e.textContent = o.type, t.appendChild(e);
			}
			a.appendChild(t);
		}
		else {
			let e = document.createElement("div");
			e.className = "mjr-wgm-node-port-empty", e.textContent = "-", a.appendChild(e);
		}
		return r.appendChild(a), r;
	}
	_makeAction(e, t, n) {
		let r = document.createElement("button");
		return r.type = "button", r.className = "mjr-wgm-action", r.title = e, r.innerHTML = `<i class="${t}" aria-hidden="true"></i><span>${e}</span>`, r.addEventListener("click", async () => {
			try {
				let e = await n();
				r.classList.toggle("is-ok", !!e), X(r).setTimeout(() => r.classList.remove("is-ok"), 700);
			} catch (e) {
				console.debug?.("[MFV Graph Map] action failed", e);
			}
		}), r;
	}
	async _copyParam(e, t) {
		try {
			let n = await tn(t);
			e.classList.toggle("is-ok", !!n), e.classList.toggle("is-error", !n), X(e).setTimeout(() => {
				e.classList.remove("is-ok"), e.classList.remove("is-error");
			}, 750);
		} catch (t) {
			e.classList.add("is-error"), X(e).setTimeout(() => e.classList.remove("is-error"), 750), console.debug?.("[MFV Graph Map] param copy failed", t);
		}
	}
	_renderPreview() {
		if (!this._preview) return;
		let e = On(this._asset), t = kn(e);
		if (this._previewMedia && t && t === this._previewKey) {
			(this._preview.firstChild !== this._previewMedia || this._preview.childNodes.length !== 1) && _n(this._preview, this._previewMedia);
			return;
		}
		this._disposePreviewMedia();
		let n = W(e, { fill: !0 });
		if (n) {
			n.classList?.add?.("mjr-wgm-preview-media"), this._previewMedia = n, this._previewKey = t, this._preview.appendChild(n);
			return;
		}
		let r = document.createElement("div");
		r.className = "mjr-wgm-preview-empty", r.textContent = "No preview", _n(this._preview, r);
	}
	_disposePreviewMedia() {
		let e = this._previewMedia;
		if (this._previewMedia = null, this._previewKey = "", e) {
			try {
				e._mjrMediaControlsHandle?.destroy?.();
			} catch (e) {
				console.debug?.("[MFV Graph Map] preview cleanup failed", e);
			}
			try {
				let t = e.querySelectorAll?.("video, audio") || [];
				for (let e of t) e.pause?.();
			} catch (e) {
				console.debug?.("[MFV Graph Map] preview pause failed", e);
			}
			e.remove?.();
		}
	}
	_handleCanvasClick(e) {
		if (this._drag?.moved) return;
		let t = this._canvas.getBoundingClientRect(), n = this._renderInfo?.hitTestNode?.(e.clientX - t.left, e.clientY - t.top);
		n?.id && (this._selectedNodeId = String(n.id), this.refresh());
	}
	_handleWheel(e) {
		if (!this._workflow) return;
		e.preventDefault?.();
		let t = (Number(e.deltaY) > 0 ? -1 : 1) > 0 ? 1.18 : 1 / 1.18, n = Number(this._view.zoom || 1), r = Math.max(1, Math.min(hn, n * t));
		if (r === n) return;
		let i = this._renderInfo?.resolvedView;
		if (i?.renderScale && i?.viewMinX != null && i?.viewMinY != null) {
			let t = this._canvas.getBoundingClientRect(), a = e.clientX - t.left, o = e.clientY - t.top, { renderScale: s, viewMinX: c, viewMinY: l, visibleW: u, visibleH: d, pad: f } = i, p = c + (a - f) / s, m = l + (o - f) / s, h = r / n * s, g = n / r * u, _ = n / r * d, v = p - (a - f) / h, y = m - (o - f) / h;
			this._view.zoom = r, this._view.centerX = v + g / 2, this._view.centerY = y + _ / 2;
		} else this._view.zoom = r;
		this.refresh();
	}
	_handleCanvasDblClick(e) {
		if (!this._workflow) return;
		let t = this._canvas.getBoundingClientRect(), n = this._renderInfo?.hitTestNode?.(e.clientX - t.left, e.clientY - t.top);
		n?.x != null && n?.w != null ? this._zoomToWorldRect(n.x, n.y, n.w, n.h) : (this._view = {
			zoom: 1,
			centerX: null,
			centerY: null
		}, this.refresh());
	}
	_zoomToWorldRect(e, t, n, r) {
		let i = this._renderInfo;
		if (!i?.bounds) return;
		let { bounds: a } = i, o = Math.max(1, a.maxX - a.minX), s = Math.max(1, a.maxY - a.minY), c = o / Math.max(1, n * 2), l = s / Math.max(1, r * 2);
		this._view.zoom = Math.max(1, Math.min(hn, Math.min(c, l))), this._view.centerX = e + n / 2, this._view.centerY = t + r / 2, this.refresh();
	}
	_handlePointerDown(e) {
		if (!this._workflow || e.button !== 0) return;
		let t = this._renderInfo?.resolvedView;
		if (!t?.renderScale) return;
		e.preventDefault?.(), this._canvas.setPointerCapture?.(e.pointerId), this._drag = {
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			centerX: Number(this._view.centerX ?? t.centerX),
			centerY: Number(this._view.centerY ?? t.centerY),
			scale: Number(t.renderScale) || 1,
			moved: !1
		};
		let n = (e) => {
			if (!this._drag || e.pointerId !== this._drag.pointerId) return;
			let t = e.clientX - this._drag.startX, n = e.clientY - this._drag.startY;
			Math.abs(t) + Math.abs(n) > 3 && (this._drag.moved = !0), this._view.centerX = this._drag.centerX - t / this._drag.scale, this._view.centerY = this._drag.centerY - n / this._drag.scale, this._renderCanvas(), this._renderDetails();
		}, r = (e) => {
			if (!this._drag || e.pointerId !== this._drag.pointerId) return;
			this._canvas.releasePointerCapture?.(e.pointerId);
			let t = X(this._canvas);
			t.removeEventListener("pointermove", n), t.removeEventListener("pointerup", r), t.removeEventListener("pointercancel", r), t.setTimeout(() => {
				this._drag = null;
			}, 0);
		}, i = X(this._canvas);
		i.addEventListener("pointermove", n), i.addEventListener("pointerup", r), i.addEventListener("pointercancel", r);
	}
};
function X(e) {
	return e?.ownerDocument?.defaultView || window;
}
function _n(e, ...t) {
	if (e) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		for (let n of t) e.appendChild(n);
	}
}
function vn(e) {
	if (e == null) return "";
	if (typeof e == "string") return e.replace(/\s+/g, " ").trim();
	if (typeof e == "number" || typeof e == "boolean") return String(e);
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
function yn(e) {
	return e == null ? "" : typeof e == "string" ? e.replace(/\r\n?/g, "\n").trim() : vn(e);
}
function bn(e, t) {
	if (typeof e != "string") return !1;
	let n = String(t || "");
	return n.includes("\n") || n.length > 120;
}
function xn(e) {
	let t = String(e || "").toLowerCase().replace(/[^a-z0-9]/g, "");
	return t ? t === "text" || t === "prompt" || t === "positive" || t === "negative" || t === "string" || t === "caption" : !1;
}
function Sn(e) {
	return Array.isArray(e) ? e.filter((e) => e && !Cn(e)).map((e) => ({
		name: String(e?.name || e?.label || "").trim(),
		type: String(e?.type || e?.slot_type || e?.data_type || "").trim()
	})) : [];
}
function Cn(e) {
	return !e || typeof e != "object" ? !1 : !!(e.widget === !0 || e.widget && typeof e.widget == "object" || typeof e.widget == "string" && e.widget.trim() || e.widget_index != null || e.widgetIndex != null);
}
function wn(e) {
	let t = String(e?.name || e?.label || e?.type || "port").trim() || "port", n = String(e?.type || "").trim(), r = Tn(t), i = Tn(n);
	return {
		label: t,
		type: i && i !== r ? n : ""
	};
}
function Tn(e) {
	return String(e || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function En(e) {
	let t = vt(e), n = Array.isArray(t) ? t.map(([e, t]) => ({
		label: e,
		value: t
	})) : [];
	if (n.length) return n.slice(0, 160);
	let r = bt(e);
	return Array.isArray(r) && r.length ? r.map((e) => ({
		label: e?.label,
		key: e?.key,
		value: e?.value
	})) : [];
}
function Dn(e) {
	let t = `${String(G(e) || "").toLowerCase()} ${String(_t(e) || "").toLowerCase()}`;
	return t.trim() ? /ksampler|sampler|scheduler|cfg|steps|noise|seed/.test(t) ? "sampler" : /checkpoint|clip|vae|unet|lora|model|loader/.test(t) ? "model" : /text|prompt|token|encode|decoder|caption|florence/.test(t) ? "text" : /latent|image|mask|video|audio|preview|save|load|upscale/.test(t) ? "media" : /controlnet|conditioning|guidance|adapter|ipadapter/.test(t) ? "control" : /math|logic|switch|merge|concat|combine|route|branch|reroute/.test(t) ? "logic" : "generic" : "generic";
}
function On(e) {
	if (!e || typeof e != "object") return e;
	let t = (Array.isArray(e.previewCandidates) ? e.previewCandidates : []).find((e) => String(e || "").trim()) || e.url || "", n = String(e.type || "").toLowerCase(), r = String(e.kind || "").toLowerCase(), i = String(e.filename || e.name || ""), a = r || (e.isVideo || n === "video" || /\.(mp4|mov|webm|mkv|avi)$/i.test(i) ? "video" : e.isAudio || n === "audio" || /\.(mp3|wav|flac|ogg|m4a|aac|opus|wma)$/i.test(i) ? "audio" : e.isModel3d || n === "model3d" ? "model3d" : "");
	return {
		...e,
		...t ? { url: t } : null,
		...a ? {
			kind: a,
			asset_type: a
		} : null
	};
}
function kn(e) {
	return !e || typeof e != "object" ? "" : JSON.stringify({
		url: String(e.url || ""),
		filename: String(e.filename || e.name || ""),
		kind: String(e.kind || e.asset_type || e.type || ""),
		subfolder: String(e.subfolder || ""),
		id: e.id ?? ""
	});
}
//#endregion
//#region ui/features/viewer/workflowSidebar/WorkflowSidebar.ts
var An = 16, jn = 250, Mn = class {
	_hostEl;
	_onClose;
	_onOpenGraphMap;
	_onCloseGraphMap;
	_visible;
	_liveSyncHandle;
	_liveSyncMode;
	_lastLiveSyncAt;
	_resizeCleanup;
	_nodesTab;
	_graphMapPanel;
	_activeMode;
	_asset;
	_el;
	_body;
	_nodesModeBtn;
	_graphModeBtn;
	constructor({ hostEl: e, onClose: t, onOpenGraphMap: n, onCloseGraphMap: r } = {}) {
		this._hostEl = e, this._onClose = t ?? null, this._onOpenGraphMap = n ?? null, this._onCloseGraphMap = r ?? null, this._visible = !1, this._liveSyncHandle = null, this._liveSyncMode = "", this._lastLiveSyncAt = 0, this._resizeCleanup = null, this._nodesTab = new tt(), this._graphMapPanel = new gn(), this._activeMode = "nodes", this._asset = null, this._body = null, this._nodesModeBtn = null, this._graphModeBtn = null, this._el = this._build();
	}
	get el() {
		return this._el;
	}
	get isVisible() {
		return this._visible;
	}
	show() {
		this._visible = !0, this._el.classList.add("open"), this.refresh(), this._lastLiveSyncAt = Pn(this._el), this._startLiveSync();
	}
	hide() {
		this._visible = !1, this._el.classList.remove("open"), this._stopLiveSync();
	}
	toggle() {
		if (this._visible) {
			let e = this._activeMode === "graph";
			this.hide(), e && this._onCloseGraphMap?.(), this._onClose?.();
		} else this.show();
	}
	refresh() {
		this._visible && (this._activeMode === "graph" ? this._graphMapPanel?.refresh() : this._nodesTab?.refresh());
	}
	syncFromGraph() {
		this._visible && (this._activeMode === "graph" ? this._graphMapPanel?.refresh() : this._nodesTab?.refresh());
	}
	setAsset(e) {
		this._asset = e || null, this._graphMapPanel?.setAsset?.(this._asset);
	}
	dispose() {
		this._stopLiveSync(), this._disposeResize(), this._nodesTab?.dispose?.(), this._graphMapPanel?.dispose?.(), this._nodesTab = null, this._graphMapPanel = null, this._el?.remove();
	}
	_build() {
		let e = document.createElement("div");
		e.className = "mjr-ws-sidebar";
		let t = document.createElement("div");
		t.className = "mjr-ws-sidebar-header";
		let n = document.createElement("span");
		n.className = "mjr-ws-sidebar-title", n.textContent = m("workflowSidebar.nodes", "Nodes"), t.appendChild(n);
		let r = document.createElement("button");
		r.type = "button", r.className = "mjr-icon-btn", r.title = m("workflowSidebar.close", "Close sidebar"), r.innerHTML = "<i class=\"pi pi-times\" aria-hidden=\"true\"></i>", r.addEventListener("click", () => {
			let e = this._activeMode === "graph";
			this.hide(), e && this._onCloseGraphMap?.(), this._onClose?.();
		}), t.appendChild(r), e.appendChild(t);
		let i = document.createElement("div");
		i.className = "mjr-ws-tab-bar", this._nodesModeBtn = this._makeModeButton(m("workflowSidebar.nodes", "Nodes"), "pi pi-sliders-h", "nodes"), this._graphModeBtn = this._makeModeButton(m("workflowSidebar.graphMap", "Graph Map"), "pi pi-sitemap", "graph"), i.appendChild(this._nodesModeBtn), i.appendChild(this._graphModeBtn), e.appendChild(i);
		let a = document.createElement("div");
		return a.className = "mjr-ws-sidebar-resizer", a.setAttribute("role", "separator"), a.setAttribute("aria-orientation", "vertical"), a.setAttribute("aria-hidden", "true"), e.appendChild(a), this._bindResize(a), this._body = document.createElement("div"), this._body.className = "mjr-ws-sidebar-body", e.appendChild(this._body), this._renderActiveMode(), e;
	}
	_makeModeButton(e, t, n) {
		let r = document.createElement("button");
		return r.type = "button", r.className = "mjr-ws-tab", r.dataset.mode = n, r.innerHTML = `<i class="${t}" aria-hidden="true"></i><span>${e}</span>`, r.addEventListener("click", () => this._setMode(n)), r;
	}
	_setMode(e) {
		let t = e === "graph" ? "graph" : "nodes";
		this._activeMode === t && this._body?.firstElementChild || (this._activeMode = t, this._renderActiveMode(), t === "graph" ? this._onOpenGraphMap?.() : this._onCloseGraphMap?.(), this.refresh());
	}
	_renderActiveMode() {
		if (!this._body) return;
		this._nodesModeBtn?.classList?.toggle("is-active", this._activeMode === "nodes"), this._graphModeBtn?.classList?.toggle("is-active", this._activeMode === "graph"), this._nodesModeBtn?.setAttribute("aria-pressed", String(this._activeMode === "nodes")), this._graphModeBtn?.setAttribute("aria-pressed", String(this._activeMode === "graph"));
		let e = this._activeMode === "graph" ? this._graphMapPanel?.el : this._nodesTab?.el;
		if (e && this._body.firstElementChild !== e) {
			for (; this._body.firstChild;) this._body.removeChild(this._body.firstChild);
			this._body.appendChild(e);
		}
	}
	_startLiveSync() {
		if (this._liveSyncHandle != null) return;
		let e = Nn(this._el), t = (e) => {
			if (this._liveSyncHandle = null, this._liveSyncMode = "", !this._visible) return;
			let t = Number.isFinite(Number(e)) ? Number(e) : Pn(this._el);
			t - this._lastLiveSyncAt >= jn && (this._lastLiveSyncAt = t, this.syncFromGraph()), this._startLiveSync();
		};
		if (typeof e.requestAnimationFrame == "function") {
			this._liveSyncMode = "raf", this._liveSyncHandle = e.requestAnimationFrame(t);
			return;
		}
		this._liveSyncMode = "timeout", this._liveSyncHandle = e.setTimeout(t, An);
	}
	_stopLiveSync() {
		if (this._liveSyncHandle == null) return;
		let e = Nn(this._el);
		try {
			this._liveSyncMode === "raf" && typeof e.cancelAnimationFrame == "function" ? e.cancelAnimationFrame(this._liveSyncHandle) : typeof e.clearTimeout == "function" && e.clearTimeout(this._liveSyncHandle);
		} catch (e) {
			console.debug?.(e);
		}
		this._liveSyncHandle = null, this._liveSyncMode = "";
	}
	_bindResize(e) {
		if (!e) return;
		let t = (e.ownerDocument || document).defaultView || window, n = (n) => {
			if (n.button !== 0 || !this._el?.classList.contains("open")) return;
			let r = this._el.parentElement;
			if (!r) return;
			let i = this._el.getBoundingClientRect(), a = r.getBoundingClientRect(), o = r.getAttribute("data-sidebar-pos") || "right", s = Math.max(180, Math.floor(a.width * (o === "bottom" ? 1 : .65)));
			if (o === "bottom") return;
			n.preventDefault(), n.stopPropagation(), e.classList.add("is-dragging"), this._el.classList.add("is-resizing");
			let c = n.clientX, l = i.width, u = (e) => {
				let t = e.clientX - c, n = o === "left" ? l - t : l + t, r = Math.max(180, Math.min(s, n));
				this._el.style.width = `${Math.round(r)}px`;
			}, d = () => {
				e.classList.remove("is-dragging"), this._el.classList.remove("is-resizing"), t.removeEventListener("pointermove", u), t.removeEventListener("pointerup", d), t.removeEventListener("pointercancel", d);
			};
			t.addEventListener("pointermove", u), t.addEventListener("pointerup", d), t.addEventListener("pointercancel", d);
		};
		e.addEventListener("pointerdown", n), this._resizeCleanup = () => e.removeEventListener("pointerdown", n);
	}
	_disposeResize() {
		try {
			this._resizeCleanup?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._resizeCleanup = null;
	}
};
function Nn(e) {
	return e?.ownerDocument?.defaultView || (typeof window < "u" ? window : globalThis);
}
function Pn(e) {
	let t = Nn(e), n = t?.performance?.now;
	if (typeof n == "function") try {
		return Number(n.call(t.performance)) || Date.now();
	} catch {
		return Date.now();
	}
	return Date.now();
}
//#endregion
//#region ui/features/viewer/workflowSidebar/sidebarRunButton.ts
var Z = Object.freeze({
	IDLE: "idle",
	RUNNING: "running",
	STOPPING: "stopping",
	ERROR: "error"
}), Fn = /* @__PURE__ */ new Set([
	"default",
	"auto",
	"latent2rgb",
	"taesd",
	"none"
]), In = "progress-update", Ln = (e, t = "") => m(e, t, void 0);
function Rn() {
	let e = document.createElement("div");
	e.className = "mjr-mfv-run-controls";
	let t = document.createElement("button");
	t.type = "button", t.className = "mjr-icon-btn mjr-mfv-run-btn";
	let n = Ln("tooltip.queuePrompt", "Queue Prompt (Run)");
	t.title = n, t.setAttribute("aria-label", n);
	let r = document.createElement("i");
	r.className = "pi pi-play", r.setAttribute("aria-hidden", "true"), t.appendChild(r);
	let i = document.createElement("button");
	i.type = "button", i.className = "mjr-icon-btn mjr-mfv-stop-btn";
	let o = document.createElement("i");
	o.className = "pi pi-stop", o.setAttribute("aria-hidden", "true"), i.appendChild(o), e.appendChild(t), e.appendChild(i);
	let s = Z.IDLE, c = !1, l = !1, u = null;
	function d() {
		u != null && (clearTimeout(u), u = null);
	}
	function f(e, { canStop: n = !1 } = {}) {
		s = e, t.classList.toggle("running", s === Z.RUNNING), t.classList.toggle("stopping", s === Z.STOPPING), t.classList.toggle("error", s === Z.ERROR), t.disabled = s === Z.RUNNING || s === Z.STOPPING, i.disabled = !n || s === Z.STOPPING, i.classList.toggle("active", n && s !== Z.STOPPING), i.classList.toggle("stopping", s === Z.STOPPING), s === Z.RUNNING || s === Z.STOPPING ? r.className = "pi pi-spin pi-spinner" : r.className = "pi pi-play";
	}
	function m() {
		let e = Ln("tooltip.queueStop", "Stop Generation");
		i.title = e, i.setAttribute("aria-label", e);
	}
	function h(e = R.getSnapshot(), { authoritative: t = !1 } = {}) {
		let n = Math.max(0, Number(e?.queue) || 0), r = e?.prompt || null, i = !!r?.currentlyExecuting, a = !!(r && (r.currentlyExecuting || r.errorDetails)), o = n > 0 || a, s = !!r?.errorDetails;
		t && n === 0 && !r && (c = !1, l = !1);
		let u = c || l || i || n > 0;
		if ((i || o || n > 0) && (c = !1), s) {
			l = !1, d(), f(Z.ERROR, { canStop: !1 });
			return;
		}
		if (l) {
			if (!u) {
				l = !1, h(e);
				return;
			}
			f(Z.STOPPING, { canStop: !1 });
			return;
		}
		if (c || i || o || n > 0) {
			d(), f(Z.RUNNING, { canStop: !0 });
			return;
		}
		d(), f(Z.IDLE, { canStop: !1 });
	}
	function g() {
		c = !1, l = !1, d(), f(Z.ERROR, { canStop: !1 }), u = setTimeout(() => {
			u = null, h();
		}, 1500);
	}
	async function _() {
		return { tracked: await a(p()) };
	}
	async function v() {
		if (s !== Z.RUNNING && s !== Z.STOPPING) {
			c = !0, l = !1, h();
			try {
				(await Wn())?.tracked || (c = !1), h();
			} catch (e) {
				console.error?.("[MFV Run]", e), g();
			}
		}
	}
	async function y() {
		if (s === Z.RUNNING) {
			l = !0, h();
			try {
				(await _())?.tracked || (l = !1, c = !1), h();
			} catch (e) {
				console.error?.("[MFV Stop]", e), l = !1, h();
			}
		}
	}
	m(), i.disabled = !0, t.addEventListener("click", v), i.addEventListener("click", y);
	let b = (e) => {
		h(e?.detail || R.getSnapshot(), { authoritative: !0 });
	};
	return R.addEventListener(In, b), re({ timeoutMs: 4e3 }).catch((e) => {
		console.debug?.(e);
	}), h(), {
		el: e,
		dispose() {
			d(), t.removeEventListener("click", v), i.removeEventListener("click", y), R.removeEventListener(In, b);
		}
	};
}
function zn(e = g.MFV_PREVIEW_METHOD) {
	let t = String(e || "").trim().toLowerCase();
	return Fn.has(t) ? t : g.MFV_PREVIEW_METHOD || "auto";
}
function Bn(e, t = g.MFV_PREVIEW_METHOD) {
	let n = zn(t), r = {
		...e?.extra_data || {},
		extra_pnginfo: { ...e?.extra_data?.extra_pnginfo || {} }
	};
	return e?.workflow != null && (r.extra_pnginfo.workflow = e.workflow), n === "default" ? delete r.preview_method : r.preview_method = n, {
		...e,
		extra_data: r
	};
}
function Vn(e, { previewMethod: t = g.MFV_PREVIEW_METHOD, clientId: n = null } = {}) {
	let r = Bn(e, t), i = {
		prompt: r?.output,
		extra_data: r?.extra_data || {}
	}, a = String(n || "").trim();
	return a && (i.client_id = a), i;
}
function Hn(e) {
	let t = e?.constructor;
	return [
		e?.type,
		e?.comfyClass,
		e?.class_type,
		t?.type
	].some((e) => /Api$/i.test(String(e || "").trim()));
}
function Un(e) {
	let t = !1;
	return w(e, ({ node: e }) => {
		t ||= Hn(e);
	}), t;
}
async function Wn() {
	let e = p();
	if (!e) throw Error("ComfyUI app not available");
	let t = Un(x(e));
	return { tracked: await d({
		app: e,
		forceNativeQueue: t,
		resolvePromptData(e) {
			return typeof e?.graphToPrompt == "function" ? e.graphToPrompt() : null;
		},
		enrichPromptData(e) {
			return Bn(e);
		},
		buildPromptRequestBody(e, t) {
			return Vn(e, { clientId: t.clientId });
		}
	}) };
}
//#endregion
//#region ui/features/viewer/floatingViewerUi.ts
function Gn(e) {
	let t = e?.models;
	if (!t || typeof t != "object") return "";
	let n = [
		["HN", t.unet_high_noise],
		["LN", t.unet_low_noise],
		["UNet", t.unet],
		["Diff", t.diffusion],
		["Upsc", t.upscaler],
		["CLIP", t.clip],
		["VAE", t.vae]
	], r = /* @__PURE__ */ new Set(), i = [];
	for (let [e, t] of n) {
		let n = fe(t?.name || t?.value || t || "");
		if (n && !r.has(n) && (r.add(n), i.push(`${e}: ${n}`), i.length >= 3)) break;
	}
	return i.join(" | ");
}
function Kn(e) {
	let t = pe(e);
	return t.workflowLabel ? [t.workflowLabel, t.workflowBadge].filter(Boolean).join(" | ") : "";
}
function qn(e, t, n, r) {
	let i = document.createElement("div");
	i.className = "mjr-mfv-idrop";
	let a = document.createElement("button");
	a.type = "button", a.className = "mjr-icon-btn mjr-mfv-idrop-trigger", a.title = t || "", a.innerHTML = e, a.setAttribute("aria-haspopup", "listbox"), a.setAttribute("aria-expanded", "false"), i.appendChild(a);
	let o = document.createElement("div");
	o.className = "mjr-mfv-idrop-menu", o.setAttribute("role", "listbox");
	let s = r?.element || i;
	s.appendChild(o);
	let c = document.createElement("select");
	c.style.cssText = "position:absolute;opacity:0;pointer-events:none;width:0;height:0;overflow:hidden;", i.appendChild(c);
	let l = [];
	for (let e of n) {
		let t = document.createElement("option");
		t.value = String(e.value), c.appendChild(t);
		let n = document.createElement("button");
		n.type = "button", n.className = "mjr-mfv-idrop-item", n.setAttribute("role", "option"), n.dataset.value = String(e.value), n.innerHTML = e.html ?? String(e.label ?? e.value), o.appendChild(n), l.push(n);
	}
	let u = () => {
		o.classList.remove("is-open"), a.setAttribute("aria-expanded", "false");
	};
	return a.addEventListener("click", (e) => {
		e.stopPropagation();
		let t = o.classList.contains("is-open");
		if (r?.element?.querySelectorAll?.(".mjr-mfv-idrop-menu.is-open").forEach((e) => e.classList.remove("is-open")), !t) {
			let e = a.getBoundingClientRect(), t = s.getBoundingClientRect?.() || {
				left: 0,
				top: 0
			};
			o.style.left = `${e.left - t.left}px`, o.style.top = `${e.bottom - t.top + 4}px`, o.classList.add("is-open"), a.setAttribute("aria-expanded", "true");
		}
	}), o.addEventListener("click", (e) => {
		let t = e.target.closest(".mjr-mfv-idrop-item");
		t && (c.value = t.dataset.value ?? "", c.dispatchEvent(new Event("change", { bubbles: !0 })), l.forEach((e) => {
			e.classList.toggle("is-selected", e === t), e.setAttribute("aria-selected", String(e === t));
		}), u());
	}), {
		wrap: i,
		trigger: a,
		menu: o,
		select: c,
		selectItem: (e) => {
			c.value = String(e), l.forEach((t) => {
				t.classList.toggle("is-selected", t.dataset.value === String(e)), t.setAttribute("aria-selected", String(t.dataset.value === String(e)));
			});
		}
	};
}
var Jn = {
	rgb: "#e0e0e0",
	r: "#ff5555",
	g: "#44dd66",
	b: "#5599ff",
	a: "#ffffff",
	l: "#bbbbbb"
}, Yn = {
	rgb: "RGB",
	r: "R",
	g: "G",
	b: "B",
	a: "A",
	l: "L"
}, Xn = {
	rgb: "500",
	r: "700",
	g: "700",
	b: "700",
	a: "700",
	l: "400"
};
function Zn(e) {
	let t = document.createElement("div");
	return t.className = "mjr-mfv", t.setAttribute("role", "dialog"), t.setAttribute("aria-modal", "false"), t.setAttribute("aria-hidden", "true"), e.element = t, t.appendChild(e._buildHeader()), t.setAttribute("aria-labelledby", e._titleId), t.appendChild(e._buildToolbar()), t.appendChild(z(e)), e._contentWrapper = document.createElement("div"), e._contentWrapper.className = "mjr-mfv-content-wrapper", e._applySidebarPosition(), e._contentEl = document.createElement("div"), e._contentEl.className = "mjr-mfv-content", e._contentWrapper.appendChild(e._contentEl), e._overlayCanvas = document.createElement("canvas"), e._overlayCanvas.className = "mjr-mfv-overlay-canvas", e._contentEl.appendChild(e._overlayCanvas), e._contentEl.appendChild(ne(e)), e._genSidebarEl = document.createElement("aside"), e._genSidebarEl.className = "mjr-mfv-gen-sidebar", e._genSidebarEl.setAttribute("aria-label", "Generation info"), e._genSidebarEl.setAttribute("hidden", ""), e._sidebar = new Mn({
		hostEl: t,
		onClose: () => e._updateSettingsBtnState(!1),
		onOpenGraphMap: () => e.setMode?.(B.GRAPH),
		onCloseGraphMap: () => {
			e._mode === B.GRAPH && e.setMode?.(B.SIMPLE);
		}
	}), e._contentWrapper.appendChild(e._genSidebarEl), e._contentWrapper.appendChild(e._sidebar.el), t.appendChild(e._contentWrapper), e._rebindControlHandlers(), e._bindPanelInteractions(), e._bindDocumentUiHandlers(), e._bindLayoutObserver?.(), e._onSidebarPosChanged = (t) => {
		t?.detail?.key === "viewer.mfvSidebarPosition" && e._applySidebarPosition();
	}, window.addEventListener("mjr-settings-changed", e._onSidebarPosChanged), e._refresh(), t;
}
function Qn(e) {
	let t = document.createElement("div");
	t.className = "mjr-mfv-header";
	let n = document.createElement("span");
	n.className = "mjr-mfv-header-title", n.id = e._titleId;
	let r = document.createElement("i");
	r.className = "mjr-mfv-header-title-icon pi pi-eye", r.setAttribute("aria-hidden", "true");
	let i = document.createElement("span");
	i.textContent = "Majoor Floating Viewer", n.append(r, i);
	let a = document.createElement("button");
	e._closeBtn = a, a.type = "button", a.className = "mjr-icon-btn mjr-mfv-close-btn", T(a, m("tooltip.closeViewer", "Close viewer"), "Esc");
	let o = document.createElement("i");
	return o.className = "pi pi-times", o.setAttribute("aria-hidden", "true"), a.appendChild(o), t.appendChild(n), t.appendChild(a), t;
}
function $n(e) {
	let t = (e, { min: t, max: n, step: r, value: i } = {}) => {
		let a = document.createElement("div");
		a.className = "mjr-mfv-toolbar-range";
		let o = document.createElement("input");
		o.type = "range", o.min = String(t), o.max = String(n), o.step = String(r), o.value = String(i), o.title = e || "";
		let s = document.createElement("span");
		return s.className = "mjr-mfv-toolbar-range-out", s.textContent = Number(i).toFixed(2), a.appendChild(o), a.appendChild(s), {
			wrap: a,
			input: o,
			out: s
		};
	}, n = document.createElement("div");
	n.className = "mjr-mfv-toolbar", n.appendChild(I(() => e._mediaA || null));
	let r = qn("<i class=\"pi pi-image\" aria-hidden=\"true\"></i>", m("viewer.mode", "Viewer mode"), [
		{
			value: B.SIMPLE,
			html: `<i class="pi pi-image" aria-hidden="true"></i><span>${m("viewer.mode.simple", "Simple")}</span>`
		},
		{
			value: B.AB,
			html: `<i class="pi pi-clone" aria-hidden="true"></i><span>${m("viewer.mode.abCompare", "A/B Compare")}</span>`
		},
		{
			value: B.SIDE,
			html: `<i class="pi pi-table" aria-hidden="true"></i><span>${m("viewer.mode.sideBySide", "Side-by-side")}</span>`
		},
		{
			value: B.GRID,
			html: `<i class="pi pi-th-large" aria-hidden="true"></i><span>${m("viewer.mode.grid", "Grid")}</span>`
		},
		{
			value: B.GRAPH,
			html: `<i class="pi pi-sitemap" aria-hidden="true"></i><span>${m("workflowSidebar.graphMap", "Graph Map")}</span>`
		}
	], e);
	e._modeDrop = r, e._modeBtn = r.trigger, e._modeSelect = r.select, e._updateModeBtnUI(), n.appendChild(r.wrap);
	let i = document.createElement("button");
	i.type = "button", i.className = "mjr-icon-btn mjr-mfv-pin-trigger", i.title = m("viewer.pinSlots", "Pin slots A/B/C/D"), i.setAttribute("aria-haspopup", "dialog"), i.setAttribute("aria-expanded", "false"), i.innerHTML = "<i class=\"pi pi-map-marker\" aria-hidden=\"true\"></i>", n.appendChild(i);
	let a = document.createElement("div");
	a.className = "mjr-mfv-pin-popover", e.element.appendChild(a);
	let o = document.createElement("div");
	o.className = "mjr-menu", o.style.cssText = "display:grid;gap:4px;", o.setAttribute("role", "group"), o.setAttribute("aria-label", "Pin References"), a.appendChild(o), e._pinGroup = o, e._pinBtns = {};
	for (let t of [
		"A",
		"B",
		"C",
		"D"
	]) {
		let n = document.createElement("button");
		n.type = "button", n.className = "mjr-menu-item mjr-mfv-pin-btn", n.dataset.slot = t, n.title = `Pin Asset ${t}`, n.setAttribute("aria-pressed", "false");
		let r = document.createElement("span");
		r.className = "mjr-menu-item-label", r.textContent = `Asset ${t}`;
		let i = document.createElement("i");
		i.className = "pi pi-map-marker mjr-menu-item-check", i.style.opacity = "0", n.appendChild(r), n.appendChild(i), o.appendChild(n), e._pinBtns[t] = n;
	}
	e._updatePinUI(), e._pinBtn = i, e._pinPopover = a;
	let s = () => {
		let t = i.getBoundingClientRect(), n = e.element.getBoundingClientRect();
		a.style.left = `${t.left - n.left}px`, a.style.top = `${t.bottom - n.top + 4}px`, a.classList.add("is-open"), i.setAttribute("aria-expanded", "true");
	};
	e._closePinPopover = () => {
		a.classList.remove("is-open"), i.setAttribute("aria-expanded", "false");
	}, i.addEventListener("click", (t) => {
		t.stopPropagation(), a.classList.contains("is-open") ? e._closePinPopover() : (e._closeAllToolbarPopovers?.(), s());
	});
	let c = document.createElement("button");
	c.type = "button", c.className = "mjr-icon-btn mjr-mfv-guides-trigger", c.title = "Guides", c.setAttribute("aria-haspopup", "listbox"), c.setAttribute("aria-expanded", "false");
	let l = document.createElement("img");
	l.src = new URL("data:image/png;base64,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", "" + import.meta.url).href, l.className = "mjr-mfv-guides-icon", l.alt = "", l.setAttribute("aria-hidden", "true"), c.appendChild(l), n.appendChild(c);
	let u = document.createElement("div");
	u.className = "mjr-mfv-guides-popover", e.element.appendChild(u);
	let d = document.createElement("div");
	d.className = "mjr-menu", d.style.cssText = "display:grid;gap:4px;", u.appendChild(d);
	let f = document.createElement("select");
	f.style.cssText = "position:absolute;opacity:0;pointer-events:none;width:0;height:0;overflow:hidden;", u.appendChild(f);
	let p = [
		{
			value: "0",
			label: "Off"
		},
		{
			value: "1",
			label: "Thirds"
		},
		{
			value: "2",
			label: "Center"
		},
		{
			value: "3",
			label: "Safe"
		}
	], h = String(e._gridMode || 0), g = [];
	for (let e of p) {
		let t = document.createElement("option");
		t.value = e.value, f.appendChild(t);
		let n = document.createElement("button");
		n.type = "button", n.className = "mjr-menu-item", n.dataset.value = e.value;
		let r = document.createElement("span");
		r.className = "mjr-menu-item-label", r.textContent = e.label;
		let i = document.createElement("i");
		i.className = "pi pi-check mjr-menu-item-check", i.style.opacity = e.value === h ? "1" : "0", n.appendChild(r), n.appendChild(i), d.appendChild(n), g.push(n), e.value === h && n.classList.add("is-active");
	}
	f.value = h, c.classList.toggle("is-on", h !== "0"), e._guidesSelect = f, e._guideBtn = c, e._guidePopover = u;
	let _ = () => {
		let t = c.getBoundingClientRect(), n = e.element.getBoundingClientRect();
		u.style.left = `${t.left - n.left}px`, u.style.top = `${t.bottom - n.top + 4}px`, u.classList.add("is-open"), c.setAttribute("aria-expanded", "true");
	};
	e._closeGuidePopover = () => {
		u.classList.remove("is-open"), c.setAttribute("aria-expanded", "false");
	}, c.addEventListener("click", (t) => {
		t.stopPropagation(), u.classList.contains("is-open") ? e._closeGuidePopover() : (e._closeAllToolbarPopovers?.(), _());
	}), d.addEventListener("click", (t) => {
		let n = t.target.closest(".mjr-menu-item");
		if (!n) return;
		let r = n.dataset.value;
		f.value = r ?? "", f.dispatchEvent(new Event("change", { bubbles: !0 })), g.forEach((e) => {
			let t = e.dataset.value === r;
			e.classList.toggle("is-active", t), e.querySelector(".mjr-menu-item-check").style.opacity = t ? "1" : "0";
		}), c.classList.toggle("is-on", r !== "0"), e._closeGuidePopover();
	});
	let v = String(e._channel || "rgb"), y = document.createElement("button");
	y.type = "button", y.className = "mjr-icon-btn mjr-mfv-ch-trigger", y.title = "Channel", y.setAttribute("aria-haspopup", "listbox"), y.setAttribute("aria-expanded", "false");
	let b = document.createElement("img");
	b.src = new URL("data:image/png;base64,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", "" + import.meta.url).href, b.className = "mjr-mfv-ch-icon", b.alt = "", b.setAttribute("aria-hidden", "true"), y.appendChild(b), n.appendChild(y);
	let x = (e) => {
		if (!e || e === "rgb") y.replaceChildren(b);
		else {
			let t = Jn[e] || "#e0e0e0", n = Xn[e] || "500", r = Yn[e] || e.toUpperCase(), i = document.createElement("span");
			i.className = "mjr-mfv-ch-label", i.style.color = t, i.style.fontWeight = n, i.textContent = r, y.replaceChildren(i);
		}
	}, S = document.createElement("div");
	S.className = "mjr-mfv-ch-popover", e.element.appendChild(S);
	let C = document.createElement("div");
	C.className = "mjr-menu", C.style.cssText = "display:grid;gap:4px;", S.appendChild(C);
	let w = document.createElement("select");
	w.style.cssText = "position:absolute;opacity:0;pointer-events:none;width:0;height:0;overflow:hidden;", S.appendChild(w);
	let E = [
		{
			value: "rgb",
			color: "#e0e0e0",
			weight: "500",
			label: "RGB"
		},
		{
			value: "r",
			color: "#ff5555",
			weight: "700",
			label: "R"
		},
		{
			value: "g",
			color: "#44dd66",
			weight: "700",
			label: "G"
		},
		{
			value: "b",
			color: "#5599ff",
			weight: "700",
			label: "B"
		},
		{
			value: "a",
			color: "#ffffff",
			weight: "700",
			label: "A"
		},
		{
			value: "l",
			color: "#bbbbbb",
			weight: "400",
			label: "L"
		}
	], D = [];
	for (let e of E) {
		let t = document.createElement("option");
		t.value = e.value, w.appendChild(t);
		let n = document.createElement("button");
		n.type = "button", n.className = "mjr-menu-item", n.dataset.value = e.value;
		let r = document.createElement("span");
		r.className = "mjr-menu-item-label";
		let i = document.createElement("span");
		i.textContent = e.label, i.style.color = e.color, i.style.fontWeight = e.weight, r.appendChild(i);
		let a = document.createElement("i");
		a.className = "pi pi-check mjr-menu-item-check", a.style.opacity = e.value === v ? "1" : "0", n.appendChild(r), n.appendChild(a), C.appendChild(n), D.push(n), e.value === v && n.classList.add("is-active");
	}
	w.value = v, x(v), y.classList.toggle("is-on", v !== "rgb"), e._channelSelect = w, e._chBtn = y, e._chPopover = S;
	let ee = () => {
		let t = y.getBoundingClientRect(), n = e.element.getBoundingClientRect();
		S.style.left = `${t.left - n.left}px`, S.style.top = `${t.bottom - n.top + 4}px`, S.classList.add("is-open"), y.setAttribute("aria-expanded", "true");
	};
	e._closeChPopover = () => {
		S.classList.remove("is-open"), y.setAttribute("aria-expanded", "false");
	}, y.addEventListener("click", (t) => {
		t.stopPropagation(), S.classList.contains("is-open") ? e._closeChPopover() : (e._closeAllToolbarPopovers?.(), ee());
	}), C.addEventListener("click", (t) => {
		let n = t.target.closest(".mjr-menu-item");
		if (!n) return;
		let r = n.dataset.value;
		w.value = r ?? "", w.dispatchEvent(new Event("change", { bubbles: !0 })), D.forEach((e) => {
			let t = e.dataset.value === r;
			e.classList.toggle("is-active", t), e.querySelector(".mjr-menu-item-check").style.opacity = t ? "1" : "0";
		}), x(r), y.classList.toggle("is-on", r !== "rgb"), e._closeChPopover();
	}), e._closeAllToolbarPopovers = () => {
		e._closeChPopover?.(), e._closeGuidePopover?.(), e._closePinPopover?.(), e._closeFormatPopover?.(), e._closeGenDropdown?.();
	}, e._exposureCtl = t("Exposure (EV)", {
		min: -10,
		max: 10,
		step: .1,
		value: Number(e._exposureEV || 0)
	}), e._exposureCtl.out.textContent = `${Number(e._exposureEV || 0).toFixed(1)}EV`, e._exposureCtl.out.title = "Click to reset to 0 EV", e._exposureCtl.out.style.cursor = "pointer", e._exposureCtl.wrap.classList.toggle("is-active", (e._exposureEV || 0) !== 0), n.appendChild(e._exposureCtl.wrap), e._formatToggle = document.createElement("button"), e._formatToggle.type = "button", e._formatToggle.className = "mjr-icon-btn mjr-mfv-format-trigger", e._formatToggle.setAttribute("aria-haspopup", "dialog"), e._formatToggle.setAttribute("aria-expanded", "false"), e._formatToggle.setAttribute("aria-pressed", "false"), e._formatToggle.title = "Format mask", e._formatToggle.innerHTML = "<i class=\"pi pi-stop\" aria-hidden=\"true\"></i>", n.appendChild(e._formatToggle);
	let O = document.createElement("div");
	O.className = "mjr-mfv-format-popover", e.element.appendChild(O);
	let k = document.createElement("div");
	k.className = "mjr-menu", k.style.cssText = "display:grid;gap:4px;", O.appendChild(k);
	let A = document.createElement("select");
	A.style.cssText = "position:absolute;opacity:0;pointer-events:none;width:0;height:0;overflow:hidden;", O.appendChild(A);
	let j = [
		{
			value: "off",
			label: "Off"
		},
		{
			value: "image",
			label: "Image"
		},
		{
			value: "16:9",
			label: "16:9"
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
			value: "9:16",
			label: "9:16"
		},
		{
			value: "2.39",
			label: "2.39"
		}
	], M = [], N = e._overlayMaskEnabled ? String(e._overlayFormat || "image") : "off";
	for (let e of j) {
		let t = document.createElement("option");
		t.value = e.value, A.appendChild(t);
		let n = document.createElement("button");
		n.type = "button", n.className = "mjr-menu-item", n.dataset.value = e.value;
		let r = document.createElement("span");
		r.className = "mjr-menu-item-label", r.textContent = e.label;
		let i = document.createElement("i");
		i.className = "pi pi-check mjr-menu-item-check", i.style.opacity = e.value === N ? "1" : "0", n.appendChild(r), n.appendChild(i), k.appendChild(n), M.push(n), e.value === N && n.classList.add("is-active");
	}
	A.value = N;
	let te = document.createElement("div");
	te.className = "mjr-mfv-format-sep", O.appendChild(te);
	let P = document.createElement("div");
	P.className = "mjr-mfv-format-slider-row", O.appendChild(P);
	let F = document.createElement("span");
	F.className = "mjr-mfv-format-slider-label", F.textContent = "Opacity", P.appendChild(F), e._maskOpacityCtl = t("Mask opacity", {
		min: 0,
		max: .9,
		step: .01,
		value: Number(e._overlayMaskOpacity ?? .65)
	}), P.appendChild(e._maskOpacityCtl.input), P.appendChild(e._maskOpacityCtl.out), e._formatSelect = A, e._formatPopover = O;
	let ne = () => {
		let t = e._formatToggle.getBoundingClientRect(), n = e.element.getBoundingClientRect();
		O.style.left = `${t.left - n.left}px`, O.style.top = `${t.bottom - n.top + 4}px`, O.classList.add("is-open"), e._formatToggle.setAttribute("aria-expanded", "true");
	};
	e._closeFormatPopover = () => {
		O.classList.remove("is-open"), e._formatToggle.setAttribute("aria-expanded", "false");
	}, e._formatToggle.addEventListener("click", (t) => {
		t.stopPropagation(), O.classList.contains("is-open") ? e._closeFormatPopover() : (e._closeAllToolbarPopovers?.(), ne());
	}), k.addEventListener("click", (t) => {
		let n = t.target.closest(".mjr-menu-item");
		if (!n) return;
		let r = n.dataset.value;
		A.value = r ?? "", A.dispatchEvent(new Event("change", { bubbles: !0 })), M.forEach((e) => {
			let t = e.dataset.value === r;
			e.classList.toggle("is-active", t), e.querySelector(".mjr-menu-item-check").style.opacity = t ? "1" : "0";
		}), e._closeFormatPopover();
	});
	let re = document.createElement("div");
	re.className = "mjr-mfv-toolbar-sep", re.setAttribute("aria-hidden", "true"), n.appendChild(re), e._liveBtn = document.createElement("button"), e._liveBtn.type = "button", e._liveBtn.className = "mjr-icon-btn", e._liveBtn.innerHTML = "<i class=\"pi pi-circle\" aria-hidden=\"true\"></i>", e._liveBtn.setAttribute("aria-pressed", "false"), T(e._liveBtn, m("tooltip.liveStreamOff", "Live Stream: OFF - click to follow final generation outputs"), "L"), n.appendChild(e._liveBtn), e._previewBtn = document.createElement("button"), e._previewBtn.type = "button", e._previewBtn.className = "mjr-icon-btn", e._previewBtn.innerHTML = "<i class=\"pi pi-eye\" aria-hidden=\"true\"></i>", e._previewBtn.setAttribute("aria-pressed", "false"), T(e._previewBtn, m("tooltip.previewStreamOff", "KSampler Preview: OFF - click to stream sampler denoising frames"), "K"), n.appendChild(e._previewBtn), e._nodeStreamBtn = document.createElement("button"), e._nodeStreamBtn.type = "button", e._nodeStreamBtn.className = "mjr-icon-btn", e._nodeStreamBtn.innerHTML = "<i class=\"pi pi-sitemap\" aria-hidden=\"true\"></i>", e._nodeStreamBtn.setAttribute("aria-pressed", "false"), T(e._nodeStreamBtn, m("tooltip.nodeStreamOff", "Node Stream: OFF - click to follow selected node previews, including ImageOps live canvases"), "N"), n.appendChild(e._nodeStreamBtn), e._genBtn = document.createElement("button"), e._genBtn.type = "button", e._genBtn.className = "mjr-icon-btn", e._genBtn.setAttribute("aria-pressed", String(!!e._genSidebarEnabled));
	let L = document.createElement("i");
	L.className = "pi pi-info-circle", L.setAttribute("aria-hidden", "true"), e._genBtn.appendChild(L), n.appendChild(e._genBtn), e._updateGenBtnUI(), e._popoutBtn = document.createElement("button"), e._popoutBtn.type = "button", e._popoutBtn.className = "mjr-icon-btn";
	let R = m("tooltip.popOutViewer", "Pop out viewer to separate window");
	e._popoutBtn.title = R, e._popoutBtn.setAttribute("aria-label", R), e._popoutBtn.setAttribute("aria-pressed", "false");
	let z = document.createElement("i");
	z.className = "pi pi-external-link", z.setAttribute("aria-hidden", "true"), e._popoutBtn.appendChild(z), n.appendChild(e._popoutBtn), e._captureBtn = document.createElement("button"), e._captureBtn.type = "button", e._captureBtn.className = "mjr-icon-btn";
	let ie = m("tooltip.captureView", "Save view as image");
	e._captureBtn.title = ie, e._captureBtn.setAttribute("aria-label", ie);
	let ae = document.createElement("i");
	ae.className = "pi pi-download", ae.setAttribute("aria-hidden", "true"), e._captureBtn.appendChild(ae), n.appendChild(e._captureBtn);
	let oe = document.createElement("div");
	oe.className = "mjr-mfv-toolbar-sep", oe.style.marginLeft = "auto", oe.setAttribute("aria-hidden", "true"), n.appendChild(oe), e._settingsBtn = document.createElement("button"), e._settingsBtn.type = "button", e._settingsBtn.className = "mjr-icon-btn mjr-mfv-settings-btn";
	let se = m("tooltip.nodeParams", "Node Parameters");
	e._settingsBtn.title = se, e._settingsBtn.setAttribute("aria-label", se), e._settingsBtn.setAttribute("aria-pressed", "false");
	let ce = document.createElement("i");
	ce.className = "pi pi-sliders-h", ce.setAttribute("aria-hidden", "true"), e._settingsBtn.appendChild(ce), n.appendChild(e._settingsBtn), e._runHandle = Rn(), n.appendChild(e._runHandle.el), e._majoorSettingsBtn = document.createElement("button"), e._majoorSettingsBtn.type = "button", e._majoorSettingsBtn.className = "mjr-icon-btn mjr-mfv-majoor-settings-btn";
	let le = m("tooltip.openMajoorSettings", "Open Majoor Assets Manager settings");
	e._majoorSettingsBtn.title = le, e._majoorSettingsBtn.setAttribute("aria-label", le);
	let ue = document.createElement("i");
	return ue.className = "pi pi-cog", ue.setAttribute("aria-hidden", "true"), e._majoorSettingsBtn.appendChild(ue), n.appendChild(e._majoorSettingsBtn), e._handleDocClick = (t) => {
		let n = t?.target;
		e._chPopover?.classList?.contains("is-open") && !e._chBtn?.contains?.(n) && !e._chPopover.contains(n) && e._closeChPopover?.(), e._guidePopover?.classList?.contains("is-open") && !e._guideBtn?.contains?.(n) && !e._guidePopover.contains(n) && e._closeGuidePopover?.(), e._pinPopover?.classList?.contains("is-open") && !e._pinBtn?.contains?.(n) && !e._pinPopover.contains(n) && e._closePinPopover?.(), e._formatPopover?.classList?.contains("is-open") && !e._formatToggle?.contains?.(n) && !e._formatPopover.contains(n) && e._closeFormatPopover?.(), n?.closest?.(".mjr-mfv-idrop") || e.element?.querySelectorAll?.(".mjr-mfv-idrop-menu.is-open").forEach((e) => e.classList.remove("is-open"));
	}, e._bindDocumentUiHandlers(), n;
}
function er(e) {
	try {
		e._btnAC?.abort();
	} catch (e) {
		console.debug?.(e);
	}
	e._btnAC = new AbortController();
	let t = e._btnAC.signal;
	e._closeBtn?.addEventListener("click", () => {
		e._dispatchControllerAction("close", _.MFV_CLOSE);
	}, { signal: t }), e._modeSelect?.addEventListener("change", () => {
		let t = e._modeSelect?.value;
		t && e.setMode(t);
	}, { signal: t }), e._pinGroup?.addEventListener("click", (t) => {
		let n = t.target?.closest?.(".mjr-mfv-pin-btn");
		if (!n) return;
		let r = n.dataset.slot;
		r && (e._pinnedSlots.has(r) ? e._pinnedSlots.delete(r) : e._pinnedSlots.add(r), e._pinnedSlots.has("C") || e._pinnedSlots.has("D") ? e._mode !== B.GRID && e.setMode(B.GRID) : e._pinnedSlots.size > 0 && e._mode === B.SIMPLE && e.setMode(B.AB), e._updatePinUI());
	}, { signal: t }), e._liveBtn?.addEventListener("click", () => {
		e._dispatchControllerAction("toggleLive", _.MFV_LIVE_TOGGLE);
	}, { signal: t }), e._previewBtn?.addEventListener("click", () => {
		e._dispatchControllerAction("togglePreview", _.MFV_PREVIEW_TOGGLE);
	}, { signal: t }), e._nodeStreamBtn?.addEventListener("click", () => {
		e._dispatchControllerAction("toggleNodeStream", _.MFV_NODESTREAM_TOGGLE);
	}, { signal: t }), e._genBtn?.addEventListener("click", (t) => {
		t.stopPropagation(), e._closeAllToolbarPopovers?.(), e._genSidebarEnabled = !e._genSidebarEnabled, e._updateGenBtnUI(), e._refresh();
	}, { signal: t }), e._popoutBtn?.addEventListener("click", () => {
		e._dispatchControllerAction("popOut", _.MFV_POPOUT);
	}, { signal: t }), e._captureBtn?.addEventListener("click", () => e._captureView(), { signal: t }), e._settingsBtn?.addEventListener("click", () => {
		e._sidebar?.toggle(), e._updateSettingsBtnState(e._sidebar?.isVisible ?? !1);
	}, { signal: t }), e._majoorSettingsBtn?.addEventListener("click", (t) => {
		t.stopPropagation(), e._closeAllToolbarPopovers?.(), oe();
	}, { signal: t }), e._guidesSelect?.addEventListener("change", () => {
		e._gridMode = Number(e._guidesSelect.value) || 0, e._guideBtn?.classList.toggle("is-on", e._gridMode !== 0), e._redrawOverlayGuides?.();
	}, { signal: t }), e._channelSelect?.addEventListener("change", () => {
		e._channel = String(e._channelSelect.value || "rgb"), e._chBtn?.classList.toggle("is-on", e._channel !== "rgb"), e._applyMediaToneControls?.();
	}, { signal: t }), e._exposureCtl?.input?.addEventListener("input", () => {
		let t = Math.max(-10, Math.min(10, Number(e._exposureCtl.input.value) || 0));
		e._exposureEV = Math.round(t * 10) / 10, e._exposureCtl.out.textContent = `${e._exposureEV.toFixed(1)}EV`, e._exposureCtl.wrap.classList.toggle("is-active", e._exposureEV !== 0), e._applyMediaToneControls?.();
	}, { signal: t }), e._exposureCtl?.out?.addEventListener("click", () => {
		e._exposureEV = 0, e._exposureCtl.input.value = "0", e._exposureCtl.out.textContent = "0.0EV", e._exposureCtl.wrap.classList.remove("is-active"), e._applyMediaToneControls?.();
	}, { signal: t }), e._formatSelect?.addEventListener("change", () => {
		let t = String(e._formatSelect.value || "image");
		t === "off" ? e._overlayMaskEnabled = !1 : (e._overlayMaskEnabled = !0, e._overlayFormat = t), e._formatToggle?.classList.toggle("is-on", !!e._overlayMaskEnabled), e._formatToggle?.setAttribute("aria-pressed", String(!!e._overlayMaskEnabled)), e._redrawOverlayGuides?.();
	}, { signal: t }), e._maskOpacityCtl?.input?.addEventListener("input", () => {
		let t = Number(e._maskOpacityCtl.input.value);
		e._overlayMaskOpacity = Math.round(Math.max(0, Math.min(.9, Number.isFinite(t) ? t : .65)) * 100) / 100, e._maskOpacityCtl.out.textContent = e._overlayMaskOpacity.toFixed(2), e._redrawOverlayGuides?.();
	}, { signal: t });
}
function tr(e, t) {
	e._settingsBtn && (e._settingsBtn.classList.toggle("active", !!t), e._settingsBtn.setAttribute("aria-pressed", String(!!t)));
}
function nr(e) {
	if (!e._contentWrapper) return;
	let t = g.MFV_SIDEBAR_POSITION || "right";
	e._contentWrapper.setAttribute("data-sidebar-pos", t), e._sidebar?.el && e._contentEl && (t === "left" ? e._contentWrapper.insertBefore(e._sidebar.el, e._contentEl) : e._contentWrapper.appendChild(e._sidebar.el));
}
function rr(e) {
	if (!e._handleDocClick) return;
	let t = e.element?.ownerDocument || document;
	if (e._docClickHost !== t) {
		e._unbindDocumentUiHandlers();
		try {
			e._docAC?.abort();
		} catch (e) {
			console.debug?.(e);
		}
		e._docAC = new AbortController(), t.addEventListener("click", e._handleDocClick, { signal: e._docAC.signal }), e._docClickHost = t;
	}
}
function ir(e) {
	try {
		e._docAC?.abort();
	} catch (e) {
		console.debug?.(e);
	}
	e._docAC = new AbortController(), e._docClickHost = null;
}
function ar(e) {
	if (!e._genBtn) return;
	let t = !!e._genSidebarEnabled;
	e._genBtn.classList.toggle("is-on", t), e._genBtn.classList.toggle("is-open", t);
	let n = t ? "Gen Info sidebar: ON" : "Gen Info sidebar: OFF";
	e._genBtn.title = n, e._genBtn.setAttribute("aria-label", n), e._genBtn.setAttribute("aria-pressed", String(t)), e._genBtn.removeAttribute("aria-expanded"), e._genBtn.removeAttribute("aria-haspopup"), e._genBtn.removeAttribute("aria-controls");
}
function or(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? "" : t >= 60 ? `${(t / 60).toFixed(1)}m` : `${t.toFixed(1)}s`;
}
function sr(e) {
	let t = String(e || "").trim().toLowerCase();
	if (!t) return 0;
	if (t.endsWith("m")) {
		let e = Number.parseFloat(t.slice(0, -1));
		return Number.isFinite(e) ? e * 60 : 0;
	}
	if (t.endsWith("s")) {
		let e = Number.parseFloat(t.slice(0, -1));
		return Number.isFinite(e) ? e : 0;
	}
	let n = Number.parseFloat(t);
	return Number.isFinite(n) ? n : 0;
}
function cr(e, t) {
	if (!t) return {};
	try {
		let e = t.geninfo ? { geninfo: t.geninfo } : t.metadata || t.metadata_raw || t, n = ue(e) || null, r = {
			prompt: "",
			seed: "",
			model: "",
			lora: "",
			sampler: "",
			scheduler: "",
			cfg: "",
			step: "",
			genTime: ""
		};
		if (n && typeof n == "object") {
			n.prompt && (r.prompt = de(String(n.prompt))), n.seed != null && (r.seed = String(n.seed)), n.model && (r.model = Array.isArray(n.model) ? n.model.join(", ") : String(n.model));
			let i = Kn(n), a = Gn(n);
			a && (r.model = a), i && (r.model = [i, r.model].filter(Boolean).join(" | ")), Array.isArray(n.loras) && (r.lora = n.loras.map((e) => typeof e == "string" ? e : e?.name || e?.lora_name || e?.model_name || "").filter(Boolean).join(", ")), n.sampler && (r.sampler = String(n.sampler)), n.scheduler && (r.scheduler = String(n.scheduler)), n.cfg != null && (r.cfg = String(n.cfg)), n.steps != null && (r.step = String(n.steps)), !r.prompt && e?.prompt && (r.prompt = de(String(e.prompt || "")));
			let o = t.generation_time_ms ?? t.metadata_raw?.generation_time_ms ?? e?.generation_time_ms ?? e?.geninfo?.generation_time_ms ?? 0;
			return o && Number.isFinite(Number(o)) && o > 0 && o < 864e5 && (r.genTime = or(Number(o) / 1e3)), r;
		}
	} catch (e) {
		console.debug?.("[MFV] geninfo normalize failed", e);
	}
	let n = t?.metadata || t?.metadata_raw || t || {}, r = {
		prompt: de(String(n?.prompt || n?.positive || "")),
		seed: n?.seed == null ? "" : String(n.seed),
		model: n?.checkpoint || n?.ckpt_name || n?.model || "",
		lora: Array.isArray(n?.loras) ? n.loras.join(", ") : n?.lora || "",
		sampler: n?.sampler_name || n?.sampler || "",
		scheduler: n?.scheduler || "",
		cfg: n?.cfg == null ? n?.cfg_scale == null ? "" : String(n.cfg_scale) : String(n.cfg),
		step: n?.steps == null ? "" : String(n.steps),
		genTime: ""
	}, i = t.generation_time_ms ?? t.metadata_raw?.generation_time_ms ?? n?.generation_time_ms ?? 0;
	return i && Number.isFinite(Number(i)) && i > 0 && i < 864e5 && (r.genTime = or(Number(i) / 1e3)), r;
}
function lr(e, t) {
	let n = e._getGenFields(t);
	if (!n) return null;
	let r = document.createDocumentFragment();
	for (let t of [
		"prompt",
		"seed",
		"model",
		"lora",
		"sampler",
		"scheduler",
		"cfg",
		"step",
		"genTime"
	]) {
		if (!e._genInfoSelections.has(t)) continue;
		let i = n[t] == null ? "" : String(n[t]);
		if (!i) continue;
		let a = t.charAt(0).toUpperCase() + t.slice(1);
		t === "lora" ? a = "LoRA" : t === "cfg" ? a = "CFG" : t === "genTime" && (a = "Gen Time");
		let o = document.createElement("div");
		o.dataset.field = t;
		let s = document.createElement("strong");
		if (s.textContent = `${a}: `, o.appendChild(s), t === "prompt") o.appendChild(document.createTextNode(i));
		else if (t === "genTime") {
			let e = sr(i), t = "#4CAF50";
			e >= 60 ? t = "#FF9800" : e >= 30 ? t = "#FFC107" : e >= 10 && (t = "#8BC34A");
			let n = document.createElement("span");
			n.style.color = t, n.style.fontWeight = "600", n.textContent = i, o.appendChild(n);
		} else o.appendChild(document.createTextNode(i));
		r.appendChild(o);
	}
	return r.childNodes.length > 0 ? r : null;
}
//#endregion
//#region ui/features/viewer/floatingViewerMode.ts
function ur(e) {
	try {
		e._controller?.onModeChanged?.(e._mode);
	} catch (e) {
		console.debug?.(e);
	}
}
function dr(e) {
	let t = [
		B.SIMPLE,
		B.AB,
		B.SIDE,
		B.GRID,
		B.GRAPH
	];
	e._mode = t[(t.indexOf(e._mode) + 1) % t.length], e._updateModeBtnUI(), e._refresh(), e._notifyModeChanged();
}
function fr(e, t) {
	Object.values(B).includes(t) && (e._mode = t, e._updateModeBtnUI(), e._refresh(), e._notifyModeChanged());
}
function pr(e) {
	return e._pinnedSlots;
}
function mr(e) {
	if (e._pinBtns) {
		for (let t of [
			"A",
			"B",
			"C",
			"D"
		]) {
			let n = e._pinBtns[t];
			if (!n) continue;
			let r = e._pinnedSlots.has(t);
			n.classList.toggle("is-pinned", r), n.setAttribute("aria-pressed", String(r)), n.title = r ? `Unpin Asset ${t}` : `Pin Asset ${t}`;
		}
		e._pinBtn?.classList.toggle("is-on", (e._pinnedSlots?.size ?? 0) > 0);
	}
}
function hr(e) {
	if (!e._modeBtn) return;
	let { icon: t = "pi-image", label: n = "" } = {
		[B.SIMPLE]: {
			icon: "pi-image",
			label: "Mode: Simple - click to switch"
		},
		[B.AB]: {
			icon: "pi-clone",
			label: "Mode: A/B Compare - click to switch"
		},
		[B.SIDE]: {
			icon: "pi-table",
			label: "Mode: Side-by-Side - click to switch"
		},
		[B.GRID]: {
			icon: "pi-th-large",
			label: "Mode: Grid Compare (up to 4) - click to switch"
		},
		[B.GRAPH]: {
			icon: "pi-sitemap",
			label: "Mode: Graph Map - click to switch"
		}
	}[e._mode] || {}, r = E(n, "C"), i = document.createElement("i");
	i.className = `pi ${t}`, i.setAttribute("aria-hidden", "true"), e._modeBtn.replaceChildren(i), e._modeBtn.title = r, e._modeBtn.setAttribute("aria-label", r), e._modeBtn.removeAttribute("aria-pressed"), e._modeBtn.classList.toggle("is-on", e._mode !== B.SIMPLE), e._modeDrop?.selectItem?.(e._mode);
}
function gr(e, t) {
	if (!e._liveBtn) return;
	let n = !!t;
	e._liveBtn.classList.toggle("mjr-live-active", n);
	let r = n ? m("tooltip.liveStreamOn", "Live Stream: ON - follows final generation outputs after execution") : m("tooltip.liveStreamOff", "Live Stream: OFF - click to follow final generation outputs"), i = E(r, "L");
	e._liveBtn.setAttribute("aria-pressed", String(n)), e._liveBtn.setAttribute("aria-label", i);
	let a = document.createElement("i");
	a.className = n ? "pi pi-circle-fill" : "pi pi-circle", a.setAttribute("aria-hidden", "true"), e._liveBtn.replaceChildren(a), e._liveBtn.title = i;
}
function _r(e, t) {
	if (e._previewActive = !!t, !e._previewBtn) return;
	e._previewBtn.classList.toggle("mjr-preview-active", e._previewActive);
	let n = e._previewActive ? m("tooltip.previewStreamOn", "KSampler Preview: ON - streams sampler denoising frames during execution") : m("tooltip.previewStreamOff", "KSampler Preview: OFF - click to stream sampler denoising frames"), r = E(n, "K");
	e._previewBtn.setAttribute("aria-pressed", String(e._previewActive)), e._previewBtn.setAttribute("aria-label", r);
	let i = document.createElement("i");
	i.className = e._previewActive ? "pi pi-eye" : "pi pi-eye-slash", i.setAttribute("aria-hidden", "true"), e._previewBtn.replaceChildren(i), e._previewBtn.title = r;
}
function vr(e) {
	return e?._isPreview ? String(e?._previewBlobUrl || e?.url || "").trim() : "";
}
function yr(e, t) {
	let n = new Set([
		"A",
		"B",
		"C",
		"D"
	].map((t) => vr(e[`_media${t}`])).filter(Boolean));
	for (let r of t) {
		let t = vr(r);
		if (t && !n.has(t)) {
			try {
				URL.revokeObjectURL(t);
			} catch {}
			String(e._previewBlobUrl || "") === t && (e._previewBlobUrl = null);
		}
	}
}
function br(e, t, n = {}) {
	if (!t || !(t instanceof Blob)) return;
	let r = e._mode === B.AB || e._mode === B.SIDE || e._mode === B.GRID, i = "A";
	if (r) {
		let t = e.getPinnedSlots();
		if (i = e._mode === B.GRID ? [
			"A",
			"B",
			"C",
			"D"
		].find((e) => !t.has(e)) || "" : t.has("B") ? t.has("A") ? "" : "A" : "B", !i) return;
	}
	let a = e[`_media${i}`] || null, o = URL.createObjectURL(t);
	e._previewBlobUrl = o;
	let s = String(n?.mime || t.type || "image/jpeg").trim().toLowerCase(), c = s === "video/mp4", l = {
		url: o,
		filename: n?.filename || (c ? "preview.mp4" : s === "image/webp" ? "preview.webp" : s === "image/png" ? "preview.png" : "preview.jpg"),
		kind: c ? "video" : "image",
		mime: s,
		width: Number(n?.width) || void 0,
		height: Number(n?.height) || void 0,
		fps: Number(n?.fps) || void 0,
		_isPreview: !0,
		_sourceLabel: n?.sourceLabel || null,
		_previewSource: n?.source || "comfy",
		_previewNodeId: n?.nodeId == null ? null : String(n.nodeId),
		_previewStep: Number.isFinite(Number(n?.step)) ? Number(n.step) : null,
		_previewTotal: Number.isFinite(Number(n?.total)) ? Number(n.total) : null,
		_previewBlobUrl: o
	};
	r ? e[`_media${i}`] = l : (e._mediaA = l, e._resetMfvZoom(), e._mode !== B.SIMPLE && (e._mode = B.SIMPLE, e._updateModeBtnUI())), yr(e, [a]), ++e._refreshGen, e._refresh();
}
function xr(e) {
	let t = /* @__PURE__ */ new Set();
	e._previewBlobUrl && t.add(String(e._previewBlobUrl));
	for (let n of [
		"A",
		"B",
		"C",
		"D"
	]) {
		let r = vr(e[`_media${n}`]);
		r && t.add(r);
	}
	for (let e of t) try {
		URL.revokeObjectURL(e);
	} catch {}
	e._previewBlobUrl = null;
}
function Sr(e, t) {
	if (e._nodeStreamActive = !!t, e._nodeStreamActive || e.setNodeStreamSelection?.(null), !e._nodeStreamBtn) return;
	e._nodeStreamBtn.classList.toggle("mjr-nodestream-active", e._nodeStreamActive);
	let n = e._nodeStreamActive ? m("tooltip.nodeStreamOn", "Node Stream: ON - follows the selected node preview when frontend media exists") : m("tooltip.nodeStreamOff", "Node Stream: OFF - click to follow selected node previews, including ImageOps live canvases"), r = E(n, "N");
	e._nodeStreamBtn.setAttribute("aria-pressed", String(e._nodeStreamActive)), e._nodeStreamBtn.setAttribute("aria-label", r);
	let i = document.createElement("i");
	i.className = "pi pi-sitemap", i.setAttribute("aria-hidden", "true"), e._nodeStreamBtn.replaceChildren(i), e._nodeStreamBtn.title = r;
}
//#endregion
//#region ui/features/viewer/floatingViewerPopout.ts
var Cr = /* @__PURE__ */ "--border-color.--border-default.--button-hover-surface.--button-surface.--comfy-accent.--comfy-font.--comfy-input-bg.--comfy-menu-bg.--comfy-menu-secondary-bg.--comfy-status-error.--comfy-status-success.--comfy-status-warning.--content-bg.--content-fg.--descrip-text.--destructive-background.--font-inter.--input-text.--interface-menu-surface.--interface-panel-hover-surface.--interface-panel-selected-surface.--interface-panel-surface.--modal-card-background.--muted-foreground.--primary-background.--primary-background-hover.--radius-lg.--radius-md.--radius-sm.--success-background.--warning-background".split(".");
function wr() {
	try {
		let e = typeof window < "u" ? window : globalThis, t = e?.process?.versions?.electron;
		if (typeof t == "string" && t.trim() || e?.electron || e?.ipcRenderer || e?.electronAPI) return !0;
		let n = String(e?.navigator?.userAgent || globalThis?.navigator?.userAgent || ""), r = /\bElectron\//i.test(n), i = /\bCode\//i.test(n);
		if (r && !i) return !0;
	} catch (e) {
		console.debug?.(e);
	}
	return !1;
}
function Q(e, t = null, n = "info") {
	let r = {
		stage: String(e || "unknown"),
		detail: t,
		ts: Date.now()
	};
	try {
		let e = typeof window < "u" ? window : globalThis, t = "__MJR_MFV_POPOUT_TRACE__", n = Array.isArray(e[t]) ? e[t] : [];
		n.push(r), e[t] = n.slice(-20), e.__MJR_MFV_POPOUT_LAST__ = r;
	} catch (e) {
		console.debug?.(e);
	}
	try {
		(n === "error" ? console.error : n === "warn" ? console.warn : console.info)?.("[MFV popout]", r);
	} catch (e) {
		console.debug?.(e);
	}
}
function Tr(e, ...t) {
	return Array.from(new Set([String(e || ""), ...t].join(" ").split(/\s+/).filter(Boolean))).join(" ");
}
function Er(e, t) {
	if (e && t) for (let n of Array.from(e.attributes || [])) {
		let e = String(n?.name || "");
		if (e && e !== "class" && e !== "style") try {
			t.setAttribute(e, n.value);
		} catch (e) {
			console.debug?.(e);
		}
	}
}
function Dr(e, t) {
	if (!e || !t?.style) return;
	let n = typeof window < "u" && window?.getComputedStyle || globalThis?.getComputedStyle;
	if (typeof n != "function") return;
	let r = null;
	try {
		r = n(e);
	} catch (e) {
		console.debug?.(e);
	}
	if (r) {
		for (let e of Cr) try {
			let n = String(r.getPropertyValue?.(e) || "").trim();
			n && t.style.setProperty(e, n);
		} catch (e) {
			console.debug?.(e);
		}
		try {
			let e = String(r.getPropertyValue?.("color-scheme") || "").trim();
			e && (t.style.colorScheme = e);
		} catch (e) {
			console.debug?.(e);
		}
	}
}
function Or(e) {
	if (!e?.documentElement || !e?.body || !document?.documentElement) return;
	let t = document.documentElement, n = document.body, r = e.documentElement, i = e.body;
	r.className = Tr(t.className, "mjr-mfv-popout-document"), i.className = Tr(n?.className, "mjr-mfv-popout-body"), Er(t, r), Er(n, i), Dr(t, r), Dr(n, i), t?.lang && (r.lang = t.lang), t?.dir && (r.dir = t.dir);
}
function kr(e) {
	if (!e?.body) return null;
	try {
		(e.getElementById?.("mjr-mfv-popout-root"))?.remove?.();
	} catch (e) {
		console.debug?.(e);
	}
	let t = e.createElement("div");
	return t.id = "mjr-mfv-popout-root", t.className = "mjr-mfv-popout-root", e.body.appendChild(t), t;
}
function Ar(e) {
	e._resetGenDropdownForCurrentDocument(), e._rebindControlHandlers(), e._bindPanelInteractions(), e._bindDocumentUiHandlers(), e._unbindLayoutObserver?.(), e._bindLayoutObserver?.(), e._refresh?.(), e._updatePopoutBtnUI();
}
function jr(e, t) {
	if (!e.element) return;
	let n = !!t;
	if (e._desktopExpanded === n) return;
	let r = e.element;
	if (n) {
		e._desktopExpandRestore = {
			parent: r.parentNode || null,
			nextSibling: r.nextSibling || null,
			styleAttr: r.getAttribute("style")
		}, r.parentNode !== document.body && document.body.appendChild(r), r.classList.add("mjr-mfv--desktop-expanded", "is-visible"), r.setAttribute("aria-hidden", "false"), r.style.position = "fixed", r.style.top = "12px", r.style.left = "12px", r.style.right = "12px", r.style.bottom = "12px", r.style.width = "auto", r.style.height = "auto", r.style.maxWidth = "none", r.style.maxHeight = "none", r.style.minWidth = "320px", r.style.minHeight = "240px", r.style.resize = "none", r.style.margin = "0", r.style.zIndex = "2147483000", e._desktopExpanded = !0, e.isVisible = !0, Ar(e), Q("electron-in-app-expanded", { isVisible: e.isVisible });
		return;
	}
	let i = e._desktopExpandRestore;
	e._desktopExpanded = !1, r.classList.remove("mjr-mfv--desktop-expanded"), i?.styleAttr == null || i.styleAttr === "" ? r.removeAttribute("style") : r.setAttribute("style", i.styleAttr), i?.parent && i.parent.isConnected && (i.nextSibling && i.nextSibling.parentNode === i.parent ? i.parent.insertBefore(r, i.nextSibling) : i.parent.appendChild(r)), e._desktopExpandRestore = null, Ar(e), Q("electron-in-app-restored", null);
}
function Mr(t, n) {
	t._desktopPopoutUnsupported = !0, Q("electron-in-app-fallback", { message: n?.message || String(n || "unknown error") }, "warn"), t._setDesktopExpanded(!0);
	try {
		e(m("toast.popoutElectronInAppFallback", "Desktop PiP is unavailable here. Viewer expanded inside the app instead."), "warning", 4500);
	} catch (e) {
		console.debug?.(e);
	}
}
function Nr(e, t, n, r, i) {
	return Q("electron-popup-fallback-attempt", { reason: i?.message || String(i || "unknown") }, "warn"), e._fallbackPopout(t, n, r), e._popoutWindow ? (e._desktopPopoutUnsupported = !1, Q("electron-popup-fallback-opened", null), !0) : !1;
}
function Pr(e) {
	if (e._isPopped || !e.element) return;
	let t = e.element;
	e._stopEdgeResize();
	let n = wr(), r = typeof window < "u" && "documentPictureInPicture" in window, i = String(window?.navigator?.userAgent || globalThis?.navigator?.userAgent || ""), a = Math.max(t.offsetWidth || 520, 400), o = Math.max(t.offsetHeight || 420, 300);
	if (Q("start", {
		isElectronHost: n,
		hasDocumentPiP: r,
		userAgent: i,
		width: a,
		height: o,
		desktopPopoutUnsupported: e._desktopPopoutUnsupported
	}), n && e._desktopPopoutUnsupported) {
		Q("electron-in-app-fallback-reuse", null), e._setDesktopExpanded(!0);
		return;
	}
	if (!(n && (Q("electron-popup-request", {
		width: a,
		height: o
	}), e._tryElectronPopupFallback(t, a, o, /* @__PURE__ */ Error("Desktop popup requested"))))) {
		if (n && "documentPictureInPicture" in window) {
			Q("electron-pip-request", {
				width: a,
				height: o
			}), window.documentPictureInPicture.requestWindow({
				width: a,
				height: o
			}).then((n) => {
				Q("electron-pip-opened", { hasDocument: !!n?.document }), e._popoutWindow = n, e._isPopped = !0, e._popoutRestoreGuard = !1;
				try {
					e._popoutAC?.abort();
				} catch (e) {
					console.debug?.(e);
				}
				e._popoutAC = new AbortController();
				let r = e._popoutAC.signal, i = () => e._schedulePopInFromPopupClose();
				e._popoutCloseHandler = i;
				let a = n.document;
				a.title = "Majoor Viewer", e._installPopoutStyles(a);
				let o = kr(a);
				if (!o) {
					e._activateDesktopExpandedFallback(/* @__PURE__ */ Error("Popup root creation failed"));
					return;
				}
				try {
					let e = typeof a.adoptNode == "function" ? a.adoptNode(t) : t;
					o.appendChild(e), Q("electron-pip-adopted", { usedAdoptNode: typeof a.adoptNode == "function" });
				} catch (t) {
					Q("electron-pip-adopt-failed", { message: t?.message || String(t) }, "warn"), console.warn("[MFV] PiP adoptNode failed", t), e._isPopped = !1, e._popoutWindow = null;
					try {
						n.close();
					} catch (e) {
						console.debug?.(e);
					}
					e._activateDesktopExpandedFallback(t);
					return;
				}
				t.classList.add("is-visible"), e.isVisible = !0, Ar(e), Q("electron-pip-ready", { isPopped: e._isPopped }), n.addEventListener("pagehide", i, { signal: r }), e._startPopoutCloseWatch(), e._popoutKeydownHandler = (t) => {
					let n = String(t?.target?.tagName || "").toLowerCase();
					t?.defaultPrevented || t?.target?.isContentEditable || n === "input" || n === "textarea" || n === "select" || e._forwardKeydownToController(t);
				}, n.addEventListener("keydown", e._popoutKeydownHandler, { signal: r });
			}).catch((t) => {
				Q("electron-pip-request-failed", { message: t?.message || String(t) }, "warn"), e._activateDesktopExpandedFallback(t);
			});
			return;
		}
		if (n) {
			Q("electron-no-pip-api", { hasDocumentPiP: r }), e._activateDesktopExpandedFallback(/* @__PURE__ */ Error("Document Picture-in-Picture unavailable after popup failure"));
			return;
		}
		Q("browser-fallback-popup", {
			width: a,
			height: o
		}), e._fallbackPopout(t, a, o);
	}
}
function Fr(e, t, n, r) {
	Q("browser-popup-open", {
		width: n,
		height: r
	});
	let i = `width=${n},height=${r},left=${(window.screenX || window.screenLeft) + Math.round((window.outerWidth - n) / 2)},top=${(window.screenY || window.screenTop) + Math.round((window.outerHeight - r) / 2)},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`, a = window.open("about:blank", "_mjr_viewer", i);
	if (!a) {
		Q("browser-popup-blocked", null, "warn"), console.warn("[MFV] Pop-out blocked  -  allow popups for this site.");
		return;
	}
	Q("browser-popup-opened", { hasDocument: !!a?.document }), e._popoutWindow = a, e._isPopped = !0, e._popoutRestoreGuard = !1;
	try {
		e._popoutAC?.abort();
	} catch (e) {
		console.debug?.(e);
	}
	e._popoutAC = new AbortController();
	let o = e._popoutAC.signal, s = () => e._schedulePopInFromPopupClose();
	e._popoutCloseHandler = s;
	let c = () => {
		let n;
		try {
			n = a.document;
		} catch {
			return;
		}
		if (!n) return;
		n.title = "Majoor Viewer", e._installPopoutStyles(n);
		let r = kr(n);
		if (r) {
			try {
				r.appendChild(n.adoptNode(t));
			} catch (e) {
				console.warn("[MFV] adoptNode failed", e);
				return;
			}
			t.classList.add("is-visible"), e.isVisible = !0, Ar(e);
		}
	};
	try {
		c();
	} catch (e) {
		console.debug?.("[MFV] immediate mount failed, retrying on load", e);
		try {
			a.addEventListener("load", c, { signal: o });
		} catch (e) {
			console.debug?.("[MFV] pop-out page load listener failed", e);
		}
	}
	a.addEventListener("beforeunload", s, { signal: o }), a.addEventListener("pagehide", s, { signal: o }), a.addEventListener("unload", s, { signal: o }), e._startPopoutCloseWatch(), e._popoutKeydownHandler = (t) => {
		let n = String(t?.target?.tagName || "").toLowerCase();
		t?.defaultPrevented || t?.target?.isContentEditable || n === "input" || n === "textarea" || n === "select" || e._forwardKeydownToController(t);
	}, a.addEventListener("keydown", e._popoutKeydownHandler, { signal: o });
}
function Ir(e) {
	if (e._popoutCloseTimer != null) {
		try {
			window.clearInterval(e._popoutCloseTimer);
		} catch (e) {
			console.debug?.(e);
		}
		e._popoutCloseTimer = null;
	}
}
function Lr(e) {
	e._clearPopoutCloseWatch(), e._popoutCloseTimer = window.setInterval(() => {
		if (!e._isPopped) {
			e._clearPopoutCloseWatch();
			return;
		}
		let t = e._popoutWindow;
		(!t || t.closed) && (e._clearPopoutCloseWatch(), e._schedulePopInFromPopupClose());
	}, 250);
}
function Rr(e) {
	e._isPopped && !e._popoutRestoreGuard && (e._popoutRestoreGuard = !0, window.setTimeout(() => {
		try {
			e.popIn({ closePopupWindow: !1 });
		} finally {
			e._popoutRestoreGuard = !1;
		}
	}, 0));
}
function zr(e, t) {
	if (!t?.head) return;
	try {
		for (let e of t.head.querySelectorAll("[data-mjr-popout-cloned-style='1']")) e.remove();
	} catch (e) {
		console.debug?.(e);
	}
	Or(t);
	try {
		let e = document.documentElement.style.cssText;
		if (e) {
			let n = t.createElement("style");
			n.setAttribute("data-mjr-popout-cloned-style", "1"), n.textContent = `:root { ${e} }`, t.head.appendChild(n);
		}
	} catch (e) {
		console.debug?.(e);
	}
	for (let e of document.querySelectorAll("link[rel=\"stylesheet\"], style")) try {
		let n = null;
		if (e.tagName === "LINK") {
			n = t.createElement("link");
			for (let t of Array.from(e.attributes || [])) t?.name !== "href" && n.setAttribute(t.name, t.value);
			n.setAttribute("href", e.href || e.getAttribute("href") || "");
		} else n = t.importNode(e, !0);
		n.setAttribute("data-mjr-popout-cloned-style", "1"), t.head.appendChild(n);
	} catch (e) {
		console.debug?.(e);
	}
	let n = t.createElement("style");
	n.setAttribute("data-mjr-popout-cloned-style", "1"), n.textContent = "\n        html.mjr-mfv-popout-document {\n            min-height: 100%;\n            background:\n                radial-gradient(\n                    1200px 420px at 50% 0%,\n                    color-mix(in srgb, var(--primary-background, var(--comfy-accent, #5fb3ff)) 10%, transparent),\n                    transparent 62%\n                ),\n                linear-gradient(\n                    180deg,\n                    color-mix(in srgb, var(--interface-panel-surface, var(--content-bg, #16191f)) 82%, #000 18%),\n                    color-mix(in srgb, var(--interface-menu-surface, var(--comfy-menu-bg, #1f2227)) 84%, #000 16%)\n                ) !important;\n        }\n        body.mjr-mfv-popout-body {\n            margin: 0 !important;\n            display: flex !important;\n            min-height: 100vh !important;\n            overflow: hidden !important;\n            background: transparent !important;\n        }\n        #mjr-mfv-popout-root,\n        .mjr-mfv-popout-root {\n            flex: 1 !important;\n            min-width: 0 !important;\n            min-height: 0 !important;\n            display: flex !important;\n            isolation: isolate;\n        }\n        body.mjr-mfv-popout-body .mjr-mfv {\n            position: static !important;\n            width: 100% !important;\n            height: 100% !important;\n            min-width: 0 !important;\n            min-height: 0 !important;\n            resize: none !important;\n            border-radius: 0 !important;\n            display: flex !important;\n            opacity: 1 !important;\n            visibility: visible !important;\n            pointer-events: auto !important;\n            transform: none !important;\n            max-width: none !important;\n            max-height: none !important;\n            overflow: hidden !important;\n        }\n    ", t.head.appendChild(n);
}
function Br(e, { closePopupWindow: t = !0 } = {}) {
	if (e._desktopExpanded) {
		e._setDesktopExpanded(!1);
		return;
	}
	if (!e._isPopped || !e.element) return;
	let n = e._popoutWindow;
	e._clearPopoutCloseWatch();
	try {
		e._popoutAC?.abort();
	} catch (e) {
		console.debug?.(e);
	}
	e._popoutAC = null, e._popoutCloseHandler = null, e._popoutKeydownHandler = null, e._isPopped = !1;
	let r = e.element;
	try {
		r = r?.ownerDocument === document ? r : document.adoptNode(r);
	} catch (e) {
		console.debug?.("[MFV] pop-in adopt failed", e);
	}
	if (document.body.appendChild(r), r.classList.add("is-visible"), r.setAttribute("aria-hidden", "false"), e.isVisible = !0, Ar(e), t) try {
		n?.close();
	} catch (e) {
		console.debug?.(e);
	}
	e._popoutWindow = null;
}
function Vr(e) {
	if (!e._popoutBtn) return;
	let t = e._isPopped || e._desktopExpanded;
	e.element && e.element.classList.toggle("mjr-mfv--popped", t), e._popoutBtn.classList.toggle("mjr-popin-active", t);
	let n = e._popoutBtn.querySelector("i") || document.createElement("i"), r = t ? m("tooltip.popInViewer", "Return to floating panel") : m("tooltip.popOutViewer", "Pop out viewer to separate window");
	n.className = t ? "pi pi-sign-in" : "pi pi-external-link", e._popoutBtn.title = r, e._popoutBtn.setAttribute("aria-label", r), e._popoutBtn.setAttribute("aria-pressed", String(t)), e._popoutBtn.contains(n) || e._popoutBtn.replaceChildren(n);
}
//#endregion
//#region ui/features/viewer/floatingViewerPanel.ts
function Hr(e) {
	return {
		n: "ns-resize",
		s: "ns-resize",
		e: "ew-resize",
		w: "ew-resize",
		ne: "nesw-resize",
		nw: "nwse-resize",
		se: "nwse-resize",
		sw: "nesw-resize"
	}[e] || "";
}
function Ur(e, t, n) {
	if (!n) return "";
	let r = e <= n.left + 8, i = e >= n.right - 8, a = t <= n.top + 8, o = t >= n.bottom - 8;
	return a && r ? "nw" : a && i ? "ne" : o && r ? "sw" : o && i ? "se" : a ? "n" : o ? "s" : r ? "w" : i ? "e" : "";
}
function Wr(e) {
	if (e.element) {
		try {
			e._resizeWindowCleanup?.();
		} catch (e) {
			console.debug?.(e);
		}
		if (e._resizeWindowCleanup = null, e._resizeState?.pointerId != null) try {
			e.element.releasePointerCapture(e._resizeState.pointerId);
		} catch (e) {
			console.debug?.(e);
		}
		e._resizeState = null, e.element.classList.remove("mjr-mfv--resizing"), e.element.style.cursor = "";
	}
}
function Gr(e) {
	if (e.element) {
		e._stopEdgeResize();
		try {
			e._panelAC?.abort();
		} catch (e) {
			console.debug?.(e);
		}
		e._panelAC = new AbortController(), e._initEdgeResize(e.element), e._initDrag(e.element.querySelector(".mjr-mfv-header"));
	}
}
function Kr(e, t) {
	if (!t) return;
	let n = (t) => {
		if (!e.element || e._isPopped) return "";
		let n = e.element.getBoundingClientRect();
		return e._getResizeDirectionFromPoint(t.clientX, t.clientY, n);
	}, r = e._panelAC?.signal, i = null, a = () => {
		try {
			i?.abort();
		} catch (e) {
			console.debug?.(e);
		}
		i = null, e._resizeWindowCleanup = null;
	}, o = (t) => {
		if (t.button !== 0 || !e.element || e._isPopped) return;
		try {
			if (t.target?.closest?.("button, input, textarea, select, a, [contenteditable='true'], .mjr-mfv-idrop, .mjr-mfv-pin-group")) return;
		} catch (e) {
			console.debug?.(e);
		}
		let r = n(t);
		if (!r) return;
		t.preventDefault(), t.stopPropagation();
		let o = e.element.getBoundingClientRect(), l = window.getComputedStyle(e.element), u = Math.max(120, Number.parseFloat(l.minWidth) || 0), d = Math.max(100, Number.parseFloat(l.minHeight) || 0);
		e._resizeState = {
			pointerId: t.pointerId,
			dir: r,
			startX: t.clientX,
			startY: t.clientY,
			startLeft: o.left,
			startTop: o.top,
			startWidth: o.width,
			startHeight: o.height,
			minWidth: u,
			minHeight: d
		}, e.element.style.left = `${Math.round(o.left)}px`, e.element.style.top = `${Math.round(o.top)}px`, e.element.style.right = "auto", e.element.style.bottom = "auto", e.element.classList.add("mjr-mfv--resizing"), e.element.style.cursor = e._resizeCursorForDirection(r);
		try {
			e.element.setPointerCapture(t.pointerId);
		} catch (e) {
			console.debug?.(e);
		}
		try {
			a(), i = new AbortController(), e._resizeWindowCleanup = a;
			let t = e.element?.ownerDocument?.defaultView || window;
			t.addEventListener("pointermove", s, { signal: i.signal }), t.addEventListener("pointerup", c, { signal: i.signal }), t.addEventListener("pointercancel", c, { signal: i.signal });
		} catch (e) {
			console.debug?.(e);
		}
	}, s = (t) => {
		if (!e.element || e._isPopped) return;
		let r = e._resizeState;
		if (!r) {
			let r = n(t);
			e.element.style.cursor = r ? e._resizeCursorForDirection(r) : "";
			return;
		}
		if (r.pointerId !== t.pointerId) return;
		let i = t.clientX - r.startX, a = t.clientY - r.startY, o = r.startWidth, s = r.startHeight, c = r.startLeft, l = r.startTop;
		r.dir.includes("e") && (o = r.startWidth + i), r.dir.includes("s") && (s = r.startHeight + a), r.dir.includes("w") && (o = r.startWidth - i, c = r.startLeft + i), r.dir.includes("n") && (s = r.startHeight - a, l = r.startTop + a), o < r.minWidth && (r.dir.includes("w") && (c -= r.minWidth - o), o = r.minWidth), s < r.minHeight && (r.dir.includes("n") && (l -= r.minHeight - s), s = r.minHeight), o = Math.min(o, Math.max(r.minWidth, window.innerWidth)), s = Math.min(s, Math.max(r.minHeight, window.innerHeight)), c = Math.min(Math.max(0, c), Math.max(0, window.innerWidth - o)), l = Math.min(Math.max(0, l), Math.max(0, window.innerHeight - s)), e.element.style.width = `${Math.round(o)}px`, e.element.style.height = `${Math.round(s)}px`, e.element.style.left = `${Math.round(c)}px`, e.element.style.top = `${Math.round(l)}px`, e.element.style.right = "auto", e.element.style.bottom = "auto";
	}, c = (t) => {
		if (!e.element || !e._resizeState || e._resizeState.pointerId !== t.pointerId) return;
		let r = n(t);
		a(), e._stopEdgeResize(), r && (e.element.style.cursor = e._resizeCursorForDirection(r));
	};
	t.addEventListener("pointerdown", o, {
		capture: !0,
		signal: r
	}), t.addEventListener("pointermove", s, { signal: r }), t.addEventListener("pointerup", c, { signal: r }), t.addEventListener("pointercancel", c, { signal: r }), t.addEventListener("pointerleave", () => {
		!e._resizeState && e.element && (e.element.style.cursor = "");
	}, { signal: r });
}
function qr(e, t) {
	if (!t) return;
	let n = e._panelAC?.signal, r = null;
	t.addEventListener("pointerdown", (n) => {
		if (n.button !== 0 || n.target.closest("button") || n.target.closest("select") || e._isPopped || !e.element || e._getResizeDirectionFromPoint(n.clientX, n.clientY, e.element.getBoundingClientRect())) return;
		n.preventDefault(), t.setPointerCapture(n.pointerId);
		try {
			r?.abort();
		} catch {}
		r = new AbortController();
		let i = r.signal, a = e.element, o = a.getBoundingClientRect(), s = n.clientX - o.left, c = n.clientY - o.top, l = (e) => {
			let t = Math.min(window.innerWidth - a.offsetWidth, Math.max(0, e.clientX - s)), n = Math.min(window.innerHeight - a.offsetHeight, Math.max(0, e.clientY - c));
			a.style.left = `${t}px`, a.style.top = `${n}px`, a.style.right = "auto", a.style.bottom = "auto";
		}, u = () => {
			try {
				t.releasePointerCapture?.(n.pointerId);
			} catch (e) {
				console.debug?.(e);
			}
			try {
				r?.abort();
			} catch {}
		}, d = t.ownerDocument?.defaultView || window;
		d.addEventListener("pointermove", l, { signal: i }), d.addEventListener("pointerup", u, { signal: i }), d.addEventListener("pointercancel", u, { signal: i });
	}, n ? { signal: n } : void 0);
}
//#endregion
//#region ui/features/viewer/floatingViewerCapture.ts
async function Jr(e, t, n, r, i, a, o, s) {
	if (!n) return;
	let c = V(n), l = null;
	if (c === "video" && (l = s instanceof HTMLVideoElement ? s : e._contentEl?.querySelector("video") || null), !l && c === "model3d") {
		let t = n?.id == null ? "" : String(n.id);
		t && (l = e._contentEl?.querySelector?.(`.mjr-model3d-render-canvas[data-mjr-asset-id="${t}"]`) || null), l ||= e._contentEl?.querySelector?.(".mjr-model3d-render-canvas") || null;
	}
	if (!l) {
		let e = Ne(n);
		if (!e) return;
		l = await new Promise((t) => {
			let n = new Image();
			n.crossOrigin = "anonymous", n.onload = () => t(n), n.onerror = () => t(null), n.src = e;
		});
	}
	if (!l) return;
	let u = l.videoWidth || l.naturalWidth || a, d = l.videoHeight || l.naturalHeight || o;
	if (!u || !d) return;
	let f = Math.min(a / u, o / d);
	t.drawImage(l, r + (a - u * f) / 2, i + (o - d * f) / 2, u * f, d * f);
}
function Yr(e, t, n, r) {
	if (!t || !n || !e._genInfoSelections.size) return 0;
	let i = e._getGenFields(n), a = [
		"prompt",
		"seed",
		"model",
		"lora",
		"sampler",
		"scheduler",
		"cfg",
		"step",
		"genTime"
	], o = Math.max(100, Number(r || 0) - 16), s = 0;
	for (let n of a) {
		if (!e._genInfoSelections.has(n)) continue;
		let r = i[n] == null ? "" : String(i[n]);
		if (!r) continue;
		let a = n.charAt(0).toUpperCase() + n.slice(1);
		n === "lora" ? a = "LoRA" : n === "cfg" ? a = "CFG" : n === "genTime" && (a = "Gen Time");
		let c = `${a}: `;
		t.font = "bold 11px system-ui, sans-serif";
		let l = t.measureText(c).width;
		t.font = "11px system-ui, sans-serif";
		let u = Math.max(32, o - 16 - l), d = 0, f = "";
		for (let e of r.split(" ")) {
			let n = f ? f + " " + e : e;
			t.measureText(n).width > u && f ? (d += 1, f = e) : f = n;
		}
		f && (d += 1), s += d;
	}
	return s > 0 ? s * 16 + 16 : 0;
}
function Xr(e, t, n, r, i, a, o) {
	if (!n || !e._genInfoSelections.size) return;
	let s = e._getGenFields(n), c = {
		prompt: "#7ec8ff",
		seed: "#ffd47a",
		model: "#7dda8a",
		lora: "#d48cff",
		sampler: "#ff9f7a",
		scheduler: "#ff7a9f",
		cfg: "#7a9fff",
		step: "#7affd4",
		genTime: "#e0ff7a"
	}, l = [
		"prompt",
		"seed",
		"model",
		"lora",
		"sampler",
		"scheduler",
		"cfg",
		"step",
		"genTime"
	], u = [];
	for (let t of l) {
		if (!e._genInfoSelections.has(t)) continue;
		let n = s[t] == null ? "" : String(s[t]);
		if (!n) continue;
		let r = t.charAt(0).toUpperCase() + t.slice(1);
		t === "lora" ? r = "LoRA" : t === "cfg" ? r = "CFG" : t === "genTime" && (r = "Gen Time"), u.push({
			label: `${r}: `,
			value: n,
			color: c[t] || "#ffffff"
		});
	}
	if (!u.length) return;
	let d = Math.max(100, a - 16);
	t.save();
	let f = [];
	for (let { label: e, value: n, color: r } of u) {
		t.font = "bold 11px system-ui, sans-serif";
		let i = t.measureText(e).width;
		t.font = "11px system-ui, sans-serif";
		let a = d - 16 - i, o = [], s = "";
		for (let e of n.split(" ")) {
			let n = s ? s + " " + e : e;
			t.measureText(n).width > a && s ? (o.push(s), s = e) : s = n;
		}
		s && o.push(s), f.push({
			label: e,
			labelW: i,
			lines: o,
			color: r
		});
	}
	let p = f.reduce((e, t) => e + t.lines.length, 0) * 16 + 16, m = r + 8, h = i + o - p - 8;
	t.globalAlpha = .72, t.fillStyle = "#000", ze(t, m, h, d, p, 6), t.fill(), t.globalAlpha = 1;
	let g = h + 8 + 11;
	for (let { label: e, labelW: n, lines: r, color: i } of f) for (let a = 0; a < r.length; a++) a === 0 ? (t.font = "bold 11px system-ui, sans-serif", t.fillStyle = i, t.fillText(e, m + 8, g), t.font = "11px system-ui, sans-serif", t.fillStyle = "rgba(255,255,255,0.88)", t.fillText(r[a], m + 8 + n, g)) : (t.font = "11px system-ui, sans-serif", t.fillStyle = "rgba(255,255,255,0.88)", t.fillText(r[a], m + 8 + n, g)), g += 16;
	t.restore();
}
async function Zr(e) {
	if (!e._contentEl) return;
	e._captureBtn && (e._captureBtn.disabled = !0, e._captureBtn.setAttribute("aria-label", m("tooltip.capturingView", "Capturing...")));
	let t = e._contentEl.clientWidth || 480, n = e._contentEl.clientHeight || 360, r = n;
	if (e._mode === B.SIMPLE && e._mediaA && e._genInfoSelections.size) {
		let i = document.createElement("canvas");
		i.width = t, i.height = n;
		let a = i.getContext("2d"), o = e._estimateGenInfoOverlayHeight(a, e._mediaA, t);
		if (o > 0) {
			let e = Math.max(n, o + 24);
			r = Math.min(e, n * 4);
		}
	}
	let i = document.createElement("canvas");
	i.width = t, i.height = r;
	let a = i.getContext("2d");
	a.fillStyle = "#0d0d0d", a.fillRect(0, 0, t, r);
	try {
		if (e._mode === B.SIMPLE) e._mediaA && (await e._drawMediaFit(a, e._mediaA, 0, 0, t, n), e._drawGenInfoOverlay(a, e._mediaA, 0, 0, t, r));
		else if (e._mode === B.AB) {
			let n = Math.round(e._abDividerX * t), i = e._contentEl.querySelector(".mjr-mfv-ab-layer:not(.mjr-mfv-ab-layer--b) video"), o = e._contentEl.querySelector(".mjr-mfv-ab-layer--b video");
			e._mediaA && await e._drawMediaFit(a, e._mediaA, 0, 0, t, r, i), e._mediaB && (a.save(), a.beginPath(), a.rect(n, 0, t - n, r), a.clip(), await e._drawMediaFit(a, e._mediaB, 0, 0, t, r, o), a.restore()), a.save(), a.strokeStyle = "rgba(255,255,255,0.88)", a.lineWidth = 2, a.beginPath(), a.moveTo(n, 0), a.lineTo(n, r), a.stroke(), a.restore(), Be(a, "A", 8, 8), Be(a, "B", n + 8, 8), e._mediaA && e._drawGenInfoOverlay(a, e._mediaA, 0, 0, n, r), e._mediaB && e._drawGenInfoOverlay(a, e._mediaB, n, 0, t - n, r);
		} else if (e._mode === B.SIDE) {
			let n = Math.floor(t / 2), i = e._contentEl.querySelector(".mjr-mfv-side-panel:first-child video"), o = e._contentEl.querySelector(".mjr-mfv-side-panel:last-child video");
			e._mediaA && (await e._drawMediaFit(a, e._mediaA, 0, 0, n, r, i), e._drawGenInfoOverlay(a, e._mediaA, 0, 0, n, r)), a.fillStyle = "#111", a.fillRect(n, 0, 2, r), e._mediaB && (await e._drawMediaFit(a, e._mediaB, n, 0, n, r, o), e._drawGenInfoOverlay(a, e._mediaB, n, 0, n, r)), Be(a, "A", 8, 8), Be(a, "B", n + 8, 8);
		} else if (e._mode === B.GRID) {
			let n = Math.floor(t / 2), i = Math.floor(r / 2), o = [
				{
					media: e._mediaA,
					label: "A",
					x: 0,
					y: 0,
					w: n - 1,
					h: i - 1
				},
				{
					media: e._mediaB,
					label: "B",
					x: n + 1,
					y: 0,
					w: n - 1,
					h: i - 1
				},
				{
					media: e._mediaC,
					label: "C",
					x: 0,
					y: i + 1,
					w: n - 1,
					h: i - 1
				},
				{
					media: e._mediaD,
					label: "D",
					x: n + 1,
					y: i + 1,
					w: n - 1,
					h: i - 1
				}
			], s = e._contentEl.querySelectorAll(".mjr-mfv-grid-cell");
			for (let t = 0; t < o.length; t++) {
				let n = o[t], r = s[t]?.querySelector("video") || null;
				n.media && (await e._drawMediaFit(a, n.media, n.x, n.y, n.w, n.h, r), e._drawGenInfoOverlay(a, n.media, n.x, n.y, n.w, n.h)), Be(a, n.label, n.x + 8, n.y + 8);
			}
			a.save(), a.fillStyle = "#111", a.fillRect(n - 1, 0, 2, r), a.fillRect(0, i - 1, t, 2), a.restore();
		}
	} catch (e) {
		console.debug("[MFV] capture error:", e);
	}
	let o = `${{
		[B.AB]: "mfv-ab",
		[B.SIDE]: "mfv-side",
		[B.GRID]: "mfv-grid"
	}[e._mode] ?? "mfv"}-${Date.now()}.png`;
	try {
		let e = i.toDataURL("image/png"), t = document.createElement("a");
		t.href = e, t.download = o, document.body.appendChild(t), t.click(), setTimeout(() => document.body.removeChild(t), 100);
	} catch (e) {
		console.warn("[MFV] download failed:", e);
	} finally {
		e._captureBtn && (e._captureBtn.disabled = !1, e._captureBtn.setAttribute("aria-label", m("tooltip.captureView", "Save view as image")));
	}
}
//#endregion
//#region ui/features/viewer/floatingViewerLoader.ts
var Qr = "imageops-live-preview";
function $r(e) {
	return String(e?._source || "") === Qr;
}
function ei(e, r, { autoMode: i = !1 } = {}) {
	let a = e._mediaA || null, o = $r(r), s = o && $r(a) && String(a?._nodeId || "") === String(r?._nodeId || "");
	if (e._mediaA = r || null, yr(e, [a]), s || e._resetMfvZoom(), i && e._mode !== B.SIMPLE && e._mode !== B.GRAPH && (e._mode = B.SIMPLE, e._updateModeBtnUI()), e._refresh(), e._mediaA && !o && typeof me == "function") {
		let r = ++e._refreshGen;
		(async () => {
			try {
				let i = await me(e._mediaA, {
					getAssetMetadata: t,
					getFileMetadataScoped: n
				});
				if (e._refreshGen !== r) return;
				i && typeof i == "object" && (e._mediaA = i, e._refresh());
			} catch (e) {
				console.debug?.("[MFV] metadata enrich error", e);
			}
		})();
	}
}
function ti(e, r, i) {
	let a = [e._mediaA, e._mediaB];
	e._mediaA = r || null, e._mediaB = i || null, yr(e, a), e._resetMfvZoom(), e._mode === B.SIMPLE && (e._mode = B.AB, e._updateModeBtnUI());
	let o = ++e._refreshGen, s = async (e) => {
		if (!e) return e;
		try {
			return await me(e, {
				getAssetMetadata: t,
				getFileMetadataScoped: n
			}) || e;
		} catch {
			return e;
		}
	};
	(async () => {
		let [t, n] = await Promise.all([s(e._mediaA), s(e._mediaB)]);
		e._refreshGen === o && (e._mediaA = t || null, e._mediaB = n || null, e._refresh());
	})();
}
function ni(e, r, i, a, o) {
	let s = [
		e._mediaA,
		e._mediaB,
		e._mediaC,
		e._mediaD
	];
	e._mediaA = r || null, e._mediaB = i || null, e._mediaC = a || null, e._mediaD = o || null, yr(e, s), e._resetMfvZoom(), e._mode !== B.GRID && (e._mode = B.GRID, e._updateModeBtnUI());
	let c = ++e._refreshGen, l = async (e) => {
		if (!e) return e;
		try {
			return await me(e, {
				getAssetMetadata: t,
				getFileMetadataScoped: n
			}) || e;
		} catch {
			return e;
		}
	};
	(async () => {
		let [t, n, r, i] = await Promise.all([
			l(e._mediaA),
			l(e._mediaB),
			l(e._mediaC),
			l(e._mediaD)
		]);
		e._refreshGen === c && (e._mediaA = t || null, e._mediaB = n || null, e._mediaC = r || null, e._mediaD = i || null, e._refresh());
	})();
}
//#endregion
//#region ui/features/viewer/FloatingViewer.impl.ts
function $(e) {
	try {
		return !!e?.classList?.contains("mjr-mfv-simple-player") || !!e?.classList?.contains("mjr-mfv-player-host") || !!e?.querySelector?.(".mjr-video-controls, .mjr-mfv-simple-player-controls");
	} catch (e) {
		return console.debug?.(e), !1;
	}
}
var ri = 0, ii = class {
	constructor({ controller: e = null } = {}) {
		this._instanceId = ++ri, this._controller = e && typeof e == "object" ? { ...e } : null, this.element = null, this.isVisible = !1, this._contentEl = null, this._genSidebarEl = null, this._closeBtn = null, this._modeBtn = null, this._pinGroup = null, this._pinBtns = null, this._liveBtn = null, this._genBtn = null, this._genDropdown = null, this._genSidebarEnabled = !1, this._captureBtn = null, this._genInfoSelections = /* @__PURE__ */ new Set([
			"prompt",
			"seed",
			"model",
			"lora",
			"sampler",
			"scheduler",
			"cfg",
			"step",
			"genTime"
		]), this._mode = B.SIMPLE, this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this._pinnedSlots = /* @__PURE__ */ new Set(), this._abDividerX = .5, this._mfvMuted = !1, this._mfvPlaybackRate = 1, this._zoom = 1, this._panX = 0, this._panY = 0, this._panzoomAC = null, this._dragging = !1, this._compareSyncAC = null, this._btnAC = null, this._refreshGen = 0, this._popoutWindow = null, this._popoutBtn = null, this._isPopped = !1, this._desktopExpanded = !1, this._desktopExpandRestore = null, this._desktopPopoutUnsupported = !1, this._popoutCloseHandler = null, this._popoutKeydownHandler = null, this._popoutCloseTimer = null, this._popoutRestoreGuard = !1, this._previewBtn = null, this._previewBlobUrl = null, this._previewActive = !1, this._nodeStreamBtn = null, this._nodeStreamActive = !1, this._nodeStreamSelection = null, this._nodeStreamOverlayEl = null, this._docAC = new AbortController(), this._popoutAC = null, this._panelAC = new AbortController(), this._resizeState = null, this._titleId = `mjr-mfv-title-${this._instanceId}`, this._genDropdownId = `mjr-mfv-gen-dropdown-${this._instanceId}`, this._progressEl = null, this._progressNodesEl = null, this._progressStepsEl = null, this._progressTextEl = null, this._mediaProgressEl = null, this._mediaProgressTextEl = null, this._progressUpdateHandler = null, this._progressCurrentNodeId = null, this._docClickHost = null, this._handleDocClick = null, this._mediaControlHandles = [], this._layoutObserver = null, this._channel = "rgb", this._exposureEV = 0, this._gridMode = 0, this._overlayMaskEnabled = !1, this._overlayMaskOpacity = .65, this._overlayFormat = "image", this._graphMapPanel = new gn({ large: !0 });
	}
	_dispatchControllerAction(e, t) {
		try {
			let t = this._controller?.[e];
			if (typeof t == "function") return t();
		} catch (e) {
			console.debug?.(e);
		}
		if (t) try {
			window.dispatchEvent(new Event(t));
		} catch (e) {
			console.debug?.(e);
		}
	}
	_forwardKeydownToController(e) {
		let t = null;
		try {
			let n = typeof window < "u" && window.KeyboardEvent || typeof globalThis < "u" && globalThis.KeyboardEvent;
			if (typeof n != "function") throw Error("KeyboardEvent unavailable");
			t = new n("keydown", {
				key: e?.key,
				code: e?.code,
				keyCode: e?.keyCode,
				ctrlKey: e?.ctrlKey,
				shiftKey: e?.shiftKey,
				altKey: e?.altKey,
				metaKey: e?.metaKey,
				repeat: !!e?.repeat,
				bubbles: !0,
				cancelable: !0
			}), (!window.dispatchEvent(t) || t.defaultPrevented) && (e?.preventDefault?.(), e?.stopPropagation?.(), e?.stopImmediatePropagation?.());
			return;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			let t = this._controller?.handleForwardedKeydown;
			typeof t == "function" && t(e);
		} catch (e) {
			console.debug?.(e);
		}
	}
	render() {
		return Zn(this);
	}
	_buildHeader() {
		return Qn(this);
	}
	_buildToolbar() {
		return $n(this);
	}
	_rebindControlHandlers() {
		return er(this);
	}
	_updateSettingsBtnState(e) {
		return tr(this, e);
	}
	_applySidebarPosition() {
		return nr(this);
	}
	refreshSidebar() {
		this._sidebar?.refresh();
	}
	_resetGenDropdownForCurrentDocument() {}
	_bindDocumentUiHandlers() {
		return rr(this);
	}
	_unbindDocumentUiHandlers() {
		return ir(this);
	}
	_isGenDropdownOpen() {
		return !1;
	}
	_openGenDropdown() {}
	_closeGenDropdown() {}
	_updateGenBtnUI() {
		return ar(this);
	}
	_buildGenDropdown() {
		return null;
	}
	_getGenFields(e) {
		return cr(this, e);
	}
	_buildGenInfoDOM(e) {
		return lr(this, e);
	}
	_notifyModeChanged() {
		return ur(this);
	}
	_cycleMode() {
		return dr(this);
	}
	setMode(e) {
		return fr(this, e);
	}
	getPinnedSlots() {
		return pr(this);
	}
	_updatePinUI() {
		return mr(this);
	}
	_updateModeBtnUI() {
		return hr(this);
	}
	setLiveActive(e) {
		return gr(this, e);
	}
	setPreviewActive(e) {
		return _r(this, e);
	}
	loadPreviewBlob(e, t = {}) {
		return br(this, e, t);
	}
	_revokePreviewBlob() {
		return xr(this);
	}
	setNodeStreamActive(e) {
		return Sr(this, e);
	}
	setNodeStreamSelection(e) {
		this._nodeStreamSelection = e && (e.nodeId != null || e.classType) ? {
			nodeId: String(e.nodeId ?? ""),
			classType: String(e.classType || ""),
			title: e.title ? String(e.title) : ""
		} : null, this._updateNodeStreamOverlay();
	}
	_updateNodeStreamOverlay() {
		let e = this._contentEl;
		if (!e) return;
		let t = this._nodeStreamSelection;
		if (!t) {
			this._nodeStreamOverlayEl &&= (this._nodeStreamOverlayEl.remove(), null);
			return;
		}
		if (!this._nodeStreamOverlayEl || !this._nodeStreamOverlayEl.isConnected) {
			let e = document.createElement("div");
			e.className = "mjr-mfv-node-overlay", e.setAttribute("aria-live", "polite"), this._nodeStreamOverlayEl = e;
		}
		this._nodeStreamOverlayEl.parentNode !== e && e.appendChild(this._nodeStreamOverlayEl);
		let n = t.nodeId ? `#${t.nodeId}` : "", r = t.classType || "Node", i = t.title && t.title !== t.classType ? ` - ${t.title}` : "";
		this._nodeStreamOverlayEl.textContent = `${n}  -  ${r}${i}`.trim();
	}
	loadMediaA(e, { autoMode: t = !1 } = {}) {
		return ei(this, e, { autoMode: t });
	}
	loadMediaPair(e, t) {
		return ti(this, e, t);
	}
	loadMediaQuad(e, t, n, r) {
		return ni(this, e, t, n, r);
	}
	_applyTransform() {
		if (!this._contentEl) return;
		let e = Math.max(he, Math.min(8, this._zoom)), t = this._contentEl.clientWidth || 0, n = this._contentEl.clientHeight || 0, r = Math.max(0, (e - 1) * t / 2), i = Math.max(0, (e - 1) * n / 2);
		this._panX = Math.max(-r, Math.min(r, this._panX)), this._panY = Math.max(-i, Math.min(i, this._panY));
		let a = `translate(${this._panX}px,${this._panY}px) scale(${e})`;
		for (let e of this._contentEl.querySelectorAll(".mjr-mfv-media")) e?._mjrDisableViewerTransform || (e.style.transform = a, e.style.transformOrigin = "center");
		this._contentEl.classList.remove("mjr-mfv-content--grab", "mjr-mfv-content--grabbing"), e > 1.01 && this._contentEl.classList.add(this._dragging ? "mjr-mfv-content--grabbing" : "mjr-mfv-content--grab"), this._applyMediaToneControls(), this._redrawOverlayGuides();
	}
	_ensureToneFilterDefs() {
		if (this._toneFilterDefsEl?.isConnected) return this._toneFilterDefsEl;
		let e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
		t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none";
		let n = document.createElementNS(e, "defs");
		for (let [t, r] of [
			["mjr-mfv-ch-r", "1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0"],
			["mjr-mfv-ch-g", "0 1 0 0 0  0 1 0 0 0  0 1 0 0 0  0 0 0 1 0"],
			["mjr-mfv-ch-b", "0 0 1 0 0  0 0 1 0 0  0 0 1 0 0  0 0 0 1 0"],
			["mjr-mfv-ch-a", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 0"],
			["mjr-mfv-ch-l", "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"]
		]) {
			let i = document.createElementNS(e, "filter");
			i.setAttribute("id", t);
			let a = document.createElementNS(e, "feColorMatrix");
			a.setAttribute("type", "matrix"), a.setAttribute("values", r), i.appendChild(a), n.appendChild(i);
		}
		return t.appendChild(n), this.element?.appendChild(t), this._toneFilterDefsEl = t, t;
	}
	_applyMediaToneControls() {
		if (this._ensureToneFilterDefs(), !this._contentEl) return;
		let e = String(this._channel || "rgb"), t = 2 ** (Number(this._exposureEV) || 0), n = [e === "rgb" ? "" : `url(#mjr-mfv-ch-${e})`, Math.abs(t - 1) < 1e-4 ? "" : `brightness(${t})`].filter(Boolean).join(" ").trim(), r = this._contentEl.querySelectorAll?.(".mjr-mfv-media") || [];
		for (let e of r) try {
			e.style.filter = n || "";
		} catch (e) {
			console.debug?.(e);
		}
	}
	_getOverlayAspect(e, t, n) {
		try {
			let r = String(e || "image");
			if (r === "image") {
				let e = (Number(t?.videoWidth) || Number(t?.naturalWidth) || Number(n?.width) || 1) / (Number(t?.videoHeight) || Number(t?.naturalHeight) || Number(n?.height) || 1);
				return Number.isFinite(e) && e > 0 ? e : 1;
			}
			if (r === "16:9") return 16 / 9;
			if (r === "9:16") return 9 / 16;
			if (r === "1:1") return 1;
			if (r === "4:3") return 4 / 3;
			if (r === "2.39") return 2.39;
		} catch (e) {
			console.debug?.(e);
		}
		return 1;
	}
	_fitAspectInBox(e, t, n) {
		try {
			let r = Number(e) || 0, i = Number(t) || 0, a = Number(n) || 1;
			if (!(r > 0 && i > 0 && a > 0)) return {
				x: 0,
				y: 0,
				w: r,
				h: i
			};
			let o = r / i, s = r, c = i;
			return a >= o ? c = r / a : s = i * a, {
				x: (r - s) / 2,
				y: (i - c) / 2,
				w: s,
				h: c
			};
		} catch (n) {
			return console.debug?.(n), {
				x: 0,
				y: 0,
				w: Number(e) || 0,
				h: Number(t) || 0
			};
		}
	}
	_drawMaskOutside(e, t, n, r) {
		try {
			let i = Math.max(0, Math.min(.92, Number(r) || 0));
			if (!(i > 0)) return;
			e.save(), e.fillStyle = `rgba(0,0,0,${i})`, e.fillRect(0, 0, t.width, t.height), e.globalCompositeOperation = "destination-out";
			for (let t of n) t && t.w > 1 && t.h > 1 && e.fillRect(t.x, t.y, t.w, t.h);
			e.restore();
		} catch (e) {
			console.debug?.(e);
		}
	}
	_redrawOverlayGuides() {
		let e = this._overlayCanvas, t = this._contentEl;
		if (!e || !t) return;
		let n = e.getContext?.("2d");
		if (!n) return;
		let r = Math.max(1, Math.min(3, Number(window.devicePixelRatio) || 1)), i = t.clientWidth || 0, a = t.clientHeight || 0;
		if (e.width = Math.max(1, Math.floor(i * r)), e.height = Math.max(1, Math.floor(a * r)), e.style.width = `${i}px`, e.style.height = `${a}px`, n.clearRect(0, 0, e.width, e.height), !(this._gridMode || this._overlayMaskEnabled)) return;
		let o = t.getBoundingClientRect?.();
		if (!o) return;
		let s = Array.from(t.querySelectorAll?.(".mjr-mfv-simple-container, .mjr-mfv-side-panel, .mjr-mfv-grid-cell, .mjr-mfv-ab-layer") || []), c = s.length ? s : [t], l = [];
		for (let e of c) {
			let t = e.querySelector?.(".mjr-mfv-media");
			if (!t) continue;
			let n = e.getBoundingClientRect?.();
			if (!n?.width || !n?.height) continue;
			let i = Number(n.width) || 0, a = Number(n.height) || 0, s = this._getOverlayAspect(this._overlayFormat, t, n), c = this._fitAspectInBox(i, a, s), u = n.left - o.left + i / 2, d = n.top - o.top + a / 2, f = Math.max(.1, Math.min(16, Number(this._zoom) || 1)), p = {
				x: u + c.x * f - i * f / 2 + (Number(this._panX) || 0),
				y: d + c.y * f - a * f / 2 + (Number(this._panY) || 0),
				w: c.w * f,
				h: c.h * f
			};
			l.push({
				x: p.x * r,
				y: p.y * r,
				w: p.w * r,
				h: p.h * r
			});
		}
		if (!l.length) return;
		if (this._overlayMaskEnabled) {
			this._drawMaskOutside(n, e, l, this._overlayMaskOpacity), n.save(), n.setLineDash?.([Math.max(2, 4 * r), Math.max(2, 3 * r)]), n.strokeStyle = "rgba(255,255,255,0.22)", n.lineWidth = Math.max(1, Math.floor(r));
			for (let e of l) n.strokeRect(e.x + .5, e.y + .5, e.w - 1, e.h - 1);
			n.restore();
		}
		if (this._mode !== B.SIMPLE || !this._gridMode) return;
		let u = l[0];
		if (!u) return;
		n.save(), n.translate(u.x, u.y), n.strokeStyle = "rgba(255,255,255,0.22)", n.lineWidth = Math.max(2, Math.round(1.25 * r));
		let d = (e, t, r, i) => {
			n.beginPath(), n.moveTo(Math.round(e) + .5, Math.round(t) + .5), n.lineTo(Math.round(r) + .5, Math.round(i) + .5), n.stroke();
		};
		this._gridMode === 1 ? (d(u.w / 3, 0, u.w / 3, u.h), d(2 * u.w / 3, 0, 2 * u.w / 3, u.h), d(0, u.h / 3, u.w, u.h / 3), d(0, 2 * u.h / 3, u.w, 2 * u.h / 3)) : this._gridMode === 2 ? (d(u.w / 2, 0, u.w / 2, u.h), d(0, u.h / 2, u.w, u.h / 2)) : this._gridMode === 3 && (n.strokeRect(u.w * .1 + .5, u.h * .1 + .5, u.w * .8 - 1, u.h * .8 - 1), n.strokeRect(u.w * .05 + .5, u.h * .05 + .5, u.w * .9 - 1, u.h * .9 - 1)), n.restore();
	}
	_setMfvZoom(e, t, n) {
		let r = Math.max(he, Math.min(8, this._zoom)), i = Math.max(he, Math.min(8, Number(e) || 1));
		if (t != null && n != null && this._contentEl) {
			let e = i / r, a = this._contentEl.getBoundingClientRect(), o = t - (a.left + a.width / 2), s = n - (a.top + a.height / 2);
			this._panX = this._panX * e + (1 - e) * o, this._panY = this._panY * e + (1 - e) * s;
		}
		this._zoom = i, Math.abs(i - 1) < .001 && (this._zoom = 1, this._panX = 0, this._panY = 0), this._applyTransform();
	}
	_resetMfvZoom() {
		this._zoom = 1, this._panX = 0, this._panY = 0, this._applyTransform();
	}
	_bindLayoutObserver() {
		this._unbindLayoutObserver();
		let e = this._contentEl;
		if (e && typeof ResizeObserver < "u") try {
			this._layoutObserver = new ResizeObserver(() => {
				this._applyTransform();
			}), this._layoutObserver.observe(e);
		} catch (e) {
			console.debug?.(e), this._layoutObserver = null;
		}
	}
	_unbindLayoutObserver() {
		try {
			this._layoutObserver?.disconnect?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._layoutObserver = null;
	}
	_initPanZoom(e) {
		if (this._destroyPanZoom(), !e) return;
		this._panzoomAC = new AbortController();
		let t = { signal: this._panzoomAC.signal };
		e.addEventListener("wheel", (t) => {
			if (t.target?.closest?.("audio") || t.target?.closest?.(".mjr-video-controls, .mjr-mfv-simple-player-controls") || se(t.target)) return;
			let n = Ie(t.target, e);
			if (n && Le(n, Number(t.deltaX || 0), Number(t.deltaY || 0))) return;
			t.preventDefault();
			let r = 1 - (t.deltaY || t.deltaX || 0) * ge;
			this._setMfvZoom(this._zoom * r, t.clientX, t.clientY);
		}, {
			...t,
			passive: !1
		});
		let n = !1, r = 0, i = 0, a = 0, o = 0;
		e.addEventListener("pointerdown", (t) => {
			if ((t.button === 0 || t.button === 1) && !(this._zoom <= 1.01) && !t.target?.closest?.("video") && !t.target?.closest?.("audio") && !t.target?.closest?.(".mjr-video-controls, .mjr-mfv-simple-player-controls") && !t.target?.closest?.(".mjr-mfv-ab-divider") && !se(t.target)) {
				t.preventDefault(), n = !0, this._dragging = !0, r = t.clientX, i = t.clientY, a = this._panX, o = this._panY;
				try {
					e.setPointerCapture(t.pointerId);
				} catch (e) {
					console.debug?.(e);
				}
				this._applyTransform();
			}
		}, t), e.addEventListener("pointermove", (e) => {
			n && (this._panX = a + (e.clientX - r), this._panY = o + (e.clientY - i), this._applyTransform());
		}, t);
		let s = (t) => {
			if (n) {
				n = !1, this._dragging = !1;
				try {
					e.releasePointerCapture(t.pointerId);
				} catch (e) {
					console.debug?.(e);
				}
				this._applyTransform();
			}
		};
		e.addEventListener("pointerup", s, t), e.addEventListener("pointercancel", s, t), e.addEventListener("dblclick", (e) => {
			if (e.target?.closest?.("video") || e.target?.closest?.("audio") || e.target?.closest?.(".mjr-video-controls, .mjr-mfv-simple-player-controls") || se(e.target)) return;
			let t = Math.abs(this._zoom - 1) < .05;
			this._setMfvZoom(t ? Math.min(4, this._zoom * 4) : 1, e.clientX, e.clientY);
		}, t);
	}
	_destroyPanZoom() {
		try {
			this._panzoomAC?.abort();
		} catch (e) {
			console.debug?.(e);
		}
		this._panzoomAC = null, this._dragging = !1;
	}
	_destroyCompareSync() {
		try {
			this._compareSyncAC?.abort?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._compareSyncAC = null;
	}
	_destroyMediaControls() {
		let e = Array.isArray(this._mediaControlHandles) ? this._mediaControlHandles : [];
		for (let t of e) try {
			t?.destroy?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._mediaControlHandles = [];
	}
	_trackMediaControls(e) {
		try {
			let t = e?._mjrMediaControlsHandle || null;
			t?.destroy && this._mediaControlHandles.push(t);
		} catch (e) {
			console.debug?.(e);
		}
		return e;
	}
	_bindMfvPersistence(e) {
		try {
			let t = e?.matches?.("video, audio") ? e : e?.querySelector?.("video, audio");
			if (!t) return e;
			t.addEventListener("volumechange", () => {
				try {
					this._mfvMuted = !!t.muted;
				} catch (e) {
					console.debug?.(e);
				}
			}), t.addEventListener("ratechange", () => {
				try {
					let e = Number(t.playbackRate);
					Number.isFinite(e) && e > 0 && (this._mfvPlaybackRate = e);
				} catch (e) {
					console.debug?.(e);
				}
			});
		} catch (e) {
			console.debug?.(e);
		}
		return e;
	}
	_initCompareSync() {
		if (this._destroyCompareSync(), this._contentEl && this._mode !== B.SIMPLE) try {
			let e = Array.from(this._contentEl.querySelectorAll("video, audio"));
			if (e.length < 2) return;
			let t = e[0] || null, n = e.slice(1);
			if (!t || !n.length) return;
			this._compareSyncAC = ee(t, n, { threshold: .08 });
		} catch (e) {
			console.debug?.(e);
		}
	}
	_refresh() {
		if (!this._contentEl) return;
		this._sidebar?.setAsset?.(this._mediaA || null), this._destroyPanZoom(), this._destroyCompareSync(), this._destroyMediaControls(), Re(this._contentEl);
		let e = this._overlayCanvas || null;
		switch (this._contentEl.replaceChildren(), this._contentEl.style.overflow = "hidden", this._mode) {
			case B.SIMPLE:
				this._renderSimple();
				break;
			case B.AB:
				this._renderAB();
				break;
			case B.SIDE:
				this._renderSide();
				break;
			case B.GRID:
				this._renderGrid();
				break;
			case B.GRAPH: this._renderGraphMap();
		}
		e && this._contentEl.appendChild(e), this._nodeStreamSelection && this._updateNodeStreamOverlay(), this._mediaProgressEl && this._contentEl.appendChild(this._mediaProgressEl), this._applyMediaToneControls(), this._applyTransform(), this._mode !== B.GRAPH && this._initPanZoom(this._contentEl), this._initCompareSync(), this._renderGenInfoSidebar();
	}
	_renderGenInfoSidebar() {
		let e = this._genSidebarEl;
		if (!e) return;
		e.replaceChildren();
		let t = this._getGenInfoSidebarSlots();
		if (this._mode === B.GRAPH || !this._genSidebarEnabled || t.length === 0) {
			e.classList.remove("open"), e.setAttribute("hidden", ""), this._updateGenBtnUI?.();
			return;
		}
		let n = document.createElement("div");
		n.className = "mjr-mfv-gen-sidebar-title", n.textContent = "Gen Info", e.appendChild(n);
		let r = 0;
		for (let n of t) {
			if (V(n.media) === "audio") continue;
			let i = this._buildGenInfoSidebarContent(n.media);
			if (!i) continue;
			let a = document.createElement("section");
			a.className = "mjr-mfv-gen-sidebar-section";
			let o = document.createElement("div");
			o.className = "mjr-mfv-gen-sidebar-heading", o.textContent = t.length > 1 ? `Asset ${n.label}` : "Current Asset";
			let s = document.createElement("div");
			s.className = "mjr-mfv-gen-sidebar-body", s.appendChild(i), a.appendChild(o), a.appendChild(s), e.appendChild(a), r += 1;
		}
		if (!r) {
			e.classList.remove("open"), e.setAttribute("hidden", "");
			return;
		}
		e.removeAttribute("hidden"), e.classList.add("open"), this._updateGenBtnUI?.();
	}
	_getGenInfoSidebarSlots() {
		let e = {
			media: this._mediaA,
			label: "A"
		}, t = {
			media: this._mediaB,
			label: "B"
		}, n = {
			media: this._mediaC,
			label: "C"
		}, r = {
			media: this._mediaD,
			label: "D"
		};
		return (this._mode === B.GRID ? [
			e,
			t,
			n,
			r
		] : this._mode === B.AB || this._mode === B.SIDE ? [e, t] : [e]).filter((e) => e.media);
	}
	_buildGenInfoSidebarContent(e) {
		let t = this._getGenFields(e)?.genTime || "", n = null;
		try {
			n = M(e);
		} catch (e) {
			console.debug?.(e);
		}
		if (n && n.kind !== "empty") {
			let e = document.createDocumentFragment();
			t && e.appendChild(this._buildGenTimeBadge(t)), n.workflowType && e.appendChild(this._buildGenInfoCard({
				title: "Workflow",
				accent: "#2196F3",
				value: [n.workflowLabel || n.workflowType, n.workflowBadge].filter(Boolean).join("  |  "),
				compact: !0
			})), n.positivePrompt && e.appendChild(this._buildGenInfoCard({
				title: "Positive Prompt",
				accent: "#4CAF50",
				value: n.positivePrompt,
				multiline: !0
			})), n.negativePrompt && e.appendChild(this._buildGenInfoCard({
				title: "Negative Prompt",
				accent: "#F44336",
				value: n.negativePrompt,
				multiline: !0
			}));
			for (let t of n.promptTabs || []) {
				let n = [t.positive, t.negative ? `Negative:\n${t.negative}` : ""].filter(Boolean).join("\n\n");
				e.appendChild(this._buildGenInfoCard({
					title: t.label || "Prompt",
					accent: "#4CAF50",
					value: n,
					multiline: !0
				}));
			}
			n.ideogram && this._appendIdeogramGenInfoCards(e, n.ideogram);
			let r = (n.branchCards || []).filter((e) => e?.modelFields?.length || e?.loras?.length), i = (n.branchCards || []).filter((e) => e?.samplingFields?.length);
			if (r.length) {
				let t = this._buildGenInfoBranchGroupsCard("Models", "#9C27B0", r, "model");
				t && e.appendChild(t);
			} else if (n.modelFields?.length) {
				let t = this._buildGenInfoFieldsCard("Model & LoRA", "#9C27B0", n.modelFields);
				t && e.appendChild(t);
			}
			if (!r.length) for (let t of n.modelGroups || []) {
				let n = [{
					label: "UNet",
					value: t.model || "-"
				}, ...(t.loras || []).map((e, t) => ({
					label: t === 0 ? "LoRA" : `LoRA ${t + 1}`,
					value: e
				}))], r = this._buildGenInfoFieldsCard(t.label || "Model Branch", "#AB47BC", n);
				r && e.appendChild(r);
			}
			if (i.length) {
				let t = this._buildGenInfoBranchGroupsCard("Sampling", "#FF9800", i, "sampling");
				t && e.appendChild(t);
			} else if (n.pipelineTabs?.length) for (let t of n.pipelineTabs) {
				let n = this._buildGenInfoFieldsCard(t.label || "Generation Pipeline", "#FF9800", t.fields || []);
				n && e.appendChild(n);
			}
			else if (n.samplingFields?.length) {
				let t = this._buildGenInfoFieldsCard("Sampling", "#FF9800", n.samplingFields);
				t && e.appendChild(t);
			}
			for (let t of n.moduleBlocks || []) {
				if (String(t?.key || "").toLowerCase() === "workflow_engine") continue;
				let n = this._buildGenInfoFieldsCard(t.title || "Generation Module", t.accent || "#2196F3", t.fields || []);
				n && e.appendChild(n);
			}
			if (n.seed !== null && n.seed !== void 0 && n.seed !== "" && e.appendChild(this._buildGenInfoCard({
				title: "Seed",
				accent: "#E91E63",
				value: String(n.seed),
				seed: !0
			})), n.mediaOnlyMessage && e.appendChild(this._buildGenInfoCard({
				title: "Generation Data",
				accent: "#9E9E9E",
				value: n.mediaOnlyMessage,
				multiline: !0
			})), e.childNodes.length) return e;
		}
		let r = this._buildGenInfoDOM(e);
		if (!t) return r;
		let i = document.createDocumentFragment();
		return i.appendChild(this._buildGenTimeBadge(t)), r && i.appendChild(r), i;
	}
	_buildGenTimeBadge(e) {
		let t = document.createElement("div");
		t.className = "mjr-mfv-gen-time-badge", this._bindGenInfoCopy(t, () => String(e || ""));
		let n = document.createElement("span");
		n.className = "mjr-mfv-gen-time-label", n.textContent = "Generation Time";
		let r = document.createElement("span");
		return r.className = "mjr-mfv-gen-time-value", r.textContent = String(e || ""), t.appendChild(n), t.appendChild(r), t;
	}
	_buildGenInfoCard({ title: e, accent: t, value: n, multiline: r = !1, compact: i = !1, seed: a = !1 }) {
		let o = document.createElement("div");
		o.className = `mjr-mfv-gen-card${a ? " mjr-mfv-gen-card--seed" : ""}${i ? " mjr-mfv-gen-card--compact" : ""}`;
		let s = String(e || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
		s && o.classList.add(`mjr-mfv-gen-card--${s}`), o.style.setProperty("--mjr-mfv-gen-accent", t || "#2196F3"), this._bindGenInfoCopy(o, () => String(n ?? ""));
		let c = document.createElement("div");
		c.className = "mjr-mfv-gen-card-title", c.textContent = e || "";
		let l = document.createElement("div");
		return l.className = `mjr-mfv-gen-card-value${r ? " is-multiline" : ""}${i ? " is-compact" : ""}`, l.textContent = String(n ?? ""), o.appendChild(c), o.appendChild(l), o;
	}
	_buildGenInfoFieldsCard(e, t, n) {
		let r = this._buildGenInfoCard({
			title: e,
			accent: t,
			value: ""
		});
		this._bindGenInfoCopy(r, () => (n || []).map((e) => {
			let t = String(e?.label || "").trim(), n = String(e?.value ?? "").trim();
			return t && n && n !== "-" ? `${t}: ${n}` : "";
		}).filter(Boolean).join("\n"));
		let i = r.querySelector(".mjr-mfv-gen-card-value");
		if (!i) return null;
		i.replaceChildren(), i.classList.add("is-fields");
		for (let e of n || []) {
			let t = String(e?.label || "").trim(), n = String(e?.value ?? "").trim();
			if (!t || !n || n === "-") continue;
			let r = document.createElement("div");
			r.className = "mjr-mfv-gen-field";
			let a = document.createElement("span");
			a.className = "mjr-mfv-gen-field-label", a.textContent = t;
			let o = document.createElement("span");
			o.className = "mjr-mfv-gen-field-value", o.textContent = n, r.appendChild(a), r.appendChild(o), i.appendChild(r);
		}
		return i.childNodes.length ? r : null;
	}
	_appendIdeogramGenInfoCards(e, t) {
		if (e && t) {
			t.highLevelDescription && e.appendChild(this._buildGenInfoCard({
				title: "High Level Description",
				accent: "#4CAF50",
				value: t.highLevelDescription,
				multiline: !0
			})), t.background && e.appendChild(this._buildGenInfoCard({
				title: "Background",
				accent: "#2196F3",
				value: t.background,
				multiline: !0
			}));
			for (let n of t.elements || []) {
				let t = [
					n?.description,
					n?.text ? `Text: ${n.text}` : "",
					n?.bbox ? `bbox ${n.bbox}` : ""
				].filter(Boolean).join("\n");
				t && e.appendChild(this._buildGenInfoCard({
					title: n.label || "Element",
					accent: "#FFB300",
					value: t,
					multiline: !0
				}));
			}
			t.json && e.appendChild(this._buildGenInfoCard({
				title: "JSON sent to text encoder",
				accent: "#FFB300",
				value: t.json,
				multiline: !0
			}));
		}
	}
	_buildGenInfoBranchGroupsCard(e, t, n, r) {
		let i = this._buildGenInfoCard({
			title: e,
			accent: t,
			value: ""
		});
		this._bindGenInfoCopy(i, () => (n || []).map((e) => {
			let t = [String(e?.label || "").trim()], n = r === "sampling" ? e?.samplingFields || [] : e?.modelFields || [];
			for (let e of n) {
				let n = String(e?.label || "").trim(), r = String(e?.value ?? "").trim();
				n && r && r !== "-" && t.push(`${n}: ${r}`);
			}
			if (r !== "sampling") for (let n of e?.loras || []) {
				let e = String(n ?? "").trim();
				e && t.push(`LoRA: ${e}`);
			}
			return t.filter(Boolean).join("\n");
		}).filter(Boolean).join("\n\n"));
		let a = i.querySelector(".mjr-mfv-gen-card-value");
		if (!a) return null;
		a.replaceChildren(), a.classList.add("is-fields", "is-branch-groups");
		for (let t of n || []) {
			let n = document.createElement("div");
			n.className = "mjr-mfv-gen-branch-group";
			let i = document.createElement("div");
			i.className = "mjr-mfv-gen-branch-title", i.textContent = String(t?.label || "").trim() || e || "", n.appendChild(i);
			let o = r === "sampling" ? t?.samplingFields || [] : t?.modelFields || [];
			for (let e of o) {
				let t = this._buildGenInfoFieldRow(e);
				t && n.appendChild(t);
			}
			if (r !== "sampling") for (let e of t?.loras || []) {
				let t = this._buildGenInfoFieldRow({
					label: "LoRA",
					value: e
				});
				t && n.appendChild(t);
			}
			n.childNodes.length > 1 && a.appendChild(n);
		}
		return a.childNodes.length ? i : null;
	}
	_buildGenInfoFieldRow(e) {
		let t = String(e?.label || "").trim(), n = String(e?.value ?? "").trim();
		if (!t || !n || n === "-") return null;
		let r = document.createElement("div");
		r.className = "mjr-mfv-gen-field";
		let i = document.createElement("span");
		i.className = "mjr-mfv-gen-field-label", i.textContent = t;
		let a = document.createElement("span");
		return a.className = "mjr-mfv-gen-field-value", a.textContent = n, r.appendChild(i), r.appendChild(a), r;
	}
	_bindGenInfoCopy(e, t) {
		e && typeof t == "function" && (e.title = "Click to copy", e.addEventListener("click", async (n) => {
			n.stopPropagation();
			let r = String(t() || "").trim();
			if (r) try {
				await navigator.clipboard?.writeText?.(r), e.classList.add("mjr-mfv-gen-copy-flash"), setTimeout(() => e.classList.remove("mjr-mfv-gen-copy-flash"), 450);
			} catch (e) {
				console.debug?.(e);
			}
		}));
	}
	_renderGraphMap() {
		this._contentEl.style.overflow = "hidden", this._graphMapPanel.setAsset(this._mediaA || null), this._contentEl.appendChild(this._graphMapPanel.el), this._graphMapPanel.refresh();
	}
	_renderSimple() {
		if (!this._mediaA) {
			this._contentEl.appendChild(H());
			return;
		}
		let e = W(this._mediaA, {
			initialMuted: this._mfvMuted,
			initialPlaybackRate: this._mfvPlaybackRate
		}), t = this._trackMediaControls?.(e) || e;
		if (this._bindMfvPersistence?.(t), !t) {
			this._contentEl.appendChild(H("Could not load media"));
			return;
		}
		let n = document.createElement("div");
		n.className = "mjr-mfv-simple-container", n.appendChild(t), this._contentEl.appendChild(n);
	}
	_renderAB() {
		let e = this._mediaA ? W(this._mediaA, {
			fill: !0,
			initialMuted: this._mfvMuted,
			initialPlaybackRate: this._mfvPlaybackRate
		}) : null, t = this._mediaB ? W(this._mediaB, {
			fill: !0,
			controls: !1,
			initialMuted: !0
		}) : null, n = this._trackMediaControls?.(e) || e, r = this._trackMediaControls?.(t) || t;
		this._bindMfvPersistence?.(n);
		let i = this._mediaA ? V(this._mediaA) : "", a = this._mediaB ? V(this._mediaB) : "";
		if (!n && !r) {
			this._contentEl.appendChild(H("Select 2 assets for A/B compare"));
			return;
		}
		if (!r) {
			this._renderSimple();
			return;
		}
		if (i === "audio" || a === "audio" || i === "model3d" || a === "model3d") {
			this._renderSide();
			return;
		}
		let o = document.createElement("div");
		o.className = "mjr-mfv-ab-container";
		let s = document.createElement("div");
		s.className = "mjr-mfv-ab-layer", n && s.appendChild(n);
		let c = document.createElement("div");
		c.className = "mjr-mfv-ab-layer mjr-mfv-ab-layer--b";
		let l = Math.round(this._abDividerX * 100);
		c.style.clipPath = `inset(0 0 0 ${l}%)`, c.appendChild(r);
		let u = document.createElement("div");
		u.className = "mjr-mfv-ab-divider", u.style.left = `${l}%`;
		let d = this._buildGenInfoDOM(this._mediaA), f = null;
		d && (f = document.createElement("div"), f.className = "mjr-mfv-geninfo-a", $(n) && f.classList.add("mjr-mfv-geninfo--above-player"), f.appendChild(d), f.style.right = `calc(${100 - l}% + 8px)`);
		let p = this._buildGenInfoDOM(this._mediaB), m = null;
		p && (m = document.createElement("div"), m.className = "mjr-mfv-geninfo-b", $(r) && m.classList.add("mjr-mfv-geninfo--above-player"), m.appendChild(p), m.style.left = `calc(${l}% + 8px)`);
		let h = null;
		u.addEventListener("pointerdown", (e) => {
			e.preventDefault(), u.setPointerCapture(e.pointerId);
			try {
				h?.abort();
			} catch {}
			h = new AbortController();
			let t = h.signal, n = o.getBoundingClientRect();
			u.addEventListener("pointermove", (e) => {
				let t = Math.max(.02, Math.min(.98, (e.clientX - n.left) / n.width));
				this._abDividerX = t;
				let r = Math.round(t * 100);
				c.style.clipPath = `inset(0 0 0 ${r}%)`, u.style.left = `${r}%`, f && (f.style.right = `calc(${100 - r}% + 8px)`), m && (m.style.left = `calc(${r}% + 8px)`);
			}, { signal: t }), u.addEventListener("pointerup", () => {
				try {
					h?.abort();
				} catch {}
			}, { signal: t });
		}, this._panelAC?.signal ? { signal: this._panelAC.signal } : void 0), o.appendChild(s), o.appendChild(c), o.appendChild(u), f && o.appendChild(f), m && o.appendChild(m), o.appendChild(U("A", "left")), o.appendChild(U("B", "right")), this._contentEl.appendChild(o);
	}
	_renderSide() {
		let e = this._mediaA ? W(this._mediaA, {
			initialMuted: this._mfvMuted,
			initialPlaybackRate: this._mfvPlaybackRate
		}) : null, t = this._mediaB ? W(this._mediaB, {
			controls: !1,
			initialMuted: !0
		}) : null, n = this._trackMediaControls?.(e) || e, r = this._trackMediaControls?.(t) || t;
		this._bindMfvPersistence?.(n);
		let i = this._mediaA ? V(this._mediaA) : "", a = this._mediaB ? V(this._mediaB) : "";
		if (!n && !r) {
			this._contentEl.appendChild(H("Select 2 assets for Side-by-Side"));
			return;
		}
		let o = document.createElement("div");
		o.className = "mjr-mfv-side-container";
		let s = document.createElement("div");
		s.className = "mjr-mfv-side-panel", n ? s.appendChild(n) : s.appendChild(H(" - ")), s.appendChild(U("A", "left"));
		let c = i === "audio" ? null : this._buildGenInfoDOM(this._mediaA);
		if (c) {
			let e = document.createElement("div");
			e.className = "mjr-mfv-geninfo-a", $(n) && e.classList.add("mjr-mfv-geninfo--above-player"), e.appendChild(c), s.appendChild(e);
		}
		let l = document.createElement("div");
		l.className = "mjr-mfv-side-panel", r ? l.appendChild(r) : l.appendChild(H(" - ")), l.appendChild(U("B", "right"));
		let u = a === "audio" ? null : this._buildGenInfoDOM(this._mediaB);
		if (u) {
			let e = document.createElement("div");
			e.className = "mjr-mfv-geninfo-b", $(r) && e.classList.add("mjr-mfv-geninfo--above-player"), e.appendChild(u), l.appendChild(e);
		}
		o.appendChild(s), o.appendChild(l), this._contentEl.appendChild(o);
	}
	_renderGrid() {
		let e = [
			{
				media: this._mediaA,
				label: "A"
			},
			{
				media: this._mediaB,
				label: "B"
			},
			{
				media: this._mediaC,
				label: "C"
			},
			{
				media: this._mediaD,
				label: "D"
			}
		];
		if (!e.filter((e) => e.media).length) {
			this._contentEl.appendChild(H("Select up to 4 assets for Grid Compare"));
			return;
		}
		let t = document.createElement("div");
		t.className = "mjr-mfv-grid-container";
		for (let { media: n, label: r } of e) {
			let e = document.createElement("div");
			if (e.className = "mjr-mfv-grid-cell", n) {
				let t = V(n), i = r === "A", a = W(n, {
					controls: i,
					initialMuted: !i || this._mfvMuted,
					initialPlaybackRate: i ? this._mfvPlaybackRate : 1
				}), o = this._trackMediaControls?.(a) || a;
				if (i && this._bindMfvPersistence?.(o), o ? e.appendChild(o) : e.appendChild(H(" - ")), e.appendChild(U(r, r === "A" || r === "C" ? "left" : "right")), t !== "audio") {
					let t = this._buildGenInfoDOM(n);
					if (t) {
						let n = document.createElement("div");
						n.className = `mjr-mfv-geninfo-${r.toLowerCase()}`, $(o) && n.classList.add("mjr-mfv-geninfo--above-player"), n.appendChild(t), e.appendChild(n);
					}
				}
			} else e.appendChild(H(" - ")), e.appendChild(U(r, r === "A" || r === "C" ? "left" : "right"));
			t.appendChild(e);
		}
		this._contentEl.appendChild(t);
	}
	show() {
		this.element && (this._bindDocumentUiHandlers(), this.element.classList.add("is-visible"), this.element.setAttribute("aria-hidden", "false"), this.isVisible = !0);
	}
	hide() {
		this.element && (this._destroyPanZoom(), this._destroyCompareSync(), this._stopEdgeResize(), this._closeGenDropdown(), Re(this.element), this.element.classList.remove("is-visible"), this.element.setAttribute("aria-hidden", "true"), this.isVisible = !1);
	}
	_setDesktopExpanded(e) {
		return jr(this, e);
	}
	_activateDesktopExpandedFallback(e) {
		return Mr(this, e);
	}
	_tryElectronPopupFallback(e, t, n, r) {
		return Nr(this, e, t, n, r);
	}
	popOut() {
		return Pr(this);
	}
	_fallbackPopout(e, t, n) {
		return Fr(this, e, t, n);
	}
	_clearPopoutCloseWatch() {
		return Ir(this);
	}
	_startPopoutCloseWatch() {
		return Lr(this);
	}
	_schedulePopInFromPopupClose() {
		return Rr(this);
	}
	_installPopoutStyles(e) {
		return zr(this, e);
	}
	popIn(e) {
		return Br(this, e);
	}
	_updatePopoutBtnUI() {
		return Vr(this);
	}
	get isPopped() {
		return this._isPopped || this._desktopExpanded;
	}
	_resizeCursorForDirection(e) {
		return Hr(e);
	}
	_getResizeDirectionFromPoint(e, t, n) {
		return Ur(e, t, n);
	}
	_stopEdgeResize() {
		return Wr(this);
	}
	_bindPanelInteractions() {
		return Gr(this);
	}
	_initEdgeResize(e) {
		return Kr(this, e);
	}
	_initDrag(e) {
		return qr(this, e);
	}
	async _drawMediaFit(e, t, n, r, i, a, o) {
		return Jr(this, e, t, n, r, i, a, o);
	}
	_estimateGenInfoOverlayHeight(e, t, n) {
		return Yr(this, e, t, n);
	}
	_drawGenInfoOverlay(e, t, n, r, i, a) {
		return Xr(this, e, t, n, r, i, a);
	}
	async _captureView() {
		return Zr(this);
	}
	dispose() {
		ae(this), this._destroyPanZoom(), this._destroyCompareSync(), this._destroyMediaControls(), this._unbindLayoutObserver(), this._stopEdgeResize(), this._clearPopoutCloseWatch();
		try {
			this._panelAC?.abort(), this._panelAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._btnAC?.abort(), this._btnAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._docAC?.abort(), this._docAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._popoutAC?.abort(), this._popoutAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._panzoomAC?.abort(), this._panzoomAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._compareSyncAC?.abort?.(), this._compareSyncAC = null;
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._isPopped && this.popIn();
		} catch (e) {
			console.debug?.(e);
		}
		this._revokePreviewBlob(), this._onSidebarPosChanged &&= (window.removeEventListener("mjr-settings-changed", this._onSidebarPosChanged), null);
		try {
			this.element?.remove();
		} catch (e) {
			console.debug?.(e);
		}
		try {
			this._graphMapPanel?.dispose?.();
		} catch (e) {
			console.debug?.(e);
		}
		this._graphMapPanel = null, this.element = null, this._contentEl = null, this._genSidebarEl = null, this._closeBtn = null, this._modeBtn = null, this._pinGroup = null, this._pinBtns = null, this._liveBtn = null, this._nodeStreamBtn = null, this._popoutBtn = null, this._captureBtn = null, this._unbindDocumentUiHandlers();
		try {
			this._genDropdown?.remove();
		} catch (e) {
			console.debug?.(e);
		}
		this._mediaA = null, this._mediaB = null, this._mediaC = null, this._mediaD = null, this.isVisible = !1;
	}
};
//#endregion
export { ii as FloatingViewer };
