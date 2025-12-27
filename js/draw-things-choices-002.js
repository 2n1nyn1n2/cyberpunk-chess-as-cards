//@api-1.0
const MAX_BATCHES = 10;

const choiceData = {
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
  choices: [
    {
      name: "white_king_on_a_white_tile_chooses_dagger",
      description: "A white king on a white tile chooses dagger",
      character_name: "white_king_on_a_white_tile",
      icon: "♔",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single yellow dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_king_on_a_white_tile",
      possession: "white_king",
    },
    {
      name: "white_king_on_a_black_tile_chooses_dagger",
      description: "A white king on a black tile chooses dagger",
      character_name: "white_king_on_a_black_tile",
      icon: "♔",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single yellow dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_king_on_a_black_tile",
      possession: "white_king",
    },
    {
      name: "white_queen_on_a_white_tile_chooses_mace",
      description: "A white queen on a white tile chooses mace",
      character_name: "white_queen_on_a_white_tile",
      icon: "♕",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single yellow mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_queen_on_a_white_tile",
      possession: "white_queen",
    },
    {
      name: "white_queen_on_a_black_tile_chooses_mace",
      description: "A white queen on a black tile chooses mace",
      character_name: "white_queen_on_a_black_tile",
      icon: "♕",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single yellow mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_queen_on_a_black_tile",
      possession: "white_queen",
    },
    {
      name: "white_rook_on_a_white_tile_chooses_rc_helicopter",
      description: "A white rook on a white tile chooses rc helicopter",
      character_name: "white_rook_on_a_white_tile",
      icon: "♖",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_rook_on_a_white_tile",
      possession: "white_rook",
    },
    {
      name: "white_rook_on_a_black_tile_chooses_rc_helicopter",
      description: "A white rook on a black tile chooses rc helicopter",
      character_name: "white_rook_on_a_black_tile",
      icon: "♖",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_rook_on_a_black_tile",
      possession: "white_rook",
    },
    {
      name: "white_bishop_on_a_white_tile_chooses_rpg7",
      description: "A white bishop on a white tile chooses rpg7",
      character_name: "white_bishop_on_a_white_tile",
      icon: "♗",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_bishop_on_a_white_tile",
      possession: "white_bishop",
    },
    {
      name: "white_bishop_on_a_black_tile_chooses_rpg7",
      description: "A white bishop on a black tile chooses rpg7",
      character_name: "white_bishop_on_a_black_tile",
      icon: "♗",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_bishop_on_a_black_tile",
      possession: "white_bishop",
    },
    {
      name: "white_knight_on_a_white_tile_chooses_rc_car",
      description: "A white knight on a white tile chooses rc car",
      character_name: "white_knight_on_a_white_tile",
      icon: "♘",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_knight_on_a_white_tile",
      possession: "white_knight",
    },
    {
      name: "white_knight_on_a_black_tile_chooses_rc_car",
      description: "A white knight on a black tile chooses rc car",
      character_name: "white_knight_on_a_black_tile",
      icon: "♘",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_knight_on_a_black_tile",
      possession: "white_knight",
    },
    {
      name: "white_pawn_on_a_white_tile_chooses_bullet",
      description: "A white pawn on a white tile chooses bullet",
      character_name: "white_pawn_on_a_white_tile",
      icon: "♙",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_pawn_on_a_white_tile",
      possession: "white_pawn",
    },
    {
      name: "white_pawn_on_a_black_tile_chooses_bullet",
      description: "A white pawn on a black tile chooses bullet",
      character_name: "white_pawn_on_a_black_tile",
      icon: "♙",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "white_pawn_on_a_black_tile",
      possession: "white_pawn",
    },
    {
      name: "black_king_on_a_white_tile_chooses_dagger",
      description: "A black king on a white tile chooses dagger",
      character_name: "black_king_on_a_white_tile",
      icon: "♔",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single purple dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_king_on_a_white_tile",
      possession: "black_king",
    },
    {
      name: "black_king_on_a_black_tile_chooses_dagger",
      description: "A black king on a black tile chooses dagger",
      character_name: "black_king_on_a_black_tile",
      icon: "♔",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single purple dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_king_on_a_black_tile",
      possession: "black_king",
    },
    {
      name: "black_queen_on_a_white_tile_chooses_mace",
      description: "A black queen on a white tile chooses mace",
      character_name: "black_queen_on_a_white_tile",
      icon: "♕",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single purple mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_queen_on_a_white_tile",
      possession: "black_queen",
    },
    {
      name: "black_queen_on_a_black_tile_chooses_mace",
      description: "A black queen on a black tile chooses mace",
      character_name: "black_queen_on_a_black_tile",
      icon: "♕",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single purple mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_queen_on_a_black_tile",
      possession: "black_queen",
    },
    {
      name: "black_rook_on_a_white_tile_chooses_rc_helicopter",
      description: "A black rook on a white tile chooses rc helicopter",
      character_name: "black_rook_on_a_white_tile",
      icon: "♖",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_rook_on_a_white_tile",
      possession: "black_rook",
    },
    {
      name: "black_rook_on_a_black_tile_chooses_rc_helicopter",
      description: "A black rook on a black tile chooses rc helicopter",
      character_name: "black_rook_on_a_black_tile",
      icon: "♖",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_rook_on_a_black_tile",
      possession: "black_rook",
    },
    {
      name: "black_bishop_on_a_white_tile_chooses_rpg7",
      description: "A black bishop on a white tile chooses rpg7",
      character_name: "black_bishop_on_a_white_tile",
      icon: "♗",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_bishop_on_a_white_tile",
      possession: "black_bishop",
    },
    {
      name: "black_bishop_on_a_black_tile_chooses_rpg7",
      description: "A black bishop on a black tile chooses rpg7",
      character_name: "black_bishop_on_a_black_tile",
      icon: "♗",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_bishop_on_a_black_tile",
      possession: "black_bishop",
    },
    {
      name: "black_knight_on_a_white_tile_chooses_rc_car",
      description: "A black knight on a white tile chooses rc car",
      character_name: "black_knight_on_a_white_tile",
      icon: "♘",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single purple rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_knight_on_a_white_tile",
      possession: "black_knight",
    },
    {
      name: "black_knight_on_a_black_tile_chooses_rc_car",
      description: "A black knight on a black tile chooses rc car",
      character_name: "black_knight_on_a_black_tile",
      icon: "♘",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single purple rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_knight_on_a_black_tile",
      possession: "black_knight",
    },
    {
      name: "black_pawn_on_a_white_tile_chooses_bullet",
      description: "A black pawn on a white tile chooses bullet",
      character_name: "black_pawn_on_a_white_tile",
      icon: "♙",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_pawn_on_a_white_tile",
      possession: "black_pawn",
    },
    {
      name: "black_pawn_on_a_black_tile_chooses_bullet",
      description: "A black pawn on a black tile chooses bullet",
      character_name: "black_pawn_on_a_black_tile",
      icon: "♙",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      character: "black_pawn_on_a_black_tile",
      possession: "black_pawn",
    },
  ],
};

