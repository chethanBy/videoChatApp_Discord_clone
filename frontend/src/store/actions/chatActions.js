export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

export const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: "CHAT.SET_CHOSEN_CHAT_DETAILS",
  SET_MESSAGES: "CHAT.SET_MESSAGES",
  SET_CHAT_TYPE: "CHAT. SET_CHAT_TYPE",
};

// when we press on any friend to message
export const setChosenChatDetailsAction = (chatDetails, type) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatType: type,
    chatDetails,
  };
};

export const setChosenChatDetails = (dispatch, details, type) => {
  dispatch(setChosenChatDetailsAction(details, type));
};

// sets all messages coming from server to redux store
export const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};
