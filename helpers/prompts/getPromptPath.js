import fs from "node:fs";
import path from "node:path";

const PROMPTS_ROOT = path.resolve(process.cwd(), "prompts");

export function getPromptPath(folderName, documentName) {
  if (typeof folderName !== "string" || folderName.trim() === "") {
    throw new TypeError("The prompt folder name must be a non-empty string.");
  }

  if (typeof documentName !== "string" || documentName.trim() === "") {
    throw new TypeError("The prompt document name must be a non-empty string.");
  }

  const folderPath = path.resolve(PROMPTS_ROOT, folderName);

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    throw new Error(`Prompt folder does not exist: ${folderName}`);
  }

  const documentPath = path.resolve(folderPath, documentName);

  if (!fs.existsSync(documentPath) || !fs.statSync(documentPath).isFile()) {
    throw new Error(`Prompt file does not exist: ${folderName}/${documentName}`);
  }

  return documentPath;
}

export default getPromptPath;
