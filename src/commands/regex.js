import { extractRegex, extractCodeBlock } from "../helpers/commandHelpers";
import { regexEmbed } from "./embeds";
import { regexExpressions as expressions } from "./expressions";

const sendHelp = (message, reply, text) => {
  if (reply) return reply.edit(text, { code: false, embed: regexEmbed });
  else return message.channel.send(text, { code: false, embed: regexEmbed });
};

const getTextWithMatches = (text, regex) =>
  text.replace(regex, match => `​***${match}***​`); // There's an invisible character before and after the asterisks in order to avoid markdown formatting problems

const getMatchesEmbed = (text, regex) => {
  const textWithMatches = getTextWithMatches(text, regex);
  return new RichEmbed().setColor(0x00ff00).setDescription(textWithMatches);
};

const regex = (message, reply) => {
  const regex = extractRegex(message);
  if (!regex)
    return sendHelp(
      message,
      reply,
      "It looks like you didn't include a valid regular expression in your message"
    );

  const text = extractCodeBlock(message);
  if (!text)
    return sendHelp(
      message,
      reply,
      "It looks like you didn't include a valid code block in your message"
    );

  const matchesEmbed = getMatchesEmbed(text, regex);

  if (reply)
    return reply.edit(`Matches for **${regex}**`, {
      code: false,
      embed: matchesEmbed
    });
  else
    return message.channel.send(`Matches for **${regex}**`, {
      code: false,
      embed: matchesEmbed
    });
};

export default {
  expressions,
  execute: regex
};
