//@api-1.0
const MAX_BATCHES = 1;

const characterData = { CHARACTER_DATA };

const prompts = [];

const negativePrompt = characterData.negative_prompt.join("\n");

let basePrompt = characterData.prompt.join("\n");

const skipCharacterNameSet = new Set([CHARACTER_SKIP_DATA]);

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
