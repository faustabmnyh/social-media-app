import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  userLoginReducers,
  userRegisterReducers,
} from "./reducers/userReducers";
import jwtDecode from "jwt-decode";
import { messageUsersReducers } from "./reducers/messageReducers";
import { getPostReducers } from "./reducers/postReducers";

let user;
const getToken = localStorage.getItem("userGetToken");
if (getToken) {
  const decodeToken = jwtDecode(getToken);
  const expiresAt = new Date(decodeToken.exp * 1000);
  if (new Date() > expiresAt) {
    localStorage.removeItem("userGetToken");
  } else {
    user = decodeToken;
  }
}

const initialState = {
  userLogin: { user },
};

const reducer = combineReducers({
  userRegister: userRegisterReducers,
  userLogin: userLoginReducers,
  messagesUser: messageUsersReducers,
  userPosts: getPostReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
