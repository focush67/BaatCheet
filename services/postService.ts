import {
  CREATE_USER_POST,
  DELETE_USER_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_ON_POST,
  LIKE_COMMENT,
  ADD_REPLY_TO_COMMENT,
  DELETE_COMMENT,
  CREATE_NEW_COLLECTION,
} from "@/api/graphql/mutations/post";
import {
  GET_ALL_POSTS,
  GET_COMMENTS_ON_POST,
  GET_POST_BY_ID,
  GET_POSTS_FOR_USER,
} from "@/api/graphql/queries/post";
import { graphqlRequest } from "@/utils/request";

const SERVICE_NAME = "Post";

export const likePost = async (postID: string, email: string): Promise<GLike> =>
  graphqlRequest({
    operation: {
      query: LIKE_POST,
      variables: { postID, email },
    },
    responseKey: "addLikeToPost",
    friendlyErrorMessage: "Failed to like post. Please try again.",
    logLabel: `Like for ${postID}`,
    serviceName: SERVICE_NAME,
  });

export const unlikePost = async (
  postID: string,
  email: string
): Promise<GLike> =>
  graphqlRequest({
    operation: {
      query: UNLIKE_POST,
      variables: { postID, email },
    },
    responseKey: "removeLikeFromPost",
    friendlyErrorMessage: "Failed to unlike post. Please try again.",
    logLabel: `Unlike for ${postID}`,
    serviceName: SERVICE_NAME,
  });

export const likeComment = async (
  commentID: string,
  email: string
): Promise<GLike> =>
  graphqlRequest({
    operation: {
      query: LIKE_COMMENT,
      variables: {
        commentID,
        email,
      },
    },
    responseKey: "addLikeToComment",
    friendlyErrorMessage: "Failed to like comment. Please try again",
    logLabel: `Like for Comment ${commentID} by user ${email}`,
    serviceName: SERVICE_NAME,
  });

export const createNewPost = async (input: GCreatePostInput): Promise<GPost> =>
  graphqlRequest({
    operation: {
      query: CREATE_USER_POST,
      variables: { input },
    },
    responseKey: "createPost",
    friendlyErrorMessage: "Failed to create new post. Please try again.",
    logLabel: `Create post with cover ${input.coverPhoto}`,
    serviceName: SERVICE_NAME,
  });

export const createNewCollection = async (
  email: string,
  coverPhoto: string,
  name: string
) =>
  graphqlRequest({
    operation: {
      query: CREATE_NEW_COLLECTION,
      variables: { email, name, coverPhoto },
    },
    responseKey: "createNewCollection",
    friendlyErrorMessage: "Failed to create new collection. Please try again",
    logLabel: `Create new collection with ${coverPhoto}`,
    serviceName: SERVICE_NAME,
  });

export const addNewComment = async (
  postID: string,
  email: string,
  content: string
): Promise<GComment> =>
  graphqlRequest({
    operation: {
      query: COMMENT_ON_POST,
      variables: { postID, email, content },
    },
    responseKey: "addCommentToPost",
    friendlyErrorMessage: "Failed to add new comment. Please try again",
    logLabel: `Add Comment to post ${postID} with content ${content}`,
    serviceName: SERVICE_NAME,
  });

export const addReplyToComment = async (
  commentID: string,
  email: string,
  content: string
): Promise<GComment> =>
  graphqlRequest({
    operation: {
      query: ADD_REPLY_TO_COMMENT,
      variables: { commentID, email, content },
    },
    responseKey: "addCommentToComment",
    friendlyErrorMessage: "Failed to add reply to comment. Please try again",
    logLabel: "Add Reply to Comment",
    serviceName: SERVICE_NAME,
  });

export const getAllPosts = async (email: string): Promise<GPost[]> =>
  graphqlRequest({
    operation: {
      query: GET_ALL_POSTS,
      variables: {
        email,
      },
    },
    responseKey: "getAllPosts",
    friendlyErrorMessage: "Failed to fetch posts. Please try again.",
    logLabel: "Fetch all posts",
    serviceName: SERVICE_NAME,
  });

export const getPostById = async (postId: string): Promise<GPost> =>
  graphqlRequest({
    operation: {
      query: GET_POST_BY_ID,
      variables: { postId },
    },
    responseKey: "getPostById",
    friendlyErrorMessage: "Failed to fetch singular post. Please try again.",
    logLabel: `Fetch post with ID ${postId}`,
    serviceName: SERVICE_NAME,
  });

export const getPostsForUser = async (userId: string): Promise<GPost[]> =>
  graphqlRequest({
    operation: {
      query: GET_POSTS_FOR_USER,
      variables: { userId },
    },
    responseKey: "getPostsForUser",
    friendlyErrorMessage:
      "Failed to fetch personalized posts. Please try again.",
    logLabel: `Fetch posts for userID ${userId}`,
    serviceName: SERVICE_NAME,
  });

export const deletePost = async (postId: string): Promise<GPost> =>
  graphqlRequest({
    operation: {
      query: DELETE_USER_POST,
      variables: { postId },
    },
    responseKey: "deletePost",
    friendlyErrorMessage: "Failed to delete post. Please try again.",
    logLabel: `Delete post with ID ${postId}`,
    serviceName: SERVICE_NAME,
  });

export const deleteComment = async (
  postID: string,
  commentID: string,
  email: string
): Promise<GComment> =>
  graphqlRequest({
    operation: {
      query: DELETE_COMMENT,
      variables: {
        commentID,
        email,
        postID,
      },
    },
    responseKey: "removeCommentFromPost",
    friendlyErrorMessage: "Failed to delete comment. Please try again",
    logLabel: `Delete Comment ${commentID}`,
    serviceName: SERVICE_NAME,
  });

export const fetchCommentsOnPost = async (
  postID: string
): Promise<GComment[]> =>
  graphqlRequest({
    operation: {
      query: GET_COMMENTS_ON_POST,
      variables: { postID },
    },
    responseKey: "getCommentsOnPost",
    friendlyErrorMessage: "Failed to fetch comments. Please try again",
    logLabel: `Fetch comments for ${postID}`,
    serviceName: SERVICE_NAME,
  });
