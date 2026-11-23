/**
 * Justified ("masonry-style") row layout for the asset grid.
 *
 * Items keep their own aspect ratio and reading order. Each row is filled
 * left-to-right and then scaled so it spans the container exactly; only the
 * row height varies. The last, incomplete row keeps the target height and is
 * left-aligned instead of being blown up to full width.
 */

export const JUSTIFIED_MIN_ASPECT = 0.4;
export const JUSTIFIED_MAX_ASPECT = 3;
/** A full row may grow to at most this multiple of the target height. */
export const JUSTIFIED_MAX_ROW_SCALE = 1.6;

export interface JustifiedRow<T = unknown> {
    items: T[];
    /** Pixel width of each item; full rows sum (with gaps) to the container width. */
    itemWidths: number[];
    /** Pixel height of the thumbnail area of every item in the row. */
    thumbHeight: number;
    /** True when the row was scaled to span the container. */
    justified: boolean;
}

export interface JustifiedRowOptions<T = unknown> {
    containerWidth: number;
    targetHeight: number;
    gap: number;
    getAspect?: (item: T) => number;
}

/** Width / height of an asset, clamped so extreme panoramas or strips stay usable. */
export function getAssetAspect(asset: any): number {
    if (!asset || String(asset.kind || "").toLowerCase() === "folder") return 1;
    const width = Number(asset.width);
    const height = Number(asset.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        return 1;
    }
    return Math.min(JUSTIFIED_MAX_ASPECT, Math.max(JUSTIFIED_MIN_ASPECT, width / height));
}

function distributeWidths(aspects: number[], height: number, total: number | null): number[] {
    const widths = aspects.map((aspect) => Math.max(1, Math.floor(aspect * height)));
    if (total != null && widths.length) {
        // Give the rounding remainder to the items one pixel at a time so the
        // row ends exactly on the container edge.
        let remainder = total - widths.reduce((sum, w) => sum + w, 0);
        for (let i = 0; remainder > 0; i = (i + 1) % widths.length, remainder -= 1) {
            widths[i] += 1;
        }
    }
    return widths;
}

export function buildJustifiedRows<T>(
    items: readonly T[],
    { containerWidth, targetHeight, gap, getAspect = getAssetAspect }: JustifiedRowOptions<T>,
): JustifiedRow<T>[] {
    const list = Array.isArray(items) ? items : [];
    const width = Math.max(1, Math.floor(Number(containerWidth) || 0));
    const target = Math.max(1, Number(targetHeight) || 1);
    const spacing = Math.max(0, Number(gap) || 0);
    const rows: JustifiedRow<T>[] = [];

    let rowItems: T[] = [];
    let rowAspects: number[] = [];

    const heightFor = (aspects: number[]) => {
        const sum = aspects.reduce((total, aspect) => total + aspect, 0);
        return (width - spacing * Math.max(0, aspects.length - 1)) / Math.max(1e-6, sum);
    };

    const pushFull = (rowList: T[], aspects: number[]) => {
        const free = width - spacing * Math.max(0, aspects.length - 1);
        const exact = heightFor(aspects);
        // A lone very wide item can only shrink; never grow past the scale cap.
        const height = Math.min(exact, target * JUSTIFIED_MAX_ROW_SCALE);
        const fills = height === exact;
        rows.push({
            items: rowList,
            itemWidths: distributeWidths(aspects, height, fills ? free : null),
            thumbHeight: Math.max(1, Math.round(height)),
            justified: fills,
        });
    };

    for (const item of list) {
        const aspect = Number(getAspect(item)) || 1;
        rowItems.push(item);
        rowAspects.push(aspect);
        const natural =
            rowAspects.reduce((total, a) => total + a, 0) * target +
            spacing * (rowAspects.length - 1);
        if (natural < width) continue;

        // The row overflows at the target height. Either justify it as is
        // (shorter than target) or end the row before this item (taller than
        // target); keep whichever height is closer to the target.
        if (rowItems.length > 1) {
            const withItem = heightFor(rowAspects);
            const withoutItem = heightFor(rowAspects.slice(0, -1));
            const distanceWith = Math.abs(Math.log(withItem / target));
            const distanceWithout = Math.abs(Math.log(withoutItem / target));
            if (distanceWithout < distanceWith && withoutItem <= target * JUSTIFIED_MAX_ROW_SCALE) {
                pushFull(rowItems.slice(0, -1), rowAspects.slice(0, -1));
                rowItems = [item];
                rowAspects = [aspect];
                const single = aspect * target;
                if (single < width) continue;
            }
        }
        pushFull(rowItems, rowAspects);
        rowItems = [];
        rowAspects = [];
    }

    if (rowItems.length) {
        rows.push({
            items: rowItems,
            itemWidths: distributeWidths(rowAspects, target, null).map((w) => Math.min(w, width)),
            thumbHeight: Math.round(target),
            justified: false,
        });
    }
    return rows;
}
