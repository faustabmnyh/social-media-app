import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimelinePost from "../../components/TimelinePost";
import {
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  SEND_POST,
} from "../../constants/postConstants";
import { CREATE_POST, GET_POSTS, NEW_POST } from "../../graphql/posts";
import "./Timeline.css";

const Timeline = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  const [writePost, setWritePost] = useState(false);
  const stickers = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];
  const [addSticker, setAddSticker] = useState("");
  const { loading: loadingGetPosts, data: { getPosts } = [] } = useQuery(
    GET_POSTS
  );
  //  get posts reducer
  const { posts } = useSelector((state) => state.userPosts);
  // this is for subscription
  const { data: dataPosts } = useSubscription(NEW_POST);

  useEffect(() => {
    if (getPosts) {
      dispatch({ type: GET_POST_SUCCESS, payload: getPosts });
    }
  }, [getPosts, dispatch]);

  // this is for subscription , we add to new posts
  useEffect(() => {
    if (dataPosts) {
      // send new post to posts
      dispatch({
        type: SEND_POST,
        payload: dataPosts.newPost,
      });
    }
  }, [dataPosts, dispatch]);

  const [createPost, { loading: loadingCreatePost }] = useMutation(
    CREATE_POST,
    {
      onError(err) {
        dispatch({ type: GET_POST_ERROR, payload: err.message });
      },
    }
  );

  const handleSubmitBody = (e) => {
    e.preventDefault();
    if (body === "" && addSticker === "") return;
    createPost({ variables: { body, sticker: addSticker } });
    setBody("");
    setAddSticker("");
  };

  const handleWritePost = () => {
    setWritePost((writePost) => !writePost);
    setBody("");
  };

  return (
    <div className="timeline">
      <div className="timeline__content">
        <h1>Timeline</h1>
        <form
          className={
            writePost
              ? addSticker
                ? "timeline__write sticker"
                : "timeline__write write"
              : "timeline__write"
          }
        >
          {!writePost && (
            <img
              src="/images/icons/edit.svg"
              alt="pencil"
              className="timeline__icon"
            />
          )}

          {writePost ? (
            <div className="timeline__writePost">
              <textarea
                placeholder="What's New ?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="timeline__writePostStiker">
                <p>{addSticker}</p>
                {addSticker && (
                  <span onClick={() => setAddSticker("")}>
                    <i className="fa fa-times" />
                  </span>
                )}
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="What's New ?"
              onClick={handleWritePost}
            />
          )}

          <div
            className={
              writePost
                ? "timeline__utilContainer"
                : "timeline__utilContainer write"
            }
          >
            <div
              className="timeline__iconContainer"
              onClick={() => setWritePost(true)}
            >
              <div className="timeline__stickerContainer">
                <img
                  src="/images/icons/Happy.svg"
                  alt="image_happy"
                  className="timeline__sticker"
                />
                {writePost && (
                  <div className="timeline__stickerContent">
                    {stickers.map((sticker, index) => (
                      <p key={index} onClick={() => setAddSticker(sticker)}>
                        {sticker}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <img
                src="/images/icons/image_alt.svg"
                alt="image_alt"
                className={
                  writePost ? "timeline__icon write" : "timeline__icon"
                }
              />
            </div>
            {writePost && (
              <div>
                {loadingCreatePost && (
                  <span>
                    <i className="fa fa-spinner fa-spin" />
                  </span>
                )}
                <button onClick={handleWritePost}>Cancel</button>
                <button
                  className="timeline__btnSend"
                  onClick={handleSubmitBody}
                  disabled={!body && !addSticker}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </form>
        {loadingGetPosts ? (
          <div className="timeline__progress">
            <div className="loading"></div>
          </div>
        ) : (
          <div className="timeline__post">
            {posts.map((post) => (
              <TimelinePost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
