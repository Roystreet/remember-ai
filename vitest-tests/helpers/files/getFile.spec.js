import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi, afterEach } from "vitest";

import { getFile } from "../../../helpers/files/getFile.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getFile", () => {
  it("returns a Buffer from a local file path", async () => {
    const tempFilePath = path.join(os.tmpdir(), `getFile-test-${Date.now()}.md`);
    const content = "local markdown content";
    await fs.writeFile(tempFilePath, content, "utf8");

    const result = await getFile(tempFilePath);

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString("utf8")).toBe(content);

    await fs.unlink(tempFilePath);
  });

  it("returns a Buffer when source is an http url", async () => {
    const payload = "remote markdown";
    const response = new Response(payload, { status: 200, statusText: "OK" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const result = await getFile("https://example.com/doc.md");

    expect(fetch).toHaveBeenCalledWith("https://example.com/doc.md");
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString("utf8")).toBe(payload);
  });

  it("throws when download response is not ok", async () => {
    const response = new Response("not found", {
      status: 404,
      statusText: "Not Found",
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    await expect(getFile("https://example.com/missing.md")).rejects.toThrow(
      "Could not download document. Status: 404 Not Found",
    );
  });

  it("throws when pathOrUrl is invalid", async () => {
    await expect(getFile("")).rejects.toThrow("A file path or URL is required.");
    await expect(getFile()).rejects.toThrow("A file path or URL is required.");
  });
});
