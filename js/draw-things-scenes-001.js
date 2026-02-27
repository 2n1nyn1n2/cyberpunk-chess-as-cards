//@api-1.0
const sceneData = {
  scene_selection: [
    {
      active: true,
      description: "Choose your move",
      name: "Chess Board",
      texture: "res://assets/scenes/starting-locations.png",
    },
  ],
  prompt: [
    "The style is cyberpunk noir. ",
    "Futuristic. ",
    "The background is a ((foggy)), neutral, well lit, ((cyan background)), (((clear open skies with a few clouds)))",
  ],
  scenes: [
    {
      active: true,
      name: "a1",
      side: "White",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "fortified mountains",
      description: "White's Queen's Rook starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "a2",
      side: "White",
      piece: "Pawn",
      markers: "Queen and Rook",
      terrain: "fortified hills",
      description: "White's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "a3",
      side: "White",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "farmland and villages",
      description: "White's Queen's Rook middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "a4",
      side: "White",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "a river with a bridge",
      description: "White's Queen's Rook middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "a5",
      side: "Black",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "a river with a bridge",
      description: "Black's King's Rook middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "a6",
      side: "Black",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "farmland and villages",
      description: "Black's King's Rook middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "a7",
      side: "Black",
      piece: "Pawn",
      markers: "Queen and Rook",
      terrain: "fortified hills",
      description: "Black's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "a8",
      side: "Black",
      piece: "Rook",
      markers: "Queen and Rook",
      terrain: "fortified mountains",
      description: "Black's King's Rook starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "b1",
      side: "White",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "fortified mountains",
      description: "White's Queen's Knight starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "b2",
      side: "White",
      piece: "Pawn",
      markers: "Queen and Knight",
      terrain: "fortified hills",
      description: "White's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "b3",
      side: "White",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "farmland and villages",
      description: "White's Queen's Knight middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "b4",
      side: "White",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "a river with a bridge",
      description: "White's Queen's Knight middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "b5",
      side: "Black",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "a river with a bridge",
      description: "Black's King's Knight middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "b6",
      side: "Black",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "farmland and villages",
      description: "Black's King's Knight middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "b7",
      side: "Black",
      piece: "Pawn",
      markers: "Queen and Knight",
      terrain: "fortified hills",
      description: "Black's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "b8",
      side: "Black",
      piece: "Knight",
      markers: "Queen and Knight",
      terrain: "fortified mountains",
      description: "Black's King's Knight starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "c1",
      side: "White",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "fortified mountains",
      description: "White's Queen's Bishop starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "c2",
      side: "White",
      piece: "Pawn",
      markers: "Queen and Bishop",
      terrain: "fortified hills",
      description: "White's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "c3",
      side: "White",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "farmland and villages",
      description: "White's Queen's Bishop middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "c4",
      side: "White",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "a river with a bridge",
      description: "White's Queen's Bishop middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "c5",
      side: "Black",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "a river with a bridge",
      description: "Black's King's Bishop middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "c6",
      side: "Black",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "farmland and villages",
      description: "Black's King's Bishop middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "c7",
      side: "Black",
      piece: "Pawn",
      markers: "Queen and Bishop",
      terrain: "fortified hills",
      description: "Black's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "c8",
      side: "Black",
      piece: "Bishop",
      markers: "Queen and Bishop",
      terrain: "fortified mountains",
      description: "Black's King's Bishop starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "d1",
      side: "White",
      piece: "Queen",
      markers: "Queen and Queen",
      terrain: "fortified mountains",
      description: "White's Queen's Queen starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "d2",
      side: "White",
      piece: "Pawn",
      markers: "Queen and Queen",
      terrain: "fortified hills",
      description: "White's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "d3",
      side: "White",
      piece: "Queen",
      markers: "Queen and Queen",
      terrain: "farmland and villages",
      description: "White's Queen's Queen middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "d4",
      side: "White",
      piece: "Queen",
      markers: "Queen and Queen",
      terrain: "a river with a bridge",
      description: "White's Queen's Queen middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "d5",
      side: "Black",
      piece: "King",
      markers: "Queen and Queen",
      terrain: "a river with a bridge",
      description: "Black's King's King middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "d6",
      side: "Black",
      piece: "King",
      markers: "Queen and Queen",
      terrain: "farmland and villages",
      description: "Black's King's King middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "d7",
      side: "Black",
      piece: "Pawn",
      markers: "Queen and Queen",
      terrain: "fortified hills",
      description: "Black's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "d8",
      side: "Black",
      piece: "King",
      markers: "Queen and Queen",
      terrain: "fortified mountains",
      description: "Black's King's King starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "e1",
      side: "White",
      piece: "King",
      markers: "King and King",
      terrain: "fortified mountains",
      description: "White's King's King starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "e2",
      side: "White",
      piece: "Pawn",
      markers: "King and King",
      terrain: "fortified hills",
      description: "White's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "e3",
      side: "White",
      piece: "King",
      markers: "King and King",
      terrain: "farmland and villages",
      description: "White's King's King middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "e4",
      side: "White",
      piece: "King",
      markers: "King and King",
      terrain: "a river with a bridge",
      description: "White's King's King middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "e5",
      side: "Black",
      piece: "Queen",
      markers: "King and King",
      terrain: "a river with a bridge",
      description: "Black's Queen's Queen middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "e6",
      side: "Black",
      piece: "Queen",
      markers: "King and King",
      terrain: "farmland and villages",
      description: "Black's Queen's Queen middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "e7",
      side: "Black",
      piece: "Pawn",
      markers: "King and King",
      terrain: "fortified hills",
      description: "Black's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "e8",
      side: "Black",
      piece: "Queen",
      markers: "King and King",
      terrain: "fortified mountains",
      description: "Black's Queen's Queen starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "f1",
      side: "White",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "fortified mountains",
      description: "White's King's Bishop starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "f2",
      side: "White",
      piece: "Pawn",
      markers: "King and Bishop",
      terrain: "fortified hills",
      description: "White's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "f3",
      side: "White",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "farmland and villages",
      description: "White's King's Bishop middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "f4",
      side: "White",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "a river with a bridge",
      description: "White's King's Bishop middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "f5",
      side: "Black",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "a river with a bridge",
      description: "Black's Queen's Bishop middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "f6",
      side: "Black",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "farmland and villages",
      description: "Black's Queen's Bishop middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "f7",
      side: "Black",
      piece: "Pawn",
      markers: "King and Bishop",
      terrain: "fortified hills",
      description: "Black's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "f8",
      side: "Black",
      piece: "Bishop",
      markers: "King and Bishop",
      terrain: "fortified mountains",
      description: "Black's Queen's Bishop starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "g1",
      side: "White",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "fortified mountains",
      description: "White's King's Knight starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "g2",
      side: "White",
      piece: "Pawn",
      markers: "King and Knight",
      terrain: "fortified hills",
      description: "White's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "g3",
      side: "White",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "farmland and villages",
      description: "White's King's Knight middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "g4",
      side: "White",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "a river with a bridge",
      description: "White's King's Knight middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "g5",
      side: "Black",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "a river with a bridge",
      description: "Black's Queen's Knight middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "g6",
      side: "Black",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "farmland and villages",
      description: "Black's Queen's Knight middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "g7",
      side: "Black",
      piece: "Pawn",
      markers: "King and Knight",
      terrain: "fortified hills",
      description: "Black's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "g8",
      side: "Black",
      piece: "Knight",
      markers: "King and Knight",
      terrain: "fortified mountains",
      description: "Black's Queen's Knight starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "h1",
      side: "White",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "fortified mountains",
      description: "White's King's Rook starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white fortified mountains",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "h2",
      side: "White",
      piece: "Pawn",
      markers: "King and Rook",
      terrain: "fortified hills",
      description: "White's King's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white fortified hills",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "h3",
      side: "White",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "farmland and villages",
      description: "White's King's Rook middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is white farmland and villages",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "h4",
      side: "White",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "a river with a bridge",
      description: "White's King's Rook middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is white a river with a bridge",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "h5",
      side: "Black",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "a river with a bridge",
      description: "Black's Queen's Rook middle square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black a river with a bridge",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "h6",
      side: "Black",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "farmland and villages",
      description: "Black's Queen's Rook middle square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black farmland and villages",
      ],
      tile: "black_tile",
    },
    {
      active: true,
      name: "h7",
      side: "Black",
      piece: "Pawn",
      markers: "King and Rook",
      terrain: "fortified hills",
      description: "Black's Queen's Pawn's Pawn starting square",
      prompt: [
        "The scene contains a large {yellow} square tile on the floor.",
        "The surrounding terrain is black fortified hills",
      ],
      tile: "white_tile",
    },
    {
      active: true,
      name: "h8",
      side: "Black",
      piece: "Rook",
      markers: "King and Rook",
      terrain: "fortified mountains",
      description: "Black's Queen's Rook starting square",
      prompt: [
        "The scene contains a large {purple} square tile on the floor.",
        "The surrounding terrain is black fortified mountains",
      ],
      tile: "black_tile",
    },
  ],
};

