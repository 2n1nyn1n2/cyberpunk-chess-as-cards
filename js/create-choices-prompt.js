import * as fs from "fs";
import * as path from "path";

const CHOICES_JS_TEMPLATE_FILE_PATH = "./js/draw-things-choices-template.js";

const CHOICES_ASSETS_FILE_PATH = "./assets/choices";

const CHARACTERS_JSON_INPUT_FILE_PATH = "./data/characters.json";

const CHOICES_JS_OUTPUT_FILE_PATH = "./js/draw-things-choices-002.js";

const CHOICES_JSON_OUTPUT_FILE_PATH = "./data/choices.json";

let choicesJsStr = fs.readFileSync(CHOICES_JS_TEMPLATE_FILE_PATH, "utf8");

const characterData = JSON.parse(
  fs.readFileSync(CHARACTERS_JSON_INPUT_FILE_PATH, "utf8"),
);

const choiceData = {
  prompt: characterData.prompt,
  negative_prompt: characterData.negative_prompt,
  choices: [],
};

const choiceNameSet = new Set();

for (const character of characterData.characters) {
  const characterName = character.name;
  const characterDescription = character.description;
  const posessionTeam = character.team;
  const characterIcon = character.icon;
  const characterProjectile = character.projectile;
  const characterPossession = character.possession;
  const characterPrompt = character.attacking_prompt;
  const name = `${characterName}_chooses_${characterProjectile.replace(" ", "_")}`;
  const description = `${characterDescription} chooses ${characterProjectile}`;
  const prompt = [...characterPrompt];
  choiceData.choices.push({
    name: name,
    description: description,
    character_name: character.name,
    icon: characterIcon,
    team: posessionTeam,
    prompt: prompt,
    character: characterName,
    possession: characterPossession,
  });
  choiceNameSet.add(name);
}

const choiceSkipDataSet = new Set();
const choiceNotSkipDataSet = new Set();

const items = fs.readdirSync(CHOICES_ASSETS_FILE_PATH, {
  withFileTypes: true,
});
for (const item of items) {
  if (item.isDirectory()) {
    const fullPath = path.join(CHOICES_ASSETS_FILE_PATH, item.name);
    const subDirContents = fs.readdirSync(fullPath);
    const hasPng = subDirContents.some(
      (fileName) => path.extname(fileName).toLowerCase() === ".png",
    );
    if (choiceNameSet.has(item.name)) {
      if (hasPng) {
        choiceSkipDataSet.add(item.name);
      } else {
        choiceNotSkipDataSet.add(item.name);
      }
    } else {
      console.log(
        `Directiry ${item.name} has contents but is not a choice in ${CHOICES_JSON_OUTPUT_FILE_PATH}`,
      );
    }
  }
}

console.log(
  `Skipping ${choiceSkipDataSet.size} : ${JSON.stringify([...choiceSkipDataSet])}.`,
);
console.log(
  `Not Skipping ${choiceNotSkipDataSet.size} : ${JSON.stringify([...choiceNotSkipDataSet])}.`,
);

const choicesJsonStr = JSON.stringify(choiceData, null, 2);

const choicesSkipJsonStr = JSON.stringify([...choiceSkipDataSet], null, 2);

choicesJsStr = choicesJsStr.replace("{ CHOICE_DATA }", choicesJsonStr);
choicesJsStr = choicesJsStr.replace("[CHOICE_SKIP_DATA]", choicesSkipJsonStr);

fs.writeFileSync(CHOICES_JS_OUTPUT_FILE_PATH, choicesJsStr);
fs.writeFileSync(CHOICES_JSON_OUTPUT_FILE_PATH, choicesJsonStr);
