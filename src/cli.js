const { navigateQuestionsGenerator } = require("./lib/cliUtils");
const npmCli = require("./templates/npm/cli");
const licenseCli = require("./templates/license/cli");

function* questionsGenerator(opts) {
  yield* npmCli(opts);
  yield* licenseCli(opts);
}

module.exports = () => {
  console.log(`🔥🔥🔥 Starting the cli 🔥🔥🔥`);
  return navigateQuestionsGenerator(questionsGenerator);
};
