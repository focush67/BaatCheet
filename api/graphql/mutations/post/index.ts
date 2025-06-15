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

export const LIKE_COMMENT = `
  mutation LikeComment($commentID:ID!,$email:String!){
    addLikeToComment(commentID:$commentID,email:$email){
      id
      owner {
        username
        email
        profilePicture
      }
      
      comment {
        id
        content
        owner {
          username
          email
          profilePicture
        }
      }
    }
  }
`;

export const COMMENT_ON_POST = `
  mutation CommentOnPost($postID:ID!,$email:String!,$content:String!){
    addCommentToPost(postID: $postID, email: $email, content: $content) {
    id
    content
    createdAt
    owner {
      email
      username
      profilePicture
    }
    replyTo {
      content
      owner {
        email
        username
        profilePicture
      }
    }
    post {
      caption
      owner {
        username
        email
        profilePicture
      }
    }
    isReply
    likes {
      owner {
        username
        email
        profilePicture
      }
    }
    replies {
      content
      owner {
        email
        username
        profilePicture
      }
    }
  }
  }
`;

export const DELETE_COMMENT = `
  mutation DeleteComment($commentID:ID!,$email:String!,$postID:ID!){
    removeCommentFromPost(commentID:$commentID,email:$email,postID:$postID){
      id
      content
      owner{
        name
        username
      }
      post{
        caption
      }
    }
  }
`;

export const ADD_REPLY_TO_COMMENT = `
  mutation AddReplyToComment($commentID:ID!,$email:String!,$content:String!){
    addCommentToComment(commentID:$commentID,email:$email,content:$content){
      id
      content
      createdAt
      owner {
        username
        email
        profilePicture
      }
      likes {
        owner {
          username
          email
          profilePicture
        }
      }
      replies {
        content
        createdAt
        owner {
          email
          username
          profilePicture
        }
      }
    }
  }
`;
