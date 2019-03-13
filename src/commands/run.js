const run = message => {
  message.channel.send("Executed RUN command");
};

export default {
  expression: "run",
  execute: run
};
