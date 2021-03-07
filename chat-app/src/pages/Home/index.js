import { useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEW_MESSAGE } from "../../graphql/messages";
import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";
import "./Home.css";
import { SEND_MESSAGE } from "../../constants/messageConstants";

const Home = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const { data: dataMessages } = useSubscription(NEW_MESSAGE);
  const messagesUser = useSelector((state) => state.messagesUser);
  const { users } = messagesUser;
  const selectedUser = users?.find((u) => u.selected);
  useEffect(() => {
    if (dataMessages) {
      const message = dataMessages.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;
      dispatch({
        type: SEND_MESSAGE,
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [dataMessages]);
  return (
    <>
      <div className="home">
        <div className="home__left">
          <Sidebar />
        </div>
        <div className="home__right">
          <Messages />
        </div>
      </div>
      <div className="home__responsive">
        {!selectedUser ? (
          <div className="home__leftResponsive">
            <Sidebar />
          </div>
        ) : (
          <div className="home__rightResponsive">
            <Messages />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
