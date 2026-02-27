import { glob } from "glob";
import sharp from "sharp";
import { readFile } from "fs/promises";

async function makeBackgroundTransparent(
  filePath,
  threshold = 0.07,
  targetColor = null,
) {
  try {
    const inputBuffer = await readFile(filePath);
    const image = sharp(inputBuffer).ensureAlpha();
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    const tr = targetColor ? targetColor.r : data[0];
    const tg = targetColor ? targetColor.g : data[1];
    const tb = targetColor ? targetColor.b : data[2];

    const tSum = tr + tg + tb || 1;
    const nrT = tr / tSum;
    const ngT = tg / tSum;
    const nbT = tb / tSum;

    const outBuffer = Buffer.alloc(width * height * 4);

    const blackClip = threshold;
    const whiteClip = threshold + 0.15;
    const shadowSensitivity = 1.3;

    for (let i = 0; i < width * height; i++) {
      const inIdx = i * channels;
      const outIdx = i * 4;

      let r = data[inIdx];
      let g = data[inIdx + 1];
      let b = data[inIdx + 2];
      const a = channels === 4 ? data[inIdx + 3] : 255;

      const sum = r + g + b || 1;
      const nr = r / sum;
      const ng = g / sum;
      const nb = b / sum;

      const chromDistSq =
        Math.pow(nr - nrT, 2) + Math.pow(ng - ngT, 2) + Math.pow(nb - nbT, 2);
      const absDistSq =
        Math.pow((r - tr) / 255, 2) +
        Math.pow((g - tg) / 255, 2) +
        Math.pow((b - tb) / 255, 2);

      const brightness = sum / (255 * 3);
      const shadowFactor = Math.max(0, 1 - brightness * shadowSensitivity);

      let distance = Math.sqrt(chromDistSq * 0.8 + absDistSq * 0.2);

      if (brightness < 0.4) {
        distance -= shadowFactor * 0.1;
      }

      let alpha;
      if (distance < blackClip) {
        alpha = 0;
      } else if (distance > whiteClip) {
        alpha = 255;
      } else {
        const ratio = (distance - blackClip) / (whiteClip - blackClip);
        alpha = Math.round(ratio * 255);
      }

      const finalAlpha = Math.min(alpha, a);

      // --- SMART SPILL SUPPRESSION (Yellow-Aware) ---
      if (finalAlpha < 255) {
        // Only clamp green if the pixel is actually 'Green'
        // We check if Green is significantly higher than Red.
        // In Yellow, Red and Green are both high.
        const isYellow = r > g * 0.8;

        if (!isYellow) {
          const maxAllowedGreen = (r + b) / 2;
          if (g > maxAllowedGreen) {
            g = maxAllowedGreen;
          }
        }

        // Apply a "soft" desaturation that preserves brightness
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Only desaturate pixels that are very transparent (the actual background/shadow)
        // Keep subject pixels (high alpha) closer to their original color
        const saturationFactor = Math.pow(finalAlpha / 255, 2);

        outBuffer[outIdx] = gray + (r - gray) * saturationFactor;
        outBuffer[outIdx + 1] = gray + (g - gray) * saturationFactor;
        outBuffer[outIdx + 2] = gray + (b - gray) * saturationFactor;
      } else {
        outBuffer[outIdx] = r;
        outBuffer[outIdx + 1] = g;
        outBuffer[outIdx + 2] = b;
      }

      outBuffer[outIdx + 3] = finalAlpha;
    }

    const outputPath = filePath.replace(/\.[^.]+$/, "_transparent.png");
    await sharp(outBuffer, { raw: { width, height, channels: 4 } })
      .png()
      .toFile(outputPath);
    return outputPath;
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
  let processedCount = 0;
  let skippedCount = 0;
  for (const filePath of filePaths) {
    if (filePath.endsWith("_transparent.png")) {
      skippedCount++;
      console.log(`✅ makeBackgroundTransparent Skipped: ${filePath}`);
    } else {
      await makeBackgroundTransparent(filePath);
      processedCount++;
      console.log(`✅ makeBackgroundTransparent Processed: ${filePath}`);
    }
  }
  console.log(
    `✅ MakeAllBackgroundsTransparent Processed ${processedCount} and Skipped ${skippedCount} of ${filePaths.length} file(s).`,
  );
}
