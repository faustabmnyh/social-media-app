const {
  AuthenticationError,
  UserInputError,
  ForbiddenError,
  withFilter,
} = require("apollo-server");
const Post = require("../../models/Post");
const User = require("../../models/User");

module.exports = {
  Query: {
    getPosts: async (parent, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const posts = await Post.find({}).sort({
          createdAt: -1,
        });
        return posts;
      } catch (err) {
        throw err;
      }
    },
    getPost: async (parent, { postId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) {
          throw new ForbiddenError("Post not found");
        }
        return post;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (parent, { body, sticker }, { user, pubsub }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        if (body.trim() === "" && sticker === "") {
          throw new UserInputError("Post body must not be empty", {
            errors: {
              body: "Post body or sticker must not be empty",
            },
          });
        }

        const post = new Post({
          body,
          sticker,
          user: user.id,
          username: user.username,
        });

        const postCreated = await post.save();

        // subscription
        await pubsub.publish("NEW_POST", { newPost: postCreated });
        return postCreated;
      } catch (err) {
        throw err;
      }
    },
    deletePost: async (parent, { postId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) {
          throw new ForbiddenError("Post not found");
        }
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw err;
      }
    },
    likePost: async (parent, { postId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === user.username)) {
            // if post already like , and we will unlike it
            post.likes = post.likes.filter(
              (like) => like.username !== user.username
            );
          } else {
            // if not liked, like post
            post.likes.push({
              username: user.username,
            });
          }
          const updatedPost = await post.save();
          return updatedPost;
        } else {
          throw new ForbiddenError("Post not found");
        }
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: withFilter(
        (parent, args, { user, pubsub }) => {
          if (!user) throw new AuthenticationError("Unauthenticated");
          return pubsub.asyncIterator("NEW_POST");
        },
        (parent, args, { user }) => parent.newPost.username === user.username
      ),
    },
  },
};
