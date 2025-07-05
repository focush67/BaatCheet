import api from "@/utils/axios";

type GraphQLOperation = {
  query: string;
  variables?: Record<string, any>;
};

type ApiConfig<TVariables, TResponse> = {
  operation: GraphQLOperation;
  responseKey: string;
  friendlyErrorMessage: string;
  logLabel: string;
  serviceName: string;
  variables?: TVariables;
  transformResponse?: (data: any) => TResponse;
};

/**
 * Generic GraphQL API handler for all services
 * @template TVariables - Type of variables expected by the GraphQL operation
 * @template TResponse - Expected response type
 * @param config - Configuration object for the API call
 * @returns Promise with the response data
 */

export async function graphqlRequest<TVariables, TResponse>(
  config: ApiConfig<TVariables, TResponse>
): Promise<TResponse> {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 9);
  const {
    operation,
    responseKey,
    friendlyErrorMessage,
    logLabel,
    serviceName,
    variables,
  } = config;

  // console.log(`[${serviceName} API][${requestId}] Starting ${logLabel}`, {
  //   ...(variables && { variables }),
  //   timestamp: new Date().toISOString(),
  // });

  try {
    const response = await api.post("", operation);

    const duration = Date.now() - startTime;
    // console.log(
    //   `[${serviceName} API][${requestId}] Request completed in ${duration}ms`,
    //   {
    //     status: response.status,
    //     data: response.data,
    //   }
    // );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      console.error(`[${serviceName} API][${requestId}] GraphQL Error`, {
        errors: response.data.errors,
        query: operation.query,
        variables,
      });
      throw new Error(errorMessage);
    }

    if (!response.data.data?.[responseKey]) {
      console.error(
        `[${serviceName} API][${requestId}] Malformed response`,
        response.data
      );
      throw new Error(`Server returned unexpected response format`);
    }

    return config.transformResponse
      ? config.transformResponse(response.data.data[responseKey])
      : response.data.data[responseKey];
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    console.error(
      `[${serviceName} API][${requestId}] Failed after ${duration}ms`,
      {
        ...(variables && { variables }),
        error: errorMessage,
        errorDetails: error.errorDetails || "No additional details",
        stack: error.stack,
      }
    );

    const userFriendlyError = new Error(
      __DEV__ ? errorMessage : friendlyErrorMessage
    );
    userFriendlyError.stack = error.stack;
    throw userFriendlyError;
  }
}
