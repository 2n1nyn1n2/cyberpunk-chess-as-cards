import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { exiftool } from "exiftool-vendored";
import { glob } from "glob";
import { makeAllBackgroundsTransparent } from "./lib/make-background-transparent.js";

// --- Configuration ---
const inputDirectory = process.env.INPUT_DIR;
const fileExtension = ".png";
// ---------------------

async function readExifDataForFile(filePath) {
  try {
    // ExifReader's load function handles reading the file from the path and parsing the metadata.
    // For PNGs, using the asynchronous load method is recommended, especially if
    // the file contains compressed tags (zTXt, iTXt, iCCP chunks).
    const inputTags = await exiftool.read(filePath);
    console.log("\tInput filePath:", filePath);
    console.log("\tInput UserComment:", inputTags.UserComment);
    if (inputTags.UserComment) {
      const userComment = inputTags.UserComment;
      const userCommentJson = JSON.parse(userComment);
      const seed = userCommentJson.seed;
      // const prompt = userCommentJson.c;
      const model = userCommentJson.model;
      const choice_name = filePath.split("_choices_")[1].split("_0__")[0];

      console.log(`✅ File: ${filePath}`);
      console.log(`\tSeed:`, seed);
      // console.log(`\tPrompt:`, prompt);
      console.log(`\tModel`, model);
      console.log(`\tChoice:`, choice_name);

      const dir = path.join("assets", "choices", choice_name);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      const newFilePath = path.join(dir, `${choice_name}_${seed}.png`);
      console.log(`\tnewFilePath:`, newFilePath);

      const newTags = {};
      for (const tag in inputTags) {
        newTags[tag] = "";
      }
      newTags.UserComment = JSON.stringify({
        name: choice_name,
        seed: seed,
        model: model,
      });

      if (filePath == newFilePath) {
        const topFilePath = path.join(
          "assets",
          "choices",
          `${choice_name}_${seed}.png`,
        );
        fs.renameSync(filePath, topFilePath);
        await processImage(topFilePath, newFilePath, newTags);
      } else {
        await processImage(filePath, newFilePath, newTags);
      }

      const outputTags = await exiftool.read(newFilePath);
      console.log("\tOutput filePath:", newFilePath);
      // console.log("\tOutput tags:", outputTags);

      return { filePath, outputTags };
    } else {
      console.log(`✅ Skipping File:`, filePath, inputTags);
      return { filePath };
    }
  } catch (error) {
    console.error(
      `❌ Error reading EXIF data for ${filePath}: ${error.message}`,
      error,
    );
    return { filePath, error: error.message };
  }
}

async function processDirectoryTree() {
  console.log(
    `🔍 Starting scan for ${fileExtension} files in: ${path.resolve(inputDirectory)}`,
  );

  // Use glob to find all files matching the pattern recursively.
  // **/*.png will find all .png files in the inputDirectory and all its subdirectories.
  const filePaths = await glob(`${inputDirectory}/**/*${fileExtension}`, {
    nodir: true,
  });

  const results = [];
  if (filePaths.length === 0) {
    console.log("🤷 No PNG files found.");
  } else {
    console.log(`Found ${filePaths.length} file(s). Processing...`);

    for (const filePath of filePaths) {
      console.log(`Found ${filePaths.length} file(s). Processing...`);
      const result = await readExifDataForFile(filePath);
      results.push(result);
      console.log(
        `Found ${filePaths.length} file(s). Results for ${results.length} ...`,
      );
    }
  }

  await makeAllBackgroundsTransparent(
    path.join("assets", "choices"),
    fileExtension,
  );

  await exiftool.end();
  console.log("--- Processing Complete ---", results.length);
}

async function processImage(inputPath, outputPath, metaData) {
  try {
    console.log("\tFile processed started", inputPath, outputPath);
    // console.log("\tFile processed metaData", metaData);
    // fs.copyFileSync(inputPath, outputPath);

    await sharp(inputPath)
      .resize({ width: 256 })
      .png({ palette: true, quality: 80 })
      .toFile(outputPath);

    // Ensure your function call looks like this:
    await exiftool.write(outputPath, metaData, {
      writeArgs: ["-overwrite_original"],
    });

    await fs.unlinkSync(inputPath);
    console.log("\tFile processed and metadata stripped!");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

// Run the main function
processDirectoryTree();
