import sharp from "sharp";
import { readFile } from "fs/promises";
import { glob } from "glob";

/**
 * Overwrites a PNG by making pixels similar to the top-left pixel transparent.
 * @param {string} filePath - Path to the image file.
 * @param {number} threshold - Sensitivity (0-255).
 */
export async function makeBackgroundTransparent(filePath, threshold = 10) {
  try {
    // 1. Read file into buffer to avoid file-lock issues during overwrite
    const inputBuffer = await readFile(filePath);

    const image = sharp(inputBuffer);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;

    // 2. Identify target color from the first pixel (top-left)
    const targetR = data[0];
    const targetG = data[1];
    const targetB = data[2];

    // 3. Prepare output buffer (always 4 channels for RGBA)
    const outBuffer = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const inIdx = i * channels;
      const outIdx = i * 4;

      const r = data[inIdx];
      const g = data[inIdx + 1];
      const b = data[inIdx + 2];

      // Calculate distance (Manhattan distance for performance)
      const diff =
        Math.abs(r - targetR) + Math.abs(g - targetG) + Math.abs(b - targetB);

      // Copy RGB
      outBuffer[outIdx] = r;
      outBuffer[outIdx + 1] = g;
      outBuffer[outIdx + 2] = b;

      // Apply transparency if within threshold
      // threshold * 3 because we are summing 3 channels
      outBuffer[outIdx + 3] = diff <= threshold * 3 ? 0 : 255;
    }

    // 4. Save back to the original path
    await sharp(outBuffer, {
      raw: { width, height, channels: 4 },
    })
      .png()
      .toFile(filePath);

    console.log(`✅ makeBackgroundTransparent Processed: ${filePath}`);
  } catch (err) {
    console.error("✘ Error:", err.message, err);
    throw Error(filePath, err);
  }
}

export async function makeAllBackgroundsTransparent(dir, fileExtension) {
  console.log(`MakeAllBackgroundsTransparent '${dir}', '${fileExtension}'.`);
  const filePaths = await glob(`${dir}/**/*${fileExtension}`, {
    nodir: true,
  });
  console.log(
    `✅ MakeAllBackgroundsTransparent Found ${filePaths.length} file(s). Making Transparent...`,
  );
  for (const filePath of filePaths) {
    await makeBackgroundTransparent(filePath);
  }
  console.log(
    `✅ MakeAllBackgroundsTransparent Processed ${filePaths.length} file(s).`,
  );
}
