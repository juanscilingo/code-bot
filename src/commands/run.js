import { RichEmbed } from "discord.js";
import { VM } from "vm2";

const CODE_REGEX = /```js([\s\S]+)```/m;

const sendHelp = (message, reply) => {
  const embed = new RichEmbed().setTitle("How to run code?").setColor(0xff0000)
    .setDescription(`Please include a **javascript** code block in your message like this:
      >run
      **\\\`\\\`\\\`js**
      const num1 = 2;
      const num2 = 5;

      num1 + num2
      **\\\`\\\`\\\`**
    `);

  const content =
    "It looks like you didn't include a **javascript** codeblock in your message";

  if (reply) return reply.edit(content, { code: false, embed });
  else return message.channel.send(content, { code: false, embed });
};

const extractCode = message => {
  const matches = CODE_REGEX.exec(message.content);
  return matches ? matches[1] : null;
};

const run = (message, reply) => {
  const code = extractCode(message);

  if (!code) return sendHelp(message, reply);

  const vm = new VM({
    timeout: 1000,
    sandbox: {}
  });

  const result = vm.run(code);

  if (reply) return reply.edit(result, { code: true, embed: null });
  else return message.channel.send(result, { code: true });
};

export default {
  expression: "run",
  execute: run
};
