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

export const COMMENT_ON_POST = `
  mutation CommentOnPost($postID:ID!,$email:String!,$content:String){
    addCommentToPost(postID: $postId, email: $email, content: $content) {
    id
    content
    owner {
      email
      username
    }
    replyTo {
      content
      owner {
        email
        username
      }
    }
    post {
      caption
      owner {
        username
        email
      }
    }
    isReply
    likes {
      owner {
        username
        email
      }
    }
    replies {
      content
      owner {
        email
        username
      }
    }
  }
  }
`;
