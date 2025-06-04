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
import api from "@/utils/axios";

export const createNewStory = async (
  input: GCreateStoryInput
): Promise<GStory> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Story CREATE API][${requestId}] Starting update for ${input.coverPhoto}`,
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
      `[Story CREATE API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story CREATE API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: CREATE_USER_STORY,
        variables: { input },
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.createNewStory) {
      console.error(
        `[Story CREATE API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.createNewStory;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[Story CREATED API][${requestId}] Failed after ${duration}ms`,
      {
        input,
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to create story. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const getStories = async (): Promise<GStory[]> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Story GETALL API][${requestId}] Starting update for getting all stories`
  );

  try {
    const response = await api.post("", {
      query: GET_ALL_STORIES,
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story GETALL API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story GETALL API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: GET_ALL_STORIES,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.getAllStories) {
      console.error(
        `[Story GETALL API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.getAllStories;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[Story GETALL API][${requestId}] Failed after ${duration}ms`,
      {
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to retrieve all stories. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const getStoriesForUser = async (email: string): Promise<GStory[]> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Story GETFORUSER API][${requestId}] Starting update for getting stories for ${email}`
  );

  try {
    const response = await api.post("", {
      query: GET_STORIES_FOR_USER,
      variables: {
        email,
      },
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story GETFORUSER API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story GETFORUSER API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: GET_STORIES_FOR_USER,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.getStoriesForUser) {
      console.error(
        `[Story GETFORUSER API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    console.log(
      `Response of Stories for ${email}`,
      response.data.data.getStoriesForUser
    );
    return response.data.data.getStoriesForUser;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[Story GETFORUSER API][${requestId}] Failed after ${duration}ms`,
      {
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to retrieve stories. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const likeStory = async (
  storyId: string,
  email: string
): Promise<GLike[]> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(
    `[Story LIKE API][${requestId}] Liking story with ID ${storyId}`,
    {
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: LIKE_STORY,
      variables: {
        storyID: storyId,
        email: email,
      },
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story LIKE API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story LIKE API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: LIKE_STORY,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.addLikeToStory) {
      console.error(
        `[Story LIKE API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.addLikeToStory;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Story LIKE API][${requestId}] Failed after ${duration}ms`, {
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to fetch singular post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const unlikeStory = async (
  storyId: string,
  email: string
): Promise<GLike[]> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(
    `[Story UNLIKE API][${requestId}] Unliking story with ID ${storyId}`,
    {
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: UNLIKE_STORY,
      variables: {
        storyID: storyId,
        email: email,
      },
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story UNLIKE API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story UNLIKE API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: UNLIKE_STORY,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.removeLikeFromStory) {
      console.error(
        `[Story UNLIKE API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.removeLikeFromStory;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[Story UNLIKE API][${requestId}] Failed after ${duration}ms`,
      {
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to fetch singular post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const replyToStory = async (
  storyID: string,
  email: string,
  content: string
): Promise<GComment> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(
    `[Story REPLY API][${requestId}] Replying to story with ID ${storyID}`,
    {
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: REPLY_TO_STORY,
      variables: {
        storyID: storyID,
        email: email,
        content: content,
      },
    });
    const duration = Date.now() - startTime;
    console.log(
      `[Story REPLY API][${requestId}] Request completed in ${duration}ms`,
      {
        status: response.status,
        data: response.data,
      }
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Story REPLY API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: REPLY_TO_STORY,
      });
      throw new Error(errorMessage);
    }
    if (!response.data.data?.addCommentToStory) {
      console.error(
        `[Story REPLY API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.addCommentToStory;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[Story REPLY API][${requestId}] Failed after ${duration}ms`,
      {
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to fetch singular post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};
