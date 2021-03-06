const Generator = require("yeoman-generator");
const fs = require("fs");
const path = require("path");
class PeGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "appName",
        message: "Project Name: ",
        validate(input) {
          if (!input) return "Please Enter Your Project Name";
          if (fs.readdirSync(".").includes(input)) {
            return "Directory with same name exists";
          }
          return true;
        },
      },
      {
        type: "list",
        choices: ["Koa-Restful", "Midway-Restful","Apollo-GraphQL"],
        name: "template",
        message: "Which template this time?",
        default: "Koa-Restful",
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  // notice diffrence between copy & copyTpl
  writing() {
    const { template, appName } = this.answers;
    // coptTpl will replace <%= appName %> by Template Engine
    // from to ctx
    this.fs.copyTpl(
      // JvasScript/_package.json" -> cwd
      this.templatePath(template, "_package.json"),
      this.destinationPath(appName, "package.json"),
      this.answers
    );
    // copy support file/file directory
    fs.readdirSync(this.templatePath(template))
      .filter((name) => !name.startsWith("_"))
      .forEach((item) => {
        this.fs.copy(
          this.templatePath(template, item),
          this.destinationPath(appName, item)
        );
      });
  }

  install() {
    const projectDir = path.join(process.cwd(), this.answers.appName);
    this.spawnCommandSync(
      "npm",
      [
        "config",
        "set",
        "sass_binary_site=https://npm.taobao.org/mirrors/node-sass/",
      ],
      { cwd: projectDir }
    );
    this.spawnCommandSync(
      "npm",
      ["install", "--registry=https://registry.npm.taobao.org"],
      { cwd: projectDir }
    );
  }

  end() {
    this.log("Enjoy Coding!");
  }
}

module.exports = PeGenerator;
