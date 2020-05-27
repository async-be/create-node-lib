const inquirer = require("inquirer");
const { tasks } = require("./tasks");

const ask = q => inquirer.prompt([q]);

const navigateQuestionsGenerator = async questionsGenerator => {
  const answers = { current: {} };
  const taskList = tasks();

  const iterator = questionsGenerator({ answers, ask, tasks: taskList });

  for await (const question of iterator) {
    answers.current = { ...answers.current, ...question };
  }
  return {
    answers: answers.current,
    tasks: taskList,
  };
};

module.exports = {
  navigateQuestionsGenerator,
};
