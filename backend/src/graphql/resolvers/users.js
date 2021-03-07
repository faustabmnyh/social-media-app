const {
  validateRegisterInput,
  validateLoginInput,
  validateUserUpdate,
  validateUserUpdatePassword,
} = require("../../utils/validator");
const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Message = require("../../models/Message");
const Post = require("../../models/Post");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET || "inirahasiagaadayangtahu",
    { expiresIn: "2h" }
  );
};

module.exports = {
  Query: {
    getUsers: async (parent, { username }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        // search username or our friends
        const searchUsername = username
          ? {
              username: { $regex: username, $options: "i", $ne: user.username },
            }
          : {};
        // get all users except the user whos login
        let users = await User.find({
          username: { $ne: user.username },
          ...searchUsername,
        });
        // get all user messages  between user login and other
        const allUserMessages = await Message.find({
          $or: [{ from: user.username }, { to: user.username }],
        }).sort({ createdAt: -1 });
        // get latest message
        users = users.map((otherUser) => {
          const latestMessage = allUserMessages.find(
            (m) => m.from === otherUser.username || m.to === otherUser.username
          );
          otherUser.latestMessage = latestMessage;
          return otherUser;
        });
        return users;
      } catch (err) {
        throw err;
      }
    },
    login: async (parent, args) => {
      const { username, password } = args;
      const { valid, errors } = validateLoginInput(username, password);
      try {
        // if all validator not valid
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        // check the user if its exist
        const user = await User.findOne({ username });
        if (!user) {
          throw new UserInputError("User not found", {
            errors: {
              username: "User not found",
            },
          });
        }
        // matching the password
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          throw new UserInputError("Incorrect password", {
            errors: {
              password: "Incorrect password",
            },
          });
        }
        const token = generateToken(user);
        return {
          ...user._doc,
          token,
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (parent, args) => {
      let { username, email, password, confirmPassword } = args;
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      try {
        // if all validator not valid
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }

        // want to check if username already exist
        const isUsername = await User.findOne({ username });
        // want to check if email already exist
        const isEmail = await User.findOne({ email });
        if (isUsername) {
          throw new UserInputError("Username already exist", {
            errors: {
              username: "This username already exist",
            },
          });
        }
        if (isEmail) {
          throw new UserInputError("Email already exist", {
            errors: {
              username: "This email already exist",
            },
          });
        }

        password = await bcrypt.hash(password, 12);

        const user = new User({
          email,
          username,
          password,
        });

        token = generateToken(user);
        const userCreated = await user.save();
        return {
          ...userCreated._doc,
          token,
        };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (
      parent,
      { username, email, password, confirmPassword },
      { user }
    ) => {
      let isUser = await User.findById(user.id);
      const isUsername = await User.findOne({ username });
      const isEmail = await User.findOne({ email });
      try {
        if (isUser) {
          const { valid, errors } = validateUserUpdate(username, email);
          if (!valid) {
            throw new UserInputError("Errors", { errors });
          } else {
            // check if it username exist
            if (isUsername) {
              if (isUsername.username === user.username) {
                isUser.username = username;
              } else {
                // check if its username exist not equal than user username then that usename already exist and we dont want to user that
                throw new UserInputError("Username already exist", {
                  errors: {
                    username: "Username already exist",
                  },
                });
              }
            } else {
              isUser.username = username;
            }
            // check if it email exist
            if (isEmail) {
              if (isEmail.email === user.email) {
                isUser.email = email;
              } else {
                // check if its email exist not equal than user email then that usename already exist and we dont want to user that
                throw new UserInputError("Email already exist", {
                  errors: {
                    email: "Email already exist",
                  },
                });
              }
            } else {
              isUser.email = email;
            }
          }
          // check is if we want chane the password, if its not give the default password
          if (password) {
            const { valid, errors } = validateUserUpdatePassword(
              password,
              confirmPassword
            );
            if (!valid) {
              throw new UserInputError("Errors Password", { errors });
            }
            isUser.password = await bcrypt.hash(password, 12);
          }

          // update username message in to usernmae
          await Message.updateMany(
            { to: user.username },
            { $set: { to: username } }
          );
          // update username message in from usernmae
          await Message.updateMany(
            { from: user.username },
            { $set: { from: username } }
          );

          // update user post username
          await Post.updateMany(
            { username: user.username },
            { $set: { username } }
          );
          // update comment username and like username as well
          await Post.updateMany(
            {},
            {
              $set: {
                "comments.$[element].username": username,
                "likes.$[element].username": username,
              },
            },
            {
              arrayFilters: [{ "element.username": user.username }],
              multi: true,
            }
          );

          token = generateToken(isUser);
          const updatedUser = await isUser.save();
          return {
            ...updatedUser._doc,
            token,
          };
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
