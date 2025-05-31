import { uploadFile } from "@/services/uploadService";
import { Alert } from "react-native";
import { generateUniqueFileName } from "./fileNaming";

export const uploadFileWrapper = async ({
  selectedImage,
  user,
  setLoading,
  folder,
  identifier,
  purpose,
}: {
  selectedImage: string;
  user: string;
  setLoading: (_: boolean) => void;
  folder: string;
  identifier: string;
  purpose: string;
}) => {
  if (!selectedImage) {
    Alert.alert("No Image was selected. Please verify");
    return;
  }

  setLoading(true);
  try {
    const uniqueName = generateUniqueFileName(identifier, user);
    const uploadResults = await uploadFile(
      selectedImage,
      `${purpose}_${uniqueName}`,
      {
        bucket: "upload-assets",
        pathPrefix: `${folder}`,
        upsert: true,
      }
    );
    return uploadResults;
  } catch (error) {
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
