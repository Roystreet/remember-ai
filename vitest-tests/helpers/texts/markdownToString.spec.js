import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { getPromptPath } from "../../../helpers/prompts/getPromptPath.js";
import { markdownToString } from "../../../helpers/texts/markdownToString.js";

describe("markdownToString with prompt paths", () => {
  it("converts markdown from prompts/images using getPromptPath", async () => {
    const promptPath = getPromptPath("images", "RestoreImage.md");
    const promptBuffer = await fs.readFile(promptPath);
    const result = await markdownToString(promptBuffer);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    expect(result.toLowerCase()).toContain("image");
  });

  it("converts markdown from prompts/videos using getPromptPath", async () => {
    const promptPath = getPromptPath("videos", "RecreateMomentVideo.md");
    const promptBuffer = await fs.readFile(promptPath);

    const result = await markdownToString(promptBuffer);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    expect(result.toLowerCase()).toContain("video");
  });

  it("throws when file is not markdown", async () => {
    const fakeDocument = {
      name: "not-markdown.txt",
      text: async () => "plain text",
    };

    await expect(markdownToString(fakeDocument)).rejects.toThrow(
      "The document must be a markdown file.",
    );
  });
});
