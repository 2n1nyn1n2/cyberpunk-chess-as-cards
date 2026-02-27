import * as path from "path";
import * as fs from "fs";

const SCENES_JS_TEMPLATE_FILE_PATH = "./js/draw-things-scenes-template.js";

const SCENES_JS_OUTPUT_FILE_PATH = "./js/draw-things-scenes-001.js";

const SCENES_JSON_OUTPUT_FILE_PATH = "./data/scenes.json";

let scenesJsStr = fs.readFileSync(SCENES_JS_TEMPLATE_FILE_PATH, "utf8");

const letterIndexes = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

const whiteLetterNames = {
  a: ["Queen", "Rook"],
  b: ["Queen", "Knight"],
  c: ["Queen", "Bishop"],
  d: ["Queen", "Queen"],
  e: ["King", "King"],
  f: ["King", "Bishop"],
  g: ["King", "Knight"],
  h: ["King", "Rook"],
};

const blackLetterNames = {
  a: ["King", "Rook"],
  b: ["King", "Knight"],
  c: ["King", "Bishop"],
  d: ["King", "King"],
  e: ["Queen", "Queen"],
  f: ["Queen", "Bishop"],
  g: ["Queen", "Knight"],
  h: ["Queen", "Rook"],
};

const columnNames = {
  1: "starting square",
  2: "starting square",
  3: "middle square",
  4: "middle square",
  5: "middle square",
  6: "middle square",
  7: "starting square",
  8: "starting square",
};

const columnTerrains = {
  1: "fortified mountains",
  2: "fortified hills",
  3: "farmland and villages",
  4: "a river with a bridge",
  5: "a river with a bridge",
  6: "farmland and villages",
  7: "fortified hills",
  8: "fortified mountains",
};

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
  scenes: [],
};

// "Rook   a1, h1 a8, h8 Rooks are in the corners, like castle towers.",
// "Knight b1, g1 b8, g8 Knights are next to the Rooks.",
// "Bishop c1, f1 c8, f8 Bishops are next to the Knights.",
// "Queen  d1  d8 'Queen on her own color': White Queen on the light square (d1), Black Queen on the dark square (d8).",
// "King   e1  e8 The King fills the final, remaining square."

for (const letter in letterIndexes) {
  for (let i = 1; i <= 8; i++) {
    const name = `${letter}${i}`;
    let side;
    let pieceDescription;
    // const challenges = [];
    let rowPieces;
    let piece;
    if (i <= 4) {
      side = "White";
      pieceDescription = whiteLetterNames[letter][0];
      piece = whiteLetterNames[letter][1];
      rowPieces = `${whiteLetterNames[letter][0]} and ${whiteLetterNames[letter][1]}`;

      if (i == 2) {
        piece = "Pawn";
        pieceDescription += "'s Pawn";
      }
      // if (i <= 2) {
      //   challenges.push(`white_${piece.toLowerCase()}`);
      // }
    } else {
      side = "Black";
      pieceDescription = blackLetterNames[letter][0];
      piece = blackLetterNames[letter][1];
      rowPieces = `${whiteLetterNames[letter][0]} and ${whiteLetterNames[letter][1]}`;
      if (i == 7) {
        piece = "Pawn";
        pieceDescription += "'s Pawn";
      }
      // if (i >= 7) {
      //   challenges.push(`black_${piece.toLowerCase()}`);
      // }
    }
    pieceDescription += "'s ";
    pieceDescription += piece;

    let columnName = columnNames[i];
    let columnTerrain = columnTerrains[i];

    let description = `${side}'s ${pieceDescription} ${columnName}`;
    const scene = {
      active: true,
      name: name,
      side: side,
      piece: piece,
      markers: rowPieces,
      terrain: columnTerrain,
      description: description,
      // challenges: challenges,
    };
    sceneData.scenes.push(scene);
  }
}

for (const scene of sceneData.scenes) {
  const rowLetter = scene.name.charAt(0);
  const colString = scene.name.slice(1);

  const rowNumber = letterIndexes[rowLetter];
  const colNumber = Number(colString);

  const isLightTile = (rowNumber + colNumber) % 2 === 1;

  scene.prompt = [];
  if (isLightTile) {
    scene.tile = "white_tile";
    scene.prompt.push(
      "The scene contains a large {yellow} square tile on the floor.",
    );
  } else {
    scene.tile = "black_tile";
    scene.prompt.push(
      "The scene contains a large {purple} square tile on the floor.",
    );
  }

  scene.prompt.push(
    `The surrounding terrain is ${scene.side.toLowerCase()} ${scene.terrain}`,
  );
}

const scenesJsonStr = JSON.stringify(sceneData, null, 2);

scenesJsStr = scenesJsStr.replace("{ SCENE_DATA }", scenesJsonStr);

fs.writeFileSync(SCENES_JS_OUTPUT_FILE_PATH, scenesJsStr);
fs.writeFileSync(SCENES_JSON_OUTPUT_FILE_PATH, scenesJsonStr);
