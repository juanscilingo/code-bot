import { JS_CODE_REGEX, CODE_REGEX, FIRST_WORD_REGEX } from "./regex";

const { COMMAND_PREFIX } = process.env;

export const messageMatchesCommand = (message, command) => {
  const match = FIRST_WORD_REGEX.exec(message.content.substr(1));
  if (!match) return false;
  return command === match[0];
};

export const extractRegex = message => {
  const args = message.content
    .slice(COMMAND_PREFIX)
    .trim()
    .replace(/\n/g, " ")
    .split(" ");
  const regexParameter = args[1];

  try {
    const flags = regexParameter.replace(/.*\/([gimy]*)$/, "$1");
    const pattern = regexParameter.replace(
      new RegExp("^/(.*?)/" + flags + "$"),
      "$1"
    );
    const regex = new RegExp(pattern, flags);
    return regex;
  } catch (e) {
    return null;
  }
};

export const extractCodeBlock = message => {
  let matches = JS_CODE_REGEX.exec(message.content);

  if (!matches) {
    matches = CODE_REGEX.exec(message.content);
    return matches ? matches[1] : null;
  } else {
    return matches[1];
  }
};
