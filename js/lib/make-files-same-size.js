import sharp from "sharp";
import { readFile, writeFile, stat } from "fs/promises";
import { glob } from "glob";
import path from "path";

export async function makeFilesSameSize(filePath) {
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      console.warn(`⏩ Skipping: ${filePath} is not a file.`);
      return;
    }

    const inputBuffer = await readFile(filePath);

    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: 256 })
      .png({ palette: true, quality: 80 })
      .toBuffer();

    await writeFile(filePath, outputBuffer);

    console.log(`✅ Processed: ${filePath}`);
  } catch (err) {
    console.error(`✘ Error processing ${filePath}:`, err.message);
    throw Error(filePath, err);
  }
}

export async function makeAllFilesSameSize(dir, fileExtension) {
  const ext = fileExtension.startsWith(".")
    ? fileExtension
    : `.${fileExtension}`;

  const pattern = path.join(dir, "**", `*${ext}`).replace(/\\/g, "/");

  console.log(`🔍 Searching for ${ext} files in: ${dir}`);

  const filePaths = await glob(pattern, {
    nodir: true,
    absolute: true,
  });

  if (filePaths.length === 0) {
    console.log("⚠️ No matching files found.");
    return;
  }

  console.log(`🚀 Found ${filePaths.length} file(s). Starting processing...`);

  const BATCH_SIZE = 5;
  for (let i = 0; i < filePaths.length; i += BATCH_SIZE) {
    const batch = filePaths.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((filePath) => makeFilesSameSize(filePath)));
  }

  console.log(`✨ Finished! Processed ${filePaths.length} file(s).`);
}
