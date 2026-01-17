//@api-1.0
const MAX_BATCHES = 1;

const challengeData = {
  prompt: [
    "(on a solid flat lime green background, isolated, flat lighting, overcast lighting, 2D flat color, no shadows:3)",
  ],
  negative_prompt: [
    "bare legs.",
    "nudity.",
    "shadows.",
    "mutated, disfigured, deformed, malformed, extra limbs, extra fingers, too many limbs, missing limbs",
    "bad anatomy, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame",
    "blurry, blurred, watermark, grainy, signature, cut off, draft, too many feet.",
    "cross-eyed, lazy eye, dilated pupils, unnatural eyes, cataract, blind, blurry eyes,",
    "poorly drawn eyes, extra eyes, gross proportions, malformed eyelids, sunken eyes, dark circles, grainy eyes, red eyes, green eyes.",
  ],
  challenges: [
    {
      name: "white_king_on_a_white_tile",
      description: "A white king on a white tile",
      icon: "K",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind yellow ornate forcefield:2)",
        "white chess king in the background.",
        "(yellow ornate forcefield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_king",
    },
    {
      name: "white_king_on_a_black_tile",
      description: "A white king on a black tile",
      icon: "k",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind yellow ornate forcefield:2)",
        "white chess king in the background.",
        "(yellow ornate forcefield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_king",
    },
    {
      name: "white_queen_on_a_white_tile",
      description: "A white queen on a white tile",
      icon: "Q",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind yellow pretty forcefield:2)",
        "white chess queen in the background.",
        "(yellow pretty forcefield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_queen",
    },
    {
      name: "white_queen_on_a_black_tile",
      description: "A white queen on a black tile",
      icon: "q",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind yellow pretty forcefield:2)",
        "white chess queen in the background.",
        "(yellow pretty forcefield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_queen",
    },
    {
      name: "white_rook_on_a_white_tile",
      description: "A white rook on a white tile",
      icon: "R",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind yellow battlements:2)",
        "white chess rook in the background.",
        "(yellow battlements in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_rook",
    },
    {
      name: "white_rook_on_a_black_tile",
      description: "A white rook on a black tile",
      icon: "r",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind yellow battlements:2)",
        "white chess rook in the background.",
        "(yellow battlements in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_rook",
    },
    {
      name: "white_bishop_on_a_white_tile",
      description: "A white bishop on a white tile",
      icon: "B",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind yellow large cargo container:2)",
        "white chess bishop in the background.",
        "(yellow large cargo container in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_bishop",
    },
    {
      name: "white_bishop_on_a_black_tile",
      description: "A white bishop on a black tile",
      icon: "b",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind yellow large cargo container:2)",
        "white chess bishop in the background.",
        "(yellow large cargo container in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_bishop",
    },
    {
      name: "white_knight_on_a_white_tile",
      description: "A white knight on a white tile",
      icon: "N",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "defending. (crouching behind yellow hedge:2)",
        "white chess knight in the background.",
        "(yellow hedge in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_knight",
    },
    {
      name: "white_knight_on_a_black_tile",
      description: "A white knight on a black tile",
      icon: "n",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "defending. (crouching behind yellow hedge:2)",
        "white chess knight in the background.",
        "(yellow hedge in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_knight",
    },
    {
      name: "white_pawn_on_a_white_tile",
      description: "A white pawn on a white tile",
      icon: "P",
      team: "white",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind yellow forcefield shield:2)",
        "white chess pawn in the background.",
        "(yellow forcefield shield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "white_pawn",
    },
    {
      name: "white_pawn_on_a_black_tile",
      description: "A white pawn on a black tile",
      icon: "p",
      team: "white",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind yellow forcefield shield:2)",
        "white chess pawn in the background.",
        "(yellow forcefield shield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "white_pawn",
    },
    {
      name: "black_king_on_a_white_tile",
      description: "A black king on a white tile",
      icon: "L",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind purple ornate forcefield:2)",
        "black chess king in the background.",
        "(purple ornate forcefield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_king",
    },
    {
      name: "black_king_on_a_black_tile",
      description: "A black king on a black tile",
      icon: "l",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind purple ornate forcefield:2)",
        "black chess king in the background.",
        "(purple ornate forcefield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_king",
    },
    {
      name: "black_queen_on_a_white_tile",
      description: "A black queen on a white tile",
      icon: "W",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind purple pretty forcefield:2)",
        "black chess queen in the background.",
        "(purple pretty forcefield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_queen",
    },
    {
      name: "black_queen_on_a_black_tile",
      description: "A black queen on a black tile",
      icon: "w",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind purple pretty forcefield:2)",
        "black chess queen in the background.",
        "(purple pretty forcefield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_queen",
    },
    {
      name: "black_rook_on_a_white_tile",
      description: "A black rook on a white tile",
      icon: "T",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind purple battlements:2)",
        "black chess rook in the background.",
        "(purple battlements in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_rook",
    },
    {
      name: "black_rook_on_a_black_tile",
      description: "A black rook on a black tile",
      icon: "t",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind purple battlements:2)",
        "black chess rook in the background.",
        "(purple battlements in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_rook",
    },
    {
      name: "black_bishop_on_a_white_tile",
      description: "A black bishop on a white tile",
      icon: "V",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind purple large cargo container:2)",
        "black chess bishop in the background.",
        "(purple large cargo container in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_bishop",
    },
    {
      name: "black_bishop_on_a_black_tile",
      description: "A black bishop on a black tile",
      icon: "v",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind purple large cargo container:2)",
        "black chess bishop in the background.",
        "(purple large cargo container in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_bishop",
    },
    {
      name: "black_knight_on_a_white_tile",
      description: "A black knight on a white tile",
      icon: "M",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "defending. (crouching behind purple hedge:2)",
        "black chess knight in the background.",
        "(purple hedge in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_knight",
    },
    {
      name: "black_knight_on_a_black_tile",
      description: "A black knight on a black tile",
      icon: "m",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "defending. (crouching behind purple hedge:2)",
        "black chess knight in the background.",
        "(purple hedge in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_knight",
    },
    {
      name: "black_pawn_on_a_white_tile",
      description: "A black pawn on a white tile",
      icon: "O",
      team: "black",
      prompt: [
        "(yellow tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind purple forcefield shield:2)",
        "black chess pawn in the background.",
        "(purple forcefield shield in the foreground:2)",
      ],
      tile: "white_tile",
      possession: "black_pawn",
    },
    {
      name: "black_pawn_on_a_black_tile",
      description: "A black pawn on a black tile",
      icon: "o",
      team: "black",
      prompt: [
        "(purple tile floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind purple forcefield shield:2)",
        "black chess pawn in the background.",
        "(purple forcefield shield in the foreground:2)",
      ],
      tile: "black_tile",
      possession: "black_pawn",
    },
  ],
};

