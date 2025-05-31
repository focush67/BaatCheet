export const CREATE_USER_POST = `
  mutation CreateUserPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      createdAt
    }
  }
`;
