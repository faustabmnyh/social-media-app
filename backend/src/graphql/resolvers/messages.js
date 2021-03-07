const {
  UserInputError,
  AuthenticationError,
  withFilter,
} = require("apollo-server");
const User = require("../../models/User");
const Message = require("../../models/Message");

module.exports = {
  Query: {
    getMessages: async (parent, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const otherUser = await User.findOne({ username: from });
        if (!otherUser) throw new UserInputError("User Not Found");
        // get each messages between two user
        const usernames = [user.username, otherUser.username];
        const messages = await Message.find({
          to: { $in: usernames },
          from: { $in: usernames },
        }).sort({ createdAt: -1 });
        console.log(otherUser);
        console.log(messages);
        return messages;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user, pubsub }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const recipient = await User.findOne({ username: to });
        if (!recipient) throw new UserInputError("User Not Found");
        if (recipient.user === user.username) {
          throw new UserInputError("You can send message to yourself");
        }
        if (content.trim() === "") {
          throw new UserInputError("Message Empty");
        }

        const message = new Message({
          from: user.username,
          to,
          content,
        });

        const messageCreated = await message.save();
        await pubsub.publish("NEW_MESSAGE", { newMessage: messageCreated });
        return messageCreated;
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (parent, args, { user, pubsub }) => {
          if (!user) throw new AuthenticationError("Unauthenticated");
          return pubsub.asyncIterator("NEW_MESSAGE");
        },
        (parent, args, { user }) => {
          if (
            parent.newMessage.from === user.username ||
            parent.newMessage.to === user.username
          ) {
            return true;
          }
          return false;
        }
      ),
    },
  },
};
