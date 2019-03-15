import { RichEmbed } from "discord.js";
const { COMMAND_PREFIX } = process.env;

const runField = {
  name: `**${COMMAND_PREFIX}run** <codeblock>`,
  description:
    "Lets you evaluate a javascript expression. You must include a codeblock with the code you want to evaluate.",
  example: `>run
    **\\\`\\\`\\\`js**
    const num1 = 2;
    const num2 = 5;

    num1 + num2
    **\\\`\\\`\\\`**
    `
};

const regexField = {
  name: `**${COMMAND_PREFIX}regex** <regex> <codeblock>`,
  description:
    "Lets you test a regular expression against a text highlighting the matches. You must include a codeblock with the text you want to test against.",
  example: `>regex <YOUR_REGEX>
  **\\\`\\\`\\\`**
  this is the text that is going to be tested against the provided regular expression
  **\\\`\\\`\\\`**
  `
};

export const runEmbed = new RichEmbed()
  .setTitle(runField.name)
  .setColor(0x34ace0)
  .setDescription(`${runField.description}\r\n\r\n${runField.example}`);

export const regexEmbed = new RichEmbed()
  .setTitle(regexField.name)
  .setColor(0x34ace0)
  .setDescription(`${regexField.description}\r\n\r\n${regexField.example}`);

export const helpEmbed = new RichEmbed()
  .setTitle("Full list of available commands")
  .setColor(0x34ace0)
  .addField(runField.name, runField.description)
  .addField(regexField.name, regexField.description);
