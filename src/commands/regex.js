import { RichEmbed } from "discord.js";
import { VM } from "vm2";
import { extractRegex, extractCodeBlock } from "../helpers/commandHelpers";

const sendHelp = (message, reply, text) => {
  const embed = new RichEmbed()
    .setTitle("How test regular expressions?")
    .setColor(0xff0000)
    .setDescription(`Please include a code block in your message like this:
      >regex <YOUR_REGEX>
      **\\\`\\\`\\\`**
      this is the text that is going to be tested against the provided regular expression
      **\\\`\\\`\\\`**
    `);

  if (reply) return reply.edit(text, { code: false, embed });
  else return message.channel.send(text, { code: false, embed });
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
  expression: "regex",
  execute: regex
};
