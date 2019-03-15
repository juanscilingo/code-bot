import * as commands from "./commands";
import { addReply, hasReply, getReply, removeReply } from "./replyLog";
import { messageMatchesCommand } from "./helpers/commandHelpers";
import { helpEmbed } from "./helpers/embeds";

export default client => {
  client.on("message", message => {
    if (message.author == client.user) return;

    try {
      if (message.content.startsWith(process.env.COMMAND_PREFIX)) {
        const commandToExecute = Object.values(commands).find(command =>
          messageMatchesCommand(message, command.expression)
        );

        if (commandToExecute) {
          commandToExecute
            .execute(message)
            .then(reply => addReply(message.id, reply));
        } else {
          message.channel
            .send("Whoops, I didn't understand that", helpEmbed)
            .then(reply => addReply(message.id, reply));
        }
      }
    } catch (err) {
      console.error(err);
      message.channel
        .send(`Whoops, an error occurred`)
        .then(reply => addReply(message.id, reply));
    }
  });

  client.on("messageUpdate", (oldMessage, newMessage) => {
    if (newMessage.author == client.user) return;

    if (hasReply(oldMessage.id)) {
      const reply = getReply(oldMessage.id);

      if (!newMessage.content.startsWith(process.env.COMMAND_PREFIX))
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
