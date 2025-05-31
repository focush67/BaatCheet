export const CREATE_USER_POST = `
  mutation CreateUserPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      createdAt
    }
  }
`;

export const DELETE_USER_POST = `
  mutation DeleteUserPost($postID:String!){
    deletePost(postID:$postID){
      id,
      ownerId
    }
  }
`;
