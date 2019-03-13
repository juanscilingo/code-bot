const replies = {};

export const addReply = (messageId, reply) => {
  replies[messageId] = reply;
};

export const hasReply = messageId => messageId in replies;

export const getReply = messageId => replies[messageId];

export const removeReply = messageId => {
  replies[messageId].delete();
  delete replies[messageId];
};
