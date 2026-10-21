// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ get: vi.fn(), metadata: vi.fn(), load: vi.fn(), toast: vi.fn() }));
vi.mock("../api/client.js", () => ({ get: mocks.get, getAssetMetadata: mocks.metadata }));
vi.mock("../app/hostAdapter.js", () => ({ openWorkflowInHostTab: mocks.load }));
vi.mock("../app/toast.js", () => ({ comfyToast: mocks.toast }));
vi.mock("../app/i18n.js", () => ({ t: (_key: string, fallback: string) => fallback }));

import { createOpenWorkflowButton, getSavedAssetGraph, openAssetWorkflow } from "../features/workflows/openAssetWorkflow.js";

const workflow = { version: 0.4, nodes: [{ id: 7, type: "KSampler", widgets_values: [123, "fixed", 20] }], links: [] };
const prompt = { "7": { class_type: "KSampler", inputs: { seed: 123, steps: 20 } } };

describe("open media workflow", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        mocks.load.mockResolvedValue(true);
        mocks.metadata.mockResolvedValue({ ok: true, data: {} });
        mocks.get.mockResolvedValue({ ok: true, data: {} });
    });

    it("prefers the embedded canvas over execution-only data and preserves settings", async () => {
        const asset = { filename: "image.png", prompt, metadata_raw: JSON.stringify({ workflow }) };
        await expect(openAssetWorkflow(asset)).resolves.toBe(true);
        expect(mocks.load).toHaveBeenCalledWith(workflow, "image.png", "workflow");
        expect(mocks.metadata).not.toHaveBeenCalled();
        expect(mocks.get).not.toHaveBeenCalled();
    });

    it("hydrates compact indexed video cards", async () => {
        mocks.metadata.mockResolvedValue({ ok: true, data: { metadata_raw: { workflow } } });
        await expect(openAssetWorkflow({ id: 42, filename: "clip.mp4" })).resolves.toBe(true);
        expect(mocks.metadata).toHaveBeenCalledWith(42, { timeoutMs: 30_000 });
        expect(mocks.load).toHaveBeenCalledWith(workflow, "clip.mp4", "workflow");
    });

    it("extracts workflow from unindexed files without sending raw paths unescaped", async () => {
        mocks.get.mockResolvedValue({ ok: true, data: { workflow } });
        await openAssetWorkflow({ filepath: "/outputs/a & b/clip.mp4" });
        const query = new URL(mocks.get.mock.calls[0][0], "http://localhost").searchParams;
        expect(query.get("path")).toBe("/outputs/a & b/clip.mp4");
        expect(query.get("workflow_only")).toBe("1");
        expect(mocks.load).toHaveBeenCalledWith(workflow, "clip.mp4", "workflow");
    });

    it("retains root scope when locating a file by name", async () => {
        await openAssetWorkflow({ filename: "a.png", subfolder: "test", root_id: "photos", type: "input" });
        const query = new URL(mocks.get.mock.calls[0][0], "http://localhost").searchParams;
        expect(query.get("root_id")).toBe("photos");
        expect(query.get("type")).toBe("input");
    });

    it("uses the host API graph importer for execution-only files and explains the missing layout", async () => {
        await openAssetWorkflow({ filename: "a.png", prompt: JSON.stringify(prompt) });
        expect(mocks.load).toHaveBeenCalledWith(prompt, "a.png", "prompt");
        expect(mocks.toast).toHaveBeenCalledWith(expect.stringContaining("original canvas layout was not embedded"), "success");
    });

    it("reports missing metadata without changing the canvas", async () => {
        await expect(openAssetWorkflow({ filename: "stripped.mp4" })).resolves.toBe(false);
        expect(mocks.load).not.toHaveBeenCalled();
        expect(mocks.toast).toHaveBeenCalledWith(expect.stringContaining("No embedded"), "warning");
    });

    it("distinguishes metadata read failures from absent metadata", async () => {
        mocks.metadata.mockResolvedValue({ ok: false });
        await expect(openAssetWorkflow({ id: 1 })).resolves.toBe(false);
        expect(mocks.toast).toHaveBeenCalledWith(expect.stringContaining("Could not read or load"), "error");
        expect(mocks.load).not.toHaveBeenCalled();
    });

    it("never reports success when the host loader fails", async () => {
        mocks.load.mockResolvedValue(false);
        await expect(openAssetWorkflow({ workflow })).resolves.toBe(false);
        expect(mocks.toast).not.toHaveBeenCalledWith(expect.anything(), "success");
    });

    it("rejects malformed JSON and parameter strings rather than inventing a workflow", () => {
        expect(getSavedAssetGraph({ workflow: "{broken", prompt: "a photograph" })).toBeNull();
        expect(getSavedAssetGraph({ prompt: { parameters: "seed: 4" } })).toBeNull();
    });

    it("reads the viewer's current asset on each click and blocks duplicate loads", async () => {
        let active = { filename: "first.png", workflow };
        let finish!: (value: boolean) => void;
        mocks.load.mockImplementationOnce(() => new Promise((resolve) => { finish = resolve; }));
        const button = createOpenWorkflowButton(() => active);
        button.click();
        button.click();
        await vi.waitFor(() => expect(mocks.load).toHaveBeenCalledTimes(1));
        expect(button.disabled).toBe(true);
        finish(true);
        await vi.waitFor(() => expect(button.disabled).toBe(false));
        active = { filename: "second.png", workflow };
        button.click();
        await vi.waitFor(() => expect(mocks.load).toHaveBeenLastCalledWith(workflow, "second.png", "workflow"));
    });
});
