import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";

const BACKGROUND_IMAGE_PATH = "assets/scenes/starting-locations.png";
const CHARACTERS_JSON_INPUT_FILE_PATH = "./data/characters.json";
const CHALLENGES_PNG_OUTPUT_FILE_PATH = "./assets/challenges-pre-img2img";

const charactersData = JSON.parse(
  fs.readFileSync(CHARACTERS_JSON_INPUT_FILE_PATH, "utf8"),
);

async function composeScene(bgImgNm, char1ImgNm, char2ImgNm, outputImgNm) {
  const bgImg = await loadImage(bgImgNm);
  const char1Img = await loadImage(char1ImgNm);
  const char2Img = await loadImage(char2ImgNm);

  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(bgImg, 0, 0, 1024, 1024);

  const scale = 0.8;
  const drawW = 768 * scale;
  const drawH = 1152 * scale;
  const yPos = (1024 - drawH) / 2;
  const leftX = 1024 / 4 - drawW / 2;
  const rightX = (3 * 1024) / 4 - drawW / 2;

  drawStrippedImage(ctx, char1Img, leftX, yPos, drawW, drawH);
  drawStrippedImage(ctx, char2Img, rightX, yPos, drawW, drawH);

  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync(outputImgNm, buffer);
}

function drawStrippedImage(mainCtx, img, x, y, width, height) {
  const MIN_GAP = 30;
  const MAX_GB_DIFF = 20;
  const MIN_BRIGHTNESS = 50;
  const OFFSET = 10; // Your 10px hard transparency requirement

  const tempCanvas = createCanvas(img.width, img.height);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(img, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  // Create a separate canvas for the mask path
  const maskCanvas = createCanvas(img.width, img.height);
  const maskCtx = maskCanvas.getContext("2d");

  // 1. Process the image for cyan removal and build an alpha mask
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const isCyan =
      g - r > MIN_GAP &&
      b - r > MIN_GAP &&
      Math.abs(g - b) < MAX_GB_DIFF &&
      g + b > MIN_BRIGHTNESS;

    if (isCyan) {
      data[i + 3] = 0; // Make cyan transparent in character image
    }
  }
  tempCtx.putImageData(imageData, 0, 0);

  // 2. Create the "Hard" Mask for punching the hole
  // We use the character's final alpha channel to create a silhouette
  maskCtx.drawImage(tempCanvas, 0, 0);
  maskCtx.globalCompositeOperation = "source-in";
  maskCtx.fillStyle = "black";
  maskCtx.fillRect(0, 0, img.width, img.height);

  mainCtx.save();

  // 3. Clear the background 10px around the subject
  mainCtx.globalCompositeOperation = "destination-out";

  // To get a hard 10px edge, we draw the mask at multiple offsets
  // This effectively "thickens" the shape by 10 pixels
  for (let angle = 0; angle < 360; angle += 15) {
    const dx = Math.cos((angle * Math.PI) / 180) * OFFSET;
    const dy = Math.sin((angle * Math.PI) / 180) * OFFSET;
    mainCtx.drawImage(maskCanvas, x + dx, y + dy, width, height);
  }
  // Fill the center as well
  mainCtx.drawImage(maskCanvas, x, y, width, height);

  mainCtx.restore();

  // 4. Draw the actual character into the hole
  mainCtx.drawImage(tempCanvas, x, y, width, height);
}

function getCharacterAssets(charName) {
  const dirPath = path.join("assets", "characters", charName);

  if (!fs.existsSync(dirPath)) {
    throw new Error(`Path not found: ${dirPath}`);
  }

  const files = fs.readdirSync(dirPath);

  const images = files
    .filter((file) => path.extname(file).toLowerCase() === ".png")
    .map((file) => path.join(dirPath, file));

  if (images.length === 0) {
    throw new Error(`No images in ${dirPath}`);
  }

  return images; // Returns an array of strings
}

/**
 * Formats milliseconds into a human-readable string (D H M S)
 */
function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(" ");
}

async function run() {
  const characters = charactersData.characters;
  const tasks = [];
  console.log(
    `Starting generation of tasks for ${characters.length} characters.`,
  );

  for (const left of characters) {
    for (const right of characters) {
      if (left.team !== right.team) {
        // Get assets here to build a flat list of every individual image task
        const char1Assets = getCharacterAssets(left.name);
        const char2Assets = getCharacterAssets(right.name);

        for (let i = 0; i < char1Assets.length; i++) {
          for (let j = 0; j < char2Assets.length; j++) {
            tasks.push({
              left: left.name,
              right: right.name,
              img1: char1Assets[i],
              img2: char2Assets[j],
              suffix: `${i}_${j}`,
            });
          }
        }
      }
    }
  }

  const total = tasks.length;
  console.log(`Starting generation of ${total} images.`);
  const startTime = Date.now();

  for (let i = 0; i < total; i++) {
    const task = tasks[i];
    const outputImgRoot = `${task.left}_attacks_${task.right}`;
    const outFileName = `_challenges_${outputImgRoot}_${task.suffix}.png`;
    const outputImgNm = path.join(CHALLENGES_PNG_OUTPUT_FILE_PATH, outFileName);

    await composeScene(
      BACKGROUND_IMAGE_PATH,
      task.img1,
      task.img2,
      outputImgNm,
    );

    // ETA Logic inside the loop
    const current = i + 1;
    const elapsedMs = Date.now() - startTime;
    const etaMs = (elapsedMs / current) * (total - current);

    const progressPercent = ((current / total) * 100).toFixed(1);
    const etaString = formatDuration(etaMs);

    console.log(
      `[${current}/${total}] ${progressPercent}% | ETA: ${etaString} | ${outFileName}`,
    );
  }

  const finalTime = formatDuration(Date.now() - startTime);
  console.log(`Finished! Total duration: ${finalTime}`);
}

run();
