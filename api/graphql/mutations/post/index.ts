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

export const LIKE_POST = `
  mutation LikePost($postID:ID!,$email:String!){
    addLikeToPost(postID:$postID,email:$email){
      postId
      owner {
        email
        username
        profilePicture
      }
    }
  }
`;

export const UNLIKE_POST = `
   mutation UnLikePost($postID:ID!,$email:String!){
    removeLikeFromPost(postID:$postID,email:$email){
      postId
      owner {
        email
        username
        profilePicture
      }
    }
  }
`;
