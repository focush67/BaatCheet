import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPDATE_USER_BY_EMAIL,
} from "@/api/graphql/mutations/user";
import { graphqlRequest } from "@/utils/request";

const SERVICE_NAME = "User";

export const updateUserByEmail = async (
  email: string,
  input: GUpdateUserInput
) =>
  graphqlRequest({
    operation: {
      query: UPDATE_USER_BY_EMAIL,
      variables: { email, input },
    },
    responseKey: "updateUserByEmail",
    friendlyErrorMessage: "Failed to like post. Please try again.",
    logLabel: `Updating for ${email}`,
    serviceName: SERVICE_NAME,
  });

export const followUser = async (source: string, target: string) =>
  graphqlRequest({
    operation: {
      query: FOLLOW_USER,
      variables: { source, target },
    },
    responseKey: "followUser",
    friendlyErrorMessage: "Failed to follow user. Please try again.",
    logLabel: `Following user ${target} from ${source}`,
    serviceName: SERVICE_NAME,
  });

export const unfollowUser = async (source: string, target: string) =>
  graphqlRequest({
    operation: {
      query: UNFOLLOW_USER,
      variables: { source, target },
    },
    responseKey: "unfollowUser",
    friendlyErrorMessage: "Failed to UNfollow user. Please try again.",
    logLabel: `UnFollowing user ${target} by ${source}`,
    serviceName: SERVICE_NAME,
  });
