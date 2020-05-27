const tasks = () => {
  let _tasks = [];

  const getAll = () => [..._tasks];
  const push = task => _tasks.push(task);

  return {
    getAll,
    push,
  };
};

const tasksRunner = async (tasks, answers) => {
  let context = { files: {} };

  for (const task of tasks.getAll()) {
    const newContext = await task(context, answers);
    context = { ...context, ...newContext };
  }

  for (const [key, value] of Object.entries(context.files)) {
    await value.writeOnDisk();
  }
};

module.exports = {
  tasks,
  tasksRunner,
};
