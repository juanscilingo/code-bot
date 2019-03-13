import * as commands from "./commands";

const FIRST_WORD_REGEX = /^([\w\-]+)/;

const messageMatchesCommand = (message, command) => {
  const match = FIRST_WORD_REGEX.exec(message.content.substr(1));
  if (!match) return false;
  return command === match[0];
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
        message.channel.send("Whoops, I didn't understand that");
      }
    }
  });
};
