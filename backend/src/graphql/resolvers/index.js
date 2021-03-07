const usersResolvers = require("./users");
const messageResolvers = require("./messages");
const uploadResolvers = require("./uploads");
const postResolvers = require("./posts");
const commentResolvers = require("./comments");

module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  User: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Post: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    commentCount: (parent) => parent.comments.length,
    likeCount: (parent) => parent.likes.length,
  },
  Comment: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Like: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...usersResolvers.Query,
    ...messageResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...uploadResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
    ...postResolvers.Subscription,
  },
};
