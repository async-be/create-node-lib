const npmCli = require("./templates/npm/cli");
const { navigateQuestionsGenerator } = require("./lib/cliUtils");

function* questionsGenerator(opts) {
  yield* npmCli(opts);
}

module.exports = () => {
  console.log(`🔥🔥🔥 Starting the cli 🔥🔥🔥`);
  return navigateQuestionsGenerator(questionsGenerator);
};
