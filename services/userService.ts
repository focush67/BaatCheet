import { UPDATE_USER_BY_EMAIL } from "@/api/graphql/mutations/user";
import { graphqlRequest } from "@/utils/request";

const SERVICE_NAME = "User";

export const updateUserByEmail = async (
  email: string,
  input: GUpdateUserInput
) => {
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
};
