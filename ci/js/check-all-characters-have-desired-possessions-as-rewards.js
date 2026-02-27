import * as fs from "fs";

const CHARACTER_FILE_PATH = "./data/characters.json";
const CHALLENGE_FILE_PATH = "./data/challenges.json";
const EXIT_CODE_ERROR = 1;

/**
 * Validates the character and challenge data arrays.
 * @param {object} characterData - The character data array.
 * @param {object} challengeData - The challenge data array.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateCharacterChallengeData(characterData, challengeData) {
  const allRewardPossessions = new Set();
  const allRewardPossessionsChallengeChoiceNames = {};
  const allDesiredPossessions = new Set();
  const allChallengeChoiceNames = new Set();
  for (const challenge of challengeData) {
    for (const choice of challenge.json_data.choices) {
      const challengeChoiceName = challenge.name + " - " + choice.name;
      allChallengeChoiceNames.add(challengeChoiceName);
      const challengePosessions = new Set();
      for (const cost of choice.rewards) {
        challengePosessions.add(cost.cost);
      }
      for (const requirement of choice.requirements) {
        challengePosessions.add(requirement.possession);
      }
      for (const reward of choice.rewards) {
        challengePosessions.add(reward.possession);
      }
      for (const challengePosession of challengePosessions) {
        if (!allRewardPossessions.has(challengePosession)) {
          allRewardPossessions.add(challengePosession);
          allRewardPossessionsChallengeChoiceNames[challengePosession] =
            new Set();
        }
        allRewardPossessionsChallengeChoiceNames[challengePosession].add(
          challengeChoiceName,
        );
      }
    }
  }

  const missingDesiredPosessions = new Set();
  const missingDesiredPosessionCharacterNames = {};
  for (const character of characterData) {
    const desiredPossessions = character.desired_possessions;
    for (const desiredPossession in desiredPossessions) {
      allDesiredPossessions.add(desiredPossession);
      if (!allRewardPossessions.has(desiredPossession)) {
        // const json = {
        //   character: character.name,
        //   desired_possession: desiredPossession,
        // };
        // console.log(
        //   "validateCharacterChallengeData",
        //   "validating",
        //   "for this character, no choice on any challenge rewards the desired posession",
        //   json,
        // );
        if (!missingDesiredPosessions.has(desiredPossession)) {
          missingDesiredPosessions.add(desiredPossession);
          missingDesiredPosessionCharacterNames[desiredPossession] = new Set();
        }
        missingDesiredPosessionCharacterNames[desiredPossession].add(
          character.name,
        );
      }
    }
  }
  const unusedRewardPossessions = new Set();
  for (const rewardPossessions of allRewardPossessions) {
    unusedRewardPossessions.add(rewardPossessions);
  }
  for (const rewardPossessions of allDesiredPossessions) {
    unusedRewardPossessions.delete(rewardPossessions);
  }

  // console.log(
  //   "validateCharacterChallengeData",
  //   "allChallengeChoiceNames",
  //   [...allChallengeChoiceNames].sort(),
  // );

  // console.log(
  //   "validateCharacterChallengeData",
  //   "allRewardPossessions",
  //   [...allRewardPossessions].sort(),
  // );

  // console.log(
  //   "validateCharacterChallengeData",
  //   "allDesiredPossessions",
  //   [...allDesiredPossessions].sort(),
  // );

  // for (const unusedRewardPossession of unusedRewardPossessions) {
  //   console.log(
  //     "validateCharacterChallengeData",
  //     "unusedRewardPossession",
  //     [unusedRewardPossession],
  //     "ChallengeChoiceNames",
  //     [...allRewardPossessionsChallengeChoiceNames[unusedRewardPossession]],
  //   );
  // }

  for (const missingDesiredPosession of missingDesiredPosessions) {
    console.log(
      "validateCharacterChallengeData",
      "missingDesiredPosession",
      [missingDesiredPosession],
      "missingDesiredPosessionCharacterNames",
      [...missingDesiredPosessionCharacterNames[missingDesiredPosession]],
    );
  }
  return missingDesiredPosessions.size == 0;
}

function run() {
  try {
    const allCharacterData = JSON.parse(
      fs.readFileSync(CHARACTER_FILE_PATH, "utf8"),
    );
    const characterData = [];
    for (const character of allCharacterData.characters) {
      if (character.active) {
        characterData.push(character);
      }
    }

    const allChallengeData = JSON.parse(
      fs.readFileSync(CHALLENGE_FILE_PATH, "utf8"),
    );
    const challengeData = [];
    for (const challenge of allChallengeData.challenges) {
      if (challenge.active) {
        if (challenge.json !== undefined) {
          const jsonPath = challenge.json.replace("res://", "./");
          challenge.json_data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
          challengeData.push(challenge);
        }
      }
    }

    // 3. Validate the structure
    if (validateCharacterChallengeData(characterData, challengeData)) {
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
