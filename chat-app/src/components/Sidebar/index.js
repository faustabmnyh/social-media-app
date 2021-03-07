import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
} from "../../constants/messageConstants";
import { GET_USERS } from "../../graphql/users";
import "./Sidebar.css";
import SidebarMsg from "./SidebarMsg";

const Sidebar = () => {
  const messagesUser = useSelector((state) => state.messagesUser);
  const { users } = messagesUser;
  const selectedUser = users?.find((u) => u.selected);
  const dispatch = useDispatch();
  // for handle search username
  const [username, setUsername] = useState("");
  const { loading } = useQuery(GET_USERS, {
    variables: { username },
    onCompleted(data) {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data.getUsers,
      });
    },
    onError(err) {
      dispatch({
        type: GET_USERS_FAIL,
        payload: err.message,
      });
    },
  });
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__header">
          <h1>Chat</h1>
          <form className="sidebar__input">
            <input
              type="text"
              placeholder="Search..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <img src="/images/icons/search.svg" alt="search" />
          </form>
        </div>
        <div className="sidebar__chat">
          <SidebarMsg
            selectedUser={selectedUser}
            users={users}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
