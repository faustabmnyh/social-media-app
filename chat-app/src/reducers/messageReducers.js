import {
  GET_SELECTED_USER,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  SEND_MESSAGE,
  SET_USER_MESSAGES,
} from "../constants/messageConstants";

export const messageUsersReducers = (state = { users: [] }, action) => {
  let usersSelected, userIndex;
  // const { username, message, messages } = action.payload;
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SELECTED_USER:
      usersSelected = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));
      return {
        users: usersSelected,
      };
    case SET_USER_MESSAGES:
      usersSelected = [...state.users];
      userIndex = usersSelected.findIndex(
        (u) => u.username === action.payload.username
      );
      const messages = action.payload.messages;
      usersSelected[userIndex] = { ...usersSelected[userIndex], messages };
      return {
        users: usersSelected,
      };
    case SEND_MESSAGE:
      usersSelected = [...state.users];
      userIndex = usersSelected.findIndex(
        (u) => u.username === action.payload.username
      );
      const message = action.payload.message;
      let newMessage = {
        ...usersSelected[userIndex],
        messages: usersSelected[userIndex].messages
          ? [message, ...usersSelected[userIndex].messages]
          : null,
        latestMessage: message,
      };
      usersSelected[userIndex] = newMessage;
      return {
        users: usersSelected,
      };
    default:
      return state;
  }
};
