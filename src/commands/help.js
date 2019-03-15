import { helpEmbed } from "../helpers/embeds";

const help = (message, reply) => {
  if (reply) return reply.edit("", { code: false, helpEmbed });
  else return message.channel.send(helpEmbed);
};

export default {
  expression: "help",
  execute: help
};
