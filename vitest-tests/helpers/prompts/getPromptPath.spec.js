import path from "node:path";
import { describe, expect, it } from "vitest";
import { getPromptPath } from "../../../helpers/prompts/getPromptPath.js";

describe("getPromptPath", () => {
  it("returns the absolute path for an existing image prompt", () => {
    const result = getPromptPath("images", "RestoreImage.md");
    const expected = path.resolve(process.cwd(), "prompts", "images", "RestoreImage.md");

    expect(result).toBe(expected);
  });

  it("returns the absolute path for an existing video prompt", () => {
    const result = getPromptPath("videos", "RecreateMomentVideo.md");
    const expected = path.resolve(process.cwd(), "prompts", "videos", "RecreateMomentVideo.md");

    expect(result).toBe(expected);
  });

  it("throws when the folder does not exist", () => {
    expect(() => getPromptPath("audio", "SomePrompt.md")).toThrow(
      "Prompt folder does not exist: audio"
    );
  });

  it("throws when the file does not exist", () => {
    expect(() => getPromptPath("images", "NotFound.md")).toThrow(
      "Prompt file does not exist: images/NotFound.md"
    );
  });

  it("throws when folderName is invalid", () => {
    expect(() => getPromptPath("", "RestoreImage.md")).toThrow(
      "The prompt folder name must be a non-empty string."
    );
  });

  it("throws when documentName is invalid", () => {
    expect(() => getPromptPath("images", "")).toThrow(
      "The prompt document name must be a non-empty string."
    );
  });
});
