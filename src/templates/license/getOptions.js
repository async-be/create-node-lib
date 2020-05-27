const inquirer = require("inquirer");
const globals = require("../../lib/globals");
const validateNpmName = require("validate-npm-package-name");

module.exports = () => {
  return inquirer.prompt([
    {
      name: "npm-name",
      type: "input",
      message: "Package name",
      validate: v => {
        if(!v || v.trim() === "") {
          return "Package name is mandatory";
        }
        return globals.rootDirFiles.includes(v)
          ? `A folder or file is already named "${v}" in this folder`
          : validateNpmName(v).validForNewPackages
          ? true : `"${v}" is not a valid npm package name`
      },
    },
    {
      name: "npm-version",
      type: "input",
      message: "Package version",
      default: "0.1.0",
      validate: v => v.match(/^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/gm)
          ? true : `"${v}" is not a valid npm version`
    },
    {
      name: "npm-description",
      type: "input",
      message: "Package description"
    },
    {
      name: "npm-keywords",
      type: "input",
      message: "Package keywords (comma separated)"
    },
    {
      name: "npm-author",
      type: "input",
      message: "Package author"
    },
    {
      name: "license-type",
      type: "list",
      message: "Package license (more info at https://choosealicense.com)",
      choices: [
        new inquirer.Separator(),
        "none",
        new inquirer.Separator(),
        "GNU AGPLv3",
        "GNU GPLv3",
        "GNU LGPLv3",
        "Mozilla Public License 2.0",
        "Apache License 2.0",
        "MIT License",
        "Boost Software License 1.0",
        "The Unlicense"
      ],
      default: "none"
    },
    {
      name: "license-owner",
      type: "input",
      message: "License owner (probably the package author)",
      default: answers => answers["npm-author"],
      validate: v => !v || v.trim() === "" ? "License owner is mandatory" : true,
      when: answers => answers["license-type"] !== "none"
    },
    {
      name: "license-year",
      type: "number",
      message: "License year",
      default: new Date().getFullYear(),
      when: answers => answers["license-type"] !== "none"
    }
  ])
};
