import { Buffer } from "node:buffer";
import { xai } from "@ai-sdk/xai";
import { generateImage } from "ai";

import { getFile } from "../../../../helpers/files/getFile.js";
import { getPromptPath } from "../../../../helpers/prompts/getPromptPath.js";
import { markdownToString } from "../../../../helpers/texts/markdownToString.js";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

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
    const { buffer } = await getImagePayload(request);

    const { image } = await generateImage({
      model: xai.image("grok-imagine-image-quality"),
      prompt: {
        text: prompt,
        images: [buffer],
      },
      n: 1,
      providerOptions: {
        xai: {
          aspect_ratio: "auto",
          resolution: "1k",
        },
      },
    });

    if (!image?.base64) {
      throw new Error("xAI did not return base64 image data.");
    }

    const normalizedMimeType = image.mediaType || "image/png";
    const normalizedBase64 = image.base64;

    return Response.json({
      image: {
        base64: normalizedBase64,
        mimeType: normalizedMimeType,
        dataUrl: `data:${normalizedMimeType};base64,${normalizedBase64}`,
      },
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
