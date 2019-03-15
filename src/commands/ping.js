import { pingExpressions as expressions } from "./expressions";

const ping = (message, reply) => {
  const content = ":ping_pong: pong!";
  if (reply) return reply.edit(content, { code: false, helpEmbed });
  else return message.channel.send(content);
};

export default {
  expressions,
  execute: ping
};
