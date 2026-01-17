//@api-1.0
const MAX_BATCHES = 1;

const choiceData = {
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
  choices: [
    {
      name: "white_king_on_a_white_tile_chooses_sword",
      description: "A white king on a white tile chooses sword",
      character_name: "white_king_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess king in the background.",
        "(yellow sword in hand:2)",
      ],
      character: "white_king_on_a_white_tile",
      possession: "white_king",
    },
    {
      name: "white_king_on_a_black_tile_chooses_sword",
      description: "A white king on a black tile chooses sword",
      character_name: "white_king_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess king in the background.",
        "(yellow sword in hand:2)",
      ],
      character: "white_king_on_a_black_tile",
      possession: "white_king",
    },
    {
      name: "white_queen_on_a_white_tile_chooses_sceptre",
      description: "A white queen on a white tile chooses sceptre",
      character_name: "white_queen_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess queen in the background.",
        "(yellow sceptre in hand:2)",
      ],
      character: "white_queen_on_a_white_tile",
      possession: "white_queen",
    },
    {
      name: "white_queen_on_a_black_tile_chooses_sceptre",
      description: "A white queen on a black tile chooses sceptre",
      character_name: "white_queen_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess queen in the background.",
        "(yellow sceptre in hand:2)",
      ],
      character: "white_queen_on_a_black_tile",
      possession: "white_queen",
    },
    {
      name: "white_rook_on_a_white_tile_chooses_rc_quadcopter",
      description: "A white rook on a white tile chooses rc quadcopter",
      character_name: "white_rook_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess rook in the background.",
        "(yellow video game controller in hand:2)",
      ],
      character: "white_rook_on_a_white_tile",
      possession: "white_rook",
    },
    {
      name: "white_rook_on_a_black_tile_chooses_rc_quadcopter",
      description: "A white rook on a black tile chooses rc quadcopter",
      character_name: "white_rook_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess rook in the background.",
        "(yellow video game controller in hand:2)",
      ],
      character: "white_rook_on_a_black_tile",
      possession: "white_rook",
    },
    {
      name: "white_bishop_on_a_white_tile_chooses_rpg7",
      description: "A white bishop on a white tile chooses rpg7",
      character_name: "white_bishop_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess bishop in the background.",
        "(yellow rpg7 in hand:2)",
      ],
      character: "white_bishop_on_a_white_tile",
      possession: "white_bishop",
    },
    {
      name: "white_bishop_on_a_black_tile_chooses_rpg7",
      description: "A white bishop on a black tile chooses rpg7",
      character_name: "white_bishop_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess bishop in the background.",
        "(yellow rpg7 in hand:2)",
      ],
      character: "white_bishop_on_a_black_tile",
      possession: "white_bishop",
    },
    {
      name: "white_knight_on_a_white_tile_chooses_grenade",
      description: "A white knight on a white tile chooses grenade",
      character_name: "white_knight_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess knight in the background.",
        "(yellow grenade in hand:2)",
      ],
      character: "white_knight_on_a_white_tile",
      possession: "white_knight",
    },
    {
      name: "white_knight_on_a_black_tile_chooses_grenade",
      description: "A white knight on a black tile chooses grenade",
      character_name: "white_knight_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess knight in the background.",
        "(yellow grenade in hand:2)",
      ],
      character: "white_knight_on_a_black_tile",
      possession: "white_knight",
    },
    {
      name: "white_pawn_on_a_white_tile_chooses_bullet",
      description: "A white pawn on a white tile chooses bullet",
      character_name: "white_pawn_on_a_white_tile",
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
        "attacking. jumping.",
        "white chess pawn in the background.",
        "(yellow rifle in hand:2)",
      ],
      character: "white_pawn_on_a_white_tile",
      possession: "white_pawn",
    },
    {
      name: "white_pawn_on_a_black_tile_chooses_bullet",
      description: "A white pawn on a black tile chooses bullet",
      character_name: "white_pawn_on_a_black_tile",
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
        "attacking. jumping.",
        "white chess pawn in the background.",
        "(yellow rifle in hand:2)",
      ],
      character: "white_pawn_on_a_black_tile",
      possession: "white_pawn",
    },
    {
      name: "black_king_on_a_white_tile_chooses_sword",
      description: "A black king on a white tile chooses sword",
      character_name: "black_king_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess king in the background.",
        "(purple sword in hand:2)",
      ],
      character: "black_king_on_a_white_tile",
      possession: "black_king",
    },
    {
      name: "black_king_on_a_black_tile_chooses_sword",
      description: "A black king on a black tile chooses sword",
      character_name: "black_king_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess king in the background.",
        "(purple sword in hand:2)",
      ],
      character: "black_king_on_a_black_tile",
      possession: "black_king",
    },
    {
      name: "black_queen_on_a_white_tile_chooses_sceptre",
      description: "A black queen on a white tile chooses sceptre",
      character_name: "black_queen_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess queen in the background.",
        "(purple sceptre in hand:2)",
      ],
      character: "black_queen_on_a_white_tile",
      possession: "black_queen",
    },
    {
      name: "black_queen_on_a_black_tile_chooses_sceptre",
      description: "A black queen on a black tile chooses sceptre",
      character_name: "black_queen_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess queen in the background.",
        "(purple sceptre in hand:2)",
      ],
      character: "black_queen_on_a_black_tile",
      possession: "black_queen",
    },
    {
      name: "black_rook_on_a_white_tile_chooses_rc_quadcopter",
      description: "A black rook on a white tile chooses rc quadcopter",
      character_name: "black_rook_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess rook in the background.",
        "(purple video game controller in hand:2)",
      ],
      character: "black_rook_on_a_white_tile",
      possession: "black_rook",
    },
    {
      name: "black_rook_on_a_black_tile_chooses_rc_quadcopter",
      description: "A black rook on a black tile chooses rc quadcopter",
      character_name: "black_rook_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess rook in the background.",
        "(purple video game controller in hand:2)",
      ],
      character: "black_rook_on_a_black_tile",
      possession: "black_rook",
    },
    {
      name: "black_bishop_on_a_white_tile_chooses_rpg7",
      description: "A black bishop on a white tile chooses rpg7",
      character_name: "black_bishop_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess bishop in the background.",
        "(purple rpg7 in hand:2)",
      ],
      character: "black_bishop_on_a_white_tile",
      possession: "black_bishop",
    },
    {
      name: "black_bishop_on_a_black_tile_chooses_rpg7",
      description: "A black bishop on a black tile chooses rpg7",
      character_name: "black_bishop_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess bishop in the background.",
        "(purple rpg7 in hand:2)",
      ],
      character: "black_bishop_on_a_black_tile",
      possession: "black_bishop",
    },
    {
      name: "black_knight_on_a_white_tile_chooses_grenade",
      description: "A black knight on a white tile chooses grenade",
      character_name: "black_knight_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess knight in the background.",
        "(purple grenade in hand:2)",
      ],
      character: "black_knight_on_a_white_tile",
      possession: "black_knight",
    },
    {
      name: "black_knight_on_a_black_tile_chooses_grenade",
      description: "A black knight on a black tile chooses grenade",
      character_name: "black_knight_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess knight in the background.",
        "(purple grenade in hand:2)",
      ],
      character: "black_knight_on_a_black_tile",
      possession: "black_knight",
    },
    {
      name: "black_pawn_on_a_white_tile_chooses_bullet",
      description: "A black pawn on a white tile chooses bullet",
      character_name: "black_pawn_on_a_white_tile",
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
        "attacking. jumping.",
        "black chess pawn in the background.",
        "(purple rifle in hand:2)",
      ],
      character: "black_pawn_on_a_white_tile",
      possession: "black_pawn",
    },
    {
      name: "black_pawn_on_a_black_tile_chooses_bullet",
      description: "A black pawn on a black tile chooses bullet",
      character_name: "black_pawn_on_a_black_tile",
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
        "attacking. jumping.",
        "black chess pawn in the background.",
        "(purple rifle in hand:2)",
      ],
      character: "black_pawn_on_a_black_tile",
      possession: "black_pawn",
    },
  ],
};

