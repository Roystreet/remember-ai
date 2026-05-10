const MARKDOWN_EXTENSIONS = [".md", ".markdown", ".mdown", ".mkdn"];
const TEXT_DECODER = new TextDecoder("utf-8");

function hasMarkdownExtension(document) {
  if (!document?.name || typeof document.name !== "string") {
    return true;
  }

  const lowerName = document.name.toLowerCase();
  return MARKDOWN_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

function decodeBinaryDocument(document) {
  if (document instanceof ArrayBuffer) {
    return TEXT_DECODER.decode(document);
  }

  if (ArrayBuffer.isView(document)) {
    return TEXT_DECODER.decode(document);
  }

  return null;
}

export async function markdownToString(document) {
  if (typeof document === "string") {
    return document;
  }

  if (!document) {
    throw new TypeError("A markdown document is required.");
  }

  if (!hasMarkdownExtension(document)) {
    throw new TypeError("The document must be a markdown file.");
  }

  const decodedDocument = decodeBinaryDocument(document);

  if (decodedDocument !== null) {
    return decodedDocument;
  }

  if (typeof document.text === "function") {
    return document.text();
  }

  throw new TypeError("The markdown document could not be converted to text.");
}

export default markdownToString;
