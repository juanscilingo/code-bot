import { RichEmbed } from "discord.js";
import * as commands from "./commands";

const FIRST_WORD_REGEX = /^([\w\-]+)/;

const messageMatchesCommand = (message, command) => {
  const match = FIRST_WORD_REGEX.exec(message.content.substr(1));
  if (!match) return false;
  return command === match[0];
};

const sendHelp = message => {
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

  message.channel.send("Whoops, I didn't understand that", embed);
};

export default client => {
  client.on("message", message => {
    if (message.author == client.user) {
      return;
    }

    if (message.content.startsWith(process.env.COMMAND_CHARACTER)) {
      const commandToExecute = Object.values(commands).find(command =>
        messageMatchesCommand(message, command.expression)
      );

      if (commandToExecute) {
        try {
          commandToExecute.execute(message);
        } catch (err) {
          message.channel.send(`ERROR: ${err}`);
        }
      } else {
        sendHelp(message);
      }
    }
  });
};
