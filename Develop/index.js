const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api.js");
const generateMarkdown = require("./utils/generateMarkdown.js");
const questions = [
  {
    type: "input",
    message: "What is your Github username?",
    name: "username",
    default: "rschm007",

    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid GitHub username is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the name of your GitHub repo?",
    name: "repo",
    default: "readme_generator",
    
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid GitHub repo is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the title of the project?",
    name: "title",
    default: "Project Title",

    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid project title is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Please write a description for your project",
    name: "description",
    default: "Project Description",

    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid description is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message:
      "Installation: Please describe the steps required to install your project.",
    name: "installation"
  },
  {
    type: "input",
    message:
      "Usage: Please give instructions and examples of how to use your project.",
    name: "usage"
  },
  {
    type: "input",
    message:
      "Usage: Please give instructions on how other devs can contribute to your project.",
    name: "contribute"
  },
  {
    type: "input",
    message:
      "Tests: Please provide any tests for your application and instructions on how to run the tests.",
    name: "tests"
  },
  {
    type: "input",
    message:
      "Please choose a license for your project. A complete list of projects can be found at https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository",
    licenses: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postqresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib'],
    name: "license"
  },
  {
    type: "input",
    message:
      "If others contributed to your project, please credit them here.",
    name: "credits"
  },
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Success! Your README.md file has been generated.");
    });
}

const writeFileAsync = util.promisify(writeToFile);

async function init() {
    try {
        
        const userResp = await inquirer.prompt(questions);
        console.log(`You responded with: ${userResp}`);
        console.log('Responses entered succesfully! Getting GitHub data, please wait...');

        const userInfo = await api.getUser(userResp);
        console.log(`Your GitHub info: ${userInfo}`);

        console.log("README is being written!");
        const markdown = generateMarkdown(userResp, userInfo);
        console.log(markdown);

        await writeFileAsync('ExampleREADME.md', markdown);
    } catch (error) {
        console.log(error);
    }
};

init();