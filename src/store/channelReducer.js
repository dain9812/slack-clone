const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";

export const setCurrentChannel = (channel) => ({
  type: SET_CURRENT_CHANNEL,
  setCurrentChannel: channel,
});

const initialState = { currentChannel: null };

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        currentChannel: action.setCurrentChannel,
      };
    default:
      return state;
  }
};

export default channelReducer;
