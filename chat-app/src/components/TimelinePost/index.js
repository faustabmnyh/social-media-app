import { useState } from "react";
import { DELETE_POST } from "../../graphql/posts";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMENT_CREATED_ERROR,
  POST_DELETED,
} from "../../constants/postConstants";
import moment from "moment";
import Comment from "../Comment";
import SettingPost from "../SettingPost";
import DeletePost from "../DeletePost";
import "./TimelinePost.css";
import { CREATE_COMMENT } from "../../graphql/comments";
import CommentIcons from "../CommentIcons";

const TimelinePost = ({ post }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [openComment, setOpenComment] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [addSticker, setAddSticker] = useState("");
  const stickers = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted(data) {
      alert(data.deletePost);
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    onError(err) {
      dispatch({
        type: COMMENT_CREATED_ERROR,
        payload: err.message,
      });
      console.error(err);
    },
  });

  const handleSendComment = (e) => {
    e.preventDefault();
    if (commentContent === "" && addSticker === "") return;
    createComment({
      variables: { postId: post.id, body: commentContent, sticker: addSticker },
    });
    setCommentContent("");
    setAddSticker("");
  };

  const handleDeletePost = (postId) => {
    deletePost({ variables: { postId } });
    dispatch({
      type: POST_DELETED,
      payload: postId,
    });
    setConfirmDelete((confirmDelete) => !confirmDelete);
  };

  return (
    <>
      <div className={!post.imageUrl ? "timelinePost" : "timelinePost image"}>
        <div
          className={
            !post.imageUrl ? "timelinePost__user" : "timelinePost__user image"
          }
        >
          <div className="timelinePost__header">
            <img
              src="/images/icons/profile.png"
              alt="person"
              className="timelinePost__person"
            />
            <div className="timelinePost__text">
              <h3>{post.username}</h3>
              <p>{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
          {user.username === post.username && (
            <div
              className="timelinePost__headerSettings"
              onClick={() => setOpenSettings((openSettings) => !openSettings)}
            >
              <img src="/images/icons/elips-v.svg" alt="elips" />
            </div>
          )}
          {openSettings && (
            <SettingPost
              setConfirmDelete={() =>
                setConfirmDelete((confirmDelete) => !confirmDelete)
              }
              setOpenSettings={() =>
                setOpenSettings((openSettings) => !openSettings)
              }
            />
          )}
        </div>
        <div>
          {post.imageUrl && (
            <div className="timelinePost__image">
              <img src="/images/pictures/town.png" alt="architecture" />
            </div>
          )}
        </div>
        <div
          className={
            !post.imageUrl
              ? "timelinePost__contentText"
              : "timelinePost__contentText image"
          }
        >
          {post.sticker && (
            <p className="timelinePost__stickerBody">{post.sticker}</p>
          )}
          {post.body}
        </div>
        <CommentIcons
          post={post}
          setOpenComment={() => setOpenComment((openComment) => !openComment)}
        />
        {openComment && (
          <Comment
            handleSendComment={handleSendComment}
            commentContent={commentContent}
            setCommentContent={(e) => setCommentContent(e.target.value)}
            post={post}
            addSticker={addSticker}
            setAddSticker={(sticker) => setAddSticker(sticker)}
            stickers={stickers}
          />
        )}
      </div>
      {confirmDelete && (
        <DeletePost
          setConfirmDelete={() =>
            setConfirmDelete((confirmDelete) => !confirmDelete)
          }
          handleDeletePost={() => handleDeletePost(post.id)}
        />
      )}
    </>
  );
};

export default TimelinePost;
