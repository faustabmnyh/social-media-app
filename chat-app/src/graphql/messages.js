import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      content
      from
      to
      createdAt
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      from
      to
      content
      createdAt
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      content
      to
      from
      createdAt
      id
    }
  }
`;
