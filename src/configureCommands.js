import { RichEmbed } from "discord.js";
import * as commands from "./commands";
import { addReply, hasReply, getReply, removeReply } from "./replyLog";

const FIRST_WORD_REGEX = /^([\w\-]+)/;

const messageMatchesCommand = (message, command) => {
  const match = FIRST_WORD_REGEX.exec(message.content.substr(1));
  if (!match) return false;
  return command === match[0];
};

const helpEmbed = new RichEmbed()
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

export default client => {
  client.on("message", message => {
    if (message.author == client.user) return;

    if (message.content.startsWith(process.env.COMMAND_CHARACTER)) {
      const commandToExecute = Object.values(commands).find(command =>
        messageMatchesCommand(message, command.expression)
      );

      if (commandToExecute) {
        try {
          commandToExecute
            .execute(message)
            .then(reply => addReply(message.id, reply));
        } catch (err) {
          message.channel
            .send(`ERROR: ${err}`)
            .then(reply => addReply(message.id, reply));
        }
      } else {
        message.channel
          .send("Whoops, I didn't understand that", helpEmbed)
          .then(reply => addReply(message.id, reply));
      }
    }
  });

  client.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.author == client.user) return;

    if (hasReply(oldMessage.id)) {
      const reply = getReply(oldMessage.id);

      if (!newMessage.content.startsWith(process.env.COMMAND_CHARACTER))
        return reply.edit("Whoops, I didn't understand that", helpEmbed);

      const commandToExecute = Object.values(commands).find(command =>
        messageMatchesCommand(newMessage, command.expression)
      );

      if (commandToExecute) {
        try {
          commandToExecute.execute(newMessage, reply);
        } catch (err) {
          reply.edit(`ERROR: ${err}`);
        }
      } else {
        reply.edit("Whoops, I didn't understand that", helpEmbed);
      }
    }
  });

  client.on("messageDelete", message => {
    if (hasReply(message.id)) removeReply(message.id);
  });
};
