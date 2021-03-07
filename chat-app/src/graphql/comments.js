import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String, $sticker: String) {
    createComment(postId: $postId, body: $body, sticker: $sticker) {
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

export const DELETE_COMMENT = gql`
  mutation deleteCommment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
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
