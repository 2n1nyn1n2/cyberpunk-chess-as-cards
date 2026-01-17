import * as fs from "fs";
import * as path from "path";

const CHALLENGES_JS_TEMPLATE_FILE_PATH =
  "./js/draw-things-challenges-template.js";

const CHALLENGES_ASSETS_FILE_PATH = "./assets/challenges";

const POSSESSIONS_JSON_INPUT_FILE_PATH = "./data/possessions.json";

const CHALLENGES_JS_OUTPUT_FILE_PATH = "./js/draw-things-challenges-002.js";

const CHALLENGES_JSON_OUTPUT_FILE_PATH = "./data/challenges.json";

let challengesJsStr = fs.readFileSync(CHALLENGES_JS_TEMPLATE_FILE_PATH, "utf8");

const tileData = [
  {
    name: "white_tile",
    is_icon_uppercase: true,
    description: "white tile",
    prompt: ["(yellow tile floor:2)."],
  },
  {
    name: "black_tile",
    is_icon_uppercase: false,
    description: "black tile",
    prompt: ["(purple tile floor:2)."],
  },
];

const possessionData = JSON.parse(
  fs.readFileSync(POSSESSIONS_JSON_INPUT_FILE_PATH, "utf8"),
);

const challengeData = {
  prompt: possessionData.prompt,
  negative_prompt: possessionData.negative_prompt,
  challenges: [],
};

for (const possession of possessionData.possessions) {
  const possessionName = possession.name;
  const posessionTeam = possession.team;
  const possessionPrompt = possession.defending_prompt;
  const upperIcons = Object.fromEntries(
    Object.entries(possession.icon).map(([key, value]) => [
      key,
      value.toUpperCase(),
    ]),
  );
  const lowerIcons = Object.fromEntries(
    Object.entries(possession.icon).map(([key, value]) => [
      key,
      value.toLowerCase(),
    ]),
  );
  for (const tile of tileData) {
    let possessionIcons;
    if (tile.is_icon_uppercase) {
      possessionIcons = upperIcons;
    } else {
      possessionIcons = lowerIcons;
    }
    let possessionIcon = possessionIcons[`${posessionTeam}_team`];
    const tileName = tile.name;
    const tilePrompt = tile.prompt;
    const name = `${possessionName}_on_a_${tileName}`;
    const description = `${possession.description} on a ${tile.description}`;
    const prompt = [...tilePrompt, ...["BREAK"], ...possessionPrompt];
    challengeData.challenges.push({
      name: name,
      description: description,
      icon: possessionIcon,
      team: posessionTeam,
      prompt: prompt,
      tile: tileName,
      possession: possessionName,
    });
  }
}

const challengeSkipData = [];

const items = fs.readdirSync(CHALLENGES_ASSETS_FILE_PATH, {
  withFileTypes: true,
});
for (const item of items) {
  if (item.isDirectory()) {
    const fullPath = path.join(CHALLENGES_ASSETS_FILE_PATH, item.name);
    const subDirContents = fs.readdirSync(fullPath);
    const hasPng = subDirContents.some(
      (fileName) => path.extname(fileName).toLowerCase() === ".png",
    );
    if (hasPng) {
      challengeSkipData.push(item.name);
    }
  }
}

const challengesJsonStr = JSON.stringify(challengeData, null, 2);

const challengesSkipJsonStr = JSON.stringify(challengeSkipData, null, 2);

challengesJsStr = challengesJsStr.replace(
  "{ CHALLENGE_DATA }",
  challengesJsonStr,
);
challengesJsStr = challengesJsStr.replace(
  "[CHALLENGE_SKIP_DATA]",
  challengesSkipJsonStr,
);

fs.writeFileSync(CHALLENGES_JS_OUTPUT_FILE_PATH, challengesJsStr);
fs.writeFileSync(CHALLENGES_JSON_OUTPUT_FILE_PATH, challengesJsonStr);
