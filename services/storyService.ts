import { CREATE_USER_STORY } from "@/api/graphql/mutations/story";
import { GET_ALL_STORIES } from "@/api/graphql/queries/story";
import api from "@/utils/axios";

export const createNewStory = async (
  input: GCreateStoryInput
): Promise<GStory> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Story API][${requestId}] Starting update for ${input.coverPhoto}`,
    {
      input,
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: CREATE_USER_STORY,
      variables: {
        input: input,
      },
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: CREATE_USER_STORY,
        variables: { input },
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.createNewStory) {
      console.error(
        `[Story API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.createNewStory;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Story API][${requestId}] Failed after ${duration}ms`, {
      input,
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to create story. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const getStories = async () => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Story API][${requestId}] Starting update for getting all stories`
  );

  try {
    const response = await api.post("", {
      query: GET_ALL_STORIES,
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: GET_ALL_STORIES,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.getAllStories) {
      console.error(
        `[Story API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    console.log("Response of All Stories", response.data.data.getAllStories);
    return response.data.data.getAllStories;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Story API][${requestId}] Failed after ${duration}ms`, {
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to create story. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};
