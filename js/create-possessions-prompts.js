import * as fs from "fs";
import * as path from "path";

const POSSESSIONS_JS_TEMPLATE_FILE_PATH =
  "./js/draw-things-possessions-template.js";

const POSSESSIONS_ASSETS_FILE_PATH = "./assets/possessions";

const PIECES_JSON_INPUT_FILE_PATH = "./data/pieces.json";

const POSSESSIONS_JSON_OUTPUT_FILE_PATH = "./data/possessions.json";

const POSSESSIONS_JS_OUTPUT_FILE_PATH = "./js/draw-things-possessions-002.js";

let possessionsJsStr = fs.readFileSync(
  POSSESSIONS_JS_TEMPLATE_FILE_PATH,
  "utf8",
);

const piecesData = JSON.parse(
  fs.readFileSync(PIECES_JSON_INPUT_FILE_PATH, "utf8"),
);

const replaceTeamColor = (array, team_color) => {
  return array.map((str) => str.replaceAll("team color", team_color));
};

const possessionData = {};
possessionData.prompt = piecesData.prompt;
possessionData.negative_prompt = piecesData.negative_prompt;
possessionData.projectile_negative_prompt =
  piecesData.projectile_negative_prompt;
possessionData.possessions = [];

for (const team_color of piecesData.team_colors) {
  const teamColorPrompt = replaceTeamColor(
    piecesData.team_color_prompt,
    team_color.color,
  );
  for (const piece of piecesData.pieces) {
    possessionData.possessions.push({
      active: true,
      name: `${team_color.name}_${piece.name}`,
      description: `A ${team_color.name} ${piece.name}`,
      team: team_color.name,
      icon: piece.icon,
      weapon: piece.weapon,
      projectile: piece.projectile,
      attacking_prompt: [
        ...teamColorPrompt,
        ...replaceTeamColor(piece.description, team_color.color),
        ...[`attacking. ${piece.hand_item} in hand`],
      ],
      defending_prompt: [
        ...teamColorPrompt,
        ...replaceTeamColor(piece.description, team_color.color),
        ...[`defending. crouching. (${piece.defenses} in the foreground:2)`],
      ],
      projectile_prompt: [
        ...teamColorPrompt,
        ...replaceTeamColor(piece.description, team_color.color),
        ...[
          `, (flying:2), hovering, (speed lines:2), (motion blur:2), (action shot:2). ${piece.hand_item} in hand`,
        ],
        ...["BREAK"],
        `flying projectile, (single ${team_color.color} ${piece.projectile}:3), flying, hovering, (speed lines:2), (motion blur:2), (action shot:2)`,
      ],
      max: 1,
      prompt: [
        ...teamColorPrompt,
        ...replaceTeamColor(piece.description, team_color.color),
      ],
    });
  }
}

const possessionSkipData = [];

const items = fs.readdirSync(POSSESSIONS_ASSETS_FILE_PATH, {
  withFileTypes: true,
});
for (const item of items) {
  if (item.isDirectory()) {
    const fullPath = path.join(POSSESSIONS_ASSETS_FILE_PATH, item.name);
    const subDirContents = fs.readdirSync(fullPath);
    const hasPng = subDirContents.some(
      (fileName) => path.extname(fileName).toLowerCase() === ".png",
    );
    if (hasPng) {
      possessionSkipData.push(item.name);
    }
  }
}

const possessionsJsonStr = JSON.stringify(possessionData, null, 2);

const possessionsSkipJsonStr = JSON.stringify(possessionSkipData, null, 2);

possessionsJsStr = possessionsJsStr.replace(
  "{ POSSESSION_DATA }",
  possessionsJsonStr,
);
possessionsJsStr = possessionsJsStr.replace(
  "[POSSESSION_SKIP_DATA]",
  possessionsSkipJsonStr,
);

fs.writeFileSync(POSSESSIONS_JS_OUTPUT_FILE_PATH, possessionsJsStr);
fs.writeFileSync(POSSESSIONS_JSON_OUTPUT_FILE_PATH, possessionsJsonStr);
