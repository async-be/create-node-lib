const { file, FILE_FORMAT } = require("../lib/file");
const licenses = require("../ressources/licenses");
const path = require("path");

module.exports = function* ({ answers, ask, tasks }) {
  yield ask({
    name: "license",
    type: "list",
    message: "Package license (more info at https://choosealicense.com)",
    choices: licenses,
    default: "NONE",
  });

  if (answers.current.license === "NONE") {
    return;
  }

  if (answers.current.license.needYear) {
    yield ask({
      name: "license_year",
      type: "number",
      message: "License year",
    });
  }

  if (answers.current.license.needAuthor) {
    yield ask({
      name: "license_author",
      type: "input",
      message: "License owner",
      default: answers.current.npm_author,
    });
  }

  tasks.push((c, a) => {
    c.files.packageJson.setContent(c => ({ ...c, license: a.license.npmName }));
    const license = file(path.join(c.root, "LICENSE"), FILE_FORMAT.RAW);
    license.setContent(
      a.license.getContent({
        year: a.license_year,
        author: a.license_author,
      }),
    );
    return {
      ...c,
      files: { ...c.files, license },
    };
  });
};