const prompts = [];

const negativePrompt = choiceData.negative_prompt.join("\n");

let basePrompt = choiceData.prompt.join("\n");

const skipChallengeNameSet = new Set([
  "black_bishop_on_a_black_tile_chooses_rpg7",
  "black_bishop_on_a_white_tile_chooses_rpg7",
  "black_king_on_a_black_tile_chooses_dagger",
  "black_king_on_a_white_tile_chooses_dagger",
  "black_knight_on_a_black_tile_chooses_rc_car",
  "black_knight_on_a_white_tile_chooses_rc_car",
  "black_pawn_on_a_black_tile_chooses_bullet",
  "black_pawn_on_a_white_tile_chooses_bullet",
  "black_queen_on_a_black_tile_chooses_mace",
  "black_queen_on_a_white_tile_chooses_mace",
  "black_rook_on_a_black_tile_chooses_rc_helicopter",
  "black_rook_on_a_white_tile_chooses_rc_helicopter",
  "white_bishop_on_a_black_tile_chooses_rpg7",
  "white_bishop_on_a_white_tile_chooses_rpg7",
  "white_king_on_a_black_tile_chooses_dagger",
  "white_king_on_a_white_tile_chooses_dagger",
  "white_knight_on_a_black_tile_chooses_rc_car",
  "white_knight_on_a_white_tile_chooses_rc_car",
  "white_pawn_on_a_black_tile_chooses_bullet",
  "white_pawn_on_a_white_tile_chooses_bullet",
  "white_queen_on_a_black_tile_chooses_mace",
  "white_queen_on_a_white_tile_chooses_mace",
  "white_rook_on_a_black_tile_chooses_rc_helicopter",
  "white_rook_on_a_white_tile_chooses_rc_helicopter",
]);

for (const choice of choiceData.choices) {
  if (!skipChallengeNameSet.has(choice.name)) {
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
      configuration.width = 1024;
      configuration.height = 1024;
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
