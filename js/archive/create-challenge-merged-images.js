import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";

const BACKGROUND_IMAGE_PATH = "assets/scenes/starting-locations.png";
const CHARACTERS_JSON_INPUT_FILE_PATH = "./data/characters.json";
const CHALLENGES_PNG_OUTPUT_FILE_PATH = "./assets/challenges-pre-img2img";

const charactersData = JSON.parse(
  fs.readFileSync(CHARACTERS_JSON_INPUT_FILE_PATH, "utf8"),
);

const mainCanvas = createCanvas(1024, 1024);
const mainCtx = mainCanvas.getContext("2d");
const tempCanvas = createCanvas(1024, 1024);
const tempCtx = tempCanvas.getContext("2d");
const maskCanvas = createCanvas(1024, 1024);
const maskCtx = maskCanvas.getContext("2d");

async function composeScene(bgImg, char1ImgNm, char2ImgNm, outputImgNm) {
  const char1Img = await loadImage(char1ImgNm);
  const char2Img = await loadImage(char2ImgNm);

  mainCtx.clearRect(0, 0, 1024, 1024);

  mainCtx.drawImage(bgImg, 0, 0, 1024, 1024);

  const scale = 0.8;
  const drawW = 768 * scale;
  const drawH = 1152 * scale;
  const yPos = (1024 - drawH) / 2;
  const leftX = 1024 / 4 - drawW / 2;
  const rightX = (3 * 1024) / 4 - drawW / 2;

  drawStrippedImage(mainCtx, char1Img, leftX, yPos, drawW, drawH);
  drawStrippedImage(mainCtx, char2Img, rightX, yPos, drawW, drawH);

  const buffer = mainCanvas.toBuffer("image/png");
  fs.writeFileSync(outputImgNm, buffer);
}

function drawStrippedImage(targetCtx, img, x, y, width, height) {
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  maskCanvas.width = img.width;
  maskCanvas.height = img.height;

  tempCtx.drawImage(img, 0, 0);
  const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  const maskData = maskCtx.createImageData(img.width, img.height);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const isCyan =
      g - r > 30 && b - r > 30 && Math.abs(g - b) < 20 && g + b > 50;

    if (isCyan) {
      data[i + 3] = 0;
    } else {
      maskData.data[i + 3] = 255;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  maskCtx.putImageData(maskData, 0, 0);

  targetCtx.save();
  targetCtx.globalCompositeOperation = "destination-out";
  targetCtx.filter = "blur(10px)";
  targetCtx.drawImage(maskCanvas, x, y, width, height);
  targetCtx.restore();

  targetCtx.drawImage(tempCanvas, x, y, width, height);
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
  const bgImg = await loadImage(BACKGROUND_IMAGE_PATH);

  for (let i = 0; i < total; i++) {
    const task = tasks[i];
    const outputImgRoot = `${task.left}_attacks_${task.right}`;
    const outFileName = `_challenges_${outputImgRoot}_0__${task.suffix}.png`;
    const outputImgNm = path.join(CHALLENGES_PNG_OUTPUT_FILE_PATH, outFileName);

    await composeScene(bgImg, task.img1, task.img2, outputImgNm);

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
