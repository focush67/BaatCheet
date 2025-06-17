import {
  CREATE_USER_STORY,
  LIKE_STORY,
  UNLIKE_STORY,
  REPLY_TO_STORY,
  DELETE_REPLY_FROM_STORY,
} from "@/api/graphql/mutations/story";
import {
  GET_ALL_STORIES,
  GET_STORIES_FOR_USER,
} from "@/api/graphql/queries/story";
import { graphqlRequest } from "@/utils/request";

const SERVICE_NAME = "Story";

export const createNewStory = async (
  input: GCreateStoryInput
): Promise<GStory> =>
  graphqlRequest({
    operation: {
      query: CREATE_USER_STORY,
      variables: { input },
    },
    responseKey: "createNewStory",
    friendlyErrorMessage: "Failed to create story. Please try again.",
    logLabel: `Create story with cover ${input.coverPhoto}`,
    serviceName: SERVICE_NAME,
  });

export const getStories = async (): Promise<GStory[]> =>
  graphqlRequest({
    operation: {
      query: GET_ALL_STORIES,
    },
    responseKey: "getAllStories",
    friendlyErrorMessage: "Failed to retrieve all stories. Please try again.",
    logLabel: "Get all stories",
    serviceName: SERVICE_NAME,
  });

export const getStoriesForUser = async (email: string): Promise<GStory[]> =>
  graphqlRequest({
    operation: {
      query: GET_STORIES_FOR_USER,
      variables: { email },
    },
    responseKey: "getStoriesForUser",
    friendlyErrorMessage:
      "Failed to retrieve personalized stories. Please try again.",
    logLabel: `Get stories for user ${email}`,
    serviceName: SERVICE_NAME,
  });

export const likeStory = async (
  storyId: string,
  email: string
): Promise<GLike[]> =>
  graphqlRequest({
    operation: {
      query: LIKE_STORY,
      variables: { storyID: storyId, email },
    },
    responseKey: "addLikeToStory",
    friendlyErrorMessage: "Failed to like story. Please try again.",
    logLabel: `Like story ${storyId}`,
    serviceName: SERVICE_NAME,
  });

export const unlikeStory = async (
  storyId: string,
  email: string
): Promise<GLike[]> =>
  graphqlRequest({
    operation: {
      query: UNLIKE_STORY,
      variables: { storyID: storyId, email },
    },
    responseKey: "removeLikeFromStory",
    friendlyErrorMessage: "Failed to unlike story. Please try again.",
    logLabel: `Unlike story ${storyId}`,
    serviceName: SERVICE_NAME,
  });

export const replyToStory = async (
  storyID: string,
  email: string,
  content: string
): Promise<GComment> =>
  graphqlRequest({
    operation: {
      query: REPLY_TO_STORY,
      variables: { storyID, email, content },
    },
    responseKey: "addCommentToStory",
    friendlyErrorMessage: "Failed to reply to story. Please try again.",
    logLabel: `Reply to story ${storyID}`,
    serviceName: SERVICE_NAME,
  });

export const deleteReplyFromStory = async (
  storyID: string,
  replyID: string
): Promise<GComment> =>
  graphqlRequest({
    operation: {
      query: DELETE_REPLY_FROM_STORY,
      variables: { storyID, replyID },
    },
    responseKey: "deleteCommentFromStory",
    friendlyErrorMessage: "Failed to delete reply. Please try again.",
    logLabel: `Delete reply ${replyID} from story ${storyID}`,
    serviceName: SERVICE_NAME,
  });
