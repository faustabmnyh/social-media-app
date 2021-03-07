import { useDispatch } from "react-redux";
import "./SidebarMsg.css";
import { GET_SELECTED_USER } from "../../../constants/messageConstants";

const SidebarMsg = ({ loading, users, selectedUser }) => {
  const stickers = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

  const dispatch = useDispatch();
  if (loading) {
    return (
      <div className="sidebarMsg__progress">
        <div className="loading"></div>
      </div>
    );
  }
  const handleLasteMessage = (content) => {
    // this is for handle if the latest message is sticker
    // instead of display the actual sticker i just want to display sticker as the text
    const sticker = stickers.find((s) => s === content);
    return sticker === content;
  };

  const handleSelectedMessage = (user) => {
    dispatch({ type: GET_SELECTED_USER, payload: user.username });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      {users.length === 0 && (
        <div className="sidebarMsg__progress">
          <p>You have no friends.</p>
        </div>
      )}
      {users?.map((user, index) => (
        <div
          className={
            selectedUser?.username === user.username
              ? "sidebarMsg active"
              : "sidebarMsg"
          }
          key={index}
          onClick={() => handleSelectedMessage(user)}
        >
          <img
            src={user.imageUrl ? user.imageUrl : "/images/icons/profile.png"}
            alt="avatar"
            className="sidebarMsg__person"
          />
          <div
            className={
              selectedUser?.username === user.username
                ? "sidebarMsg__text active"
                : "sidebarMsg__text"
            }
          >
            <h3>{user.username}</h3>
            <p>
              {user.latestMessage?.content
                ? handleLasteMessage(user.latestMessage?.content)
                  ? `${
                      user.latestMessage.to === user.username
                        ? "You"
                        : user.latestMessage.from
                    } sent a sticker`
                  : truncate(user.latestMessage.content, 20)
                : "You're new connected"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SidebarMsg;
