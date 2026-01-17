//@api-1.0
async function batchCleanup() {
  console.log(`Awaiting user input...`);
  const settings = await requestFromUser("Batch Cleanup", "Start", function () {
    return [this.directory("Input Directory")];
  });

  if (!settings) return;
  const [inputDir] = settings;
  const prompt = "fighting";

  const files = await filesystem.readEntries(inputDir);
  const imageFiles = files.filter((f) => {
    const name = typeof f === "string" ? f : f.path || f.name;
    return name.match(/\.(png|webp)$/i);
  });

  if (imageFiles.length === 0) {
    console.log("No valid images found.");
    return;
  }

  console.log(`Starting batch of ${imageFiles.length} files.`);
  const batchStartTime = Date.now();

  let timeLog = "unknown";

  for (let i = 0; i < imageFiles.length; i++) {
    const fileEntry = imageFiles[i];
    const fileStartTime = Date.now();

    let entryPath =
      typeof fileEntry === "string"
        ? fileEntry
        : fileEntry.path || fileEntry.name;
    const fileName = entryPath.split("/").pop();

    // Progress Calculation
    const currentFileNum = i + 1;
    const remaining = imageFiles.length - currentFileNum;

    console.log(
      `Processing [${currentFileNum}/${imageFiles.length}]: ${timeLog} | ${fileName} ---`,
    );

    // Logic for pathing
    let absolutePath = entryPath.includes(inputDir)
      ? entryPath
      : inputDir.endsWith("/")
        ? inputDir + entryPath
        : inputDir + "/" + entryPath;
    const imgPath = "file://" + absolutePath.replace(/^file:\/\//, "");

    await canvas.loadImageSrc(imgPath);

    const challengeName = imgPath.split("_challenges_")[1].split("_0__")[0];
    const fullPrompt = `(challenges ${challengeName}:0)\n${prompt}`;

    const configuration = pipeline.configuration;
    configuration.faceRestoration = "restoreformer_v1.0_f16.ckpt";
    configuration.strength = 0.5;
    configuration.seed = Date.now() % 1000000;

    await pipeline.run({
      configuration: configuration,
      prompt: fullPrompt,
    });

    // --- ETA LOGGING LOGIC ---
    const currentTime = Date.now();
    const elapsedSoFar = currentTime - batchStartTime;
    const avgTimePerFile = elapsedSoFar / currentFileNum;
    const estRemainingMs = avgTimePerFile * remaining;

    const etaSeconds = Math.floor((estRemainingMs / 1000) % 60);
    const etaMinutes = Math.floor(estRemainingMs / (1000 * 60));

    timeLog =
      remaining > 0
        ? `Est. Remaining: ${etaMinutes}m ${etaSeconds}s`
        : "Finished!";

    console.log(`File complete. ${timeLog}`);
  }

  const totalTime = ((Date.now() - batchStartTime) / 1000).toFixed(1);
  console.log(`Batch complete! Total time: ${totalTime}s`);
}

batchCleanup();
