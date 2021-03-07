const {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} = require("apollo-server");
const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    createComment: async (parent, { postId, body, sticker }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        if (body.trim() === "" && sticker.trim() === "") {
          throw new UserInputError("Empty comment", {
            errors: {
              body: "Comment content or sticker must not be empty",
            },
          });
        }
        const post = await Post.findById(postId);
        if (!post) {
          throw new ForbiddenError("Post not found");
        }
        post.comments.unshift({
          body,
          sticker,
          username: user.username,
        });
        const updatedPost = await post.save();
        return updatedPost;
      } catch (err) {
        throw err;
      }
    },
    deleteComment: async (parent, { postId, commentId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) {
          throw new ForbiddenError("Post not found");
        }
        // we check who can delete this comment
        // - just person who have a post can delete
        // - and person who have a comment can delete
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (
          post.username === user.username ||
          post.comments[commentIndex].username === user.username
        ) {
          post.comments.splice(commentIndex, 1);
          const updatedPost = await post.save();
          return updatedPost;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