const prompts = [];

let basePrompt = sceneData.prompt.join("\n");

for (const scene of sceneData.scenes) {
  let scenePrompt = scene.prompt.join("\n");
  prompts.push({
    prompt: basePrompt + "\n" + scenePrompt,
    name: scene.name,
  });
}

// 3. Define the main batch function
async function batchGenerate(logPrefix) {
  console.log(
    `${logPrefix} Starting batch generation for ${prompts.length} images...`,
  );

  var successes = 0;
  var failures = 0;
  for (let i = 0; i < prompts.length && failures == 0; i++) {
    const currentPrompt = replaceWildcards(prompts[i].prompt);
    console.log(
      `${logPrefix} --- Processing Image ${i + 1}/${prompts.length}: "${currentPrompt}" ---`,
    );

    try {
      const configuration = pipeline.configuration;

      let seed = "1";
      seed += ("" + i).padStart(2, "0");
      seed += "0";
      seed += ("" + prompts.length).padStart(2, "0");
      seed += "0";
      seed += Date.now() % 1000;

      configuration.seed = parseInt(seed);
      //configuration.seed = Date.now() % 1000000000;

      let startTime = new Date().getTime();
      // await canvas.clear();
      await pipeline.run({
        configuration: configuration,
        prompt: currentPrompt,
      });
      // await canvas.saveImage(outputPath);
      var endTime = new Date().getTime();
      var elapsedTime = (endTime - startTime) % 1000000000;
      console.log("${logPrefix} generated in " + elapsedTime + " seconds");
      successes++;
    } catch (error) {
      const msg = `${logPrefix} ❌ Failed to generate image ${i + 1}: ${error.message}`;
      console.error(msg, error);
      failures++;
      throw new Error(msg);
    }
  }

  console.log(
    `${logPrefix} Batch processing complete! ${successes} successes.`,
  );
}

async function batchGenerateAll() {
  try {
    const maxBatches = 10;
    for (let i = 0; i < maxBatches; i++) {
      console.log(`Batch processing started ${i} of ${maxBatches}`);
      await batchGenerate(`${i} of ${maxBatches}`);
      console.log(`Batch processing complete ${i} of ${maxBatches}`);
    }
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

/**
 * Inserts a formatted timestamp into a filename before the extension.
 * @param {string} baseName The original filename (e.g., 'render_batch.jpg').
 * @returns {string} The new filename with the timestamp (e.g., 'render_batch_20251216_151758.jpg').
 */
function addTimestampToFilename(baseName) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `_${year}${month}${day}_${hours}${minutes}${seconds}`;

  const lastDotIndex = baseName.lastIndexOf(".");

  let namePart;
  let extensionPart;

  if (lastDotIndex === -1) {
    namePart = baseName;
    extensionPart = "";
  } else {
    namePart = baseName.substring(0, lastDotIndex);
    extensionPart = baseName.substring(lastDotIndex); // Includes the dot
  }
  const newFilename = `${namePart}${timestamp}${extensionPart}`;

  return newFilename;
}

batchGenerateAll();
