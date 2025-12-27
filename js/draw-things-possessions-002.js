//@api-1.0
const MAX_BATCHES = 10;

const possessionData = {
  prompt: [
    "(pixel art, 8-bit, 16-bit, low resolution:3)",
    "(transparent background:2)",
  ],
  negative_prompt: [
    "photorealistic, 3d render, blurry, smooth",
    "bare legs.",
    "nudity.",
    "mutated, disfigured, deformed, malformed, extra limbs, extra fingers, too many limbs, missing limbs",
    "bad anatomy, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame",
    "blurry, blurred, watermark, grainy, signature, cut off, draft, too many feet.",
    "cross-eyed, lazy eye, dilated pupils, unnatural eyes, cataract, blind, blurry eyes,",
    "poorly drawn eyes, extra eyes, gross proportions, malformed eyelids, sunken eyes, dark circles, grainy eyes, red eyes, cyan eyes.",
  ],
  possessions: [
    {
      active: true,
      name: "white_king",
      description: "A white king",
      team: "white",
      icon: "♔",
      weapon: "dagger",
      projectile: "dagger",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. crouching. (barrel in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single yellow dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
      ],
    },
    {
      active: true,
      name: "white_queen",
      description: "A white queen",
      team: "white",
      icon: "♕",
      weapon: "mace",
      projectile: "mace",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. crouching. (table in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single yellow mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
      ],
    },
    {
      active: true,
      name: "white_rook",
      description: "A white rook",
      team: "white",
      icon: "♖",
      weapon: "rc helicopter",
      projectile: "rc helicopter",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. crouching. (barrel in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
      ],
    },
    {
      active: true,
      name: "white_bishop",
      description: "A white bishop",
      team: "white",
      icon: "♗",
      weapon: "rpg7",
      projectile: "rpg7",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. crouching. (box in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
      ],
    },
    {
      active: true,
      name: "white_knight",
      description: "A white knight",
      team: "white",
      icon: "♘",
      weapon: "rc car",
      projectile: "rc car",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "attacking. controller in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "defending. crouching. (box in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
      ],
    },
    {
      active: true,
      name: "white_pawn",
      description: "A white pawn",
      team: "white",
      icon: "♙",
      weapon: "rifle",
      projectile: "bullet",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "defending. crouching. (shield in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
      ],
    },
    {
      active: true,
      name: "black_king",
      description: "A black king",
      team: "black",
      icon: "♔",
      weapon: "dagger",
      projectile: "dagger",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. crouching. (barrel in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single purple dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
      ],
    },
    {
      active: true,
      name: "black_queen",
      description: "A black queen",
      team: "black",
      icon: "♕",
      weapon: "mace",
      projectile: "mace",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. crouching. (table in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single purple mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
      ],
    },
    {
      active: true,
      name: "black_rook",
      description: "A black rook",
      team: "black",
      icon: "♖",
      weapon: "rc helicopter",
      projectile: "rc helicopter",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. crouching. (barrel in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
      ],
    },
    {
      active: true,
      name: "black_bishop",
      description: "A black bishop",
      team: "black",
      icon: "♗",
      weapon: "rpg7",
      projectile: "rpg7",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. crouching. (box in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
      ],
    },
    {
      active: true,
      name: "black_knight",
      description: "A black knight",
      team: "black",
      icon: "♘",
      weapon: "rc car",
      projectile: "rc car",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "attacking. controller in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "defending. crouching. (box in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single purple rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
      ],
    },
    {
      active: true,
      name: "black_pawn",
      description: "A black pawn",
      team: "black",
      icon: "♙",
      weapon: "rifle",
      projectile: "bullet",
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "defending. crouching. (shield in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
      ],
    },
  ],
};

const prompts = [];

const negativePrompt = possessionData.negative_prompt.join("\n");

let basePrompt = possessionData.prompt.join("\n");
const skipPossessionNameSet = new Set([
  "black_bishop",
  "black_king",
  "black_knight",
  "black_pawn",
  "black_queen",
  "black_rook",
  "white_bishop",
  "white_king",
  "white_knight",
  "white_pawn",
  "white_queen",
  "white_rook",
]);

