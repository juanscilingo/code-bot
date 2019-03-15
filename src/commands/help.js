import { helpEmbed } from "./embeds";
import { helpExpressions as expressions } from "./expressions";

const help = (message, reply) => {
  if (reply) return reply.edit("", { code: false, helpEmbed });
  else return message.channel.send(helpEmbed);
};

export default {
  expressions,
  execute: help
};
