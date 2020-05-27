#!/usr/bin/node
require("./lib/globals");
const cli = require("./cli");
const { tasksRunner } = require("./lib/tasks");

cli().then(({ tasks, answers }) => tasksRunner(tasks, answers));
