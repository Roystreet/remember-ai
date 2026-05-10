import { Buffer } from "node:buffer";

import { getFile } from "../../../../helpers/files/getFile.js";
import { getPromptPath } from "../../../../helpers/prompts/getPromptPath.js";
import { markdownToString } from "../../../../helpers/texts/markdownToString.js";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const XAI_IMAGE_EDIT_URL = "https://api.x.ai/v1/images/edits";

function getImageMimeType(file, fallback = "image/png") {
  return file?.type || fallback;
}

async function getImagePayload(request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image || typeof image.arrayBuffer !== "function") {
      throw new TypeError("Image file is required.");
    }

    if (!getImageMimeType(image).startsWith("image/")) {
      throw new TypeError("File must be an image.");
    }

    if (image.size > MAX_IMAGE_SIZE) {
      throw new TypeError("Image must be 20 MB or smaller.");
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    return {
      buffer,
      mimeType: getImageMimeType(image),
    };
  }

  const body = await request.json();
  const imageUrl = body?.imageUrl;

  if (!imageUrl || typeof imageUrl !== "string") {
    throw new TypeError("Image URL is required.");
  }

  return {
    buffer: await getFile(imageUrl),
    mimeType: body?.mimeType || "image/png",
  };
}

function getGeneratedImageData(payload) {
  const generatedImage = payload?.data?.[0] ?? payload?.image ?? payload;
  const base64 = generatedImage?.b64_json ?? generatedImage?.base64;
  const url = generatedImage?.url;

  if (base64) {
    return {
      base64,
      mimeType: "image/png",
      dataUrl: `data:image/png;base64,${base64}`,
    };
  }

  if (url) {
    return {
      base64: null,
      mimeType: "image/png",
      dataUrl: url,
    };
  }

  throw new Error("xAI did not return an image.");
}

export async function POST(request) {
  try {
    if (!process.env.XAI_API_KEY) {
      return Response.json(
        { error: "XAI_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const promptPath = getPromptPath("images", "RestoreImage.md");
    const promptBuffer = await getFile(promptPath);
    const prompt = await markdownToString(promptBuffer);
    const { buffer, mimeType } = await getImagePayload(request);
    const base64Image = buffer.toString("base64");
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    const xaiResponse = await fetch(XAI_IMAGE_EDIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image-quality",
        n: 1,
        aspect_ratio: "auto",
        resolution: "1k",
        image: {
          url: imageUrl,
        },
        prompt,
      }),
    });

    const payload = await xaiResponse.json();

    if (!xaiResponse.ok) {
      throw new Error(
        payload?.error?.message || payload?.message || "xAI image restoration failed.",
      );
    }

    const image = getGeneratedImageData(payload);

    return Response.json({
      image,
      request: {
        model: "grok-imagine-image-quality",
        aspectRatio: "auto",
        resolution: "1k",
      },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Image restoration failed." },
      { status: 400 },
    );
  }
}
