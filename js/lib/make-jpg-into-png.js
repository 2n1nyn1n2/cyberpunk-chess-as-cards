import * as path from "path";
import sharp from "sharp";
import { glob } from "glob";

export async function makeJpgIntoPng(inFile, outPath) {
  try {
    const fileName = path.parse(inFile).name;
    const outFile = path.join(outPath, `${fileName}.png`);
    await sharp(inFile).png().toFile(outFile);
  } catch (error) {
    console.error("Error:", error.message, "inFile", inFile);
    throw Error(inFile, error);
  }
}

export async function makeJpgsIntoPng(inPath, outPath) {
  const fileExtension = ".jpg";
  console.log(`makeJpgsIntoPng '${inPath}', '${fileExtension}'.`);
  const filePaths = await glob(`${inPath}/**/*${fileExtension}`, {
    nodir: true,
  });
  console.log(
    `✅ makeJpgsIntoPng Found ${filePaths.length} file(s). Making Transparent...`,
  );
  for (const filePath of filePaths) {
    await makeJpgIntoPng(filePath, outPath);
  }
  console.log(`✅ makeJpgsIntoPng Processed ${filePaths.length} file(s).`);
}
