import {
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_RESET,
} from "../constants/userConstants";

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNOUT:
      return {};
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
