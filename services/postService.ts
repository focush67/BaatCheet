import { CREATE_USER_POST } from "@/api/graphql/mutations/post/queries";
import api from "@/utils/axios";

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
        input,
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
      __DEV__
        ? errorMessage
        : "Failed to update user profile. Please try again."
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
};
