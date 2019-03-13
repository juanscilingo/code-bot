import { VM } from "vm2";

const CODE_REGEX = /```([\s\S]+)```/m;

const extractCode = message => {
  const matches = CODE_REGEX.exec(message.content);
  return matches ? matches[1] : null;
};

const run = message => {
  const code = extractCode(message);

  if (!code) {
    message.channel.send("Please include a code block");
    return;
  }
  const vm = new VM({
    timeout: 1000,
    sandbox: {}
  });

  const result = vm.run(code);
  message.channel.send(`\`\`\`${result}\`\`\``);
};

export default {
  expression: "run",
  execute: run
};
