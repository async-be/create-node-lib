#!/usr/bin/env node
require("./lib/globals");
const cli = require("./cli");
const { tasksRunner } = require("./lib/tasks");

cli().then(({ tasks, answers }) => {
  console.log(answers);
  tasksRunner(tasks, answers);
});
