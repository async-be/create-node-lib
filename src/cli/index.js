const { navigateQuestionsGenerator } = require("../lib/cliUtils");
const npmCli = require("./npm");
const licenseCli = require("./license");

function* questionsGenerator(opts) {
  yield* npmCli(opts);
  yield* licenseCli(opts);
}

module.exports = () => {
  console.log(`🔥🔥🔥 Starting the cli 🔥🔥🔥`);
  return navigateQuestionsGenerator(questionsGenerator);
};
