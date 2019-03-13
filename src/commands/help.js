import { RichEmbed } from "discord.js";

const help = message => {
  const embed = new RichEmbed()
    .setTitle("Help")
    .setColor(0x0000ff)
    .setDescription(`Here's the full list of available commands:`)
    .addField(
      "run",
      `The run command lets you evaluate a javascript expression. You must include a **javascript** codeblock with the code you want to evaluate: 

      >run
      **\\\`\\\`\\\`js**
      const num1 = 2;
      const num2 = 5;

      num1 + num2
      **\\\`\\\`\\\`**
      `,
      true
    );

  message.channel.send(embed);
};

export default {
  expression: "help",
  execute: help
};
