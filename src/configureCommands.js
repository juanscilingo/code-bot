import * as commands from "./commands";

const extractCommandFromMessage = message => {
  let fullCommand = message.content.substr(1);
  return fullCommand.split(" ")[0];
};

const messageMatchesCommand = (message, command) => {
  const receivedCommand = extractCommandFromMessage(message);
  return command === receivedCommand;
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

      if (commandToExecute) commandToExecute.execute(message);
      else message.channel.send("Whoops, I didn't understand that");
    }
  });
};
