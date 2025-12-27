//@api-1.0
const MAX_BATCHES = 10;

const characterData = {
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
  characters: [
    {
      name: "white_king_on_a_white_tile",
      description: "A white king on a white tile",
      icon: "♔",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      tile: "white_tile",
      possession: "white_king",
      projectile: "dagger",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single yellow dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_king_on_a_black_tile",
      description: "A white king on a black tile",
      icon: "♔",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      tile: "black_tile",
      possession: "white_king",
      projectile: "dagger",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single yellow dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_queen_on_a_white_tile",
      description: "A white queen on a white tile",
      icon: "♕",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      tile: "white_tile",
      possession: "white_queen",
      projectile: "mace",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single yellow mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_queen_on_a_black_tile",
      description: "A white queen on a black tile",
      icon: "♕",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      tile: "black_tile",
      possession: "white_queen",
      projectile: "mace",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single yellow mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_rook_on_a_white_tile",
      description: "A white rook on a white tile",
      icon: "♖",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      tile: "white_tile",
      possession: "white_rook",
      projectile: "rc helicopter",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_rook_on_a_black_tile",
      description: "A white rook on a black tile",
      icon: "♖",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      tile: "black_tile",
      possession: "white_rook",
      projectile: "rc helicopter",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_bishop_on_a_white_tile",
      description: "A white bishop on a white tile",
      icon: "♗",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      tile: "white_tile",
      possession: "white_bishop",
      projectile: "rpg7",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_bishop_on_a_black_tile",
      description: "A white bishop on a black tile",
      icon: "♗",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      tile: "black_tile",
      possession: "white_bishop",
      projectile: "rpg7",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_knight_on_a_white_tile",
      description: "A white knight on a white tile",
      icon: "♘",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "attacking. controller in hand",
      ],
      tile: "white_tile",
      possession: "white_knight",
      projectile: "rc car",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_knight_on_a_black_tile",
      description: "A white knight on a black tile",
      icon: "♘",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "attacking. controller in hand",
      ],
      tile: "black_tile",
      possession: "white_knight",
      projectile: "rc car",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_pawn_on_a_white_tile",
      description: "A white pawn on a white tile",
      icon: "♙",
      team: "white",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      tile: "white_tile",
      possession: "white_pawn",
      projectile: "bullet",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "white_pawn_on_a_black_tile",
      description: "A white pawn on a black tile",
      icon: "♙",
      team: "white",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      tile: "black_tile",
      possession: "white_pawn",
      projectile: "bullet",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_king_on_a_white_tile",
      description: "A black king on a white tile",
      icon: "♔",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      tile: "white_tile",
      possession: "black_king",
      projectile: "dagger",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single purple dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_king_on_a_black_tile",
      description: "A black king on a black tile",
      icon: "♔",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. dagger in hand",
      ],
      tile: "black_tile",
      possession: "black_king",
      projectile: "dagger",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). dagger in hand",
        "BREAK",
        "flying projectile, (single purple dagger:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_queen_on_a_white_tile",
      description: "A black queen on a white tile",
      icon: "♕",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      tile: "white_tile",
      possession: "black_queen",
      projectile: "mace",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single purple mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_queen_on_a_black_tile",
      description: "A black queen on a black tile",
      icon: "♕",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. mace in hand",
      ],
      tile: "black_tile",
      possession: "black_queen",
      projectile: "mace",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). mace in hand",
        "BREAK",
        "flying projectile, (single purple mace:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_rook_on_a_white_tile",
      description: "A black rook on a white tile",
      icon: "♖",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      tile: "white_tile",
      possession: "black_rook",
      projectile: "rc helicopter",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_rook_on_a_black_tile",
      description: "A black rook on a black tile",
      icon: "♖",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. video game controller in hand",
      ],
      tile: "black_tile",
      possession: "black_rook",
      projectile: "rc helicopter",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc helicopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_bishop_on_a_white_tile",
      description: "A black bishop on a white tile",
      icon: "♗",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      tile: "white_tile",
      possession: "black_bishop",
      projectile: "rpg7",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_bishop_on_a_black_tile",
      description: "A black bishop on a black tile",
      icon: "♗",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. radio in hand",
      ],
      tile: "black_tile",
      possession: "black_bishop",
      projectile: "rpg7",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). radio in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_knight_on_a_white_tile",
      description: "A black knight on a white tile",
      icon: "♘",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "attacking. controller in hand",
      ],
      tile: "white_tile",
      possession: "black_knight",
      projectile: "rc car",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single purple rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_knight_on_a_black_tile",
      description: "A black knight on a black tile",
      icon: "♘",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "attacking. controller in hand",
      ],
      tile: "black_tile",
      possession: "black_knight",
      projectile: "rc car",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). controller in hand",
        "BREAK",
        "flying projectile, (single purple rc car:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_pawn_on_a_white_tile",
      description: "A black pawn on a white tile",
      icon: "♙",
      team: "black",
      prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      tile: "white_tile",
      possession: "black_pawn",
      projectile: "bullet",
      projectile_prompt: [
        "(yellow floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
    {
      name: "black_pawn_on_a_black_tile",
      description: "A black pawn on a black tile",
      icon: "♙",
      team: "black",
      prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        "attacking. rifle in hand",
      ],
      tile: "black_tile",
      possession: "black_pawn",
      projectile: "bullet",
      projectile_prompt: [
        "(purple floor:2).",
        "BREAK",
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "{male, pants|female, skirt, leggings}, shirt, (holding rifle:2), (wearing shield:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
    },
  ],
};

const prompts = [];

const negativePrompt = characterData.negative_prompt.join("\n");

let basePrompt = characterData.prompt.join("\n");

const skipCharacterNameSet = new Set([
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

for (const character of characterData.characters) {
  if (!skipCharacterNameSet.has(character.name)) {
    let characterPrompt = character.prompt.join("\n");
    prompts.push({
      prompt:
        `(characters ${character.name}:0)` +
        "\n" +
        basePrompt +
        "\n" +
        "BREAK" +
        "\n" +
        characterPrompt,
      name: character.name,
    });
    console.log(`Prepping batch generation for character ${character.name}`);
  } else {
    console.log(`Skipping batch generation for character ${character.name}`);
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
