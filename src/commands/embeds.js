import { RichEmbed } from "discord.js";
import {
  helpExpressions,
  runExpressions,
  pingExpressions,
  regexExpressions,
  mdnExpressions
} from "./expressions";
const { COMMAND_PREFIX } = process.env;

const runField = {
  name: `**${COMMAND_PREFIX}run** <codeblock>\r\nAliases: **${runExpressions
    .slice(1)
    .join(", ")}**`,
  description:
    "Lets you evaluate a javascript expression. You must include a codeblock with the code you want to evaluate.",
  help: `>run
    **\\\`\\\`\\\`js**
    const num1 = 2;
    const num2 = 5;

    num1 + num2
    **\\\`\\\`\\\`**
    `
};

const regexField = {
  name: `**${COMMAND_PREFIX}regex** <regex> <codeblock>\r\nAliases: **${regexExpressions
    .slice(1)
    .join(", ")}**`,
  description:
    "Lets you test a regular expression against a text highlighting the matches. You must include a codeblock with the text you want to test against.",
  help: `Aliases:
  >regex <YOUR_REGEX>
  **\\\`\\\`\\\`**
  this is the text that is going to be tested against the provided regular expression
  **\\\`\\\`\\\`**
  `
};

const helpField = {
  name: `**${COMMAND_PREFIX}help**\r\nAliases: **${helpExpressions
    .slice(1)
    .join(", ")}**`,
  description: "Gives you the full list of available commands"
};

const pingField = {
  name: `**${COMMAND_PREFIX}ping**\r\nAliases: **${pingExpressions
    .slice(1)
    .join(", ")}**`,
  description: "Check if the bot is up and running"
};

const mdnField = {
  name: `**${COMMAND_PREFIX}mdn <YOUR_SEARCH_QUERY>**\r\nAliases: **${mdnExpressions
    .slice(1)
    .join(", ")}**`,
  description: "Search MDN for information about a js/html/css topic",
  help: `
    >mdn <YOUR_SEARCH_QUERY>
  `
};

export const runEmbed = new RichEmbed()
  .setTitle(runField.name)
  .setColor(0x34ace0)
  .setDescription(`${runField.description}\r\n\r\n${runField.help}`);

export const regexEmbed = new RichEmbed()
  .setTitle(regexField.name)
  .setColor(0x34ace0)
  .setDescription(`${regexField.description}\r\n\r\n${regexField.help}`);

export const helpEmbed = new RichEmbed()
  .setTitle("Full list of available commands")
  .setColor(0x34ace0)
  .addField(runField.name, runField.description)
  .addField(regexField.name, regexField.description)
  .addField(pingField.name, pingField.description)
  .addField(helpField.name, helpField.description)
  .addField(mdnField.name, mdnField.description);

export const mdnEmbed = new RichEmbed()
  .setTitle(mdnField.name)
  .setColor(0x34ace0)
  .setDescription(`${mdnField.description}\r\n\r\n${mdnField.help}`);