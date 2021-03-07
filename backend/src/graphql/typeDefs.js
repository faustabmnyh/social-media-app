const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    token: String!
    createdAt: String!
    imageUrl: String
    latestMessage: Message
  }
  # for message
  type Message {
    content: String!
    to: String!
    from: String!
    createdAt: String
    id: ID!
    # userProfile: User!
  }
  type File {
    filename: String
    mimetype: String
    encoding: String
    url: String!
  }
  # for timeline
  type Post {
    id: ID!
    body: String
    sticker: String
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    sticker: String
    body: String
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Query {
    getUsers(username: String): [User]!
    getMessages(from: String!): [Message]!
    login(username: String!, password: String!): User!
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!

    updateUser(
      username: String
      email: String
      password: String
      confirmPassword: String
    ): User!
    sendMessage(to: String!, content: String!): Message!
    uploadImage(file: Upload!): File!
    createPost(body: String, sticker: String): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String, sticker: String): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newMessage: Message!
    newPost: Post!
  }
`;
