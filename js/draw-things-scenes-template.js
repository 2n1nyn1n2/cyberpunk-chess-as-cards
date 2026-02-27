//@api-1.0
const sceneData = { SCENE_DATA };

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
