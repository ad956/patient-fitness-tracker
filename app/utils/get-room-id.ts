const getRoomId = (userId1: string, userId2: string) => {
  return `chat-${[userId1, userId2].sort().join("-")}`;
};

export default getRoomId;
