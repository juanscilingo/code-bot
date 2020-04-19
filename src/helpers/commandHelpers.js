import { JS_CODE_REGEX, CODE_REGEX, FIRST_WORD_REGEX } from "./regex";

const { COMMAND_PREFIX } = process.env;

export const messageMatchesCommand = (message, commandExpressions) => {
  const givenCommand = FIRST_WORD_REGEX.exec(message.content.substr(1));
  if (!givenCommand) return false;
  return commandExpressions.includes(givenCommand[0]);
};

export const extractArgument = message => {
  const withoutPrefix = message.content.slice(COMMAND_PREFIX.length);
  const firstSpaceIndex = withoutPrefix.indexOf(' ');
  if (firstSpaceIndex === -1) return '';
  else return withoutPrefix.substr(firstSpaceIndex + 1).trim();
}

export const extractArgumentArray = message => extractArgument(message).replace(/\n/g, " ").split(" ");

export const extractRegex = message => {
  const args = extractArgumentArray(message);
  const regexParameter = args[0];

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
