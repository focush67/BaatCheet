import { gql } from "@apollo/client";

export const CREATE_USER_POST = gql`
  mutation CreateUserPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      createdAt
    }
  }
`;
