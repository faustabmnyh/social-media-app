import { useSelector } from "react-redux";
import "./InputMessage.css";

const InputMessage = ({ handleMessage, content, onChange, sendMessage }) => {
  const messagesUser = useSelector((state) => state.messagesUser);
  const { users } = messagesUser;
  const selectedUser = users?.find((u) => u.selected);
  const stickers = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

  const handleSendSticker = (sticker) => {
    sendMessage({ variables: { to: selectedUser.username, content: sticker } });
  };

  return (
    <form className="inputMessages__form" onSubmit={handleMessage}>
      <input
        type="text"
        placeholder="Type a message"
        value={content}
        onChange={onChange}
      />
      <div className="inputMessages__icons">
        <div className="inputMessages__stickerContainer">
          <img
            src="/images/icons/Happy.svg"
            alt="image_happy"
            className="inputMessages__sticker"
          />
          <div className="inputMessages__stickerContent">
            {stickers.map((sticker, index) => (
              <p key={index} onClick={() => handleSendSticker(sticker)}>
                {sticker}
              </p>
            ))}
          </div>
        </div>
        <img
          src="/images/icons/image_alt.svg"
          alt="image_add"
          className="inputMessages__add"
        />
        <img
          src="/images/icons/send.svg"
          alt="image_send"
          className="inputMessages__send"
          onClick={handleMessage}
        />
      </div>
    </form>
  );
};

export default InputMessage;
