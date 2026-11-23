import { describe, expect, it } from "vitest";

import {
    buildJustifiedRows,
    getAssetAspect,
    JUSTIFIED_MAX_ASPECT,
    JUSTIFIED_MAX_ROW_SCALE,
    JUSTIFIED_MIN_ASPECT,
} from "../vue/grid/justifiedRows.ts";

const asset = (id: number, width: number, height: number) => ({ id, width, height, kind: "image" });
const rowSpan = (widths: number[], gap: number) =>
    widths.reduce((sum, w) => sum + w, 0) + gap * Math.max(0, widths.length - 1);

describe("getAssetAspect", () => {
    it("uses width / height and clamps extremes", () => {
        expect(getAssetAspect(asset(1, 1600, 900))).toBeCloseTo(16 / 9);
        expect(getAssetAspect(asset(1, 100, 10000))).toBe(JUSTIFIED_MIN_ASPECT);
        expect(getAssetAspect(asset(1, 10000, 100))).toBe(JUSTIFIED_MAX_ASPECT);
    });

    it("falls back to square for folders and unknown dimensions", () => {
        expect(getAssetAspect({ kind: "folder", width: 400, height: 100 })).toBe(1);
        expect(getAssetAspect({ id: 3 })).toBe(1);
        expect(getAssetAspect({ width: 0, height: 100 })).toBe(1);
        expect(getAssetAspect(null)).toBe(1);
    });
});

describe("buildJustifiedRows", () => {
    const gap = 10;
    const containerWidth = 1000;
    const targetHeight = 200;
    const mixed = [
        asset(1, 832, 1216), // 2:3 portrait
        asset(2, 1216, 832), // 3:2 landscape
        asset(3, 1024, 1024),
        asset(4, 720, 1280), // 9:16
        asset(5, 1920, 1080),
        asset(6, 1024, 1024),
        asset(7, 832, 1216),
        asset(8, 1216, 832),
        asset(9, 1024, 1024),
        asset(10, 720, 1280),
        asset(11, 1920, 1080),
    ];

    it("keeps every item exactly once and in order", () => {
        const rows = buildJustifiedRows(mixed, { containerWidth, targetHeight, gap });
        expect(rows.flatMap((row) => row.items.map((item: any) => item.id))).toEqual(
            mixed.map((item) => item.id),
        );
    });

    it("makes full rows span the container exactly", () => {
        const rows = buildJustifiedRows(mixed, { containerWidth, targetHeight, gap });
        const full = rows.filter((row) => row.justified);
        expect(full.length).toBeGreaterThan(0);
        for (const row of full) expect(rowSpan(row.itemWidths, gap)).toBe(containerWidth);
    });

    it("preserves each item's aspect ratio within rounding", () => {
        const rows = buildJustifiedRows(mixed, { containerWidth, targetHeight, gap });
        for (const row of rows) {
            row.items.forEach((item: any, index) => {
                const rendered = row.itemWidths[index] / row.thumbHeight;
                expect(Math.abs(rendered - getAssetAspect(item))).toBeLessThan(0.03);
            });
        }
    });

    it("keeps row heights near the target", () => {
        const rows = buildJustifiedRows(mixed, { containerWidth, targetHeight, gap });
        for (const row of rows) {
            expect(row.thumbHeight).toBeGreaterThan(targetHeight * 0.5);
            expect(row.thumbHeight).toBeLessThanOrEqual(targetHeight * JUSTIFIED_MAX_ROW_SCALE);
        }
    });

    it("leaves the last incomplete row at the target height, left-aligned", () => {
        const rows = buildJustifiedRows([asset(1, 1000, 1000), asset(2, 1000, 1000)], {
            containerWidth,
            targetHeight,
            gap,
        });
        expect(rows).toHaveLength(1);
        expect(rows[0].justified).toBe(false);
        expect(rows[0].thumbHeight).toBe(targetHeight);
        expect(rows[0].itemWidths).toEqual([200, 200]);
    });

    it("fits a single item wider than the container onto its own row", () => {
        const rows = buildJustifiedRows(
            [asset(1, 1000, 1000), asset(2, 6000, 1000), asset(3, 1000, 1000)],
            { containerWidth: 500, targetHeight: 200, gap },
        );
        for (const row of rows) expect(rowSpan(row.itemWidths, gap)).toBeLessThanOrEqual(500);
        expect(rows.flatMap((row) => row.items.map((item: any) => item.id))).toEqual([1, 2, 3]);
    });

    it("returns no rows for no items and survives a zero width", () => {
        expect(buildJustifiedRows([], { containerWidth, targetHeight, gap })).toEqual([]);
        const rows = buildJustifiedRows(mixed.slice(0, 3), { containerWidth: 0, targetHeight, gap });
        expect(rows.flatMap((row) => row.items)).toHaveLength(3);
    });
});
