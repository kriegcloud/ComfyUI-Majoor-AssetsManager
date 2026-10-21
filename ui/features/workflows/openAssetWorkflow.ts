import { get, getAssetMetadata } from "../../api/client.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import { t } from "../../app/i18n.js";
import { openWorkflowInHostTab } from "../../app/hostAdapter.js";
import { comfyToast } from "../../app/toast.js";
import { pickRootId } from "../../utils/ids.js";

type RecordData = Record<string, any>;
type SavedGraph = { format: "workflow" | "prompt"; data: RecordData };

function object(value: unknown): RecordData | null {
    if (typeof value === "string") {
        try {
            value = JSON.parse(value);
        } catch {
            return null;
        }
    }
    return value && typeof value === "object" && !Array.isArray(value)
        ? (value as RecordData)
        : null;
}

/** Prefer the saved editable graph; never import Graph Map's synthesized layout. */
export function getSavedAssetGraph(asset: RecordData | null): SavedGraph | null {
    const sources = [asset, object(asset?.metadata_raw), object(asset?.metadata)].filter(Boolean);
    for (const source of sources) {
        for (const key of ["workflow", "Workflow", "comfy_workflow", "workflow_json"]) {
            const graph = object(source?.[key]);
            if (
                Array.isArray(graph?.nodes) &&
                (Array.isArray(graph?.links) || graph?.version === 1)
            ) {
                return { format: "workflow", data: graph! };
            }
        }
    }
    for (const source of sources) {
        for (const key of ["prompt", "Prompt"]) {
            const graph = object(source?.[key]);
            const nodes = Object.values(graph || {});
            if (
                nodes.length &&
                nodes.every(
                    (node) =>
                        node &&
                        typeof node === "object" &&
                        typeof node.class_type === "string" &&
                        object(node.inputs),
                )
            )
                return { format: "prompt", data: graph! };
        }
    }
    return null;
}

async function readAssetGraph(asset: RecordData): Promise<SavedGraph | null> {
    let saved = getSavedAssetGraph(asset);
    // An indexed asset may have only a compact listing payload. Hydrate it first.
    if (!saved && asset.id != null && asset.id !== "") {
        const result = await getAssetMetadata(asset.id, { timeoutMs: 30_000 });
        if (!result?.ok) throw new Error("metadata");
        saved = getSavedAssetGraph(result.data);
    }
    if (saved) return saved;

    const path = asset.filepath || asset.path || asset.full_path || asset.file_info?.filepath;
    const query = new URLSearchParams({ workflow_only: "1" });
    if (path) query.set("path", String(path));
    else if (asset.filename) {
        query.set("filename", String(asset.filename));
        query.set("type", String(asset.type || "output"));
        query.set("subfolder", String(asset.subfolder || ""));
        const rootId = pickRootId(asset);
        if (rootId) query.set("root_id", String(rootId));
    } else return null;

    // Also covers unindexed browser assets and video container metadata.
    const result = await get(`${ENDPOINTS.METADATA}?${query}`, { timeoutMs: 30_000 });
    if (!result?.ok) throw new Error("metadata");
    return getSavedAssetGraph(result.data);
}

/** Open a snapshot of the selected media's recorded graph, without queuing it. */
export async function openAssetWorkflow(asset: RecordData | null): Promise<boolean> {
    if (!asset) return false;
    try {
        const saved = await readAssetGraph(asset);
        if (!saved) {
            comfyToast(
                t(
                    "toast.assetWorkflowMissing",
                    "No embedded ComfyUI workflow was found for this asset.",
                ),
                "warning",
            );
            return false;
        }
        const filename =
            String(asset.filename || asset.filepath || asset.path || "Media workflow")
                .split(/[\\/]/)
                .pop() || "Media workflow";
        const loaded = await openWorkflowInHostTab(saved.data, filename, saved.format);
        if (!loaded) {
            comfyToast(
                t(
                    "toast.workflowImportUnavailable",
                    "ComfyUI workflow import is unavailable in this frontend.",
                ),
                "error",
            );
            return false;
        }
        comfyToast(
            saved.format === "workflow"
                ? t("toast.workflowLoadedNewTab", "Workflow loaded in a new ComfyUI tab.")
                : t(
                      "toast.executionSettingsLoaded",
                      "Execution settings loaded in a new tab. The original canvas layout was not embedded.",
                  ),
            "success",
        );
        return true;
    } catch {
        comfyToast(
            t(
                "toast.assetWorkflowOpenFailed",
                "Could not read or load this asset's workflow. Your media file has not been changed.",
            ),
            "error",
        );
        return false;
    }
}

/** Read the active asset at click time so viewer navigation cannot use stale metadata. */
export function createOpenWorkflowButton(getAsset: () => RecordData | null): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mjr-icon-btn mjr-open-workflow-btn";
    button.textContent = t("btn.openAssetWorkflow", "Open workflow");
    button.title = t(
        "tooltip.openAssetWorkflow",
        "Open this media's saved workflow or execution settings in a new ComfyUI tab",
    );
    button.addEventListener("click", async () => {
        if (button.disabled) return;
        const asset = getAsset();
        if (!asset) return;
        button.disabled = true;
        button.setAttribute("aria-busy", "true");
        try {
            await openAssetWorkflow(asset);
        } finally {
            button.disabled = false;
            button.removeAttribute("aria-busy");
        }
    });
    return button;
}
