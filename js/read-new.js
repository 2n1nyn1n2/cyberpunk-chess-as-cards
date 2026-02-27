import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { makeAllFilesSameSize } from "./lib/make-files-same-size.js";
import { makeAllBackgroundsTransparent } from "./lib/make-background-transparent.js";
import { makeJpgsIntoPng } from "./lib/make-jpg-into-png.js";

/**
 * Converts all JPG files in a directory to PNG.
 * @param {string} source - Path to the source directory.
 * @param {string} destination - Path to the output directory.
 */
async function convertJpgToPng(source, destination) {
  // 2. Read all files in the source directory
  const files = await fs.readdir(source);

  // 3. Filter for JPG files
  const jpgFiles = files.filter((file) =>
    [".jpg", ".jpeg"].includes(path.extname(file).toLowerCase()),
  );

  console.log(`Found ${jpgFiles.length} files to convert...`);

  // 4. Map files to processing promises
  const conversionPromises = jpgFiles.map(async (file) => {
    const inputPath = path.join(source, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(destination, `${fileName}.png`);

    await sharp(inputPath).png().toFile(outputPath);

    return `${file} -> ${fileName}.png`;
  });

  // 5. Execute all conversions
  const results = await Promise.all(conversionPromises);
  results.forEach((res) => console.log(`Converted: ${res}`));

  console.log("--- All conversions complete ---");
}

async function processDirectoryTree() {
  const fileExtension = ".png";
  const jpgPath = path.join("assets", "new", "input");
  const pngPath = path.join("assets", "new", "output");
  await makeJpgsIntoPng(jpgPath, pngPath);
  await makeAllFilesSameSize(pngPath, fileExtension);
  await makeAllBackgroundsTransparent(pngPath, fileExtension, 25);
  console.log("--- Processing Complete ---");
}

processDirectoryTree();
