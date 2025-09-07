import Setup from "@/components/auth/screens/Setup";
import { uploadFile } from "@/services/uploadService";
import { updateUserByEmail } from "@/services/userService";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";

const ProfileSetupScreen = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !username.trim() || !selectedImage) {
      Alert.alert(
        "Complete your profile",
        "Please enter your name, username and select a profile picture."
      );
      return;
    }
    setLoading(true);
    try {
      const { publicUrl, blob } = await uploadFile(
        selectedImage,
        `${user?.id}_avatar`,
        {
          bucket: "upload-assets",
          pathPrefix: "profile_pictures",
          upsert: true,
          updateClerkUser: {
            user,
            updateProfileImage: true,
          },
        }
      );

      await updateUserByEmail(user?.emailAddresses[0].emailAddress!, {
        name,
        username,
        profilePicture: publicUrl,
        bio,
      });
      await user?.update({
        unsafeMetadata: {
          hasCompletedSetup: true,
          profilePicture: publicUrl,
          username: username,
          ownerName: name,
          caption: bio,
        },
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      const [errorCode, errorText] = errorMessage
        .split(":")
        .map((s) => s.trim());

      const errorMap: Record<string, string> = {
        NO_INTERNET: "Please check your internet connection and try again",
        FILE_NOT_FOUND:
          "The selected image could not be accessed. Please choose a different image",
        UPLOAD_FAILED:
          "Failed to upload your profile picture. Please try again",
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

  const isFormValid = name && username;

  return (
    <Setup
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      name={name}
      setName={setName}
      username={username}
      setUsername={setUsername}
      isFormValid={isFormValid}
      loading={loading}
      bio={bio}
      setBio={setBio}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProfileSetupScreen;