const prompts = [];

const negativePrompt = choiceData.negative_prompt.join("\n");

let basePrompt = choiceData.prompt.join("\n");

const skipChoiceNameSet = new Set([
  "black_bishop_on_a_black_tile_chooses_rpg7",
  "black_bishop_on_a_white_tile_chooses_rpg7",
  "black_king_on_a_black_tile_chooses_sword",
  "black_king_on_a_white_tile_chooses_sword",
  "black_knight_on_a_black_tile_chooses_grenade",
  "black_knight_on_a_white_tile_chooses_grenade",
  "black_pawn_on_a_black_tile_chooses_bullet",
  "black_pawn_on_a_white_tile_chooses_bullet",
  "black_queen_on_a_black_tile_chooses_sceptre",
  "black_queen_on_a_white_tile_chooses_sceptre",
  "black_rook_on_a_black_tile_chooses_rc_quadcopter",
  "black_rook_on_a_white_tile_chooses_rc_quadcopter",
  "white_bishop_on_a_black_tile_chooses_rpg7",
  "white_bishop_on_a_white_tile_chooses_rpg7",
  "white_king_on_a_black_tile_chooses_sword",
  "white_king_on_a_white_tile_chooses_sword",
  "white_knight_on_a_black_tile_chooses_grenade",
  "white_knight_on_a_white_tile_chooses_grenade",
  "white_pawn_on_a_black_tile_chooses_bullet",
  "white_pawn_on_a_white_tile_chooses_bullet",
  "white_queen_on_a_black_tile_chooses_sceptre",
  "white_queen_on_a_white_tile_chooses_sceptre",
  "white_rook_on_a_black_tile_chooses_rc_quadcopter",
  "white_rook_on_a_white_tile_chooses_rc_quadcopter",
]);

for (const choice of choiceData.choices) {
  if (!skipChoiceNameSet.has(choice.name)) {
    let choicePrompt = choice.prompt.join("\n");
    prompts.push({
      prompt:
        `(choices ${choice.name}:0)` +
        "\n" +
        basePrompt +
        "\n" +
        "BREAK" +
        "\n" +
        choicePrompt,
      name: choice.name,
    });
    console.log(`Prepping batch generation for choice ${choice.name}`);
  } else {
    console.log(`Skipping batch generation for choice ${choice.name}`);
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
      configuration.height = 384;
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
