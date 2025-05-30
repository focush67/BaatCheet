import { uploadFile } from "@/services/uploadService";
import { Alert } from "react-native";

export const handlePostCreation = async ({
  user,
  selectedImage,
  setLoading,
}: {
  user: any;
  selectedImage: string;
  setLoading: (_: boolean) => void;
}) => {
  if (!selectedImage) {
    Alert.alert(
      "Complete your profile",
      "Please enter your name, username and select a profile picture."
    );
    return;
  }
  setLoading(true);
  try {
    const uploadResults = await uploadFile(selectedImage, `$post_${user.id}`, {
      bucket: "upload-assets",
      pathPrefix: "posts",
      upsert: true,
    });

    return uploadResults;
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An Unknown Error Occured";
    const [errorCode, errorText] = errorMessage.split(":").map((s) => s.trim());

    const errorMap: Record<string, string> = {
      NO_INTERNET: "Please check your internet connection and try again",
      FILE_NOT_FOUND:
        "The selected image could not be accessed. Please choose a different image",
      UPLOAD_FAILED: "Failed to upload your profile picture. Please try again",
      URL_GENERATION_FAILED:
        "Could not generate image URL. Please contact support",
      UNKNOWN_ERROR: "Something went wrong. Please try again later",
    };

    const userMessage = errorMap[errorCode] || errorMap["UNKNOWN_ERROR"];
    const technicalDetails = __DEV__ ? `\n\n(Technical: ${errorCode})` : "";

    Alert.alert("Error", `${userMessage}${technicalDetails}`, [
      { text: "OK" },
      ...(__DEV__
        ? [
            {
              text: "View Details",
              onPress: () => console.log("Error details:", error),
            },
          ]
        : []),
    ]);
    if (!__DEV__) {
      Alert.alert(`Production Error ${error}`);
    }
  } finally {
    setLoading(false);
  }
};
