import { gql } from "@apollo/client";

// query
export const GET_USERS = gql`
  query getUsers($username: String) {
    getUsers(username: $username) {
      username
      latestMessage {
        from
        to
        content
        createdAt
      }
    }
  }
`;

export const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      token
    }
  }
`;

// mutation
export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String
    $email: String
    $password: String
    $confirmPassword: String
  ) {
    updateUser(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      token
    }
  }
`;
