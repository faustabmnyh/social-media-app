import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_MESSAGES } from "../../constants/messageConstants";
import { GET_MESSAGES, SEND_MESSAGE } from "../../graphql/messages";
import InputMessage from "../InputMessage";
import Message from "./Message";
import moment from "moment";
import "./Messages.css";

const Messages = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const messagesUser = useSelector((state) => state.messagesUser);
  const { users } = messagesUser;
  const selectedUser = users?.find((u) => u.selected);
  const messages = selectedUser?.messages;
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [prevDay, setPrevDay] = useState(1);
  const [getMessages, { loading: loadingMessages, data }] = useLazyQuery(
    GET_MESSAGES
  );

  // TODO: See the ecom code and whe want to implement the category in here and replace that ti time

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: SET_USER_MESSAGES,
        payload: {
          username: selectedUser.username,
          messages: data.getMessages,
        },
      });
    }
  }, [data]);

  const handleMessage = (e) => {
    e.preventDefault();
    if (content === "" || !selectedUser) return;
    sendMessage({ variables: { to: selectedUser.username, content } });
    setContent("");
  };
  return (
    <div className="messages">
      <div
        className={
          !messages && !loadingMessages
            ? "messages__content no-selected"
            : "messages__content"
        }
      >
        {!messages && !loadingMessages ? (
          <div className="messages__noSelected">
            <img
              src="/images/pictures/connect-to-chat.svg"
              alt="connect"
              className="messages__noSelectedImg"
            />
            <p className="messages__selectTitle">
              Use This Platfrom to Keep Connected With Your Friends.
            </p>
            <p className="messages__selectSubTitle">#Stay At Home</p>
          </div>
        ) : loadingMessages ? null : messages.length > 0 ? (
          messages.map((message) => (
            <Message message={message} key={message.id} />
          ))
        ) : messages.length === 0 ? (
          <div className="messages__noSelected">
            <img
              src="/images/pictures/send-first-message.svg"
              alt="first-message"
              className="messages__firstConnectImg"
            />
            <p className="messages__selectTitle">Send your first message!</p>
          </div>
        ) : (
          "You dont have message"
        )}
      </div>
      {messages && (
        <InputMessage
          content={content}
          onChange={(e) => setContent(e.target.value)}
          handleMessage={handleMessage}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default Messages;
