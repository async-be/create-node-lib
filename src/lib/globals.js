const fs = require("fs");

const rootDir = process.cwd();
const rootDirFiles = fs.readdirSync(rootDir);

module.exports = {
  rootDir,
  rootDirFiles
};
