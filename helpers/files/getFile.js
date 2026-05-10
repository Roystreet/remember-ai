import fs from "node:fs/promises";
import { Buffer } from "node:buffer";

function isHttpUrl(value) {
  if (typeof value !== "string") return false;
  return value.startsWith("http://") || value.startsWith("https://");
}

export async function getFile(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") {
    throw new TypeError("A file path or URL is required.");
  }

  if (isHttpUrl(pathOrUrl)) {
    const response = await fetch(pathOrUrl);

    if (!response.ok) {
      throw new Error(
        `Could not download document. Status: ${response.status} ${response.statusText}`,
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  return fs.readFile(pathOrUrl);
}

export default getFile;
