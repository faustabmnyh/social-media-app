import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_COMMENT } from "../../graphql/comments";
import "./DeleteComment.css";

const DeleteComment = ({ post, comment }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [openCommentSetting, setOpenCommentSetting] = useState(false);
  // we check who can delete this comment
  // - just person who have a post can delete
  // - and person who have a comment can delete
  const checkDeleteComment =
    post.username === user.username || comment.username === user.username;

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {
      postId: post.id,
      commentId: comment.id,
    },
    onError(err) {
      console.error(err.message);
    },
  });

  return (
    <div
      className="deleteComment"
      onClick={() =>
        setOpenCommentSetting((openCommentSetting) => !openCommentSetting)
      }
    >
      {checkDeleteComment && (
        <div className="deleteComment__settings">
          <img src="/images/icons/elips-h.svg" alt="elips" />
        </div>
      )}
      {openCommentSetting && (
        <div className="deleteComment__settingLists">
          <ul>
            <li onClick={deleteComment}>Delete Comment</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;
