import { RichEmbed } from "discord.js";
import { VM } from "vm2";

const CODE_REGEX = /```js([\s\S]+)```/m;

const extractCode = message => {
  const matches = CODE_REGEX.exec(message.content);
  return matches ? matches[1] : null;
};

const sendHelp = message => {
  const embed = new RichEmbed().setTitle("How to run code?").setColor(0xff0000)
    .setDescription(`Please include a **javascript** code block in your message like this:
      >run
      **\\\`\\\`\\\`js**
      const num1 = 2;
      const num2 = 5;

      num1 + num2
      **\\\`\\\`\\\`**
    `);

  message.channel.send(embed);
};

const run = message => {
  const code = extractCode(message);

  if (!code) {
    sendHelp(message);
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
