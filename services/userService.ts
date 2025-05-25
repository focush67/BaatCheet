import { UPDATE_USER_BY_EMAIL } from "@/api/graphql/mutations/user/updateUserByEmail";
import api from "@/utils/axios";

export const updateUserByEmail = async (
  email: string,
  input: GUpdateUserInput
): Promise<UserProfile> => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);

  console.log(`[User API][${requestId}] Starting update for ${email}`, {
    input,
    timestamp: new Date().toISOString(),
  });

  try {
    const response = await api.post("", {
      query: UPDATE_USER_BY_EMAIL,
      variables: {
        email,
        input,
      },
    });

    const duration = Date.now() - startTime;

    console.log(`[User API][${requestId}] Request completed in ${duration}ms`, {
      status: response.status,
      data: response.data,
    });

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[User API][${requestId}] GraphQL Error:`, {
        errors: response.data.errors,
        query: UPDATE_USER_BY_EMAIL,
        variables: { email, input },
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.updateUserByEmail) {
      console.error(
        `[User API][${requestId}] Malformed response:`,
        response.data
      );
      throw new Error("Server returned unexpected response format");
    }

    return response.data.data.updateUserByEmail;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error(`[User API][${requestId}] Failed after ${duration}ms`, {
      email,
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
