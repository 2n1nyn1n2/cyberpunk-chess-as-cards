//@api-1.0
const MAX_BATCHES = 1;

const possessionData = {
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
  possessions: [
    {
      active: true,
      name: "white_king",
      description: "A white king",
      team: "white",
      icon: {
        white_team: "k",
        black_team: "l",
      },
      weapon: "sword",
      projectile: "sword",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "standing. waiting.",
        "white chess king in the background.",
        "(yellow sword in hand:2)",
        "(yellow ornate forcefield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. jumping.",
        "white chess king in the background.",
        "(yellow sword in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind yellow ornate forcefield:2)",
        "white chess king in the background.",
        "(yellow ornate forcefield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "captured. sitting.",
        "white chess king in the background.",
        "(yellow sword on the ground in the foreground:2)",
        "(yellow ornate forcefield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). sword in hand",
        "BREAK",
        "flying projectile, (single yellow sword:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
      ],
    },
    {
      active: true,
      name: "white_queen",
      description: "A white queen",
      team: "white",
      icon: {
        white_team: "q",
        black_team: "w",
      },
      weapon: "sceptre",
      projectile: "sceptre",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "standing. waiting.",
        "white chess queen in the background.",
        "(yellow sceptre in hand:2)",
        "(yellow pretty forcefield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. jumping.",
        "white chess queen in the background.",
        "(yellow sceptre in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind yellow pretty forcefield:2)",
        "white chess queen in the background.",
        "(yellow pretty forcefield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "captured. sitting.",
        "white chess queen in the background.",
        "(yellow sceptre on the ground in the foreground:2)",
        "(yellow pretty forcefield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). sceptre in hand",
        "BREAK",
        "flying projectile, (single yellow sceptre:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
      ],
    },
    {
      active: true,
      name: "white_rook",
      description: "A white rook",
      team: "white",
      icon: {
        white_team: "r",
        black_team: "t",
      },
      weapon: "rc quadcopter",
      projectile: "rc quadcopter",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "standing. waiting.",
        "white chess rook in the background.",
        "(yellow video game controller in hand:2)",
        "(yellow battlements in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. jumping.",
        "white chess rook in the background.",
        "(yellow video game controller in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind yellow battlements:2)",
        "white chess rook in the background.",
        "(yellow battlements in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "captured. sitting.",
        "white chess rook in the background.",
        "(yellow rc quadcopter on the ground in the foreground:2)",
        "(yellow video game controller on the ground in the foreground:2)",
        "(yellow battlements on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single yellow rc quadcopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
      ],
    },
    {
      active: true,
      name: "white_bishop",
      description: "A white bishop",
      team: "white",
      icon: {
        white_team: "b",
        black_team: "v",
      },
      weapon: "rpg7",
      projectile: "rpg7",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "standing. waiting.",
        "white chess bishop in the background.",
        "(yellow rpg7 in hand:2)",
        "(yellow large cargo container in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. jumping.",
        "white chess bishop in the background.",
        "(yellow rpg7 in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind yellow large cargo container:2)",
        "white chess bishop in the background.",
        "(yellow large cargo container in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "captured. sitting.",
        "white chess bishop in the background.",
        "(yellow rpg7 on the ground in the foreground:2)",
        "(yellow large cargo container on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rpg7 in hand",
        "BREAK",
        "flying projectile, (single yellow rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
      ],
    },
    {
      active: true,
      name: "white_knight",
      description: "A white knight",
      team: "white",
      icon: {
        white_team: "n",
        black_team: "m",
      },
      weapon: "grenade",
      projectile: "grenade",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "standing. waiting.",
        "white chess knight in the background.",
        "(yellow grenade in hand:2)",
        "(yellow hedge in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "attacking. jumping.",
        "white chess knight in the background.",
        "(yellow grenade in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "defending. (crouching behind yellow hedge:2)",
        "white chess knight in the background.",
        "(yellow hedge in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        "captured. sitting.",
        "white chess knight in the background.",
        "(yellow grenade on the ground in the foreground:2)",
        "(yellow hedge on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). grenade in hand",
        "BREAK",
        "flying projectile, (single yellow grenade:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {yellow} wings:2)",
      ],
    },
    {
      active: true,
      name: "white_pawn",
      description: "A white pawn",
      team: "white",
      icon: {
        white_team: "p",
        black_team: "o",
      },
      weapon: "rifle",
      projectile: "bullet",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "standing. waiting.",
        "white chess pawn in the background.",
        "(yellow rifle in hand:2)",
        "(yellow forcefield shield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "attacking. jumping.",
        "white chess pawn in the background.",
        "(yellow rifle in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind yellow forcefield shield:2)",
        "white chess pawn in the background.",
        "(yellow forcefield shield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "captured. sitting.",
        "white chess pawn in the background.",
        "(yellow rifle on the ground in the foreground:2)",
        "(yellow forcefield shield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single yellow bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {yellow} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
      ],
    },
    {
      active: true,
      name: "black_king",
      description: "A black king",
      team: "black",
      icon: {
        white_team: "k",
        black_team: "l",
      },
      weapon: "sword",
      projectile: "sword",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "standing. waiting.",
        "black chess king in the background.",
        "(purple sword in hand:2)",
        "(purple ornate forcefield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "attacking. jumping.",
        "black chess king in the background.",
        "(purple sword in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "defending. (crouching behind purple ornate forcefield:2)",
        "black chess king in the background.",
        "(purple ornate forcefield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        "captured. sitting.",
        "black chess king in the background.",
        "(purple sword on the ground in the foreground:2)",
        "(purple ornate forcefield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). sword in hand",
        "BREAK",
        "flying projectile, (single purple sword:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(king's crown:2), middle aged, male, pants, shirt, leather jacket with a hood, beard.",
      ],
    },
    {
      active: true,
      name: "black_queen",
      description: "A black queen",
      team: "black",
      icon: {
        white_team: "q",
        black_team: "w",
      },
      weapon: "sceptre",
      projectile: "sceptre",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "standing. waiting.",
        "black chess queen in the background.",
        "(purple sceptre in hand:2)",
        "(purple pretty forcefield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "attacking. jumping.",
        "black chess queen in the background.",
        "(purple sceptre in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "defending. (crouching behind purple pretty forcefield:2)",
        "black chess queen in the background.",
        "(purple pretty forcefield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        "captured. sitting.",
        "black chess queen in the background.",
        "(purple sceptre on the ground in the foreground:2)",
        "(purple pretty forcefield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). sceptre in hand",
        "BREAK",
        "flying projectile, (single purple sceptre:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "(queen's crown:2), female, long dress, shirt, leather jacket.",
      ],
    },
    {
      active: true,
      name: "black_rook",
      description: "A black rook",
      team: "black",
      icon: {
        white_team: "r",
        black_team: "t",
      },
      weapon: "rc quadcopter",
      projectile: "rc quadcopter",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "standing. waiting.",
        "black chess rook in the background.",
        "(purple video game controller in hand:2)",
        "(purple battlements in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "attacking. jumping.",
        "black chess rook in the background.",
        "(purple video game controller in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "defending. (crouching behind purple battlements:2)",
        "black chess rook in the background.",
        "(purple battlements in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        "captured. sitting.",
        "black chess rook in the background.",
        "(purple rc quadcopter on the ground in the foreground:2)",
        "(purple video game controller on the ground in the foreground:2)",
        "(purple battlements on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). video game controller in hand",
        "BREAK",
        "flying projectile, (single purple rc quadcopter:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, soft cap, (sunglasses:2)",
      ],
    },
    {
      active: true,
      name: "black_bishop",
      description: "A black bishop",
      team: "black",
      icon: {
        white_team: "b",
        black_team: "v",
      },
      weapon: "rpg7",
      projectile: "rpg7",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "standing. waiting.",
        "black chess bishop in the background.",
        "(purple rpg7 in hand:2)",
        "(purple large cargo container in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "attacking. jumping.",
        "black chess bishop in the background.",
        "(purple rpg7 in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "defending. (crouching behind purple large cargo container:2)",
        "black chess bishop in the background.",
        "(purple large cargo container in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        "captured. sitting.",
        "black chess bishop in the background.",
        "(purple rpg7 on the ground in the foreground:2)",
        "(purple large cargo container on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rpg7 in hand",
        "BREAK",
        "flying projectile, (single purple rpg7:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack:2)",
      ],
    },
    {
      active: true,
      name: "black_knight",
      description: "A black knight",
      team: "black",
      icon: {
        white_team: "n",
        black_team: "m",
      },
      weapon: "grenade",
      projectile: "grenade",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "standing. waiting.",
        "black chess knight in the background.",
        "(purple grenade in hand:2)",
        "(purple hedge in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "attacking. jumping.",
        "black chess knight in the background.",
        "(purple grenade in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "defending. (crouching behind purple hedge:2)",
        "black chess knight in the background.",
        "(purple hedge in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        "captured. sitting.",
        "black chess knight in the background.",
        "(purple grenade on the ground in the foreground:2)",
        "(purple hedge on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). grenade in hand",
        "BREAK",
        "flying projectile, (single purple grenade:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt, (backpack with {purple} wings:2)",
      ],
    },
    {
      active: true,
      name: "black_pawn",
      description: "A black pawn",
      team: "black",
      icon: {
        white_team: "p",
        black_team: "o",
      },
      weapon: "rifle",
      projectile: "bullet",
      standing_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "standing. waiting.",
        "black chess pawn in the background.",
        "(purple rifle in hand:2)",
        "(purple forcefield shield in the foreground:2)",
      ],
      attacking_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "attacking. jumping.",
        "black chess pawn in the background.",
        "(purple rifle in hand:2)",
      ],
      defending_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "defending. (crouching behind purple forcefield shield:2)",
        "black chess pawn in the background.",
        "(purple forcefield shield in the foreground:2)",
      ],
      captured_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        "captured. sitting.",
        "black chess pawn in the background.",
        "(purple rifle on the ground in the foreground:2)",
        "(purple forcefield shield on the ground in the foreground:2)",
      ],
      projectile_prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
        ", (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). rifle in hand",
        "BREAK",
        "flying projectile, (single purple bullet:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)",
      ],
      max: 1,
      prompt: [
        "The centerpiece of the image is the full body shot of a single person (wearing all {purple} clothes:2)",
        "The style is cyberpunk noir. ",
        "Futuristic.",
        "realistic skin tones. natural colors.",
        "{male, pants|female, skirt, leggings}, shirt",
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
    let possessionPrompt = possession.captured_prompt.join("\n");
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
