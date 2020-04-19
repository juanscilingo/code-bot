import { mdnExpressions as expressions } from "./expressions";
import axios from 'axios';
import { RichEmbed } from "discord.js";
import { extractArgument } from "../helpers/commandHelpers";
import { mdnEmbed } from "./embeds";

const CUSTOM_SEARCH_URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.MDN_CUSTOM_SEARCH_API_KEY}&cx=${process.env.MDN_CUSTOM_SEARCH_ENGINE_ID}`;

const sendHelp = (message, reply) => {
  const content = "It looks like you didn't include a query in your message";

  if (reply) return reply.edit(content, { code: false, embed: mdnEmbed });
  else return message.channel.send(content, { code: false, embed: mdnEmbed });
};

const mdn = async (message, reply) => {
  const arg = extractArgument(message);
  if (!arg) return sendHelp(message, reply);

  const url = `${CUSTOM_SEARCH_URL}&q=${encodeURIComponent(arg)}`;
  const result = (await axios.get(url)).data;
  let content;

  if (!result.items)
    content = `I couldn't find that`;
  else {
    const item = result.items[0];
    const description = item.pagemap.metatags[0]['og:description'] || item.snippet;
    content = new RichEmbed()
      .setColor(0x83d0f2)
      .setTitle(item.title)
      .setDescription(description)
      .setURL(item.link)
      .setAuthor(`Mozilla Developer Network`, item.pagemap.cse_image[0].src, 'https://developer.mozilla.org/en-US')
	    .setFooter('MDN', item.pagemap.cse_image[0].src);
  }

  if (reply) return reply.edit(content);
  else return message.channel.send(content);
};

export default {
  expressions,
  execute: mdn
};