const prompts = [];

const negativePrompt = challengeData.negative_prompt.join("\n");

let basePrompt = challengeData.prompt.join("\n");

const skipChallengeNameSet = new Set([
  "black_bishop_on_a_black_tile",
  "black_bishop_on_a_white_tile",
  "black_king_on_a_black_tile",
  "black_king_on_a_white_tile",
  "black_knight_on_a_black_tile",
  "black_knight_on_a_white_tile",
  "black_pawn_on_a_black_tile",
  "black_pawn_on_a_white_tile",
  "black_queen_on_a_black_tile",
  "black_queen_on_a_white_tile",
  "black_rook_on_a_black_tile",
  "black_rook_on_a_white_tile",
  "white_bishop_on_a_black_tile",
  "white_bishop_on_a_white_tile",
  "white_king_on_a_black_tile",
  "white_king_on_a_white_tile",
  "white_knight_on_a_black_tile",
  "white_knight_on_a_white_tile",
  "white_pawn_on_a_black_tile",
  "white_pawn_on_a_white_tile",
  "white_queen_on_a_black_tile",
  "white_queen_on_a_white_tile",
  "white_rook_on_a_black_tile",
  "white_rook_on_a_white_tile",
]);

for (const challenge of challengeData.challenges) {
  if (!skipChallengeNameSet.has(challenge.name)) {
    let challengePrompt = challenge.prompt.join("\n");
    prompts.push({
      prompt:
        `(challenges ${challenge.name}:0)` +
        "\n" +
        basePrompt +
        "\n" +
        "BREAK" +
        "\n" +
        challengePrompt,
      name: challenge.name,
    });
    console.log(`Prepping batch generation for challenge ${challenge.name}`);
  } else {
    console.log(`Skipping batch generation for challenge ${challenge.name}`);
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
      configuration.width = 256;
      configuration.height = 256;
      configuration.batchSize = 4;
      configuration.faceRestoration = "restoreformer_v1.0_f16.ckpt";

      // configuration.loras = [
      //   {
      //     mode: "all",
      //     file: "pixel_art_xl_v1.1_lora_f16.ckpt",
      //     weight: 0.6,
      //   },
      // ];

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
