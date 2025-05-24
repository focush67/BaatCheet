import { UPDATE_USER_BY_EMAIL } from "@/api/graphql/mutations/user/updateUserByEmail";
import api from "@/utils/axios";

export const updateUserByEmail = async (
  email: string,
  input: GUpdateUserInput
): Promise<UserProfile> => {
  const response = await api.post("", {
    query: UPDATE_USER_BY_EMAIL,
    variables: {
      email,
      input,
    },
  });

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }
  return response.data.data.updateUserByEmail;
};
