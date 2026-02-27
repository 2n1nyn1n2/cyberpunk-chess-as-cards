import * as fs from "fs";
import * as path from "path";

const CHARACTERS_JS_TEMPLATE_FILE_PATH =
  "./js/draw-things-characters-template.js";

const CHARACTERS_ASSETS_FILE_PATH = "./assets/characters";

const POSSESSIONS_JSON_INPUT_FILE_PATH = "./data/possessions.json";

const CHARACTERS_JS_OUTPUT_FILE_PATH = "./js/draw-things-characters-002.js";

const CHARACTERS_JSON_OUTPUT_FILE_PATH = "./data/characters.json";

let charactersJsStr = fs.readFileSync(CHARACTERS_JS_TEMPLATE_FILE_PATH, "utf8");

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

const characterData = {
  prompt: possessionData.prompt,
  negative_prompt: possessionData.negative_prompt,
  characters: [],
};

for (const possession of possessionData.possessions) {
  const possessionName = possession.name;
  const posessionTeam = possession.team;
  const possessionPrompt = possession.standing_prompt;
  const possessionProjectile = possession.projectile;
  const possessionProjectilePrompt = possession.projectile_prompt;
  const possessionAttackingPrompt = possession.attacking_prompt;
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
    const projectilePrompt = [
      ...tilePrompt,
      ...["BREAK"],
      ...possessionProjectilePrompt,
    ];
    const attackingPrompt = [
      ...tilePrompt,
      ...["BREAK"],
      ...possessionAttackingPrompt,
    ];
    characterData.characters.push({
      name: name,
      description: description,
      icon: possessionIcon,
      team: posessionTeam,
      prompt: prompt,
      tile: tileName,
      possession: possessionName,
      projectile: possessionProjectile,
      projectile_prompt: projectilePrompt,
      attacking_prompt: attackingPrompt,
    });
  }
}

const charactersSkipData = [];

const items = fs.readdirSync(CHARACTERS_ASSETS_FILE_PATH, {
  withFileTypes: true,
});
for (const item of items) {
  if (item.isDirectory()) {
    const fullPath = path.join(CHARACTERS_ASSETS_FILE_PATH, item.name);
    const subDirContents = fs.readdirSync(fullPath);
    const hasPng = subDirContents.some(
      (fileName) => path.extname(fileName).toLowerCase() === ".png",
    );
    if (hasPng) {
      charactersSkipData.push(item.name);
    }
  }
}

const charactersJsonStr = JSON.stringify(characterData, null, 2);

const charactersSkipJsonStr = JSON.stringify(charactersSkipData, null, 2);

charactersJsStr = charactersJsStr.replace(
  "{ CHARACTER_DATA }",
  charactersJsonStr,
);
charactersJsStr = charactersJsStr.replace(
  "[CHARACTER_SKIP_DATA]",
  charactersSkipJsonStr,
);

fs.writeFileSync(CHARACTERS_JS_OUTPUT_FILE_PATH, charactersJsStr);
fs.writeFileSync(CHARACTERS_JSON_OUTPUT_FILE_PATH, charactersJsonStr);
