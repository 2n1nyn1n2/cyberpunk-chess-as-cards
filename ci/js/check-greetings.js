import * as fs from "fs";

const CHARACTER_FILE_PATH = "./data/greetings/character.json";
const SCENE_FILE_PATH = "./data/greetings/scene.json";
const EXIT_CODE_ERROR = 1;

/**
 * Asserts that two Sets are equal.
 * @param {Set} setA - The first set to compare.
 * @param {Set} setB - The second set to compare.
 * @throws {Error} If inputs are not Sets or if Sets are not equal.
 */
function assertSetsEqual(setA, setB) {
  // 1. Type Safety: Ensure both arguments are actually Sets
  if (!(setA instanceof Set) || !(setB instanceof Set)) {
    throw new Error("Invalid Input: Both arguments must be instances of Set.");
  }

  // 2. Size Check: Quick exit if lengths differ
  const equalSize = setA.size === setB.size;

  // 3. Content Check: Ensure every element in A exists in B
  const equalContent = equalSize && [...setA].every((value) => setB.has(value));

  if (!equalContent) {
    throw new Error(
      `Set Mismatch: Expected Sets to be equal. 
       Set A Size: ${setA.size} contents: ${JSON.stringify([...setA])}
       Set B Size: ${setB.size} contents: ${JSON.stringify([...setB])}
       `,
    );
  }

  // console.log("Success: Sets are equal.");
  return true;
}

function validateSceneCharacterData(sceneData, characterData) {
  const allSceneStyleSet = new Set();
  for (const greeting of sceneData.greetings) {
    allSceneStyleSet.add(greeting.style);
  }
  const allCharacterStyleSet = new Set();
  for (const greeting of characterData.greetings) {
    allCharacterStyleSet.add(greeting.style);
  }
  //   console.log("allSceneStyleSet", ...[allSceneStyleSet]);
  //   console.log("allCharacterStyleSet", ...[allCharacterStyleSet]);
  assertSetsEqual(allSceneStyleSet, allCharacterStyleSet);
  const allPieceSet = new Set();
  for (const greeting of characterData.greetings) {
    // console.log("greeting", greeting);
    const pieces = Object.keys(greeting.pieces);
    // console.log("pieces", ...[pieces]);
    for (const piece of pieces) {
      allPieceSet.add(piece);
    }
  }
  for (const greeting of characterData.greetings) {
    const greetingPieceSet = new Set();
    // console.log("greeting", greeting);
    const pieces = Object.keys(greeting.pieces);
    // console.log("pieces", ...[pieces]);
    for (const piece of pieces) {
      greetingPieceSet.add(piece);
    }
    //   console.log("allSceneStyleSet", ...[allSceneStyleSet]);
    //   console.log("allCharacterStyleSet", ...[allCharacterStyleSet]);
    assertSetsEqual(allPieceSet, greetingPieceSet);
  }
  return true;
}

function run() {
  try {
    const characterData = JSON.parse(
      fs.readFileSync(CHARACTER_FILE_PATH, "utf8"),
    );
    const sceneData = JSON.parse(fs.readFileSync(SCENE_FILE_PATH, "utf8"));

    // 3. Validate the structure
    if (validateSceneCharacterData(sceneData, characterData)) {
      console.log("✅ Success!.");
    } else {
      console.log("❌ Failure!.");
      // Validation failed, set error exit code
      process.exitCode = EXIT_CODE_ERROR;
    }
  } catch (error) {
    console.error(
      `🛑 FATAL Error processing characters and challenges:`,
      error,
    );
    process.exitCode = EXIT_CODE_ERROR;
  }
}
run();
