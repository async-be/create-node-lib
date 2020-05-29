const globals = require("../lib/globals");
const validateNpmName = require("validate-npm-package-name");
const fs = require("fs");
const path = require("path");
const { file, FILE_FORMAT } = require("../lib/file");

module.exports = function* ({ answers, ask, tasks }) {
  yield ask({
    name: "npm_name",
    type: "input",
    message: "Package name",
    validate: v => {
      if (!v || v.trim() === "") {
        return "Package name is mandatory";
      }
      return globals.rootDirFiles.includes(v)
        ? `A folder or file is already named "${v}" in this folder`
        : validateNpmName(v).validForNewPackages
        ? true
        : `"${v}" is not a valid npm package name`;
    },
  });
  tasks.push((c, a) => {
    const root = path.join(globals.rootDir, a.npm_name);
    const packageJson = file(path.join(root, "package.json"), FILE_FORMAT.JSON);
    packageJson.setContent({
      name: a.npm_name,
    });
    fs.mkdirSync(root);
    return {
      root: path.join(globals.rootDir, a.npm_name),
      files: { ...c.files, packageJson },
    };
  });

  yield ask({
    name: "npm_version",
    type: "input",
    message: "Package version",
    default: "0.1.0",
    validate: v =>
      v.match(
        /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/gm,
      )
        ? true
        : `"${v}" is not a valid npm version`,
  });
  tasks.push((c, a) => {
    c.files.packageJson.setContent(c => ({ ...c, version: a.npm_version }));
  });

  yield ask({
    name: "npm_description",
    type: "input",
    message: "Package description",
    default: answers.current["npm_name"],
  });
  tasks.push((c, a) => {
    c.files.packageJson.setContent(c => ({
      ...c,
      description: a.npm_description,
    }));
  });

  yield ask({
    name: "npm_keywords",
    type: "input",
    message: "Package keywords, comma separated",
  });
  tasks.push((c, a) => {
    if (a.npm_keywords.length <= 0) {
      return;
    }
    c.files.packageJson.setContent(c => ({
      ...c,
      keywords: a.npm_keywords.split(",").map(v => v.trim()),
    }));
  });

  yield ask({
    name: "npm_author",
    type: "input",
    message: "Package author",
  });
  tasks.push((c, a) => {
    c.files.packageJson.setContent(c => ({
      ...c,
      author: a.npm_author,
    }));
  });
};