for (const possession of possessionData.possessions) {
  if (!skipPossessionNameSet.has(possession.name)) {
    let possessionPrompt = possession.prompt.join("\n");
    prompts.push({
      prompt:
        `(possessions ${possession.name}:0)` +
        "\n" +
        basePrompt +
        "\n" +
        "BREAK" +
        "\n" +
        possessionPrompt,
      name: possession.name,
    });
    console.log(`Prepping batch generation for possession ${possession.name}`);
  } else {
    console.log(`Skipping batch generation for possession ${possession.name}`);
  }
}

const getRemainingTime = (stats) => {
  if (stats.imagesCompleted === 0) return 0;

  const totalElapsed = (Date.now() - stats.totalStartTime) / 1000;
  const avgTimePerImage = totalElapsed / stats.imagesCompleted;
  const remainingImages = stats.totalImagesExpected - stats.imagesCompleted;

  return avgTimePerImage * remainingImages;
};

const fmtDuration = (s) => {
  const seconds = Math.max(0, s || 0);
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(days)}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
};

async function batchGenerate(logPrefix, stats) {
  console.log(
    `${logPrefix} Starting batch generation for ${prompts.length} images...`,
  );

  let successes = 0;
  let failures = 0;

  for (let i = 0; i < prompts.length && failures == 0; i++) {
    const currentPrompt = replaceWildcards(prompts[i].prompt);
    const currentName = prompts[i].name;

    const estRemaining = getRemainingTime(stats);

    try {
      const configuration = pipeline.configuration;
      let seed = Date.now() % 1000000;
      configuration.seed = parseInt(seed);
      configuration.width = 512;
      configuration.height = 768;
      configuration.faceRestoration = "restoreformer_v1.0_f16.ckpt";

      configuration.loras = [
        {
          mode: "all",
          file: "pixel_art_xl_v1.1_lora_f16.ckpt",
          weight: 0.6,
        },
      ];

      const runData = {
        configuration: configuration,
        prompt: currentPrompt,
        negativePrompt: negativePrompt,
      };

      console.log(
        `${logPrefix} Processing Image ${i + 1}/${prompts.length}, ${currentName}, ${JSON.stringify(runData)}`,
      );
      console.log(
        `${logPrefix} Processing Image ${i + 1}/${prompts.length}, ${currentName}, Est. Remaining: ${fmtDuration(estRemaining)}`,
      );

      let startTime = Date.now();
      await pipeline.run(runData);
      await canvas.clear();

      let elapsedTime = (Date.now() - startTime) / 1000;
      successes++;

      stats.imagesCompleted++;

      const updatedRemaining = getRemainingTime(stats);

      console.log(
        `${logPrefix} generated in ${elapsedTime.toFixed(2)}s, ${currentName}, Est. Remaining: ${fmtDuration(updatedRemaining)}`,
      );
    } catch (error) {
      const msg = `${logPrefix} ❌ Failed to generate image ${i + 1}: ${error.message}`;
      console.error(msg, error);
      failures++;
      throw new Error(msg);
    }
  }
}

async function batchGenerateAll() {
  const stats = {
    totalStartTime: Date.now(),
    totalImagesExpected: MAX_BATCHES * prompts.length,
    imagesCompleted: 0,
  };

  try {
    for (let i = 0; i < MAX_BATCHES; i++) {
      const batchStart = Date.now();
      console.log(`Batch processing started ${i + 1} of ${MAX_BATCHES}`);

      await batchGenerate(`${i + 1} of ${MAX_BATCHES}`, stats);

      const batchDuration = ((Date.now() - batchStart) / 1000).toFixed(2);
      console.log(`Batch ${i + 1} complete (${batchDuration}s)`);
    }

    const totalDuration = ((Date.now() - stats.totalStartTime) / 1000).toFixed(
      2,
    );
    console.log(`All batches finished in ${fmtDuration(totalDuration)} ---`);
  } catch (e) {
    console.error("Script execution failed:", e.message);
  }
}

function replaceWildcards(inputString) {
  const wildcardRegex = /{([^}]+)}/g;

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function replaceWildcard(match) {
    const options = match.slice(1, -1).split("|");
    const randomOption = getRandomItem(options);
    return randomOption;
  }

  let editedString = inputString;

  while (wildcardRegex.test(editedString)) {
    editedString = editedString.replace(wildcardRegex, replaceWildcard);
  }

  return editedString;
}

batchGenerateAll();
