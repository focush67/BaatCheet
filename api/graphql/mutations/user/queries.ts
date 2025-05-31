import { gql } from "@apollo/client";

export const UPDATE_USER_BY_EMAIL = gql`
  mutation UpdateUserByEmail($email: String!, $input: UpdateUserInput!) {
    updateUserByEmail(email: $email, input: $input) {
      id
      name
      profilePicture
      bio
      username
      email
    }
  }
`;
