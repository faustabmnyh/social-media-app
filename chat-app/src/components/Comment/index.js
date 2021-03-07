import moment from "moment";
import DeleteComment from "../DeleteComment";
import "./Comment.css";

const Comment = ({
  handleSendComment,
  commentContent,
  setCommentContent,
  post,
  setAddSticker,
  stickers,
  addSticker,
}) => {
  return (
    <>
      <div className="comment__allComments">
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment__commentContainer">
                <img
                  src="/images/icons/profile.png"
                  alt="person"
                  className="comment__person"
                />
                <div className="comment__commentContent">
                  <div className="comment__commentContentHeader">
                    <div className="comment__headerDetail">
                      <h3>{comment.username}</h3>
                      <p>{moment(comment.createdAt).fromNow()}</p>
                    </div>
                    <DeleteComment comment={comment} post={post} />
                  </div>
                  {comment.sticker && (
                    <p className="comment__commentSticker">{comment.sticker}</p>
                  )}
                  {comment.body && <p>{comment.body}</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form className="comment__comment" onSubmit={handleSendComment}>
        <div className="comment__commentInput">
          <img
            src="/images/icons/profile.png"
            alt="person"
            className="comment__person"
          />
          <input
            type="text"
            placeholder="Write a comment"
            value={commentContent}
            onChange={setCommentContent}
          />
          <div className="comment__stickerContainer">
            <img
              src="/images/icons/Happy.svg"
              alt="image_happy"
              className="comment__sticker"
            />
            <div className="comment__stickerContent">
              {stickers.map((sticker, index) => (
                <p key={index} onClick={() => setAddSticker(sticker)}>
                  {sticker}
                </p>
              ))}
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSendComment}
            disabled={!commentContent && !addSticker}
          >
            Send
          </button>
        </div>
        {addSticker && (
          <div className="comment__commentStickerContainer">
            <p className="comment__commentSticker">{addSticker}</p>
            <span onClick={() => setAddSticker("")}>
              <i class="fa fa-times" />
            </span>
          </div>
        )}
      </form>
    </>
  );
};

export default Comment;
