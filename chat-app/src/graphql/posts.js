import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      username
      commentCount
      likeCount
      createdAt
      sticker
      comments {
        body
        id
        sticker
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!, $sticker: String) {
    createPost(body: $body, sticker: $sticker) {
      id
      body
      username
      commentCount
      likeCount
      createdAt
      sticker
      comments {
        body
        id
        sticker
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const NEW_POST = gql`
  subscription newPost {
    newPost {
      id
      body
      username
      commentCount
      likeCount
      createdAt
      sticker
      comments {
        body
        id
        sticker
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      commentCount
      likeCount
      createdAt
      sticker
      comments {
        body
        id
        sticker
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const UPDATE_POST_PROFILE = gql`
  mutation updateProfileUserPost($username: String) {
    updateProfileUserPost(username: $username) {
      id
      body
      username
      commentCount
      likeCount
      createdAt
      sticker
      comments {
        body
        id
        sticker
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
