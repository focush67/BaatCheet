import {
  CREATE_USER_POST,
  DELETE_USER_POST,
  LIKE_POST,
  UNLIKE_POST,
} from "@/api/graphql/mutations/post";
import {
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  GET_POSTS_FOR_USER,
} from "@/api/graphql/queries/post";
import api from "@/utils/axios";

export const likePost = async (
  postID: string,
  email: string
): Promise<GLike> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(`[Post API][${requestId}] Starting Like for ${postID}`, {
    postID,
    email,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post("", {
      query: LIKE_POST,
      variables: {
        postID: postID,
        email: email,
      },
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: LIKE_POST,
        variables: { postID, email },
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.addLikeToPost) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.addLikeToPost;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      email,
      postID,
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to like post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const unlikePost = async (
  postID: string,
  email: string
): Promise<GLike> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(`[Post API][${requestId}] Starting Unliking for ${postID}`, {
    postID,
    email,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post("", {
      query: UNLIKE_POST,
      variables: {
        postID,
        email,
      },
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: LIKE_POST,
        variables: { postID, email },
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.removeLikeFromPost) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.removeLikeFromPost;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      email,
      postID,
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to unlike post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const createNewPost = async (
  input: GCreatePostInput
): Promise<GPost> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  console.log(
    `[Post API][${requestId}] Starting update for ${input.coverPhoto}`,
    {
      input,
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: CREATE_USER_POST,
      variables: {
        input: input,
      },
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API]${requestId} GraphQL Error`, {
        errors: response.data.errors,
        query: CREATE_USER_POST,
        variables: { input },
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.createPost) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.createPost;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      input,
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to create new post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const getAllPosts = async () => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(`[Post API][${requestId}] Starting fetch for all posts`, {
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post("", {
      query: GET_ALL_POSTS,
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: GET_ALL_POSTS,
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.getAllPosts) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }
    return response.data.data.getAllPosts;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : "Failed to fetch posts. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const getPostById = async (postId: string): Promise<GPost> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(
    `[Post API][${requestId}] Starting fetch for post with ID ${postId}`,
    {
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: GET_POST_BY_ID,
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: GET_POST_BY_ID,
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.getPostById) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.getPostById;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
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

export const getPostsForUser = async (userId: string): Promise<GPost[]> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(
    `[Post API][${requestId}] Starting fetch for all posts for userID ${userId}`,
    {
      timestamp: new Date().toISOString(),
    }
  );

  try {
    const response = await api.post("", {
      query: GET_POSTS_FOR_USER,
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: GET_POSTS_FOR_USER,
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.getPostsForUser) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.getPostsForUser;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to fetch personalized post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};

export const deletePost = async (postId: string): Promise<GPost> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(`[Post API][${requestId}] Deleting post with ID ${postId}`, {
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post("", {
      query: DELETE_USER_POST,
    });

    const duration = Date.now() - startTime;
    console.log(`[Post API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[Post API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: DELETE_USER_POST,
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.deletePost) {
      console.error(
        `[Post API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return response.data.data.deletePost;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(`[Post API][${requestId}] Failed after ${duration}ms`, {
      error: errorMessage,
      errorDetails: error.errorDetails || "No additional details",
      stack: error.stack,
    });

    const userFriendlyError = new Error(
      __DEV__
        ? errorMessage
        : "Failed to delete singular post. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};
