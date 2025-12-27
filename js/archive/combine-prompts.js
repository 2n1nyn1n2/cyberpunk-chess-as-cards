import * as fs from "fs";

const regexObject = new RegExp("\\s", "g");

const POSSESSIONS_INPUT_FILE_PATH = "./data/possessions.json";

const POSSESSIONS_OUTPUT_FILE_PATH = "./.invokeAi/possessions-prompts.txt";

const possessionData = JSON.parse(
  fs.readFileSync(POSSESSIONS_INPUT_FILE_PATH, "utf8"),
);

const prompts = [];

let basePrompt = possessionData.prompt.join("\n");

const seed = Date.now() % 1000000;

for (const possession of possessionData.possessions) {
  let possessionPrompt = possession.prompt.join("\n");
  possessionPrompt =
    possession.name + "\n" + basePrompt + "\n" + possessionPrompt;
  possessionPrompt = basePrompt + "\n" + possessionPrompt;
  possessionPrompt = possessionPrompt.replace(regexObject, " ");

  console.log("starting", possession.name);
  console.log("success", possession.name);
}
